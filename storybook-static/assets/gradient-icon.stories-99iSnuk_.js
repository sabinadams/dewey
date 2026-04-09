import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{r as h}from"./index-BlmOqGMO.js";import{c as ee}from"./utils-DjqsqOe8.js";import{c as a}from"./createLucideIcon-B24biV1q.js";import{M as F,S as b}from"./sun-CSS2SQsI.js";import"./index-yBjzXJbu.js";/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const re=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]],U=a("activity",re);/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ne=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}]],J=a("circle-dot",ne);/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oe=[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]],o=a("heart",oe);/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ae=[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",key:"4pj2yx"}],["path",{d:"M20 3v4",key:"1olli1"}],["path",{d:"M22 5h-4",key:"1gvqau"}],["path",{d:"M4 17v2",key:"vumght"}],["path",{d:"M5 18H3",key:"zchphs"}]],f=a("sparkles",ae);/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ie=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]],n=a("star",ie);/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const se=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],K=a("zap",se),r=h.forwardRef(({icon:Q,size:z=24,className:W,gradient:x={from:"rgb(168, 85, 247)",to:"rgb(20, 184, 166)"}},X)=>{const i=h.useId();return e.jsx("div",{className:ee("inline-block",W),children:e.jsxs("svg",{width:z,height:z,viewBox:"0 0 24 24",ref:X,children:[e.jsxs("defs",{children:[e.jsxs("linearGradient",{id:`gradient-${i}`,x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[e.jsx("stop",{offset:"0%",stopColor:x.from}),e.jsx("stop",{offset:"100%",stopColor:x.to})]}),e.jsx("mask",{id:`mask-${i}`,children:e.jsx(Q,{size:24,className:"text-white"})})]}),e.jsx("rect",{width:"24",height:"24",fill:`url(#gradient-${i})`,mask:`url(#mask-${i})`})]})})});r.displayName="GradientIcon";r.__docgenInfo={description:`GradientIcon applies a gradient to any Lucide icon using SVG masking.
This ensures the gradient is applied consistently across all parts of the icon.`,methods:[],displayName:"GradientIcon",props:{icon:{required:!0,tsType:{name:"LucideIcon"},description:"The Lucide icon component to render"},size:{required:!1,tsType:{name:"number"},description:"Size in pixels (both width and height). Defaults to 24.",defaultValue:{value:"24",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Optional className to apply to the container"},gradient:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  from: string
  to: string
}`,signature:{properties:[{key:"from",value:{name:"string",required:!0}},{key:"to",value:{name:"string",required:!0}}]}},description:"Optional gradient configuration. Can be customized later if needed",defaultValue:{value:`{
  from: "rgb(168, 85, 247)",  // purple-500
  to: "rgb(20, 184, 166)",    // teal-500
}`,computed:!1}}}};const pe={title:"UI/GradientIcon",component:r,tags:["autodocs"],argTypes:{icon:{control:"select",options:["Sparkles","Heart","Star","Sun","Moon","CircleDot","Activity","Zap"],mapping:{Sparkles:f,Heart:o,Star:n,Sun:b,Moon:F,CircleDot:J,Activity:U,Zap:K}},size:{control:{type:"range",min:16,max:96,step:4}},gradient:{control:"object"}}},s={args:{icon:f,size:24}},t={args:{icon:n,size:48}},c={args:{icon:o,size:32,gradient:{from:"rgb(34, 197, 94)",to:"rgb(139, 92, 246)"}}},d={args:{icon:b,size:32,gradient:{from:"rgb(234, 179, 8)",to:"rgb(239, 68, 68)"}}},g={decorators:[()=>e.jsxs("div",{className:"grid grid-cols-3 gap-4",children:[e.jsx(r,{icon:f,size:32}),e.jsx(r,{icon:o,size:32}),e.jsx(r,{icon:n,size:32}),e.jsx(r,{icon:b,size:32}),e.jsx(r,{icon:F,size:32}),e.jsx(r,{icon:J,size:32}),e.jsx(r,{icon:U,size:32}),e.jsx(r,{icon:K,size:32})]})]},l={decorators:[()=>e.jsxs("div",{className:"flex items-end gap-4",children:[e.jsx(r,{icon:n,size:16}),e.jsx(r,{icon:n,size:24}),e.jsx(r,{icon:n,size:32}),e.jsx(r,{icon:n,size:48}),e.jsx(r,{icon:n,size:64})]})]},m={decorators:[()=>e.jsxs("div",{className:"flex gap-4",children:[e.jsx(r,{icon:o,size:32,gradient:{from:"rgb(192, 132, 252)",to:"rgb(251, 113, 133)"}}),e.jsx(r,{icon:o,size:32,gradient:{from:"rgb(52, 211, 153)",to:"rgb(96, 165, 250)"}}),e.jsx(r,{icon:o,size:32,gradient:{from:"rgb(251, 191, 36)",to:"rgb(251, 146, 60)"}}),e.jsx(r,{icon:o,size:32,gradient:{from:"rgb(129, 140, 248)",to:"rgb(232, 121, 249)"}})]})]},p={decorators:[()=>e.jsxs("div",{className:"flex gap-4",children:[e.jsx(r,{icon:n,size:32,gradient:{from:"rgb(45, 212, 191)",to:"rgb(56, 189, 248)"}}),e.jsx(r,{icon:n,size:32,gradient:{from:"rgb(163, 230, 53)",to:"rgb(74, 222, 128)"}}),e.jsx(r,{icon:n,size:32,gradient:{from:"rgb(250, 204, 21)",to:"rgb(248, 113, 113)"}}),e.jsx(r,{icon:n,size:32,gradient:{from:"rgb(96, 165, 250)",to:"rgb(167, 139, 250)"}})]})]},u={decorators:[()=>e.jsxs("div",{className:"flex gap-4",children:[e.jsx(r,{icon:n,size:32,gradient:{from:"rgb(153, 246, 228)",to:"rgb(191, 219, 254)"}}),e.jsx(r,{icon:n,size:32,gradient:{from:"rgb(217, 249, 157)",to:"rgb(187, 247, 208)"}}),e.jsx(r,{icon:n,size:32,gradient:{from:"rgb(254, 240, 138)",to:"rgb(254, 215, 170)"}}),e.jsx(r,{icon:n,size:32,gradient:{from:"rgb(254, 205, 211)",to:"rgb(251, 207, 232)"}})]})]};var G,j,y;s.parameters={...s.parameters,docs:{...(G=s.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    icon: Sparkles,
    size: 24
  }
}`,...(y=(j=s.parameters)==null?void 0:j.docs)==null?void 0:y.source}}};var S,I,v;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    icon: Star,
    size: 48
  }
}`,...(v=(I=t.parameters)==null?void 0:I.docs)==null?void 0:v.source}}};var k,N,_;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    icon: Heart,
    size: 32,
    gradient: {
      from: "rgb(34, 197, 94)",
      // green-500
      to: "rgb(139, 92, 246)" // violet-500
    }
  }
}`,...(_=(N=c.parameters)==null?void 0:N.docs)==null?void 0:_.source}}};var w,L,M;d.parameters={...d.parameters,docs:{...(w=d.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    icon: Sun,
    size: 32,
    gradient: {
      from: "rgb(234, 179, 8)",
      // yellow-500
      to: "rgb(239, 68, 68)" // red-500
    }
  }
}`,...(M=(L=d.parameters)==null?void 0:L.docs)==null?void 0:M.source}}};var A,C,T;g.parameters={...g.parameters,docs:{...(A=g.parameters)==null?void 0:A.docs,source:{originalSource:`{
  decorators: [() => <div className="grid grid-cols-3 gap-4">
        <GradientIcon icon={Sparkles} size={32} />
        <GradientIcon icon={Heart} size={32} />
        <GradientIcon icon={Star} size={32} />
        <GradientIcon icon={Sun} size={32} />
        <GradientIcon icon={Moon} size={32} />
        <GradientIcon icon={CircleDot} size={32} />
        <GradientIcon icon={Activity} size={32} />
        <GradientIcon icon={Zap} size={32} />
      </div>]
}`,...(T=(C=g.parameters)==null?void 0:C.docs)==null?void 0:T.source}}};var H,$,q;l.parameters={...l.parameters,docs:{...(H=l.parameters)==null?void 0:H.docs,source:{originalSource:`{
  decorators: [() => <div className="flex items-end gap-4">
        <GradientIcon icon={Star} size={16} />
        <GradientIcon icon={Star} size={24} />
        <GradientIcon icon={Star} size={32} />
        <GradientIcon icon={Star} size={48} />
        <GradientIcon icon={Star} size={64} />
      </div>]
}`,...(q=($=l.parameters)==null?void 0:$.docs)==null?void 0:q.source}}};var V,D,O;m.parameters={...m.parameters,docs:{...(V=m.parameters)==null?void 0:V.docs,source:{originalSource:`{
  decorators: [() => <div className="flex gap-4">
        {/* Purple to Rose */}
        <GradientIcon icon={Heart} size={32} gradient={{
      from: "rgb(192, 132, 252)",
      // purple-400
      to: "rgb(251, 113, 133)" // rose-400
    }} />
        {/* Emerald to Blue */}
        <GradientIcon icon={Heart} size={32} gradient={{
      from: "rgb(52, 211, 153)",
      // emerald-400
      to: "rgb(96, 165, 250)" // blue-400
    }} />
        {/* Amber to Orange */}
        <GradientIcon icon={Heart} size={32} gradient={{
      from: "rgb(251, 191, 36)",
      // amber-400
      to: "rgb(251, 146, 60)" // orange-400
    }} />
        {/* Indigo to Fuchsia */}
        <GradientIcon icon={Heart} size={32} gradient={{
      from: "rgb(129, 140, 248)",
      // indigo-400
      to: "rgb(232, 121, 249)" // fuchsia-400
    }} />
      </div>]
}`,...(O=(D=m.parameters)==null?void 0:D.docs)==null?void 0:O.source}}};var R,B,E;p.parameters={...p.parameters,docs:{...(R=p.parameters)==null?void 0:R.docs,source:{originalSource:`{
  decorators: [() => <div className="flex gap-4">
        {/* Teal to Sky */}
        <GradientIcon icon={Star} size={32} gradient={{
      from: "rgb(45, 212, 191)",
      // teal-400
      to: "rgb(56, 189, 248)" // sky-400
    }} />
        {/* Lime to Green */}
        <GradientIcon icon={Star} size={32} gradient={{
      from: "rgb(163, 230, 53)",
      // lime-400
      to: "rgb(74, 222, 128)" // green-400
    }} />
        {/* Yellow to Red */}
        <GradientIcon icon={Star} size={32} gradient={{
      from: "rgb(250, 204, 21)",
      // yellow-400
      to: "rgb(248, 113, 113)" // red-400
    }} />
        {/* Blue to Violet */}
        <GradientIcon icon={Star} size={32} gradient={{
      from: "rgb(96, 165, 250)",
      // blue-400
      to: "rgb(167, 139, 250)" // violet-400
    }} />
      </div>]
}`,...(E=(B=p.parameters)==null?void 0:B.docs)==null?void 0:E.source}}};var P,Z,Y;u.parameters={...u.parameters,docs:{...(P=u.parameters)==null?void 0:P.docs,source:{originalSource:`{
  decorators: [() => <div className="flex gap-4">
        {/* Teal to Blue */}
        <GradientIcon icon={Star} size={32} gradient={{
      from: "rgb(153, 246, 228)",
      // teal-200
      to: "rgb(191, 219, 254)" // blue-200
    }} />
        {/* Lime to Green */}
        <GradientIcon icon={Star} size={32} gradient={{
      from: "rgb(217, 249, 157)",
      // lime-200
      to: "rgb(187, 247, 208)" // green-200
    }} />
        {/* Yellow to Orange */}
        <GradientIcon icon={Star} size={32} gradient={{
      from: "rgb(254, 240, 138)",
      // yellow-200
      to: "rgb(254, 215, 170)" // orange-200
    }} />
        {/* Rose to Pink */}
        <GradientIcon icon={Star} size={32} gradient={{
      from: "rgb(254, 205, 211)",
      // rose-200
      to: "rgb(251, 207, 232)" // pink-200
    }} />
      </div>]
}`,...(Y=(Z=u.parameters)==null?void 0:Z.docs)==null?void 0:Y.source}}};const ue=["Default","Large","CustomGradient","TwoColorGradient","IconGrid","SizeComparison","GradientVariations","VibrantGradients","PastelGradients"];export{c as CustomGradient,s as Default,m as GradientVariations,g as IconGrid,t as Large,u as PastelGradients,l as SizeComparison,d as TwoColorGradient,p as VibrantGradients,ue as __namedExportsOrder,pe as default};
