import{j as t}from"./jsx-runtime-Cf8x2fCZ.js";import{r as i}from"./index-BlmOqGMO.js";import{c as Se,a as j,P as xe}from"./index-DWczGfFj.js";import{u as Te,a as Ae}from"./index-Csl6Qs-8.js";import{u as Oe,P as ke,D as Ie}from"./index-DVHVyCJ9.js";import{u as Le}from"./index-dzDNzLhD.js";import{c as ge,R as He,A as Me,a as Be,C as Fe}from"./index-DFoOm1AL.js";import{P as ve}from"./index-BSUbL-Ji.js";import{c as Y}from"./utils-DjqsqOe8.js";import{B as _}from"./button-Bs-Z7sty.js";import{I as ye}from"./info-1xTnDeXf.js";import"./index-yBjzXJbu.js";import"./index-DuqhnXMO.js";import"./index-fNjTmf9T.js";import"./index-BKWGwRVJ.js";import"./createLucideIcon-B24biV1q.js";var Ge="VisuallyHidden",Ce=i.forwardRef((e,r)=>t.jsx(ve.span,{...e,ref:r,style:{position:"absolute",border:0,width:1,height:1,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",wordWrap:"normal",...e.style}}));Ce.displayName=Ge;var We=Ce,[M,Et]=Se("Tooltip",[ge]),B=ge(),we="TooltipProvider",ze=700,G="tooltip.open",[Ve,z]=M(we),be=e=>{const{__scopeTooltip:r,delayDuration:o=ze,skipDelayDuration:n=300,disableHoverableContent:s=!1,children:l}=e,c=i.useRef(!0),f=i.useRef(!1),a=i.useRef(0);return i.useEffect(()=>{const u=a.current;return()=>window.clearTimeout(u)},[]),t.jsx(Ve,{scope:r,isOpenDelayedRef:c,delayDuration:o,onOpen:i.useCallback(()=>{window.clearTimeout(a.current),c.current=!1},[]),onClose:i.useCallback(()=>{window.clearTimeout(a.current),a.current=window.setTimeout(()=>c.current=!0,n)},[n]),isPointerInTransitRef:f,onPointerInTransitChange:i.useCallback(u=>{f.current=u},[]),disableHoverableContent:s,children:l})};be.displayName=we;var F="Tooltip",[qe,D]=M(F),je=e=>{const{__scopeTooltip:r,children:o,open:n,defaultOpen:s=!1,onOpenChange:l,disableHoverableContent:c,delayDuration:f}=e,a=z(F,e.__scopeTooltip),u=B(r),[p,m]=i.useState(null),x=Le(),d=i.useRef(0),h=c??a.disableHoverableContent,g=f??a.delayDuration,T=i.useRef(!1),[C=!1,v]=Oe({prop:n,defaultProp:s,onChange:U=>{U?(a.onOpen(),document.dispatchEvent(new CustomEvent(G))):a.onClose(),l==null||l(U)}}),E=i.useMemo(()=>C?T.current?"delayed-open":"instant-open":"closed",[C]),N=i.useCallback(()=>{window.clearTimeout(d.current),d.current=0,T.current=!1,v(!0)},[v]),R=i.useCallback(()=>{window.clearTimeout(d.current),d.current=0,v(!1)},[v]),$=i.useCallback(()=>{window.clearTimeout(d.current),d.current=window.setTimeout(()=>{T.current=!0,v(!0),d.current=0},g)},[g,v]);return i.useEffect(()=>()=>{d.current&&(window.clearTimeout(d.current),d.current=0)},[]),t.jsx(He,{...u,children:t.jsx(qe,{scope:r,contentId:x,open:C,stateAttribute:E,trigger:p,onTriggerChange:m,onTriggerEnter:i.useCallback(()=>{a.isOpenDelayedRef.current?$():N()},[a.isOpenDelayedRef,$,N]),onTriggerLeave:i.useCallback(()=>{h?R():(window.clearTimeout(d.current),d.current=0)},[R,h]),onOpen:N,onClose:R,disableHoverableContent:h,children:o})})};je.displayName=F;var W="TooltipTrigger",Pe=i.forwardRef((e,r)=>{const{__scopeTooltip:o,...n}=e,s=D(W,o),l=z(W,o),c=B(o),f=i.useRef(null),a=Te(r,f,s.onTriggerChange),u=i.useRef(!1),p=i.useRef(!1),m=i.useCallback(()=>u.current=!1,[]);return i.useEffect(()=>()=>document.removeEventListener("pointerup",m),[m]),t.jsx(Me,{asChild:!0,...c,children:t.jsx(ve.button,{"aria-describedby":s.open?s.contentId:void 0,"data-state":s.stateAttribute,...n,ref:a,onPointerMove:j(e.onPointerMove,x=>{x.pointerType!=="touch"&&!p.current&&!l.isPointerInTransitRef.current&&(s.onTriggerEnter(),p.current=!0)}),onPointerLeave:j(e.onPointerLeave,()=>{s.onTriggerLeave(),p.current=!1}),onPointerDown:j(e.onPointerDown,()=>{s.open&&s.onClose(),u.current=!0,document.addEventListener("pointerup",m,{once:!0})}),onFocus:j(e.onFocus,()=>{u.current||s.onOpen()}),onBlur:j(e.onBlur,s.onClose),onClick:j(e.onClick,s.onClose)})})});Pe.displayName=W;var V="TooltipPortal",[$e,Ue]=M(V,{forceMount:void 0}),Ee=e=>{const{__scopeTooltip:r,forceMount:o,children:n,container:s}=e,l=D(V,r);return t.jsx($e,{scope:r,forceMount:o,children:t.jsx(xe,{present:o||l.open,children:t.jsx(ke,{asChild:!0,container:s,children:n})})})};Ee.displayName=V;var P="TooltipContent",Ne=i.forwardRef((e,r)=>{const o=Ue(P,e.__scopeTooltip),{forceMount:n=o.forceMount,side:s="top",...l}=e,c=D(P,e.__scopeTooltip);return t.jsx(xe,{present:n||c.open,children:c.disableHoverableContent?t.jsx(Re,{side:s,...l,ref:r}):t.jsx(Ye,{side:s,...l,ref:r})})}),Ye=i.forwardRef((e,r)=>{const o=D(P,e.__scopeTooltip),n=z(P,e.__scopeTooltip),s=i.useRef(null),l=Te(r,s),[c,f]=i.useState(null),{trigger:a,onClose:u}=o,p=s.current,{onPointerInTransitChange:m}=n,x=i.useCallback(()=>{f(null),m(!1)},[m]),d=i.useCallback((h,g)=>{const T=h.currentTarget,C={x:h.clientX,y:h.clientY},v=Qe(C,T.getBoundingClientRect()),E=Ze(C,v),N=et(g.getBoundingClientRect()),R=ot([...E,...N]);f(R),m(!0)},[m]);return i.useEffect(()=>()=>x(),[x]),i.useEffect(()=>{if(a&&p){const h=T=>d(T,p),g=T=>d(T,a);return a.addEventListener("pointerleave",h),p.addEventListener("pointerleave",g),()=>{a.removeEventListener("pointerleave",h),p.removeEventListener("pointerleave",g)}}},[a,p,d,x]),i.useEffect(()=>{if(c){const h=g=>{const T=g.target,C={x:g.clientX,y:g.clientY},v=(a==null?void 0:a.contains(T))||(p==null?void 0:p.contains(T)),E=!tt(C,c);v?x():E&&(x(),u())};return document.addEventListener("pointermove",h),()=>document.removeEventListener("pointermove",h)}},[a,p,c,u,x]),t.jsx(Re,{...e,ref:l})}),[Xe,Ke]=M(F,{isInside:!1}),Je=Ae("TooltipContent"),Re=i.forwardRef((e,r)=>{const{__scopeTooltip:o,children:n,"aria-label":s,onEscapeKeyDown:l,onPointerDownOutside:c,...f}=e,a=D(P,o),u=B(o),{onClose:p}=a;return i.useEffect(()=>(document.addEventListener(G,p),()=>document.removeEventListener(G,p)),[p]),i.useEffect(()=>{if(a.trigger){const m=x=>{const d=x.target;d!=null&&d.contains(a.trigger)&&p()};return window.addEventListener("scroll",m,{capture:!0}),()=>window.removeEventListener("scroll",m,{capture:!0})}},[a.trigger,p]),t.jsx(Ie,{asChild:!0,disableOutsidePointerEvents:!1,onEscapeKeyDown:l,onPointerDownOutside:c,onFocusOutside:m=>m.preventDefault(),onDismiss:p,children:t.jsxs(Fe,{"data-state":a.stateAttribute,...u,...f,ref:r,style:{...f.style,"--radix-tooltip-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-tooltip-content-available-width":"var(--radix-popper-available-width)","--radix-tooltip-content-available-height":"var(--radix-popper-available-height)","--radix-tooltip-trigger-width":"var(--radix-popper-anchor-width)","--radix-tooltip-trigger-height":"var(--radix-popper-anchor-height)"},children:[t.jsx(Je,{children:n}),t.jsx(Xe,{scope:o,isInside:!0,children:t.jsx(We,{id:a.contentId,role:"tooltip",children:s||n})})]})})});Ne.displayName=P;var _e="TooltipArrow",De=i.forwardRef((e,r)=>{const{__scopeTooltip:o,...n}=e,s=B(o);return Ke(_e,o).isInside?null:t.jsx(Be,{...s,...n,ref:r})});De.displayName=_e;function Qe(e,r){const o=Math.abs(r.top-e.y),n=Math.abs(r.bottom-e.y),s=Math.abs(r.right-e.x),l=Math.abs(r.left-e.x);switch(Math.min(o,n,s,l)){case l:return"left";case s:return"right";case o:return"top";case n:return"bottom";default:throw new Error("unreachable")}}function Ze(e,r,o=5){const n=[];switch(r){case"top":n.push({x:e.x-o,y:e.y+o},{x:e.x+o,y:e.y+o});break;case"bottom":n.push({x:e.x-o,y:e.y-o},{x:e.x+o,y:e.y-o});break;case"left":n.push({x:e.x+o,y:e.y-o},{x:e.x+o,y:e.y+o});break;case"right":n.push({x:e.x-o,y:e.y-o},{x:e.x-o,y:e.y+o});break}return n}function et(e){const{top:r,right:o,bottom:n,left:s}=e;return[{x:s,y:r},{x:o,y:r},{x:o,y:n},{x:s,y:n}]}function tt(e,r){const{x:o,y:n}=e;let s=!1;for(let l=0,c=r.length-1;l<r.length;c=l++){const f=r[l].x,a=r[l].y,u=r[c].x,p=r[c].y;a>n!=p>n&&o<(u-f)*(n-a)/(p-a)+f&&(s=!s)}return s}function ot(e){const r=e.slice();return r.sort((o,n)=>o.x<n.x?-1:o.x>n.x?1:o.y<n.y?-1:o.y>n.y?1:0),rt(r)}function rt(e){if(e.length<=1)return e.slice();const r=[];for(let n=0;n<e.length;n++){const s=e[n];for(;r.length>=2;){const l=r[r.length-1],c=r[r.length-2];if((l.x-c.x)*(s.y-c.y)>=(l.y-c.y)*(s.x-c.x))r.pop();else break}r.push(s)}r.pop();const o=[];for(let n=e.length-1;n>=0;n--){const s=e[n];for(;o.length>=2;){const l=o[o.length-1],c=o[o.length-2];if((l.x-c.x)*(s.y-c.y)>=(l.y-c.y)*(s.x-c.x))o.pop();else break}o.push(s)}return o.pop(),r.length===1&&o.length===1&&r[0].x===o[0].x&&r[0].y===o[0].y?r:r.concat(o)}var nt=be,st=je,it=Pe,at=Ee,lt=Ne,ct=De;function q({delayDuration:e=0,...r}){return t.jsx(nt,{"data-slot":"tooltip-provider",delayDuration:e,...r})}function y({...e}){return t.jsx(q,{children:t.jsx(st,{"data-slot":"tooltip",...e})})}function w({...e}){return t.jsx(it,{"data-slot":"tooltip-trigger",...e})}function b({className:e,sideOffset:r=0,children:o,arrowClassName:n,arrowStyle:s,...l}){return t.jsx(at,{children:t.jsxs(lt,{"data-slot":"tooltip-content",sideOffset:r,className:Y("bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",e),...l,children:[o,t.jsx(ct,{className:Y("bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]",n),style:s})]})})}y.__docgenInfo={description:"",methods:[],displayName:"Tooltip"};w.__docgenInfo={description:"",methods:[],displayName:"TooltipTrigger"};b.__docgenInfo={description:"",methods:[],displayName:"TooltipContent",props:{arrowClassName:{required:!1,tsType:{name:"string"},description:""},arrowStyle:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:""},sideOffset:{defaultValue:{value:"0",computed:!1},required:!1}}};q.__docgenInfo={description:"",methods:[],displayName:"TooltipProvider",props:{delayDuration:{defaultValue:{value:"0",computed:!1},required:!1}}};const Nt={title:"UI/Tooltip",component:y,tags:["autodocs"],decorators:[e=>t.jsx("div",{className:"flex items-center justify-center py-8",children:e()})]},S={render:()=>t.jsxs(y,{children:[t.jsx(w,{children:t.jsx(_,{variant:"outline",size:"icon",children:t.jsx(ye,{className:"h-4 w-4"})})}),t.jsx(b,{children:t.jsx("p",{children:"Helpful information"})})]})},A={render:()=>t.jsxs(y,{children:[t.jsx(w,{className:"cursor-help text-sm text-primary underline",children:"Hover me"}),t.jsx(b,{children:t.jsx("p",{children:"Tooltip with text trigger"})})]})},O={render:()=>t.jsx(q,{delayDuration:800,children:t.jsxs(y,{children:[t.jsx(w,{children:t.jsx(_,{variant:"outline",children:"Delayed Tooltip"})}),t.jsx(b,{children:t.jsx("p",{children:"This tooltip has a custom delay"})})]})})},k={decorators:[e=>t.jsx("div",{className:"flex flex-wrap items-center justify-center gap-8 py-16",children:e()})],render:()=>t.jsx(t.Fragment,{children:["top","right","bottom","left"].map(e=>t.jsxs(y,{children:[t.jsx(w,{children:t.jsx(_,{variant:"outline",children:e})}),t.jsx(b,{side:e,children:t.jsxs("p",{children:["Tooltip on ",e]})})]},e))})},I={render:()=>t.jsxs(y,{children:[t.jsx(w,{children:t.jsx(_,{children:"With Arrow"})}),t.jsx(b,{children:t.jsx("p",{children:"This tooltip has an arrow pointing to the trigger"})})]})},L={render:()=>t.jsxs(y,{children:[t.jsx(w,{children:t.jsx(_,{variant:"outline",children:"Custom Style"})}),t.jsx(b,{className:"bg-accent text-accent-foreground",arrowClassName:"bg-accent",sideOffset:5,children:t.jsx("p",{children:"Tooltip with custom background"})})]})},H={decorators:[e=>t.jsx("div",{className:"space-y-2 w-64",children:e()})],render:()=>t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"flex items-center gap-2",children:[t.jsx("label",{htmlFor:"name",className:"text-sm font-medium text-foreground",children:"Name"}),t.jsxs(y,{children:[t.jsx(w,{asChild:!0,children:t.jsx(ye,{className:"h-4 w-4 text-muted-foreground cursor-pointer"})}),t.jsx(b,{children:t.jsx("p",{children:"Enter your full name"})})]})]}),t.jsx("input",{id:"name",type:"text",className:"w-full rounded-md border border-input bg-background px-3 py-2",placeholder:"Enter your name"})]})};var X,K,J;S.parameters={...S.parameters,docs:{...(X=S.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: () => <Tooltip>
      <TooltipTrigger>
        <Button variant="outline" size="icon">
          <Info className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Helpful information</p>
      </TooltipContent>
    </Tooltip>
}`,...(J=(K=S.parameters)==null?void 0:K.docs)==null?void 0:J.source}}};var Q,Z,ee;A.parameters={...A.parameters,docs:{...(Q=A.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: () => <Tooltip>
      <TooltipTrigger className="cursor-help text-sm text-primary underline">
        Hover me
      </TooltipTrigger>
      <TooltipContent>
        <p>Tooltip with text trigger</p>
      </TooltipContent>
    </Tooltip>
}`,...(ee=(Z=A.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var te,oe,re;O.parameters={...O.parameters,docs:{...(te=O.parameters)==null?void 0:te.docs,source:{originalSource:`{
  render: () => <TooltipProvider delayDuration={800}>
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline">Delayed Tooltip</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>This tooltip has a custom delay</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
}`,...(re=(oe=O.parameters)==null?void 0:oe.docs)==null?void 0:re.source}}};var ne,se,ie;k.parameters={...k.parameters,docs:{...(ne=k.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  decorators: [story => <div className="flex flex-wrap items-center justify-center gap-8 py-16">
      {story()}
    </div>],
  render: () => <>
      {["top", "right", "bottom", "left"].map(side => <Tooltip key={side}>
          <TooltipTrigger>
            <Button variant="outline">{side}</Button>
          </TooltipTrigger>
          <TooltipContent side={side as any}>
            <p>Tooltip on {side}</p>
          </TooltipContent>
        </Tooltip>)}
    </>
}`,...(ie=(se=k.parameters)==null?void 0:se.docs)==null?void 0:ie.source}}};var ae,le,ce;I.parameters={...I.parameters,docs:{...(ae=I.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  render: () => <Tooltip>
      <TooltipTrigger>
        <Button>With Arrow</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This tooltip has an arrow pointing to the trigger</p>
      </TooltipContent>
    </Tooltip>
}`,...(ce=(le=I.parameters)==null?void 0:le.docs)==null?void 0:ce.source}}};var pe,de,ue;L.parameters={...L.parameters,docs:{...(pe=L.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  render: () => <Tooltip>
      <TooltipTrigger>
        <Button variant="outline">Custom Style</Button>
      </TooltipTrigger>
      <TooltipContent className="bg-accent text-accent-foreground" arrowClassName="bg-accent" sideOffset={5}>
        <p>Tooltip with custom background</p>
      </TooltipContent>
    </Tooltip>
}`,...(ue=(de=L.parameters)==null?void 0:de.docs)==null?void 0:ue.source}}};var me,fe,he;H.parameters={...H.parameters,docs:{...(me=H.parameters)==null?void 0:me.docs,source:{originalSource:`{
  decorators: [story => <div className="space-y-2 w-64">
      {story()}
    </div>],
  render: () => <>
      <div className="flex items-center gap-2">
        <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Enter your full name</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <input id="name" type="text" className="w-full rounded-md border border-input bg-background px-3 py-2" placeholder="Enter your name" />
    </>
}`,...(he=(fe=H.parameters)==null?void 0:fe.docs)==null?void 0:he.source}}};const Rt=["Default","TextTrigger","CustomDelay","Positions","WithArrow","CustomStyling","WithinFormControls"];export{O as CustomDelay,L as CustomStyling,S as Default,k as Positions,A as TextTrigger,I as WithArrow,H as WithinFormControls,Rt as __namedExportsOrder,Nt as default};
