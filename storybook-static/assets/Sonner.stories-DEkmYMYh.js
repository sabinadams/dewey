import{j as t}from"./jsx-runtime-Cf8x2fCZ.js";import{r as w}from"./index-BlmOqGMO.js";import{T as at,t as o}from"./index-CsYZaKnh.js";import{B as e}from"./button-Bs-Z7sty.js";import{C as ct}from"./check-BkNk9Tx4.js";import{c as et}from"./createLucideIcon-B24biV1q.js";import{I as st}from"./info-1xTnDeXf.js";import"./index-yBjzXJbu.js";import"./index-DuqhnXMO.js";import"./index-fNjTmf9T.js";import"./index-Csl6Qs-8.js";import"./utils-DjqsqOe8.js";/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lt=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m4.9 4.9 14.2 14.2",key:"1m5liu"}]],dt=et("ban",lt);/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ut=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],mt=et("circle-alert",ut);var pt=(s,c,N,l,d,r,b,v)=>{let a=document.documentElement,y=["light","dark"];function u(i){(Array.isArray(s)?s:[s]).forEach(m=>{let T=m==="class",rt=T&&r?d.map(S=>r[S]||S):d;T?(a.classList.remove(...rt),a.classList.add(r&&r[i]?r[i]:i)):a.setAttribute(m,i)}),nt(i)}function nt(i){v&&y.includes(i)&&(a.style.colorScheme=i)}function it(){return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}if(l)u(l);else try{let i=localStorage.getItem(c)||N,m=b&&i==="system"?it():i;u(m)}catch{}},ht=w.createContext(void 0),ft={setTheme:s=>{},themes:[]},xt=()=>{var s;return(s=w.useContext(ht))!=null?s:ft};w.memo(({forcedTheme:s,storageKey:c,attribute:N,enableSystem:l,enableColorScheme:d,defaultTheme:r,value:b,themes:v,nonce:a,scriptProps:y})=>{let u=JSON.stringify([N,c,r,s,v,b,l,d]).slice(1,-1);return w.createElement("script",{...y,suppressHydrationWarning:!0,nonce:typeof window>"u"?a:"",dangerouslySetInnerHTML:{__html:`(${pt.toString()})(${u})`}})});const n=({...s})=>{const{theme:c="system"}=xt();return t.jsx(at,{theme:c,className:"toaster group",style:{"--normal-bg":"var(--popover)","--normal-text":"var(--popover-foreground)","--normal-border":"var(--border)"},...s})};n.__docgenInfo={description:"",methods:[],displayName:"Toaster"};const Dt={title:"UI/Toaster",component:n,tags:["autodocs"],parameters:{layout:"centered"},argTypes:{position:{control:"select",options:["top-left","top-center","top-right","bottom-left","bottom-center","bottom-right"],description:"The position of the toast notifications",defaultValue:"bottom-right"},expand:{control:"boolean",description:"Whether to expand toasts to fit content",defaultValue:!1},closeButton:{control:"boolean",description:"Whether to show a close button",defaultValue:!0},offset:{control:"number",description:"Distance in pixels from the viewport edges",defaultValue:16},duration:{control:"number",description:"Default duration in milliseconds for toasts",defaultValue:4e3},richColors:{control:"boolean",description:"Whether to use rich colors for toasts",defaultValue:!1}},decorators:[s=>t.jsx("div",{className:"flex flex-col items-center justify-center gap-4",children:t.jsx(s,{})})]},gt=()=>t.jsxs("div",{className:"flex flex-wrap gap-4 max-w-[600px]",children:[t.jsx(e,{onClick:()=>o("Default notification"),children:"Default Toast"}),t.jsx(e,{onClick:()=>o.success("Successfully completed operation"),children:"Success Toast"}),t.jsx(e,{onClick:()=>o.error("An error occurred"),children:"Error Toast"}),t.jsx(e,{onClick:()=>o.info("For your information..."),children:"Info Toast"}),t.jsx(e,{onClick:()=>o.warning("Warning: approaching limit"),children:"Warning Toast"}),t.jsx(e,{onClick:()=>o.promise(new Promise(s=>setTimeout(s,2e3)),{loading:"Loading...",success:"Operation completed successfully",error:"Operation failed"}),children:"Promise Toast"}),t.jsx(e,{onClick:()=>o.loading("Loading resources..."),children:"Loading Toast"})]}),p={render:()=>t.jsxs(t.Fragment,{children:[t.jsx(gt,{}),t.jsx(n,{})]})},h={render:()=>t.jsxs("div",{className:"space-y-4",children:[t.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[t.jsx(e,{onClick:()=>o("Top Left Notification",{position:"top-left"}),children:"Top Left"}),t.jsx(e,{onClick:()=>o("Top Center Notification",{position:"top-center"}),children:"Top Center"}),t.jsx(e,{onClick:()=>o("Top Right Notification",{position:"top-right"}),children:"Top Right"}),t.jsx(e,{onClick:()=>o("Bottom Left Notification",{position:"bottom-left"}),children:"Bottom Left"}),t.jsx(e,{onClick:()=>o("Bottom Center Notification",{position:"bottom-center"}),children:"Bottom Center"}),t.jsx(e,{onClick:()=>o("Bottom Right Notification",{position:"bottom-right"}),children:"Bottom Right"})]}),t.jsx(n,{})]})},f={render:()=>t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"flex flex-wrap gap-4",children:[t.jsx(e,{onClick:()=>o("Operation completed",{icon:t.jsx(ct,{className:"h-4 w-4 text-green-500"}),className:"border-l-4 border-green-500"}),children:"With Success Icon"}),t.jsx(e,{onClick:()=>o("Critical alert",{icon:t.jsx(mt,{className:"h-4 w-4 text-red-500"}),className:"border-l-4 border-red-500"}),children:"With Error Icon"}),t.jsx(e,{onClick:()=>o("Information message",{icon:t.jsx(st,{className:"h-4 w-4 text-blue-500"}),className:"border-l-4 border-blue-500"}),children:"With Info Icon"}),t.jsx(e,{onClick:()=>o("Warning alert",{icon:t.jsx(dt,{className:"h-4 w-4 text-yellow-500"}),className:"border-l-4 border-yellow-500"}),children:"With Warning Icon"})]}),t.jsx(n,{})]})},x={render:()=>t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"flex flex-wrap gap-4",children:[t.jsx(e,{onClick:()=>o("Quick notification",{duration:1e3}),children:"1s Duration"}),t.jsx(e,{onClick:()=>o("Standard notification",{duration:4e3}),children:"4s Duration (Default)"}),t.jsx(e,{onClick:()=>o("Long notification",{duration:8e3}),children:"8s Duration"}),t.jsx(e,{onClick:()=>o("Persistent notification",{duration:1/0}),children:"Persistent (No Auto-Close)"})]}),t.jsx(n,{})]})},g={render:()=>t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"flex flex-wrap gap-4",children:[t.jsx(e,{onClick:()=>o("Default with rich colors"),children:"Default"}),t.jsx(e,{onClick:()=>o.success("Success with rich colors"),children:"Success"}),t.jsx(e,{onClick:()=>o.error("Error with rich colors"),children:"Error"}),t.jsx(e,{onClick:()=>o.info("Info with rich colors"),children:"Info"}),t.jsx(e,{onClick:()=>o.warning("Warning with rich colors"),children:"Warning"})]}),t.jsx(n,{richColors:!0})]})},C={render:()=>t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"flex flex-wrap gap-4",children:[t.jsx(e,{onClick:()=>o("Confirm your action",{action:{label:"Confirm",onClick:()=>o.success("Action confirmed!")}}),children:"With Confirm Action"}),t.jsx(e,{onClick:()=>o("Changes saved",{action:{label:"Undo",onClick:()=>o.info("Changes undone")},cancel:{label:"Dismiss",onClick:()=>console.log("Dismissed")}}),children:"With Undo/Dismiss"}),t.jsx(e,{onClick:()=>o("Multiple actions available",{description:"You can choose from these options",action:{label:"Accept",onClick:()=>o.success("Accepted")},cancel:{label:"Reject",onClick:()=>o.error("Rejected")}}),children:"With Description & Actions"})]}),t.jsx(n,{})]})},k={render:()=>t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"flex flex-wrap gap-4",children:[t.jsx(e,{onClick:()=>o("Custom styled toast",{className:"bg-blue-50 border-blue-200",description:"This is a customized description with specialized styling",icon:t.jsx(st,{className:"h-4 w-4 text-blue-500"}),style:{padding:"16px"}}),children:"Styled Toast"}),t.jsx(e,{onClick:()=>o("Toast with HTML content",{description:t.jsxs("div",{className:"mt-2",children:[t.jsxs("p",{children:["This toast contains ",t.jsx("strong",{children:"formatted"})," ",t.jsx("em",{children:"HTML content"})," in the description."]}),t.jsx("div",{className:"mt-2 p-2 bg-gray-100 rounded text-xs",children:"And even a code-like block!"})]})}),children:"HTML Content Toast"})]}),t.jsx(n,{})]})},j={render:()=>t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"flex flex-wrap gap-4",children:[t.jsx(e,{onClick:()=>o("This is a very long notification message that will wrap to multiple lines. This demonstrates how the expand property affects the layout of toast notifications with varying amounts of content."),children:"Long Content (expand=false)"}),t.jsx(e,{onClick:()=>o("Short message"),children:"Short Content (expand=false)"})]}),t.jsx(n,{expand:!1}),t.jsx("div",{className:"h-8"}),t.jsxs("div",{className:"flex flex-wrap gap-4",children:[t.jsx(e,{onClick:()=>o("This is a very long notification message that will wrap to multiple lines. This demonstrates how the expand property affects the layout of toast notifications with varying amounts of content."),children:"Long Content (expand=true)"}),t.jsx(e,{onClick:()=>o("Short message"),children:"Short Content (expand=true)"})]}),t.jsx(n,{expand:!0})]})},B={render:()=>t.jsxs(t.Fragment,{children:[t.jsx("div",{className:"flex flex-wrap gap-4",children:t.jsx(e,{onClick:()=>o("Notification with close button"),children:"With Close Button"})}),t.jsx(n,{closeButton:!0}),t.jsx("div",{className:"h-8"}),t.jsx("div",{className:"flex flex-wrap gap-4",children:t.jsx(e,{onClick:()=>o("Notification without close button"),children:"Without Close Button"})}),t.jsx(n,{closeButton:!1})]})};var W,D,I;p.parameters={...p.parameters,docs:{...(W=p.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => <>
      <ToastTrigger />
      <Toaster />
    </>
}`,...(I=(D=p.parameters)==null?void 0:D.docs)==null?void 0:I.source}}};var L,A,R;h.parameters={...h.parameters,docs:{...(L=h.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Button onClick={() => toast('Top Left Notification', {
        position: 'top-left'
      })}>
          Top Left
        </Button>
        
        <Button onClick={() => toast('Top Center Notification', {
        position: 'top-center'
      })}>
          Top Center
        </Button>
        
        <Button onClick={() => toast('Top Right Notification', {
        position: 'top-right'
      })}>
          Top Right
        </Button>
        
        <Button onClick={() => toast('Bottom Left Notification', {
        position: 'bottom-left'
      })}>
          Bottom Left
        </Button>
        
        <Button onClick={() => toast('Bottom Center Notification', {
        position: 'bottom-center'
      })}>
          Bottom Center
        </Button>
        
        <Button onClick={() => toast('Bottom Right Notification', {
        position: 'bottom-right'
      })}>
          Bottom Right
        </Button>
      </div>
      <Toaster />
    </div>
}`,...(R=(A=h.parameters)==null?void 0:A.docs)==null?void 0:R.source}}};var E,M,_;f.parameters={...f.parameters,docs:{...(E=f.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <>
      <div className="flex flex-wrap gap-4">
        <Button onClick={() => toast('Operation completed', {
        icon: <Check className="h-4 w-4 text-green-500" />,
        className: 'border-l-4 border-green-500'
      })}>
          With Success Icon
        </Button>
        
        <Button onClick={() => toast('Critical alert', {
        icon: <AlertCircle className="h-4 w-4 text-red-500" />,
        className: 'border-l-4 border-red-500'
      })}>
          With Error Icon
        </Button>
        
        <Button onClick={() => toast('Information message', {
        icon: <Info className="h-4 w-4 text-blue-500" />,
        className: 'border-l-4 border-blue-500'
      })}>
          With Info Icon
        </Button>
        
        <Button onClick={() => toast('Warning alert', {
        icon: <Ban className="h-4 w-4 text-yellow-500" />,
        className: 'border-l-4 border-yellow-500'
      })}>
          With Warning Icon
        </Button>
      </div>
      <Toaster />
    </>
}`,...(_=(M=f.parameters)==null?void 0:M.docs)==null?void 0:_.source}}};var F,P,H;x.parameters={...x.parameters,docs:{...(F=x.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => <>
      <div className="flex flex-wrap gap-4">
        <Button onClick={() => toast('Quick notification', {
        duration: 1000
      })}>
          1s Duration
        </Button>
        
        <Button onClick={() => toast('Standard notification', {
        duration: 4000
      })}>
          4s Duration (Default)
        </Button>
        
        <Button onClick={() => toast('Long notification', {
        duration: 8000
      })}>
          8s Duration
        </Button>
        
        <Button onClick={() => toast('Persistent notification', {
        duration: Infinity
      })}>
          Persistent (No Auto-Close)
        </Button>
      </div>
      <Toaster />
    </>
}`,...(H=(P=x.parameters)==null?void 0:P.docs)==null?void 0:H.source}}};var O,U,V;g.parameters={...g.parameters,docs:{...(O=g.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => <>
      <div className="flex flex-wrap gap-4">
        <Button onClick={() => toast('Default with rich colors')}>
          Default
        </Button>
        
        <Button onClick={() => toast.success('Success with rich colors')}>
          Success
        </Button>
        
        <Button onClick={() => toast.error('Error with rich colors')}>
          Error
        </Button>
        
        <Button onClick={() => toast.info('Info with rich colors')}>
          Info
        </Button>
        
        <Button onClick={() => toast.warning('Warning with rich colors')}>
          Warning
        </Button>
      </div>
      <Toaster richColors />
    </>
}`,...(V=(U=g.parameters)==null?void 0:U.docs)==null?void 0:V.source}}};var z,$,Q;C.parameters={...C.parameters,docs:{...(z=C.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => <>
      <div className="flex flex-wrap gap-4">
        <Button onClick={() => toast('Confirm your action', {
        action: {
          label: 'Confirm',
          onClick: () => toast.success('Action confirmed!')
        }
      })}>
          With Confirm Action
        </Button>
        
        <Button onClick={() => toast('Changes saved', {
        action: {
          label: 'Undo',
          onClick: () => toast.info('Changes undone')
        },
        cancel: {
          label: 'Dismiss',
          onClick: () => console.log('Dismissed')
        }
      })}>
          With Undo/Dismiss
        </Button>
        
        <Button onClick={() => toast('Multiple actions available', {
        description: 'You can choose from these options',
        action: {
          label: 'Accept',
          onClick: () => toast.success('Accepted')
        },
        cancel: {
          label: 'Reject',
          onClick: () => toast.error('Rejected')
        }
      })}>
          With Description & Actions
        </Button>
      </div>
      <Toaster />
    </>
}`,...(Q=($=C.parameters)==null?void 0:$.docs)==null?void 0:Q.source}}};var Y,q,J;k.parameters={...k.parameters,docs:{...(Y=k.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: () => <>
      <div className="flex flex-wrap gap-4">
        <Button onClick={() => toast('Custom styled toast', {
        className: 'bg-blue-50 border-blue-200',
        description: 'This is a customized description with specialized styling',
        icon: <Info className="h-4 w-4 text-blue-500" />,
        style: {
          padding: '16px'
        }
      })}>
          Styled Toast
        </Button>
        
        <Button onClick={() => toast('Toast with HTML content', {
        description: <div className="mt-2">
                <p>This toast contains <strong>formatted</strong> <em>HTML content</em> in the description.</p>
                <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
                  And even a code-like block!
                </div>
              </div>
      })}>
          HTML Content Toast
        </Button>
      </div>
      <Toaster />
    </>
}`,...(J=(q=k.parameters)==null?void 0:q.docs)==null?void 0:J.source}}};var K,G,X;j.parameters={...j.parameters,docs:{...(K=j.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => <>
      <div className="flex flex-wrap gap-4">
        <Button onClick={() => toast('This is a very long notification message that will wrap to multiple lines. This demonstrates how the expand property affects the layout of toast notifications with varying amounts of content.')}>
          Long Content (expand=false)
        </Button>
        
        <Button onClick={() => toast('Short message')}>
          Short Content (expand=false)
        </Button>
      </div>
      <Toaster expand={false} />
      
      <div className="h-8" />
      
      <div className="flex flex-wrap gap-4">
        <Button onClick={() => toast('This is a very long notification message that will wrap to multiple lines. This demonstrates how the expand property affects the layout of toast notifications with varying amounts of content.')}>
          Long Content (expand=true)
        </Button>
        
        <Button onClick={() => toast('Short message')}>
          Short Content (expand=true)
        </Button>
      </div>
      <Toaster expand={true} />
    </>
}`,...(X=(G=j.parameters)==null?void 0:G.docs)==null?void 0:X.source}}};var Z,tt,ot;B.parameters={...B.parameters,docs:{...(Z=B.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  render: () => <>
      <div className="flex flex-wrap gap-4">
        <Button onClick={() => toast('Notification with close button')}>
          With Close Button
        </Button>
      </div>
      <Toaster closeButton={true} />
      
      <div className="h-8" />
      
      <div className="flex flex-wrap gap-4">
        <Button onClick={() => toast('Notification without close button')}>
          Without Close Button
        </Button>
      </div>
      <Toaster closeButton={false} />
    </>
}`,...(ot=(tt=B.parameters)==null?void 0:tt.docs)==null?void 0:ot.source}}};const It=["Default","Positions","CustomStyling","Durations","RichColors","WithActions","CustomContent","ExpandBehavior","CloseButtonOptions"];export{B as CloseButtonOptions,k as CustomContent,f as CustomStyling,p as Default,x as Durations,j as ExpandBehavior,h as Positions,g as RichColors,C as WithActions,It as __namedExportsOrder,Dt as default};
