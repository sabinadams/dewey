import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{c as se}from"./utils-DjqsqOe8.js";import"./index-yBjzXJbu.js";function h({className:g,...re}){return e.jsx("textarea",{"data-slot":"textarea",className:se("border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",g),...re})}h.__docgenInfo={description:"",methods:[],displayName:"Textarea"};const ne={title:"UI/Textarea",component:h,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{disabled:{control:"boolean",description:"Whether the textarea is disabled"},placeholder:{control:"text",description:"Placeholder text to show when empty"},rows:{control:{type:"number",min:1,max:20},description:"Number of visible text lines"},className:{control:"text",description:"Additional CSS classes"}}},r={args:{placeholder:"Type your message here."}},s={args:{placeholder:"This textarea is disabled",disabled:!0}},a={args:{value:`This is some initial content in the textarea.
It can span multiple lines.`}},t={args:{placeholder:"This textarea has 10 visible lines",rows:10}},o={args:{placeholder:"This textarea shows an error state",className:"border-red-500 focus-visible:ring-red-500"}},n={args:{placeholder:"This textarea shows a success state",className:"border-green-500 focus-visible:ring-green-500"}},i={args:{value:"This content is read-only and cannot be modified.",readOnly:!0}},d={args:{placeholder:"This field is required",required:!0}},l={args:{placeholder:"Limited to 50 characters",maxLength:50}},c={args:{placeholder:"This textarea can be resized",className:"resize-y"}},m={args:{placeholder:"This textarea takes up the full width",className:"w-full"},parameters:{layout:"padded"}},u={render:()=>e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{htmlFor:"message",className:"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",children:"Your message"}),e.jsx(h,{id:"message",placeholder:"Type your message here."}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Your message will be sent to our support team."})]})},p={render:()=>e.jsxs("form",{onSubmit:g=>g.preventDefault(),className:"space-y-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{htmlFor:"feedback",className:"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",children:"Feedback"}),e.jsx(h,{id:"feedback",placeholder:"Share your thoughts...",required:!0,className:"min-h-[100px]"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Please provide your feedback in detail."})]}),e.jsx("button",{type:"submit",className:"inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2",children:"Submit Feedback"})]}),parameters:{layout:"padded"}};var b,x,f;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    placeholder: "Type your message here."
  }
}`,...(f=(x=r.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};var y,v,N;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    placeholder: "This textarea is disabled",
    disabled: true
  }
}`,...(N=(v=s.parameters)==null?void 0:v.docs)==null?void 0:N.source}}};var T,w,S;a.parameters={...a.parameters,docs:{...(T=a.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    value: "This is some initial content in the textarea.\\nIt can span multiple lines."
  }
}`,...(S=(w=a.parameters)==null?void 0:w.docs)==null?void 0:S.source}}};var k,j,F;t.parameters={...t.parameters,docs:{...(k=t.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    placeholder: "This textarea has 10 visible lines",
    rows: 10
  }
}`,...(F=(j=t.parameters)==null?void 0:j.docs)==null?void 0:F.source}}};var W,q,D;o.parameters={...o.parameters,docs:{...(W=o.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    placeholder: "This textarea shows an error state",
    className: "border-red-500 focus-visible:ring-red-500"
  }
}`,...(D=(q=o.parameters)==null?void 0:q.docs)==null?void 0:D.source}}};var L,z,R;n.parameters={...n.parameters,docs:{...(L=n.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    placeholder: "This textarea shows a success state",
    className: "border-green-500 focus-visible:ring-green-500"
  }
}`,...(R=(z=n.parameters)==null?void 0:z.docs)==null?void 0:R.source}}};var E,O,I;i.parameters={...i.parameters,docs:{...(E=i.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    value: "This content is read-only and cannot be modified.",
    readOnly: true
  }
}`,...(I=(O=i.parameters)==null?void 0:O.docs)==null?void 0:I.source}}};var Y,_,A;d.parameters={...d.parameters,docs:{...(Y=d.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    placeholder: "This field is required",
    required: true
  }
}`,...(A=(_=d.parameters)==null?void 0:_.docs)==null?void 0:A.source}}};var C,P,H;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    placeholder: "Limited to 50 characters",
    maxLength: 50
  }
}`,...(H=(P=l.parameters)==null?void 0:P.docs)==null?void 0:H.source}}};var M,V,U;c.parameters={...c.parameters,docs:{...(M=c.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    placeholder: "This textarea can be resized",
    className: "resize-y"
  }
}`,...(U=(V=c.parameters)==null?void 0:V.docs)==null?void 0:U.source}}};var B,G,J;m.parameters={...m.parameters,docs:{...(B=m.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    placeholder: "This textarea takes up the full width",
    className: "w-full"
  },
  parameters: {
    layout: "padded"
  }
}`,...(J=(G=m.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};var K,Q,X;u.parameters={...u.parameters,docs:{...(K=u.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => <div className="space-y-2">
      <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Your message
      </label>
      <Textarea id="message" placeholder="Type your message here." />
      <p className="text-sm text-muted-foreground">
        Your message will be sent to our support team.
      </p>
    </div>
}`,...(X=(Q=u.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Z,$,ee;p.parameters={...p.parameters,docs:{...(Z=p.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  render: () => <form onSubmit={e => e.preventDefault()} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="feedback" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Feedback
        </label>
        <Textarea id="feedback" placeholder="Share your thoughts..." required className="min-h-[100px]" />
        <p className="text-sm text-muted-foreground">
          Please provide your feedback in detail.
        </p>
      </div>
      <button type="submit" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
        Submit Feedback
      </button>
    </form>,
  parameters: {
    layout: "padded"
  }
}`,...(ee=($=p.parameters)==null?void 0:$.docs)==null?void 0:ee.source}}};const ie=["Default","Disabled","WithValue","CustomHeight","Error","Success","ReadOnly","Required","WithMaxLength","Resizable","FullWidth","WithLabelAndDescription","FormExample"];export{t as CustomHeight,r as Default,s as Disabled,o as Error,p as FormExample,m as FullWidth,i as ReadOnly,d as Required,c as Resizable,n as Success,u as WithLabelAndDescription,l as WithMaxLength,a as WithValue,ie as __namedExportsOrder,ne as default};
