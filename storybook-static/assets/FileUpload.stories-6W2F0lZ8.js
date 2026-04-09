import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{F as l,a,b as i,c as s,d as t,e as m,f as r,g as n,h as p,i as o}from"./file-upload-HvcZJG4J.js";import{R as K}from"./index-BlmOqGMO.js";import"./index-yBjzXJbu.js";import"./input-Dyu3lkQR.js";import"./utils-DjqsqOe8.js";import"./button-Bs-Z7sty.js";import"./index-Csl6Qs-8.js";import"./createLucideIcon-B24biV1q.js";import"./file-BwkqsE_k.js";import"./x-RFX65JHz.js";const oe={title:"UI/FileUpload",component:l,tags:["autodocs"]},c={render:()=>e.jsxs(l,{className:"w-full max-w-sm",children:[e.jsx(a,{htmlFor:"file",children:"Upload file"}),e.jsx(i,{inputId:"file",children:e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(s,{}),e.jsxs("div",{className:"flex flex-col items-center gap-1",children:[e.jsx("span",{className:"text-sm font-medium text-foreground",children:"Drop files here or click to upload"}),e.jsx("span",{className:"text-xs text-muted-foreground",children:"Supports images, documents and videos up to 10MB"})]})]})}),e.jsx(t,{id:"file"})]})},f={render:()=>e.jsxs(l,{className:"w-full max-w-sm",children:[e.jsx(a,{htmlFor:"file",children:"Upload file"}),e.jsx(i,{inputId:"file",children:e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(s,{}),e.jsxs("div",{className:"flex flex-col items-center gap-1",children:[e.jsx("span",{className:"text-sm font-medium text-foreground",children:"Drop files here or click to upload"}),e.jsx("span",{className:"text-xs text-muted-foreground",children:"Supports images, documents and videos up to 10MB"})]})]})}),e.jsx(t,{id:"file"}),e.jsxs(m,{children:[e.jsx(r,{}),e.jsx(n,{children:"document.pdf"}),e.jsx(p,{})]})]})},x={render:()=>e.jsxs(l,{className:"w-full max-w-sm",children:[e.jsx(a,{htmlFor:"files",children:"Upload files"}),e.jsx(i,{inputId:"files",children:e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(s,{}),e.jsxs("div",{className:"flex flex-col items-center gap-1",children:[e.jsx("span",{className:"text-sm font-medium text-foreground",children:"Drop files here or click to upload"}),e.jsx("span",{className:"text-xs text-muted-foreground",children:"Upload multiple files at once"})]})]})}),e.jsx(t,{id:"files",multiple:!0}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs(m,{children:[e.jsx(r,{}),e.jsx(n,{children:"document.pdf"}),e.jsx(p,{})]}),e.jsxs(m,{children:[e.jsx(r,{}),e.jsx(n,{children:"image.jpg"}),e.jsx(p,{})]}),e.jsxs(m,{children:[e.jsx(r,{}),e.jsx(n,{children:"presentation.pptx"}),e.jsx(p,{})]})]})]})},u={render:()=>e.jsxs(l,{className:"w-full max-w-sm",children:[e.jsx(a,{htmlFor:"compact-file",children:"Upload file"}),e.jsx(i,{inputId:"compact-file",className:"p-4",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(s,{className:"h-5 w-5"}),e.jsx("span",{className:"text-sm font-medium text-foreground",children:"Click to upload file"})]})}),e.jsx(t,{id:"compact-file"}),e.jsxs(m,{children:[e.jsx(r,{}),e.jsx(n,{children:"document.pdf"}),e.jsx(p,{})]})]})},g={render:()=>e.jsxs("div",{className:"space-y-8",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-medium mb-2",children:"Image Preview"}),e.jsxs(l,{className:"w-full max-w-sm",children:[e.jsx(a,{htmlFor:"preview-image",children:"Upload image"}),e.jsx(i,{inputId:"preview-image",className:"p-4",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(s,{className:"h-5 w-5"}),e.jsx("span",{className:"text-sm font-medium text-foreground",children:"Click to upload image"})]})}),e.jsx(t,{id:"preview-image"}),e.jsx(o,{fileName:"example-image.jpg",fileUrl:"https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",fileType:"image/jpeg",onDelete:()=>console.log("Image deleted")})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-medium mb-2",children:"Document Preview"}),e.jsxs(l,{className:"w-full max-w-sm",children:[e.jsx(a,{htmlFor:"preview-doc",children:"Upload document"}),e.jsx(i,{inputId:"preview-doc",className:"p-4",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(s,{className:"h-5 w-5"}),e.jsx("span",{className:"text-sm font-medium text-foreground",children:"Click to upload document"})]})}),e.jsx(t,{id:"preview-doc"}),e.jsx(o,{fileName:"presentation.pptx",fileType:"application/vnd.openxmlformats-officedocument.presentationml.presentation",onDelete:()=>console.log("Document deleted")})]})]})]})},h={render:()=>{const[d,N]=K.useState(null),_=F=>{if(F.target.files&&F.target.files[0]){const j=F.target.files[0];N({name:j.name,url:j.type.startsWith("image/")?"https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80":"",type:j.type})}},J=()=>{N(null)};return e.jsxs(l,{className:"w-full max-w-sm",children:[e.jsx(a,{htmlFor:"interactive-preview",children:"Interactive File Upload with Preview"}),d&&e.jsx(o,{fileName:d.name,fileUrl:d.url,fileType:d.type,onDelete:J}),e.jsx(i,{inputId:"interactive-preview",disabled:!!d,children:e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(s,{}),e.jsxs("div",{className:"flex flex-col items-center gap-1",children:[e.jsx("span",{className:"text-sm font-medium text-foreground",children:d?"File already uploaded":"Try uploading a file"}),e.jsx("span",{className:"text-xs text-muted-foreground",children:d?"Delete the current file to upload a new one":"To see the preview in action"})]})]})}),e.jsx(t,{id:"interactive-preview",onChange:_,disabled:!!d})]})}},w={render:()=>e.jsxs("div",{className:"space-y-8",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-medium mb-2",children:"Disabled Upload"}),e.jsxs(l,{className:"w-full max-w-sm",children:[e.jsx(a,{htmlFor:"disabled-file",children:"Upload file (Disabled)"}),e.jsx(i,{inputId:"disabled-file",className:"p-4",disabled:!0,children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(s,{className:"h-5 w-5"}),e.jsx("span",{className:"text-sm font-medium text-foreground",children:"Upload disabled"})]})}),e.jsx(t,{id:"disabled-file",disabled:!0})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-medium mb-2",children:"Disabled with Preview"}),e.jsxs(l,{className:"w-full max-w-sm",children:[e.jsx(o,{fileName:"example-image.jpg",fileUrl:"https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",fileType:"image/jpeg",onDelete:()=>console.log("Image deleted")}),e.jsx(a,{htmlFor:"disabled-preview-file",children:"Upload file (Disabled with Preview)"}),e.jsx(i,{inputId:"disabled-preview-file",className:"p-4",disabled:!0,children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(s,{className:"h-5 w-5"}),e.jsx("span",{className:"text-sm font-medium text-foreground",children:"File already uploaded"})]})}),e.jsx(t,{id:"disabled-preview-file",disabled:!0})]})]})]})},U={render:()=>e.jsxs("div",{className:"space-y-8",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-medium mb-2",children:"Default Size"}),e.jsx(l,{className:"w-full max-w-sm",children:e.jsx(o,{fileName:"large-image.jpg",fileUrl:"https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",fileType:"image/jpeg",onDelete:()=>console.log("Image deleted"),size:"default"})})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-medium mb-2",children:"Small Size"}),e.jsx(l,{className:"w-full max-w-sm",children:e.jsx(o,{fileName:"small-image.jpg",fileUrl:"https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",fileType:"image/jpeg",onDelete:()=>console.log("Image deleted"),size:"small"})})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-medium mb-2",children:"Icon Size (80x80)"}),e.jsx(l,{className:"w-full max-w-sm",children:e.jsx(o,{fileName:"icon-image.jpg",fileUrl:"https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",fileType:"image/jpeg",onDelete:()=>console.log("Image deleted"),size:"icon"})})]})]})};var v,b,I;c.parameters={...c.parameters,docs:{...(v=c.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <FileUpload className="w-full max-w-sm">
      <FileUploadLabel htmlFor="file">Upload file</FileUploadLabel>
      <FileUploadTrigger inputId="file">
        <div className="flex flex-col items-center gap-2">
          <FileUploadIcon />
          <div className="flex flex-col items-center gap-1">
            <span className="text-sm font-medium text-foreground">Drop files here or click to upload</span>
            <span className="text-xs text-muted-foreground">
              Supports images, documents and videos up to 10MB
            </span>
          </div>
        </div>
      </FileUploadTrigger>
      <FileUploadInput id="file" />
    </FileUpload>
}`,...(I=(b=c.parameters)==null?void 0:b.docs)==null?void 0:I.source}}};var D,y,T;f.parameters={...f.parameters,docs:{...(D=f.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <FileUpload className="w-full max-w-sm">
      <FileUploadLabel htmlFor="file">Upload file</FileUploadLabel>
      <FileUploadTrigger inputId="file">
        <div className="flex flex-col items-center gap-2">
          <FileUploadIcon />
          <div className="flex flex-col items-center gap-1">
            <span className="text-sm font-medium text-foreground">Drop files here or click to upload</span>
            <span className="text-xs text-muted-foreground">
              Supports images, documents and videos up to 10MB
            </span>
          </div>
        </div>
      </FileUploadTrigger>
      <FileUploadInput id="file" />
      <FileUploadItem>
        <FileUploadItemIcon />
        <FileUploadItemName>document.pdf</FileUploadItemName>
        <FileUploadItemDeleteTrigger />
      </FileUploadItem>
    </FileUpload>
}`,...(T=(y=f.parameters)==null?void 0:y.docs)==null?void 0:T.source}}};var M,H,B;x.parameters={...x.parameters,docs:{...(M=x.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => <FileUpload className="w-full max-w-sm">
      <FileUploadLabel htmlFor="files">Upload files</FileUploadLabel>
      <FileUploadTrigger inputId="files">
        <div className="flex flex-col items-center gap-2">
          <FileUploadIcon />
          <div className="flex flex-col items-center gap-1">
            <span className="text-sm font-medium text-foreground">Drop files here or click to upload</span>
            <span className="text-xs text-muted-foreground">
              Upload multiple files at once
            </span>
          </div>
        </div>
      </FileUploadTrigger>
      <FileUploadInput id="files" multiple />
      <div className="space-y-2">
        <FileUploadItem>
          <FileUploadItemIcon />
          <FileUploadItemName>document.pdf</FileUploadItemName>
          <FileUploadItemDeleteTrigger />
        </FileUploadItem>
        <FileUploadItem>
          <FileUploadItemIcon />
          <FileUploadItemName>image.jpg</FileUploadItemName>
          <FileUploadItemDeleteTrigger />
        </FileUploadItem>
        <FileUploadItem>
          <FileUploadItemIcon />
          <FileUploadItemName>presentation.pptx</FileUploadItemName>
          <FileUploadItemDeleteTrigger />
        </FileUploadItem>
      </div>
    </FileUpload>
}`,...(B=(H=x.parameters)==null?void 0:H.docs)==null?void 0:B.source}}};var S,P,A;u.parameters={...u.parameters,docs:{...(S=u.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <FileUpload className="w-full max-w-sm">
      <FileUploadLabel htmlFor="compact-file">Upload file</FileUploadLabel>
      <FileUploadTrigger inputId="compact-file" className="p-4">
        <div className="flex items-center gap-2">
          <FileUploadIcon className="h-5 w-5" />
          <span className="text-sm font-medium text-foreground">
            Click to upload file
          </span>
        </div>
      </FileUploadTrigger>
      <FileUploadInput id="compact-file" />
      <FileUploadItem>
        <FileUploadItemIcon />
        <FileUploadItemName>document.pdf</FileUploadItemName>
        <FileUploadItemDeleteTrigger />
      </FileUploadItem>
    </FileUpload>
}`,...(A=(P=u.parameters)==null?void 0:P.docs)==null?void 0:A.source}}};var G,L,W;g.parameters={...g.parameters,docs:{...(G=g.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-2">Image Preview</h3>
        <FileUpload className="w-full max-w-sm">
          <FileUploadLabel htmlFor="preview-image">Upload image</FileUploadLabel>
          <FileUploadTrigger inputId="preview-image" className="p-4">
            <div className="flex items-center gap-2">
              <FileUploadIcon className="h-5 w-5" />
              <span className="text-sm font-medium text-foreground">
                Click to upload image
              </span>
            </div>
          </FileUploadTrigger>
          <FileUploadInput id="preview-image" />
          <FileUploadPreview fileName="example-image.jpg" fileUrl="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" fileType="image/jpeg" onDelete={() => console.log('Image deleted')} />
        </FileUpload>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Document Preview</h3>
        <FileUpload className="w-full max-w-sm">
          <FileUploadLabel htmlFor="preview-doc">Upload document</FileUploadLabel>
          <FileUploadTrigger inputId="preview-doc" className="p-4">
            <div className="flex items-center gap-2">
              <FileUploadIcon className="h-5 w-5" />
              <span className="text-sm font-medium text-foreground">
                Click to upload document
              </span>
            </div>
          </FileUploadTrigger>
          <FileUploadInput id="preview-doc" />
          <FileUploadPreview fileName="presentation.pptx" fileType="application/vnd.openxmlformats-officedocument.presentationml.presentation" onDelete={() => console.log('Document deleted')} />
        </FileUpload>
      </div>
    </div>
}`,...(W=(L=g.parameters)==null?void 0:L.docs)==null?void 0:W.source}}};var z,C,k;h.parameters={...h.parameters,docs:{...(z=h.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => {
    // Using React's useState hook in a Story component
    const [file, setFile] = React.useState<{
      name: string;
      url: string;
      type: string;
    } | null>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const selectedFile = e.target.files[0];
        // In a real app, we would use URL.createObjectURL here
        // For the story, we'll simulate with a placeholder image
        setFile({
          name: selectedFile.name,
          // Use a placeholder image for the story
          url: selectedFile.type.startsWith('image/') ? "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" : "",
          type: selectedFile.type
        });
      }
    };
    const handleDelete = () => {
      setFile(null);
    };
    return <FileUpload className="w-full max-w-sm">
        <FileUploadLabel htmlFor="interactive-preview">
          Interactive File Upload with Preview
        </FileUploadLabel>
        {file && <FileUploadPreview fileName={file.name} fileUrl={file.url} fileType={file.type} onDelete={handleDelete} />}
        <FileUploadTrigger inputId="interactive-preview" disabled={!!file}>
          <div className="flex flex-col items-center gap-2">
            <FileUploadIcon />
            <div className="flex flex-col items-center gap-1">
              <span className="text-sm font-medium text-foreground">
                {file ? "File already uploaded" : "Try uploading a file"}
              </span>
              <span className="text-xs text-muted-foreground">
                {file ? "Delete the current file to upload a new one" : "To see the preview in action"}
              </span>
            </div>
          </div>
        </FileUploadTrigger>
        <FileUploadInput id="interactive-preview" onChange={handleFileChange} disabled={!!file} />
      </FileUpload>;
  }
}`,...(k=(C=h.parameters)==null?void 0:C.docs)==null?void 0:k.source}}};var q,V,Y;w.parameters={...w.parameters,docs:{...(q=w.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-2">Disabled Upload</h3>
        <FileUpload className="w-full max-w-sm">
          <FileUploadLabel htmlFor="disabled-file">Upload file (Disabled)</FileUploadLabel>
          <FileUploadTrigger inputId="disabled-file" className="p-4" disabled>
            <div className="flex items-center gap-2">
              <FileUploadIcon className="h-5 w-5" />
              <span className="text-sm font-medium text-foreground">
                Upload disabled
              </span>
            </div>
          </FileUploadTrigger>
          <FileUploadInput id="disabled-file" disabled />
        </FileUpload>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Disabled with Preview</h3>
        <FileUpload className="w-full max-w-sm">
          <FileUploadPreview fileName="example-image.jpg" fileUrl="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" fileType="image/jpeg" onDelete={() => console.log('Image deleted')} />
          <FileUploadLabel htmlFor="disabled-preview-file">Upload file (Disabled with Preview)</FileUploadLabel>
          <FileUploadTrigger inputId="disabled-preview-file" className="p-4" disabled>
            <div className="flex items-center gap-2">
              <FileUploadIcon className="h-5 w-5" />
              <span className="text-sm font-medium text-foreground">
                File already uploaded
              </span>
            </div>
          </FileUploadTrigger>
          <FileUploadInput id="disabled-preview-file" disabled />
        </FileUpload>
      </div>
    </div>
}`,...(Y=(V=w.parameters)==null?void 0:V.docs)==null?void 0:Y.source}}};var R,E,O;U.parameters={...U.parameters,docs:{...(R=U.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-2">Default Size</h3>
        <FileUpload className="w-full max-w-sm">
          <FileUploadPreview fileName="large-image.jpg" fileUrl="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" fileType="image/jpeg" onDelete={() => console.log('Image deleted')} size="default" />
        </FileUpload>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Small Size</h3>
        <FileUpload className="w-full max-w-sm">
          <FileUploadPreview fileName="small-image.jpg" fileUrl="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" fileType="image/jpeg" onDelete={() => console.log('Image deleted')} size="small" />
        </FileUpload>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Icon Size (80x80)</h3>
        <FileUpload className="w-full max-w-sm">
          <FileUploadPreview fileName="icon-image.jpg" fileUrl="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" fileType="image/jpeg" onDelete={() => console.log('Image deleted')} size="icon" />
        </FileUpload>
      </div>
    </div>
}`,...(O=(E=U.parameters)==null?void 0:E.docs)==null?void 0:O.source}}};const me=["Default","WithPreview","MultipleFiles","Compact","WithFileUploadPreview","WithInteractivePreview","DisabledState","PreviewSizes"];export{u as Compact,c as Default,w as DisabledState,x as MultipleFiles,U as PreviewSizes,g as WithFileUploadPreview,h as WithInteractivePreview,f as WithPreview,me as __namedExportsOrder,oe as default};
