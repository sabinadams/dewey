import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{r as l}from"./index-BlmOqGMO.js";import{c as J,a as w,P as ue}from"./index-DWczGfFj.js";import{u as O}from"./index-Csl6Qs-8.js";import{P as S}from"./index-BHJ41s0U.js";import{c as Q,R as me,I as xe}from"./index-DLM5GktJ.js";import{u as fe}from"./index-B-HcCuTi.js";import{u as ve}from"./index-xprPBo3d.js";import{u as he}from"./index-BKWGwRVJ.js";import{u as be}from"./index-DZ2oWOeb.js";import{c as Z}from"./utils-DjqsqOe8.js";import{C as Re}from"./circle-Dw02K2DK.js";import{L as c}from"./label-Dex_ts8l.js";import"./index-yBjzXJbu.js";import"./index-DuqhnXMO.js";import"./index-fNjTmf9T.js";import"./index-dzDNzLhD.js";import"./createLucideIcon-B24biV1q.js";var _="Radio",[je,ee]=J(_),[Ne,ge]=je(_),oe=l.forwardRef((o,a)=>{const{__scopeRadio:r,name:p,checked:t=!1,required:s,disabled:d,value:f="on",onCheck:u,form:v,...h}=o,[x,b]=l.useState(null),i=O(a,N=>b(N)),m=l.useRef(!1),j=x?v||!!x.closest("form"):!0;return e.jsxs(Ne,{scope:r,checked:t,disabled:d,children:[e.jsx(S.button,{type:"button",role:"radio","aria-checked":t,"data-state":se(t),"data-disabled":d?"":void 0,disabled:d,value:f,...h,ref:i,onClick:w(o.onClick,N=>{t||u==null||u(),j&&(m.current=N.isPropagationStopped(),m.current||N.stopPropagation())})}),j&&e.jsx(ae,{control:x,bubbles:!m.current,name:p,value:f,checked:t,required:s,disabled:d,form:v,style:{transform:"translateX(-100%)"}})]})});oe.displayName=_;var te="RadioIndicator",re=l.forwardRef((o,a)=>{const{__scopeRadio:r,forceMount:p,...t}=o,s=ge(te,r);return e.jsx(ue,{present:p||s.checked,children:e.jsx(S.span,{"data-state":se(s.checked),"data-disabled":s.disabled?"":void 0,...t,ref:a})})});re.displayName=te;var ye="RadioBubbleInput",ae=l.forwardRef(({__scopeRadio:o,control:a,checked:r,bubbles:p=!0,...t},s)=>{const d=l.useRef(null),f=O(d,s),u=be(r),v=he(a);return l.useEffect(()=>{const h=d.current;if(!h)return;const x=window.HTMLInputElement.prototype,i=Object.getOwnPropertyDescriptor(x,"checked").set;if(u!==r&&i){const m=new Event("click",{bubbles:p});i.call(h,r),h.dispatchEvent(m)}},[u,r,p]),e.jsx(S.input,{type:"radio","aria-hidden":!0,defaultChecked:r,...t,tabIndex:-1,ref:f,style:{...t.style,...v,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})});ae.displayName=ye;function se(o){return o?"checked":"unchecked"}var Ge=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"],C="RadioGroup",[Ie,Ye]=J(C,[Q,ee]),ie=Q(),ne=ee(),[Fe,Le]=Ie(C),de=l.forwardRef((o,a)=>{const{__scopeRadioGroup:r,name:p,defaultValue:t,value:s,required:d=!1,disabled:f=!1,orientation:u,dir:v,loop:h=!0,onValueChange:x,...b}=o,i=ie(r),m=ve(v),[j,N]=fe({prop:s,defaultProp:t??"",onChange:x,caller:C});return e.jsx(Fe,{scope:r,name:p,required:d,disabled:f,value:j,onValueChange:N,children:e.jsx(me,{asChild:!0,...i,orientation:u,dir:m,loop:h,children:e.jsx(S.div,{role:"radiogroup","aria-required":d,"aria-orientation":u,"data-disabled":f?"":void 0,dir:m,...b,ref:a})})})});de.displayName=C;var le="RadioGroupItem",ce=l.forwardRef((o,a)=>{const{__scopeRadioGroup:r,disabled:p,...t}=o,s=Le(le,r),d=s.disabled||p,f=ie(r),u=ne(r),v=l.useRef(null),h=O(a,v),x=s.value===t.value,b=l.useRef(!1);return l.useEffect(()=>{const i=j=>{Ge.includes(j.key)&&(b.current=!0)},m=()=>b.current=!1;return document.addEventListener("keydown",i),document.addEventListener("keyup",m),()=>{document.removeEventListener("keydown",i),document.removeEventListener("keyup",m)}},[]),e.jsx(xe,{asChild:!0,...f,focusable:!d,active:x,children:e.jsx(oe,{disabled:d,required:s.required,checked:x,...u,...t,name:s.name,ref:h,onCheck:()=>s.onValueChange(t.value),onKeyDown:w(i=>{i.key==="Enter"&&i.preventDefault()}),onFocus:w(t.onFocus,()=>{var i;b.current&&((i=v.current)==null||i.click())})})})});ce.displayName=le;var Se="RadioGroupIndicator",pe=l.forwardRef((o,a)=>{const{__scopeRadioGroup:r,...p}=o,t=ne(r);return e.jsx(re,{...t,...p,ref:a})});pe.displayName=Se;var Ce=de,we=ce,Oe=pe;function R({className:o,...a}){return e.jsx(Ce,{"data-slot":"radio-group",className:Z("grid gap-3",o),...a})}function n({className:o,...a}){return e.jsx(we,{"data-slot":"radio-group-item",className:Z("border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",o),...a,children:e.jsx(Oe,{"data-slot":"radio-group-indicator",className:"relative flex items-center justify-center",children:e.jsx(Re,{className:"fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2"})})})}R.__docgenInfo={description:"",methods:[],displayName:"RadioGroup"};n.__docgenInfo={description:"",methods:[],displayName:"RadioGroupItem"};const Je={title:"UI/RadioGroup",component:R,tags:["autodocs"],decorators:[o=>e.jsx("div",{className:"p-4",children:e.jsx(o,{})})]},g={render:()=>e.jsxs(R,{defaultValue:"option1",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(n,{value:"option1",id:"option1"}),e.jsx(c,{htmlFor:"option1",children:"Option 1"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(n,{value:"option2",id:"option2"}),e.jsx(c,{htmlFor:"option2",children:"Option 2"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(n,{value:"option3",id:"option3"}),e.jsx(c,{htmlFor:"option3",children:"Option 3"})]})]})},y={render:()=>e.jsxs(R,{defaultValue:"option1",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(n,{value:"option1",id:"r1"}),e.jsx(c,{htmlFor:"r1",children:"Available option"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(n,{value:"option2",id:"r2",disabled:!0}),e.jsx(c,{htmlFor:"r2",className:"text-muted-foreground",children:"Disabled option"})]})]})},G={render:()=>e.jsxs(R,{defaultValue:"option1",className:"flex space-x-4",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(n,{value:"option1",id:"h1"}),e.jsx(c,{htmlFor:"h1",children:"Option 1"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(n,{value:"option2",id:"h2"}),e.jsx(c,{htmlFor:"h2",children:"Option 2"})]})]})},I={render:()=>e.jsxs(R,{defaultValue:"option1",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(n,{value:"option1",id:"c1",className:"border-primary data-[state=checked]:bg-primary/10"}),e.jsx(c,{htmlFor:"c1",className:"font-semibold",children:"Custom styled option"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(n,{value:"option2",id:"c2",className:"border-primary data-[state=checked]:bg-primary/10"}),e.jsx(c,{htmlFor:"c2",className:"font-semibold",children:"Custom styled option"})]})]})},F={render:()=>e.jsx("form",{onSubmit:o=>{o.preventDefault(),alert("Form submitted!")},children:e.jsxs("fieldset",{className:"space-y-4",children:[e.jsx("legend",{className:"text-lg font-semibold mb-2",children:"Select an option (Required)"}),e.jsxs(R,{defaultValue:"option1",required:!0,name:"form-example",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(n,{value:"option1",id:"f1"}),e.jsx(c,{htmlFor:"f1",children:"Option 1"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(n,{value:"option2",id:"f2"}),e.jsx(c,{htmlFor:"f2",children:"Option 2"})]})]}),e.jsx("button",{type:"submit",className:"bg-primary text-primary-foreground px-4 py-2 rounded",children:"Submit"})]})})},L={render:()=>e.jsxs(R,{defaultValue:"option1",children:[e.jsx("div",{className:"space-y-2",children:e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(n,{value:"option1",id:"d1"}),e.jsxs("div",{children:[e.jsx(c,{htmlFor:"d1",children:"Option with description"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"This option includes additional descriptive text below the label"})]})]})}),e.jsx("div",{className:"space-y-2",children:e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(n,{value:"option2",id:"d2"}),e.jsxs("div",{children:[e.jsx(c,{htmlFor:"d2",children:"Another option"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"With its own description text"})]})]})})]})};var k,E,P;g.parameters={...g.parameters,docs:{...(k=g.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <RadioGroup defaultValue="option1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="option1" />
        <Label htmlFor="option1">Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="option2" />
        <Label htmlFor="option2">Option 2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option3" id="option3" />
        <Label htmlFor="option3">Option 3</Label>
      </div>
    </RadioGroup>
}`,...(P=(E=g.parameters)==null?void 0:E.docs)==null?void 0:P.source}}};var A,D,V;y.parameters={...y.parameters,docs:{...(A=y.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => <RadioGroup defaultValue="option1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="r1" />
        <Label htmlFor="r1">Available option</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="r2" disabled />
        <Label htmlFor="r2" className="text-muted-foreground">
          Disabled option
        </Label>
      </div>
    </RadioGroup>
}`,...(V=(D=y.parameters)==null?void 0:D.docs)==null?void 0:V.source}}};var q,M,B;G.parameters={...G.parameters,docs:{...(q=G.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => <RadioGroup defaultValue="option1" className="flex space-x-4">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="h1" />
        <Label htmlFor="h1">Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="h2" />
        <Label htmlFor="h2">Option 2</Label>
      </div>
    </RadioGroup>
}`,...(B=(M=G.parameters)==null?void 0:M.docs)==null?void 0:B.source}}};var T,W,z;I.parameters={...I.parameters,docs:{...(T=I.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <RadioGroup defaultValue="option1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="c1" className="border-primary data-[state=checked]:bg-primary/10" />
        <Label htmlFor="c1" className="font-semibold">
          Custom styled option
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="c2" className="border-primary data-[state=checked]:bg-primary/10" />
        <Label htmlFor="c2" className="font-semibold">
          Custom styled option
        </Label>
      </div>
    </RadioGroup>
}`,...(z=(W=I.parameters)==null?void 0:W.docs)==null?void 0:z.source}}};var U,K,H;F.parameters={...F.parameters,docs:{...(U=F.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => <form onSubmit={e => {
    e.preventDefault();
    alert("Form submitted!");
  }}>
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold mb-2">
          Select an option (Required)
        </legend>
        <RadioGroup defaultValue="option1" required name="form-example">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option1" id="f1" />
            <Label htmlFor="f1">Option 1</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option2" id="f2" />
            <Label htmlFor="f2">Option 2</Label>
          </div>
        </RadioGroup>
        <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded">
          Submit
        </button>
      </fieldset>
    </form>
}`,...(H=(K=F.parameters)==null?void 0:K.docs)==null?void 0:H.source}}};var $,X,Y;L.parameters={...L.parameters,docs:{...($=L.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => <RadioGroup defaultValue="option1">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option1" id="d1" />
          <div>
            <Label htmlFor="d1">Option with description</Label>
            <p className="text-sm text-muted-foreground">
              This option includes additional descriptive text below the label
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option2" id="d2" />
          <div>
            <Label htmlFor="d2">Another option</Label>
            <p className="text-sm text-muted-foreground">
              With its own description text
            </p>
          </div>
        </div>
      </div>
    </RadioGroup>
}`,...(Y=(X=L.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};const Qe=["Basic","WithDisabledOption","HorizontalLayout","CustomStyling","FormIntegration","WithDescription"];export{g as Basic,I as CustomStyling,F as FormIntegration,G as HorizontalLayout,L as WithDescription,y as WithDisabledOption,Qe as __namedExportsOrder,Je as default};
