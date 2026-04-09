import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{B as a}from"./button-Bs-Z7sty.js";import{c as A}from"./createLucideIcon-B24biV1q.js";import{M as H}from"./mail-C7AOMFM8.js";import{C as J}from"./circle-Dw02K2DK.js";import"./index-yBjzXJbu.js";import"./index-Csl6Qs-8.js";import"./index-BlmOqGMO.js";import"./utils-DjqsqOe8.js";/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],x=A("loader-circle",K);/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],m=A("plus",Q),ie={title:"UI/Button",component:a,tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","destructive","outline","secondary","ghost","link"],description:"The visual style of the button"},size:{control:"select",options:["default","sm","lg","icon"],description:"The size of the button"},asChild:{control:"boolean",description:"Whether to render as a child component (using Radix UI Slot)"},disabled:{control:"boolean",description:"Whether the button is disabled"}}},s={args:{children:"Button",variant:"default",size:"default"}},n={render:()=>e.jsxs("div",{className:"flex flex-wrap gap-4",children:[e.jsx(a,{variant:"default",children:"Default"}),e.jsx(a,{variant:"destructive",children:"Destructive"}),e.jsx(a,{variant:"outline",children:"Outline"}),e.jsx(a,{variant:"secondary",children:"Secondary"}),e.jsx(a,{variant:"ghost",children:"Ghost"}),e.jsx(a,{variant:"link",children:"Link"})]})},t={render:()=>e.jsxs("div",{className:"flex flex-wrap items-center gap-4",children:[e.jsx(a,{size:"sm",children:"Small"}),e.jsx(a,{size:"default",children:"Default"}),e.jsx(a,{size:"lg",children:"Large"}),e.jsx(a,{size:"icon",children:e.jsx(m,{className:"h-4 w-4"})})]})},r={render:()=>e.jsxs("div",{className:"flex flex-wrap gap-4",children:[e.jsxs(a,{children:[e.jsx(H,{className:"mr-2 h-4 w-4"})," Login with Email"]}),e.jsxs(a,{variant:"outline",children:[e.jsx(J,{className:"mr-2 h-4 w-4"})," Download"]}),e.jsxs(a,{variant:"secondary",children:["Upload ",e.jsx(m,{className:"ml-2 h-4 w-4"})]})]})},i={render:()=>e.jsxs("div",{className:"flex flex-wrap gap-4",children:[e.jsx(a,{size:"icon",variant:"default",children:e.jsx(m,{className:"h-4 w-4"})}),e.jsx(a,{size:"icon",variant:"secondary",children:e.jsx(H,{className:"h-4 w-4"})}),e.jsx(a,{size:"icon",variant:"outline",children:e.jsx(J,{className:"h-4 w-4"})}),e.jsx(a,{size:"icon",variant:"ghost",children:e.jsx(m,{className:"h-4 w-4"})})]})},l={render:()=>e.jsxs("div",{className:"flex flex-wrap gap-4",children:[e.jsxs(a,{disabled:!0,children:[e.jsx(x,{className:"mr-2 h-4 w-4 animate-spin"}),"Please wait"]}),e.jsxs(a,{variant:"outline",disabled:!0,children:[e.jsx(x,{className:"mr-2 h-4 w-4 animate-spin"}),"Loading..."]})]})},o={render:()=>e.jsxs("div",{className:"flex flex-wrap gap-4",children:[e.jsx(a,{disabled:!0,children:"Disabled"}),e.jsx(a,{variant:"destructive",disabled:!0,children:"Disabled"}),e.jsx(a,{variant:"outline",disabled:!0,children:"Disabled"}),e.jsx(a,{variant:"secondary",disabled:!0,children:"Disabled"}),e.jsx(a,{variant:"ghost",disabled:!0,children:"Disabled"}),e.jsx(a,{variant:"link",disabled:!0,children:"Disabled"})]})},d={render:()=>e.jsxs("div",{className:"w-full max-w-sm space-y-4",children:[e.jsx(a,{className:"w-full",children:"Full Width Button"}),e.jsx(a,{variant:"outline",className:"w-full",children:"Full Width Outline"})]})},c={render:()=>e.jsx("div",{className:"grid grid-cols-2 gap-4 md:grid-cols-3",children:["default","destructive","outline","secondary","ghost","link"].map(p=>["default","sm","lg"].map(h=>e.jsxs(a,{variant:p,size:h,children:[p,"/",h]},`${p}-${h}`)))})},u={render:()=>e.jsxs("div",{className:"w-full max-w-sm space-y-4 rounded-lg border border-input p-4 bg-card",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{htmlFor:"email",className:"text-sm font-medium text-foreground",children:"Email"}),e.jsx("input",{id:"email",type:"email",placeholder:"name@example.com",className:"w-full rounded-md border border-input bg-background px-3 py-2"})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{htmlFor:"password",className:"text-sm font-medium text-foreground",children:"Password"}),e.jsx("input",{id:"password",type:"password",placeholder:"********",className:"w-full rounded-md border border-input bg-background px-3 py-2"})]}),e.jsxs("div",{className:"flex items-center justify-between pt-2",children:[e.jsx(a,{variant:"outline",size:"sm",children:"Cancel"}),e.jsx(a,{children:"Submit"})]})]})};var v,f,g;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    children: "Button",
    variant: "default",
    size: "default"
  }
}`,...(g=(f=s.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var b,B,w;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
}`,...(w=(B=n.parameters)==null?void 0:B.docs)==null?void 0:w.source}}};var j,N,y;t.parameters={...t.parameters,docs:{...(j=t.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
}`,...(y=(N=t.parameters)==null?void 0:N.docs)==null?void 0:y.source}}};var z,D,S;r.parameters={...r.parameters,docs:{...(z=r.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-4">
      <Button>
        <Mail className="mr-2 h-4 w-4" /> Login with Email
      </Button>
      <Button variant="outline">
        <LucideCircle className="mr-2 h-4 w-4" /> Download
      </Button>
      <Button variant="secondary">
        Upload <Plus className="ml-2 h-4 w-4" />
      </Button>
    </div>
}`,...(S=(D=r.parameters)==null?void 0:D.docs)==null?void 0:S.source}}};var k,L,F;i.parameters={...i.parameters,docs:{...(k=i.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-4">
      <Button size="icon" variant="default">
        <Plus className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="secondary">
        <Mail className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="outline">
        <LucideCircle className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="ghost">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
}`,...(F=(L=i.parameters)==null?void 0:L.docs)==null?void 0:F.source}}};var C,W,I;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-4">
      <Button disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Please wait
      </Button>
      <Button variant="outline" disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    </div>
}`,...(I=(W=l.parameters)==null?void 0:W.docs)==null?void 0:I.source}}};var P,M,O;o.parameters={...o.parameters,docs:{...(P=o.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-4">
      <Button disabled>Disabled</Button>
      <Button variant="destructive" disabled>Disabled</Button>
      <Button variant="outline" disabled>Disabled</Button>
      <Button variant="secondary" disabled>Disabled</Button>
      <Button variant="ghost" disabled>Disabled</Button>
      <Button variant="link" disabled>Disabled</Button>
    </div>
}`,...(O=(M=o.parameters)==null?void 0:M.docs)==null?void 0:O.source}}};var E,_,$;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-sm space-y-4">
      <Button className="w-full">Full Width Button</Button>
      <Button variant="outline" className="w-full">Full Width Outline</Button>
    </div>
}`,...($=(_=d.parameters)==null?void 0:_.docs)==null?void 0:$.source}}};var U,T,G;c.parameters={...c.parameters,docs:{...(U=c.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {["default", "destructive", "outline", "secondary", "ghost", "link"].map(variant => ["default", "sm", "lg"].map(size => <Button key={\`\${variant}-\${size}\`} variant={variant as any} size={size as any}>
            {variant}/{size}
          </Button>))}
    </div>
}`,...(G=(T=c.parameters)==null?void 0:T.docs)==null?void 0:G.source}}};var R,V,q;u.parameters={...u.parameters,docs:{...(R=u.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-sm space-y-4 rounded-lg border border-input p-4 bg-card">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
        <input id="email" type="email" placeholder="name@example.com" className="w-full rounded-md border border-input bg-background px-3 py-2" />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-foreground">Password</label>
        <input id="password" type="password" placeholder="********" className="w-full rounded-md border border-input bg-background px-3 py-2" />
      </div>
      <div className="flex items-center justify-between pt-2">
        <Button variant="outline" size="sm">Cancel</Button>
        <Button>Submit</Button>
      </div>
    </div>
}`,...(q=(V=u.parameters)==null?void 0:V.docs)==null?void 0:q.source}}};const le=["Default","Variants","Sizes","WithIcons","IconOnly","Loading","Disabled","FullWidth","Combinations","InForm"];export{c as Combinations,s as Default,o as Disabled,d as FullWidth,i as IconOnly,u as InForm,l as Loading,t as Sizes,n as Variants,r as WithIcons,le as __namedExportsOrder,ie as default};
