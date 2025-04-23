use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, ItemFn};

#[proc_macro_attribute]
pub fn command(_attr: TokenStream, item: TokenStream) -> TokenStream {
    let input = parse_macro_input!(item as ItemFn);
    let fn_name = &input.sig.ident;
    let fn_attrs = &input.attrs;
    let fn_sig = &input.sig;
    let fn_block = &input.block;

    let expanded = quote! {
        #(#fn_attrs)*
        #[tauri::command]
        #fn_sig {
            dewey_core::register_command(stringify!(#fn_name).to_string());
            #fn_block
        }
    };

    TokenStream::from(expanded)
}

#[proc_macro]
pub fn collect_commands(_input: TokenStream) -> TokenStream {
    let commands = dewey_core::get_command_names();
    let expanded = quote! {
        tauri::generate_handler![#(#commands),*]
    };

    TokenStream::from(expanded)
} 