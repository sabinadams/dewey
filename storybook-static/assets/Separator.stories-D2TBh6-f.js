import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{r as P}from"./index-BlmOqGMO.js";import{P as _}from"./index-BSUbL-Ji.js";import{c as D}from"./utils-DjqsqOe8.js";import"./index-yBjzXJbu.js";import"./index-DuqhnXMO.js";import"./index-fNjTmf9T.js";import"./index-Csl6Qs-8.js";var F="Separator",p="horizontal",W=["horizontal","vertical"],O=P.forwardRef((t,d)=>{const{decorative:l,orientation:a=p,...E}=t,x=q(a)?a:p,L=l?{role:"none"}:{"aria-orientation":x==="vertical"?x:void 0,role:"separator"};return e.jsx(_.div,{"data-orientation":x,...L,...E,ref:d})});O.displayName=F;function q(t){return W.includes(t)}var H=O;function s({className:t,orientation:d="horizontal",decorative:l=!0,...a}){return e.jsx(H,{"data-slot":"separator-root",decorative:l,orientation:d,className:D("bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",t),...a})}s.__docgenInfo={description:"",methods:[],displayName:"Separator",props:{orientation:{defaultValue:{value:'"horizontal"',computed:!1},required:!1},decorative:{defaultValue:{value:"true",computed:!1},required:!1}}};const X={title:"UI/Separator",component:s,tags:["autodocs"],argTypes:{orientation:{control:"radio",options:["horizontal","vertical"],description:"The orientation of the separator"},decorative:{control:"boolean",description:"Whether the separator is purely decorative"}}},n={args:{orientation:"horizontal",decorative:!0},render:t=>e.jsxs("div",{className:"w-80",children:[e.jsx("div",{className:"text-lg font-medium",children:"Separator"}),e.jsx(s,{...t,className:"my-4"}),e.jsx("div",{className:"text-sm text-muted-foreground",children:"A visual divider between content."})]})},r={render:()=>e.jsxs("div",{className:"w-80 space-y-4",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"text-sm font-medium",children:"First Section"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"This is the first section of the content."})]}),e.jsx(s,{}),e.jsxs("div",{children:[e.jsx("h4",{className:"text-sm font-medium",children:"Second Section"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"This is the second section of the content."})]}),e.jsx(s,{}),e.jsxs("div",{children:[e.jsx("h4",{className:"text-sm font-medium",children:"Third Section"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"This is the third section of the content."})]})]})},i={render:()=>e.jsxs("div",{className:"flex h-40 items-center",children:[e.jsxs("div",{className:"space-y-1",children:[e.jsx("h4",{className:"text-sm font-medium",children:"Left Content"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"This content is on the left side."})]}),e.jsx(s,{orientation:"vertical",className:"mx-8 h-full"}),e.jsxs("div",{className:"space-y-1",children:[e.jsx("h4",{className:"text-sm font-medium",children:"Right Content"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"This content is on the right side."})]})]})},o={render:()=>e.jsx("div",{className:"w-80",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx("span",{className:"text-sm text-muted-foreground",children:"Account"}),e.jsx(s,{className:"mx-2 flex-1"}),e.jsx("span",{className:"text-sm text-muted-foreground",children:"Password"}),e.jsx(s,{className:"mx-2 flex-1"}),e.jsx("span",{className:"text-sm text-muted-foreground",children:"Settings"})]})})},c={render:()=>e.jsxs("div",{className:"space-y-4 w-80",children:[e.jsx(s,{className:"bg-primary"}),e.jsx(s,{className:"bg-destructive h-0.5"}),e.jsx(s,{className:"bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full"}),e.jsxs("div",{className:"flex h-20 items-center",children:[e.jsx("div",{className:"space-y-1",children:e.jsx("p",{className:"text-sm",children:"Left"})}),e.jsx(s,{orientation:"vertical",className:"mx-4 h-full bg-primary"}),e.jsx("div",{className:"space-y-1",children:e.jsx("p",{className:"text-sm",children:"Right"})})]})]})},m={render:()=>e.jsxs("div",{className:"w-80 rounded-lg border p-4",children:[e.jsx("h4",{className:"text-lg font-medium",children:"Card Title"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Card description"}),e.jsx(s,{className:"my-4"}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-sm",children:"Item 1"}),e.jsx("span",{className:"text-sm",children:"Value 1"})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-sm",children:"Item 2"}),e.jsx("span",{className:"text-sm",children:"Value 2"})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-sm",children:"Item 3"}),e.jsx("span",{className:"text-sm",children:"Value 3"})]})]}),e.jsx(s,{className:"my-4"}),e.jsx("div",{className:"flex justify-end",children:e.jsx("button",{className:"rounded-md bg-primary px-3 py-1 text-xs text-white",children:"Action"})})]})};var u,h,N;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    orientation: "horizontal",
    decorative: true
  },
  render: args => <div className="w-80">
      <div className="text-lg font-medium">Separator</div>
      <Separator {...args} className="my-4" />
      <div className="text-sm text-muted-foreground">
        A visual divider between content.
      </div>
    </div>
}`,...(N=(h=n.parameters)==null?void 0:h.docs)==null?void 0:N.source}}};var f,v,j;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <div className="w-80 space-y-4">
      <div>
        <h4 className="text-sm font-medium">First Section</h4>
        <p className="text-sm text-muted-foreground">
          This is the first section of the content.
        </p>
      </div>
      <Separator />
      <div>
        <h4 className="text-sm font-medium">Second Section</h4>
        <p className="text-sm text-muted-foreground">
          This is the second section of the content.
        </p>
      </div>
      <Separator />
      <div>
        <h4 className="text-sm font-medium">Third Section</h4>
        <p className="text-sm text-muted-foreground">
          This is the third section of the content.
        </p>
      </div>
    </div>
}`,...(j=(v=r.parameters)==null?void 0:v.docs)==null?void 0:j.source}}};var g,y,S;i.parameters={...i.parameters,docs:{...(g=i.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <div className="flex h-40 items-center">
      <div className="space-y-1">
        <h4 className="text-sm font-medium">Left Content</h4>
        <p className="text-sm text-muted-foreground">
          This content is on the left side.
        </p>
      </div>
      <Separator orientation="vertical" className="mx-8 h-full" />
      <div className="space-y-1">
        <h4 className="text-sm font-medium">Right Content</h4>
        <p className="text-sm text-muted-foreground">
          This content is on the right side.
        </p>
      </div>
    </div>
}`,...(S=(y=i.parameters)==null?void 0:y.docs)==null?void 0:S.source}}};var b,w,T;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <div className="w-80">
      <div className="flex items-center">
        <span className="text-sm text-muted-foreground">Account</span>
        <Separator className="mx-2 flex-1" />
        <span className="text-sm text-muted-foreground">Password</span>
        <Separator className="mx-2 flex-1" />
        <span className="text-sm text-muted-foreground">Settings</span>
      </div>
    </div>
}`,...(T=(w=o.parameters)==null?void 0:w.docs)==null?void 0:T.source}}};var I,C,z;c.parameters={...c.parameters,docs:{...(I=c.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <div className="space-y-4 w-80">
      <Separator className="bg-primary" />
      <Separator className="bg-destructive h-0.5" />
      <Separator className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full" />
      <div className="flex h-20 items-center">
        <div className="space-y-1">
          <p className="text-sm">Left</p>
        </div>
        <Separator orientation="vertical" className="mx-4 h-full bg-primary" />
        <div className="space-y-1">
          <p className="text-sm">Right</p>
        </div>
      </div>
    </div>
}`,...(z=(C=c.parameters)==null?void 0:C.docs)==null?void 0:z.source}}};var V,A,R;m.parameters={...m.parameters,docs:{...(V=m.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => <div className="w-80 rounded-lg border p-4">
      <h4 className="text-lg font-medium">Card Title</h4>
      <p className="text-sm text-muted-foreground">Card description</p>
      <Separator className="my-4" />
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm">Item 1</span>
          <span className="text-sm">Value 1</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Item 2</span>
          <span className="text-sm">Value 2</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Item 3</span>
          <span className="text-sm">Value 3</span>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="flex justify-end">
        <button className="rounded-md bg-primary px-3 py-1 text-xs text-white">
          Action
        </button>
      </div>
    </div>
}`,...(R=(A=m.parameters)==null?void 0:A.docs)==null?void 0:R.source}}};const Y=["Default","Horizontal","Vertical","WithLabels","CustomStyling","InCard"];export{c as CustomStyling,n as Default,r as Horizontal,m as InCard,i as Vertical,o as WithLabels,Y as __namedExportsOrder,X as default};
