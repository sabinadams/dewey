import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{r as x}from"./index-BlmOqGMO.js";import{c as ge,a as A,P as fe}from"./index-DWczGfFj.js";import{c as le,R as Te,I as ve}from"./index-DLM5GktJ.js";import{P as I}from"./index-BHJ41s0U.js";import{u as Ne}from"./index-xprPBo3d.js";import{u as je}from"./index-B-HcCuTi.js";import{u as ye}from"./index-dzDNzLhD.js";import{c as F}from"./utils-DjqsqOe8.js";import{B as g}from"./button-Bs-Z7sty.js";import{I as v}from"./input-Dyu3lkQR.js";import{c as V}from"./createLucideIcon-B24biV1q.js";import{S as we}from"./settings-CdOiD7hY.js";import{F as E}from"./file-BwkqsE_k.js";import"./index-yBjzXJbu.js";import"./index-Csl6Qs-8.js";import"./index-DuqhnXMO.js";import"./index-fNjTmf9T.js";/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ce=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],Se=V("circle-help",Ce);/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ke=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M9 21V9",key:"1oto5p"}]],De=V("panels-top-left",ke);/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ie=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]],Fe=V("users",Ie);var _="Tabs",[_e,aa]=ge(_,[le]),oe=le(),[Ae,P]=_e(_),de=x.forwardRef((a,t)=>{const{__scopeTabs:m,value:r,onValueChange:d,defaultValue:u,orientation:l="horizontal",dir:p,activationMode:f="automatic",...T}=a,i=Ne(p),[o,h]=je({prop:r,onChange:d,defaultProp:u??"",caller:_});return e.jsx(Ae,{scope:m,baseId:ye(),value:o,onValueChange:h,orientation:l,dir:i,activationMode:f,children:e.jsx(I.div,{dir:i,"data-orientation":l,...T,ref:t})})});de.displayName=_;var ie="TabsList",ce=x.forwardRef((a,t)=>{const{__scopeTabs:m,loop:r=!0,...d}=a,u=P(ie,m),l=oe(m);return e.jsx(Te,{asChild:!0,...l,orientation:u.orientation,dir:u.dir,loop:r,children:e.jsx(I.div,{role:"tablist","aria-orientation":u.orientation,...d,ref:t})})});ce.displayName=ie;var me="TabsTrigger",ue=x.forwardRef((a,t)=>{const{__scopeTabs:m,value:r,disabled:d=!1,...u}=a,l=P(me,m),p=oe(m),f=xe(l.baseId,r),T=he(l.baseId,r),i=r===l.value;return e.jsx(ve,{asChild:!0,...p,focusable:!d,active:i,children:e.jsx(I.button,{type:"button",role:"tab","aria-selected":i,"aria-controls":T,"data-state":i?"active":"inactive","data-disabled":d?"":void 0,disabled:d,id:f,...u,ref:t,onMouseDown:A(a.onMouseDown,o=>{!d&&o.button===0&&o.ctrlKey===!1?l.onValueChange(r):o.preventDefault()}),onKeyDown:A(a.onKeyDown,o=>{[" ","Enter"].includes(o.key)&&l.onValueChange(r)}),onFocus:A(a.onFocus,()=>{const o=l.activationMode!=="manual";!i&&!d&&o&&l.onValueChange(r)})})})});ue.displayName=me;var be="TabsContent",pe=x.forwardRef((a,t)=>{const{__scopeTabs:m,value:r,forceMount:d,children:u,...l}=a,p=P(be,m),f=xe(p.baseId,r),T=he(p.baseId,r),i=r===p.value,o=x.useRef(i);return x.useEffect(()=>{const h=requestAnimationFrame(()=>o.current=!1);return()=>cancelAnimationFrame(h)},[]),e.jsx(fe,{present:d||i,children:({present:h})=>e.jsx(I.div,{"data-state":i?"active":"inactive","data-orientation":p.orientation,role:"tabpanel","aria-labelledby":f,hidden:!h,id:T,tabIndex:0,...l,ref:t,style:{...a.style,animationDuration:o.current?"0s":void 0},children:h&&u})})});pe.displayName=be;function xe(a,t){return`${a}-trigger-${t}`}function he(a,t){return`${a}-content-${t}`}var Ee=de,Ve=ce,Pe=ue,Le=pe;function c({className:a,...t}){return e.jsx(Ee,{"data-slot":"tabs",className:F("flex flex-col gap-2",a),...t})}function b({className:a,...t}){return e.jsx(Ve,{"data-slot":"tabs-list",className:F("bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",a),...t})}function s({className:a,...t}){return e.jsx(Pe,{"data-slot":"tabs-trigger",className:F("data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",a),...t})}function n({className:a,...t}){return e.jsx(Le,{"data-slot":"tabs-content",className:F("flex-1 outline-none",a),...t})}c.__docgenInfo={description:"",methods:[],displayName:"Tabs"};b.__docgenInfo={description:"",methods:[],displayName:"TabsList"};s.__docgenInfo={description:"",methods:[],displayName:"TabsTrigger"};n.__docgenInfo={description:"",methods:[],displayName:"TabsContent"};const ta={title:"UI/Tabs",component:c,tags:["autodocs"],argTypes:{className:{description:"Additional CSS class names",type:"string"},defaultValue:{description:"The default selected tab value",type:"string"},value:{description:"The controlled tab value (when using controlled mode)",type:"string"},onValueChange:{description:"Callback that fires when the tab selection changes",action:"valueChanged"}}},N={render:()=>e.jsxs(c,{defaultValue:"account",className:"w-full max-w-3xl",children:[e.jsxs(b,{children:[e.jsx(s,{value:"account",children:"Account"}),e.jsx(s,{value:"password",children:"Password"}),e.jsx(s,{value:"settings",children:"Settings"})]}),e.jsxs(n,{value:"account",className:"p-4 border rounded-md mt-2",children:[e.jsx("h3",{className:"text-lg font-medium mb-2",children:"Account Settings"}),e.jsx("p",{className:"text-sm text-muted-foreground mb-4",children:"Manage your account information and preferences."}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{htmlFor:"name",className:"text-sm font-medium",children:"Name"}),e.jsx(v,{id:"name",placeholder:"Your name"})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{htmlFor:"email",className:"text-sm font-medium",children:"Email"}),e.jsx(v,{id:"email",type:"email",placeholder:"Your email"})]}),e.jsx(g,{children:"Save Changes"})]})]}),e.jsxs(n,{value:"password",className:"p-4 border rounded-md mt-2",children:[e.jsx("h3",{className:"text-lg font-medium mb-2",children:"Password Settings"}),e.jsx("p",{className:"text-sm text-muted-foreground mb-4",children:"Update your password to keep your account secure."}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{htmlFor:"current",className:"text-sm font-medium",children:"Current Password"}),e.jsx(v,{id:"current",type:"password"})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{htmlFor:"new",className:"text-sm font-medium",children:"New Password"}),e.jsx(v,{id:"new",type:"password"})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{htmlFor:"confirm",className:"text-sm font-medium",children:"Confirm Password"}),e.jsx(v,{id:"confirm",type:"password"})]}),e.jsx(g,{children:"Update Password"})]})]}),e.jsxs(n,{value:"settings",className:"p-4 border rounded-md mt-2",children:[e.jsx("h3",{className:"text-lg font-medium mb-2",children:"General Settings"}),e.jsx("p",{className:"text-sm text-muted-foreground mb-4",children:"Configure your application preferences."}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"font-medium",children:"Email Notifications"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Receive email notifications"})]}),e.jsx("div",{className:"h-6 w-11 rounded-full bg-muted relative cursor-pointer",role:"switch","aria-checked":"true",children:e.jsx("div",{className:"absolute h-5 w-5 rounded-full bg-foreground transform translate-x-5 translate-y-[2px]"})})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"font-medium",children:"Dark Mode"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Enable dark mode"})]}),e.jsx("div",{className:"h-6 w-11 rounded-full bg-primary relative cursor-pointer",role:"switch","aria-checked":"true",children:e.jsx("div",{className:"absolute h-5 w-5 rounded-full bg-white transform translate-x-5 translate-y-[2px]"})})]}),e.jsx(g,{className:"mt-2",children:"Save Preferences"})]})]})]})},j={render:()=>e.jsxs(c,{defaultValue:"users",className:"w-full max-w-3xl",children:[e.jsxs(b,{className:"w-full",children:[e.jsxs(s,{value:"users",children:[e.jsx(Fe,{className:"h-4 w-4 mr-2"}),"Users"]}),e.jsxs(s,{value:"settings",children:[e.jsx(we,{className:"h-4 w-4 mr-2"}),"Settings"]}),e.jsxs(s,{value:"content",children:[e.jsx(De,{className:"h-4 w-4 mr-2"}),"Content"]}),e.jsxs(s,{value:"help",children:[e.jsx(Se,{className:"h-4 w-4 mr-2"}),"Help"]})]}),["users","settings","content","help"].map(a=>e.jsxs(n,{value:a,className:"p-4 border rounded-md mt-2",children:[e.jsx("h3",{className:"text-lg font-medium capitalize mb-2",children:a}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:["This is the ",a," tab content. You can put any content here."]})]},a))]})},y={render:()=>e.jsx("div",{className:"flex gap-4 w-full max-w-3xl",children:e.jsxs(c,{defaultValue:"tab1",orientation:"vertical",className:"w-full",children:[e.jsxs(b,{className:"flex-col h-auto w-48",children:[e.jsx(s,{value:"tab1",className:"justify-start",children:"Tab 1"}),e.jsx(s,{value:"tab2",className:"justify-start",children:"Tab 2"}),e.jsx(s,{value:"tab3",className:"justify-start",children:"Tab 3"})]}),e.jsxs("div",{className:"flex-1",children:[e.jsxs(n,{value:"tab1",className:"p-4 border rounded-md",children:[e.jsx("h3",{className:"text-lg font-medium mb-2",children:"Tab 1 Content"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"This is the content for tab 1. The tabs are displayed vertically."})]}),e.jsxs(n,{value:"tab2",className:"p-4 border rounded-md",children:[e.jsx("h3",{className:"text-lg font-medium mb-2",children:"Tab 2 Content"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"This is the content for tab 2. The tabs are displayed vertically."})]}),e.jsxs(n,{value:"tab3",className:"p-4 border rounded-md",children:[e.jsx("h3",{className:"text-lg font-medium mb-2",children:"Tab 3 Content"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"This is the content for tab 3. The tabs are displayed vertically."})]})]})]})})},w={render:()=>e.jsxs(c,{defaultValue:"file1",className:"w-full max-w-3xl",children:[e.jsxs(b,{className:"w-full",children:[e.jsxs(s,{value:"file1",children:[e.jsx(E,{className:"h-4 w-4 mr-2"}),"index.tsx"]}),e.jsxs(s,{value:"file2",children:[e.jsx(E,{className:"h-4 w-4 mr-2"}),"styles.css"]}),e.jsxs(s,{value:"file3",children:[e.jsx(E,{className:"h-4 w-4 mr-2"}),"utils.ts"]})]}),e.jsx(n,{value:"file1",className:"p-4 bg-muted rounded-md mt-2 font-mono text-sm",children:e.jsx("pre",{children:`
import React from 'react';
import styles from './styles.css';
import { formatDate } from './utils';

function App() {
  return (
    <div className="app">
      <h1>Hello World</h1>
      <p>Today is {formatDate(new Date())}</p>
    </div>
  );
}

export default App;
        `.trim()})}),e.jsx(n,{value:"file2",className:"p-4 bg-muted rounded-md mt-2 font-mono text-sm",children:e.jsx("pre",{children:`
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #333;
  font-size: 2rem;
}

p {
  color: #666;
}
        `.trim()})}),e.jsx(n,{value:"file3",className:"p-4 bg-muted rounded-md mt-2 font-mono text-sm",children:e.jsx("pre",{children:`
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}
        `.trim()})})]})},C={render:()=>{const[a,t]=x.useState("tab1");return e.jsxs("div",{className:"space-y-4 w-full max-w-3xl",children:[e.jsxs("div",{className:"flex gap-2",children:[e.jsx(g,{variant:"outline",onClick:()=>t("tab1"),className:a==="tab1"?"bg-secondary":"",children:"Set Tab 1"}),e.jsx(g,{variant:"outline",onClick:()=>t("tab2"),className:a==="tab2"?"bg-secondary":"",children:"Set Tab 2"}),e.jsx(g,{variant:"outline",onClick:()=>t("tab3"),className:a==="tab3"?"bg-secondary":"",children:"Set Tab 3"})]}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:["Current active tab: ",e.jsx("span",{className:"font-medium",children:a})]}),e.jsxs(c,{value:a,onValueChange:t,children:[e.jsxs(b,{children:[e.jsx(s,{value:"tab1",children:"Tab 1"}),e.jsx(s,{value:"tab2",children:"Tab 2"}),e.jsx(s,{value:"tab3",children:"Tab 3"})]}),e.jsxs(n,{value:"tab1",className:"p-4 border rounded-md mt-2",children:[e.jsx("h3",{className:"text-lg font-medium",children:"Controlled Tab 1"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"This tab's state is controlled programmatically."})]}),e.jsxs(n,{value:"tab2",className:"p-4 border rounded-md mt-2",children:[e.jsx("h3",{className:"text-lg font-medium",children:"Controlled Tab 2"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"You can change tabs using the buttons above."})]}),e.jsxs(n,{value:"tab3",className:"p-4 border rounded-md mt-2",children:[e.jsx("h3",{className:"text-lg font-medium",children:"Controlled Tab 3"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"This demonstrates controlled tabs with external state."})]})]})]})}},S={render:()=>e.jsxs(c,{defaultValue:"tab1",className:"w-full max-w-3xl",children:[e.jsxs(b,{className:"bg-background border border-input p-1",children:[e.jsx(s,{value:"tab1",className:"data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-sm",children:"Custom Tab 1"}),e.jsx(s,{value:"tab2",className:"data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-sm",children:"Custom Tab 2"}),e.jsx(s,{value:"tab3",className:"data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-sm",children:"Custom Tab 3"})]}),["tab1","tab2","tab3"].map((a,t)=>e.jsxs(n,{value:a,className:"p-4 bg-accent/20 border border-accent rounded-md mt-2",children:[e.jsxs("h3",{className:"text-lg font-medium",children:["Custom Styled Tab ",t+1]}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"This demonstrates custom styling for tabs and content."})]},a))]})},k={render:()=>e.jsxs(c,{defaultValue:"tab1",className:"w-full max-w-3xl",children:[e.jsxs(b,{children:[e.jsx(s,{value:"tab1",children:"Enabled"}),e.jsx(s,{value:"tab2",children:"Enabled"}),e.jsx(s,{value:"tab3",disabled:!0,children:"Disabled"}),e.jsx(s,{value:"tab4",disabled:!0,children:"Disabled"})]}),e.jsxs(n,{value:"tab1",className:"p-4 border rounded-md mt-2",children:[e.jsx("h3",{className:"text-lg font-medium",children:"Enabled Tab Content"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"This is an enabled tab. Note that some tabs are disabled and cannot be selected."})]}),e.jsxs(n,{value:"tab2",className:"p-4 border rounded-md mt-2",children:[e.jsx("h3",{className:"text-lg font-medium",children:"Another Enabled Tab"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"This is another enabled tab. The disabled tabs will not show their content."})]}),e.jsxs(n,{value:"tab3",className:"p-4 border rounded-md mt-2",children:[e.jsx("h3",{className:"text-lg font-medium",children:"Disabled Tab Content"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"This content will not be displayed since its tab is disabled."})]}),e.jsxs(n,{value:"tab4",className:"p-4 border rounded-md mt-2",children:[e.jsx("h3",{className:"text-lg font-medium",children:"Another Disabled Tab"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"This content will not be displayed since its tab is disabled."})]})]})},D={render:()=>{const a=[{id:"tab1",label:"First Tab",content:"Content for the first tab"},{id:"tab2",label:"Second Tab",content:"Content for the second tab"},{id:"tab3",label:"Third Tab",content:"Content for the third tab"},{id:"tab4",label:"Fourth Tab",content:"Content for the fourth tab"}];return e.jsxs(c,{defaultValue:"tab1",className:"w-full max-w-3xl",children:[e.jsx(b,{children:a.map(t=>e.jsx(s,{value:t.id,children:t.label},t.id))}),a.map(t=>e.jsxs(n,{value:t.id,className:"p-4 border rounded-md mt-2",children:[e.jsx("h3",{className:"text-lg font-medium",children:t.label}),e.jsx("p",{className:"text-sm text-muted-foreground",children:t.content}),e.jsx("p",{className:"text-sm text-muted-foreground mt-2",children:"This example demonstrates dynamically generating tabs from an array of data."})]},t.id))]})}};var L,M,R;N.parameters={...N.parameters,docs:{...(L=N.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => <Tabs defaultValue="account" className="w-full max-w-3xl">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="p-4 border rounded-md mt-2">
        <h3 className="text-lg font-medium mb-2">Account Settings</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Manage your account information and preferences.
        </p>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">Name</label>
            <Input id="name" placeholder="Your name" />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <Input id="email" type="email" placeholder="Your email" />
          </div>
          <Button>Save Changes</Button>
        </div>
      </TabsContent>
      <TabsContent value="password" className="p-4 border rounded-md mt-2">
        <h3 className="text-lg font-medium mb-2">Password Settings</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Update your password to keep your account secure.
        </p>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="current" className="text-sm font-medium">Current Password</label>
            <Input id="current" type="password" />
          </div>
          <div className="space-y-2">
            <label htmlFor="new" className="text-sm font-medium">New Password</label>
            <Input id="new" type="password" />
          </div>
          <div className="space-y-2">
            <label htmlFor="confirm" className="text-sm font-medium">Confirm Password</label>
            <Input id="confirm" type="password" />
          </div>
          <Button>Update Password</Button>
        </div>
      </TabsContent>
      <TabsContent value="settings" className="p-4 border rounded-md mt-2">
        <h3 className="text-lg font-medium mb-2">General Settings</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Configure your application preferences.
        </p>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive email notifications</p>
            </div>
            <div className="h-6 w-11 rounded-full bg-muted relative cursor-pointer" role="switch" aria-checked="true">
              <div className="absolute h-5 w-5 rounded-full bg-foreground transform translate-x-5 translate-y-[2px]"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Dark Mode</p>
              <p className="text-sm text-muted-foreground">Enable dark mode</p>
            </div>
            <div className="h-6 w-11 rounded-full bg-primary relative cursor-pointer" role="switch" aria-checked="true">
              <div className="absolute h-5 w-5 rounded-full bg-white transform translate-x-5 translate-y-[2px]"></div>
            </div>
          </div>
          <Button className="mt-2">Save Preferences</Button>
        </div>
      </TabsContent>
    </Tabs>
}`,...(R=(M=N.parameters)==null?void 0:M.docs)==null?void 0:R.source}}};var B,U,$;j.parameters={...j.parameters,docs:{...(B=j.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => <Tabs defaultValue="users" className="w-full max-w-3xl">
      <TabsList className="w-full">
        <TabsTrigger value="users">
          <Users className="h-4 w-4 mr-2" />
          Users
        </TabsTrigger>
        <TabsTrigger value="settings">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </TabsTrigger>
        <TabsTrigger value="content">
          <Layout className="h-4 w-4 mr-2" />
          Content
        </TabsTrigger>
        <TabsTrigger value="help">
          <CircleHelp className="h-4 w-4 mr-2" />
          Help
        </TabsTrigger>
      </TabsList>
      {["users", "settings", "content", "help"].map(tab => <TabsContent key={tab} value={tab} className="p-4 border rounded-md mt-2">
          <h3 className="text-lg font-medium capitalize mb-2">{tab}</h3>
          <p className="text-sm text-muted-foreground">
            This is the {tab} tab content. You can put any content here.
          </p>
        </TabsContent>)}
    </Tabs>
}`,...($=(U=j.parameters)==null?void 0:U.docs)==null?void 0:$.source}}};var G,H,Y;y.parameters={...y.parameters,docs:{...(G=y.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => <div className="flex gap-4 w-full max-w-3xl">
      <Tabs defaultValue="tab1" orientation="vertical" className="w-full">
        <TabsList className="flex-col h-auto w-48">
          <TabsTrigger value="tab1" className="justify-start">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2" className="justify-start">Tab 2</TabsTrigger>
          <TabsTrigger value="tab3" className="justify-start">Tab 3</TabsTrigger>
        </TabsList>
        <div className="flex-1">
          <TabsContent value="tab1" className="p-4 border rounded-md">
            <h3 className="text-lg font-medium mb-2">Tab 1 Content</h3>
            <p className="text-sm text-muted-foreground">
              This is the content for tab 1. The tabs are displayed vertically.
            </p>
          </TabsContent>
          <TabsContent value="tab2" className="p-4 border rounded-md">
            <h3 className="text-lg font-medium mb-2">Tab 2 Content</h3>
            <p className="text-sm text-muted-foreground">
              This is the content for tab 2. The tabs are displayed vertically.
            </p>
          </TabsContent>
          <TabsContent value="tab3" className="p-4 border rounded-md">
            <h3 className="text-lg font-medium mb-2">Tab 3 Content</h3>
            <p className="text-sm text-muted-foreground">
              This is the content for tab 3. The tabs are displayed vertically.
            </p>
          </TabsContent>
        </div>
      </Tabs>
    </div>
}`,...(Y=(H=y.parameters)==null?void 0:H.docs)==null?void 0:Y.source}}};var z,W,K;w.parameters={...w.parameters,docs:{...(z=w.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => <Tabs defaultValue="file1" className="w-full max-w-3xl">
      <TabsList className="w-full">
        <TabsTrigger value="file1">
          <File className="h-4 w-4 mr-2" />
          index.tsx
        </TabsTrigger>
        <TabsTrigger value="file2">
          <File className="h-4 w-4 mr-2" />
          styles.css
        </TabsTrigger>
        <TabsTrigger value="file3">
          <File className="h-4 w-4 mr-2" />
          utils.ts
        </TabsTrigger>
      </TabsList>
      <TabsContent value="file1" className="p-4 bg-muted rounded-md mt-2 font-mono text-sm">
        <pre>{\`
import React from 'react';
import styles from './styles.css';
import { formatDate } from './utils';

function App() {
  return (
    <div className="app">
      <h1>Hello World</h1>
      <p>Today is {formatDate(new Date())}</p>
    </div>
  );
}

export default App;
        \`.trim()}</pre>
      </TabsContent>
      <TabsContent value="file2" className="p-4 bg-muted rounded-md mt-2 font-mono text-sm">
        <pre>{\`
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #333;
  font-size: 2rem;
}

p {
  color: #666;
}
        \`.trim()}</pre>
      </TabsContent>
      <TabsContent value="file3" className="p-4 bg-muted rounded-md mt-2 font-mono text-sm">
        <pre>{\`
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}
        \`.trim()}</pre>
      </TabsContent>
    </Tabs>
}`,...(K=(W=w.parameters)==null?void 0:W.docs)==null?void 0:K.source}}};var q,O,J;C.parameters={...C.parameters,docs:{...(q=C.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => {
    const [activeTab, setActiveTab] = React.useState("tab1");
    return <div className="space-y-4 w-full max-w-3xl">
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setActiveTab("tab1")} className={activeTab === "tab1" ? "bg-secondary" : ""}>
            Set Tab 1
          </Button>
          <Button variant="outline" onClick={() => setActiveTab("tab2")} className={activeTab === "tab2" ? "bg-secondary" : ""}>
            Set Tab 2
          </Button>
          <Button variant="outline" onClick={() => setActiveTab("tab3")} className={activeTab === "tab3" ? "bg-secondary" : ""}>
            Set Tab 3
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Current active tab: <span className="font-medium">{activeTab}</span>
        </p>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium">Controlled Tab 1</h3>
            <p className="text-sm text-muted-foreground">
              This tab's state is controlled programmatically.
            </p>
          </TabsContent>
          <TabsContent value="tab2" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium">Controlled Tab 2</h3>
            <p className="text-sm text-muted-foreground">
              You can change tabs using the buttons above.
            </p>
          </TabsContent>
          <TabsContent value="tab3" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium">Controlled Tab 3</h3>
            <p className="text-sm text-muted-foreground">
              This demonstrates controlled tabs with external state.
            </p>
          </TabsContent>
        </Tabs>
      </div>;
  }
}`,...(J=(O=C.parameters)==null?void 0:O.docs)==null?void 0:J.source}}};var Q,X,Z;S.parameters={...S.parameters,docs:{...(Q=S.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: () => <Tabs defaultValue="tab1" className="w-full max-w-3xl">
      <TabsList className="bg-background border border-input p-1">
        <TabsTrigger value="tab1" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-sm">
          Custom Tab 1
        </TabsTrigger>
        <TabsTrigger value="tab2" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-sm">
          Custom Tab 2
        </TabsTrigger>
        <TabsTrigger value="tab3" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-sm">
          Custom Tab 3
        </TabsTrigger>
      </TabsList>
      {["tab1", "tab2", "tab3"].map((tab, i) => <TabsContent key={tab} value={tab} className="p-4 bg-accent/20 border border-accent rounded-md mt-2">
          <h3 className="text-lg font-medium">Custom Styled Tab {i + 1}</h3>
          <p className="text-sm text-muted-foreground">
            This demonstrates custom styling for tabs and content.
          </p>
        </TabsContent>)}
    </Tabs>
}`,...(Z=(X=S.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var ee,ae,te;k.parameters={...k.parameters,docs:{...(ee=k.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: () => <Tabs defaultValue="tab1" className="w-full max-w-3xl">
      <TabsList>
        <TabsTrigger value="tab1">Enabled</TabsTrigger>
        <TabsTrigger value="tab2">Enabled</TabsTrigger>
        <TabsTrigger value="tab3" disabled>Disabled</TabsTrigger>
        <TabsTrigger value="tab4" disabled>Disabled</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="p-4 border rounded-md mt-2">
        <h3 className="text-lg font-medium">Enabled Tab Content</h3>
        <p className="text-sm text-muted-foreground">
          This is an enabled tab. Note that some tabs are disabled and cannot be selected.
        </p>
      </TabsContent>
      <TabsContent value="tab2" className="p-4 border rounded-md mt-2">
        <h3 className="text-lg font-medium">Another Enabled Tab</h3>
        <p className="text-sm text-muted-foreground">
          This is another enabled tab. The disabled tabs will not show their content.
        </p>
      </TabsContent>
      <TabsContent value="tab3" className="p-4 border rounded-md mt-2">
        <h3 className="text-lg font-medium">Disabled Tab Content</h3>
        <p className="text-sm text-muted-foreground">
          This content will not be displayed since its tab is disabled.
        </p>
      </TabsContent>
      <TabsContent value="tab4" className="p-4 border rounded-md mt-2">
        <h3 className="text-lg font-medium">Another Disabled Tab</h3>
        <p className="text-sm text-muted-foreground">
          This content will not be displayed since its tab is disabled.
        </p>
      </TabsContent>
    </Tabs>
}`,...(te=(ae=k.parameters)==null?void 0:ae.docs)==null?void 0:te.source}}};var se,ne,re;D.parameters={...D.parameters,docs:{...(se=D.parameters)==null?void 0:se.docs,source:{originalSource:`{
  render: () => {
    const tabs = [{
      id: "tab1",
      label: "First Tab",
      content: "Content for the first tab"
    }, {
      id: "tab2",
      label: "Second Tab",
      content: "Content for the second tab"
    }, {
      id: "tab3",
      label: "Third Tab",
      content: "Content for the third tab"
    }, {
      id: "tab4",
      label: "Fourth Tab",
      content: "Content for the fourth tab"
    }];
    return <Tabs defaultValue="tab1" className="w-full max-w-3xl">
        <TabsList>
          {tabs.map(tab => <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>)}
        </TabsList>
        {tabs.map(tab => <TabsContent key={tab.id} value={tab.id} className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium">{tab.label}</h3>
            <p className="text-sm text-muted-foreground">
              {tab.content}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              This example demonstrates dynamically generating tabs from an array of data.
            </p>
          </TabsContent>)}
      </Tabs>;
  }
}`,...(re=(ne=D.parameters)==null?void 0:ne.docs)==null?void 0:re.source}}};const sa=["Default","WithIcons","Vertical","FileTabsExample","Controlled","CustomStyling","DisabledTabs","DynamicTabs"];export{C as Controlled,S as CustomStyling,N as Default,k as DisabledTabs,D as DynamicTabs,w as FileTabsExample,y as Vertical,j as WithIcons,sa as __namedExportsOrder,ta as default};
