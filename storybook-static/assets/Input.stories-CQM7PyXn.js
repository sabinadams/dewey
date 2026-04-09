import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{I as a}from"./input-Dyu3lkQR.js";import{B as P}from"./button-Bs-Z7sty.js";import{c as k}from"./createLucideIcon-B24biV1q.js";import{M as V}from"./mail-C7AOMFM8.js";import"./index-yBjzXJbu.js";import"./utils-DjqsqOe8.js";import"./index-Csl6Qs-8.js";import"./index-BlmOqGMO.js";/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],B=k("lock",W);/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]],L=k("search",_),C={title:"UI/Input",component:a,tags:["autodocs"],argTypes:{disabled:{control:"boolean",description:"Whether the input is disabled"},placeholder:{control:"text",description:"Placeholder text for the input"},type:{control:"select",options:["text","password","email","number","date","file"],description:"Type of the input"}}},s={args:{placeholder:"Enter text here...",type:"text"}},t={render:()=>e.jsxs("div",{className:"grid w-full max-w-sm items-center gap-1.5",children:[e.jsx("label",{htmlFor:"email",className:"text-sm font-medium text-foreground",children:"Email"}),e.jsx(a,{type:"email",id:"email",placeholder:"name@example.com"})]})},l={args:{disabled:!0,placeholder:"Disabled input",value:"You cannot change this"}},r={render:()=>e.jsxs("div",{className:"flex flex-col gap-4 w-full max-w-sm",children:[e.jsxs("div",{className:"relative",children:[e.jsx(L,{className:"absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"}),e.jsx(a,{className:"pl-8",type:"search",placeholder:"Search..."})]}),e.jsxs("div",{className:"relative",children:[e.jsx(V,{className:"absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"}),e.jsx(a,{className:"pl-8",type:"email",placeholder:"Email address"})]}),e.jsxs("div",{className:"relative",children:[e.jsx(B,{className:"absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"}),e.jsx(a,{className:"pl-8",type:"password",placeholder:"Password"})]})]})},d={render:()=>e.jsxs("div",{className:"flex flex-col gap-4 w-full max-w-sm",children:[e.jsxs("div",{className:"grid gap-1.5",children:[e.jsx("label",{htmlFor:"text",className:"text-sm font-medium text-foreground",children:"Text"}),e.jsx(a,{id:"text",placeholder:"Text input"})]}),e.jsxs("div",{className:"grid gap-1.5",children:[e.jsx("label",{htmlFor:"email",className:"text-sm font-medium text-foreground",children:"Email"}),e.jsx(a,{id:"email",type:"email",placeholder:"name@example.com"})]}),e.jsxs("div",{className:"grid gap-1.5",children:[e.jsx("label",{htmlFor:"password",className:"text-sm font-medium text-foreground",children:"Password"}),e.jsx(a,{id:"password",type:"password",placeholder:"Password"})]}),e.jsxs("div",{className:"grid gap-1.5",children:[e.jsx("label",{htmlFor:"number",className:"text-sm font-medium text-foreground",children:"Number"}),e.jsx(a,{id:"number",type:"number",placeholder:"0"})]}),e.jsxs("div",{className:"grid gap-1.5",children:[e.jsx("label",{htmlFor:"date",className:"text-sm font-medium text-foreground",children:"Date"}),e.jsx(a,{id:"date",type:"date"})]})]})},i={render:()=>e.jsxs("div",{className:"flex flex-col gap-4 w-full max-w-sm",children:[e.jsxs("div",{className:"grid gap-1.5",children:[e.jsx("label",{htmlFor:"valid",className:"text-sm font-medium text-foreground",children:"Valid"}),e.jsx(a,{id:"valid",className:"border-green-500 focus-visible:ring-green-500/20",placeholder:"Valid input"}),e.jsx("p",{className:"text-xs text-green-500",children:"This input is valid"})]}),e.jsxs("div",{className:"grid gap-1.5",children:[e.jsx("label",{htmlFor:"invalid",className:"text-sm font-medium text-foreground",children:"Invalid"}),e.jsx(a,{id:"invalid",className:"border-destructive focus-visible:ring-destructive/20",placeholder:"Invalid input"}),e.jsx("p",{className:"text-xs text-destructive",children:"This input is invalid"})]})]})},o={render:()=>e.jsxs("div",{className:"flex w-full max-w-sm items-center space-x-2",children:[e.jsx(a,{type:"email",placeholder:"Email"}),e.jsx(P,{children:"Subscribe"})]})};var n,m,c;s.parameters={...s.parameters,docs:{...(n=s.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    placeholder: "Enter text here...",
    type: "text"
  }
}`,...(c=(m=s.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};var p,u,x;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <div className="grid w-full max-w-sm items-center gap-1.5">
      <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
      <Input type="email" id="email" placeholder="name@example.com" />
    </div>
}`,...(x=(u=t.parameters)==null?void 0:u.docs)==null?void 0:x.source}}};var h,g,f;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    disabled: true,
    placeholder: "Disabled input",
    value: "You cannot change this"
  }
}`,...(f=(g=l.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var v,N,b;r.parameters={...r.parameters,docs:{...(v=r.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4 w-full max-w-sm">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input className="pl-8" type="search" placeholder="Search..." />
      </div>
      <div className="relative">
        <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input className="pl-8" type="email" placeholder="Email address" />
      </div>
      <div className="relative">
        <Lock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input className="pl-8" type="password" placeholder="Password" />
      </div>
    </div>
}`,...(b=(N=r.parameters)==null?void 0:N.docs)==null?void 0:b.source}}};var w,j,y;d.parameters={...d.parameters,docs:{...(w=d.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4 w-full max-w-sm">
      <div className="grid gap-1.5">
        <label htmlFor="text" className="text-sm font-medium text-foreground">Text</label>
        <Input id="text" placeholder="Text input" />
      </div>
      <div className="grid gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
        <Input id="email" type="email" placeholder="name@example.com" />
      </div>
      <div className="grid gap-1.5">
        <label htmlFor="password" className="text-sm font-medium text-foreground">Password</label>
        <Input id="password" type="password" placeholder="Password" />
      </div>
      <div className="grid gap-1.5">
        <label htmlFor="number" className="text-sm font-medium text-foreground">Number</label>
        <Input id="number" type="number" placeholder="0" />
      </div>
      <div className="grid gap-1.5">
        <label htmlFor="date" className="text-sm font-medium text-foreground">Date</label>
        <Input id="date" type="date" />
      </div>
    </div>
}`,...(y=(j=d.parameters)==null?void 0:j.docs)==null?void 0:y.source}}};var I,F,S;i.parameters={...i.parameters,docs:{...(I=i.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4 w-full max-w-sm">
      <div className="grid gap-1.5">
        <label htmlFor="valid" className="text-sm font-medium text-foreground">Valid</label>
        <Input id="valid" className="border-green-500 focus-visible:ring-green-500/20" placeholder="Valid input" />
        <p className="text-xs text-green-500">This input is valid</p>
      </div>
      <div className="grid gap-1.5">
        <label htmlFor="invalid" className="text-sm font-medium text-foreground">Invalid</label>
        <Input id="invalid" className="border-destructive focus-visible:ring-destructive/20" placeholder="Invalid input" />
        <p className="text-xs text-destructive">This input is invalid</p>
      </div>
    </div>
}`,...(S=(F=i.parameters)==null?void 0:F.docs)==null?void 0:S.source}}};var E,T,D;o.parameters={...o.parameters,docs:{...(E=o.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="email" placeholder="Email" />
      <Button>Subscribe</Button>
    </div>
}`,...(D=(T=o.parameters)==null?void 0:T.docs)==null?void 0:D.source}}};const G=["Default","WithLabel","Disabled","WithIcons","InputTypes","Validation","WithButton"];export{s as Default,l as Disabled,d as InputTypes,i as Validation,o as WithButton,r as WithIcons,t as WithLabel,G as __namedExportsOrder,C as default};
