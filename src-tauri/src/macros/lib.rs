use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, ItemFn, ReturnType, Type};

#[proc_macro_attribute]
pub fn with_transaction(_attr: TokenStream, item: TokenStream) -> TokenStream {
    let input = parse_macro_input!(item as ItemFn);
    let fn_name = &input.sig.ident;
    let fn_vis = &input.vis;
    let fn_block = &input.block;
    let fn_inputs = &input.sig.inputs;
    let fn_generics = &input.sig.generics;
    let fn_async = input.sig.asyncness.is_some();
    let fn_return = &input.sig.output;

    // Generate the new function with transaction support
    let expanded = quote! {
        #fn_vis #fn_generics async fn #fn_name #fn_inputs #fn_return {
            // Start a transaction
            let mut tx = state.db.begin().await
                .map_err(|e| AppError::new(
                    format!("Failed to start transaction: {}", e),
                    ErrorCategory::Database(DatabaseSubcategory::TransactionFailed),
                    ErrorSeverity::Error,
                ))?;

            // Execute the original function block
            let result = #fn_block;

            // Commit the transaction
            if let Err(e) = tx.commit().await {
                return Err(AppError::new(
                    format!("Failed to commit transaction: {}", e),
                    ErrorCategory::Database(DatabaseSubcategory::TransactionFailed),
                    ErrorSeverity::Error,
                ));
            }

            result
        }
    };

    TokenStream::from(expanded)
} 