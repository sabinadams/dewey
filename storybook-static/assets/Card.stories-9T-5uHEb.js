import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{C as r,a as s,b as a,c as t,d as n,e as C,f as E}from"./card-DfUQO8NL.js";import{B as i}from"./button-Bs-Z7sty.js";import"./index-yBjzXJbu.js";import"./utils-DjqsqOe8.js";import"./index-Csl6Qs-8.js";import"./index-BlmOqGMO.js";const G={title:"UI/Card",component:r,tags:["autodocs"]},d={render:()=>e.jsx(r,{className:"w-[350px]",children:e.jsx(s,{children:"A simple card with just content"})})},o={render:()=>e.jsxs(r,{className:"w-[350px]",children:[e.jsxs(a,{children:[e.jsx(t,{children:"Card Title"}),e.jsx(n,{children:"Card Description"})]}),e.jsx(s,{children:e.jsx("p",{children:"This is the main content of the card."})}),e.jsx(C,{children:e.jsx("p",{children:"Card Footer"})})]})},c={render:()=>e.jsxs(r,{className:"w-[350px]",children:[e.jsxs(a,{children:[e.jsx(t,{children:"Card with Action"}),e.jsx(n,{children:"A card with an action component"}),e.jsx(E,{children:e.jsx(i,{size:"sm",children:"Action"})})]}),e.jsx(s,{children:e.jsx("p",{children:"Content with an action button in the header"})})]})},l={render:()=>e.jsxs(r,{className:"w-[350px]",children:[e.jsxs(a,{children:[e.jsx(t,{children:"Complex Card"}),e.jsx(n,{children:"With rich content inside"})]}),e.jsxs(s,{className:"space-y-4",children:[e.jsx("div",{className:"rounded-md bg-muted p-4",children:e.jsx("p",{className:"text-sm",children:"This is a highlighted section"})}),e.jsxs("ul",{className:"list-disc pl-5 text-sm space-y-2",children:[e.jsx("li",{children:"First important point"}),e.jsx("li",{children:"Second important point"}),e.jsx("li",{children:"Third important point"})]})]}),e.jsxs(C,{className:"flex justify-between",children:[e.jsx(i,{variant:"ghost",size:"sm",children:"Cancel"}),e.jsx(i,{size:"sm",children:"Save"})]})]})},m={render:()=>e.jsxs(r,{className:"w-[350px] border-primary/20",children:[e.jsxs(a,{className:"border-b border-primary/10 pb-4",children:[e.jsx(t,{className:"text-primary",children:"Custom Styled Card"}),e.jsx(n,{className:"text-primary/70",children:"With custom colors and styling"})]}),e.jsx(s,{className:"pt-4",children:e.jsx("p",{className:"text-primary/80",children:"This card has custom styling applied to all components."})}),e.jsx(C,{className:"border-t border-primary/10 pt-4 flex justify-end",children:e.jsx("span",{className:"text-xs text-muted-foreground",children:"Last updated: Today"})})]})},p={render:()=>e.jsxs(r,{className:"flex flex-row w-[500px] py-0",children:[e.jsx("div",{className:"bg-muted w-[100px] rounded-l-xl flex items-center justify-center",children:e.jsx("div",{className:"h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center",children:e.jsx("span",{className:"text-primary",children:"Icon"})})}),e.jsxs("div",{className:"flex flex-col flex-1 py-4",children:[e.jsxs(a,{children:[e.jsx(t,{children:"Horizontal Card"}),e.jsx(n,{children:"Card with horizontal layout"})]}),e.jsx(s,{children:e.jsx("p",{children:"Content arranged horizontally instead of vertically"})})]})]})},x={render:()=>e.jsxs(r,{className:"w-full max-w-[500px]",children:[e.jsxs(a,{children:[e.jsx(t,{className:"text-lg md:text-xl lg:text-2xl",children:"Responsive Card"}),e.jsx(n,{children:"This card adjusts based on viewport size"})]}),e.jsx(s,{children:e.jsx("p",{className:"text-sm md:text-base",children:"The content and styling of this card will respond to different screen sizes using Tailwind's responsive utilities."})}),e.jsxs(C,{className:"flex flex-col sm:flex-row sm:justify-between gap-2",children:[e.jsx(i,{className:"w-full sm:w-auto",variant:"secondary",size:"sm",children:"Secondary Action"}),e.jsx(i,{className:"w-full sm:w-auto",size:"sm",children:"Primary Action"})]})]})};var h,u,j;d.parameters={...d.parameters,docs:{...(h=d.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <Card className="w-[350px]">
      <CardContent>A simple card with just content</CardContent>
    </Card>
}`,...(j=(u=d.parameters)==null?void 0:u.docs)==null?void 0:j.source}}};var f,y,N;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the main content of the card.</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
}`,...(N=(y=o.parameters)==null?void 0:y.docs)==null?void 0:N.source}}};var w,g,b;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card with Action</CardTitle>
        <CardDescription>A card with an action component</CardDescription>
        <CardAction>
          <Button size="sm">Action</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Content with an action button in the header</p>
      </CardContent>
    </Card>
}`,...(b=(g=c.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};var T,v,z;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Complex Card</CardTitle>
        <CardDescription>With rich content inside</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-md bg-muted p-4">
          <p className="text-sm">This is a highlighted section</p>
        </div>
        <ul className="list-disc pl-5 text-sm space-y-2">
          <li>First important point</li>
          <li>Second important point</li>
          <li>Third important point</li>
        </ul>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm">Cancel</Button>
        <Button size="sm">Save</Button>
      </CardFooter>
    </Card>
}`,...(z=(v=l.parameters)==null?void 0:v.docs)==null?void 0:z.source}}};var A,H,D;m.parameters={...m.parameters,docs:{...(A=m.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => <Card className="w-[350px] border-primary/20">
      <CardHeader className="border-b border-primary/10 pb-4">
        <CardTitle className="text-primary">Custom Styled Card</CardTitle>
        <CardDescription className="text-primary/70">
          With custom colors and styling
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-primary/80">
          This card has custom styling applied to all components.
        </p>
      </CardContent>
      <CardFooter className="border-t border-primary/10 pt-4 flex justify-end">
        <span className="text-xs text-muted-foreground">Last updated: Today</span>
      </CardFooter>
    </Card>
}`,...(D=(H=m.parameters)==null?void 0:H.docs)==null?void 0:D.source}}};var S,F,B;p.parameters={...p.parameters,docs:{...(S=p.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <Card className="flex flex-row w-[500px] py-0">
      <div className="bg-muted w-[100px] rounded-l-xl flex items-center justify-center">
        <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="text-primary">Icon</span>
        </div>
      </div>
      <div className="flex flex-col flex-1 py-4">
        <CardHeader>
          <CardTitle>Horizontal Card</CardTitle>
          <CardDescription>Card with horizontal layout</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content arranged horizontally instead of vertically</p>
        </CardContent>
      </div>
    </Card>
}`,...(B=(F=p.parameters)==null?void 0:F.docs)==null?void 0:B.source}}};var W,R,I;x.parameters={...x.parameters,docs:{...(W=x.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => <Card className="w-full max-w-[500px]">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl lg:text-2xl">
          Responsive Card
        </CardTitle>
        <CardDescription>
          This card adjusts based on viewport size
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm md:text-base">
          The content and styling of this card will respond to different screen
          sizes using Tailwind's responsive utilities.
        </p>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
        <Button className="w-full sm:w-auto" variant="secondary" size="sm">
          Secondary Action
        </Button>
        <Button className="w-full sm:w-auto" size="sm">
          Primary Action
        </Button>
      </CardFooter>
    </Card>
}`,...(I=(R=x.parameters)==null?void 0:R.docs)==null?void 0:I.source}}};const J=["Default","WithHeaderAndFooter","WithAction","ComplexContent","CustomStyling","Horizontal","Responsive"];export{l as ComplexContent,m as CustomStyling,d as Default,p as Horizontal,x as Responsive,c as WithAction,o as WithHeaderAndFooter,J as __namedExportsOrder,G as default};
