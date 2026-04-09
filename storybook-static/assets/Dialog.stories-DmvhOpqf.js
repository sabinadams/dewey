import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{r as P}from"./index-BlmOqGMO.js";import{D as r,a as d,b as n,c as a,d as s,e as t,f as l,g as c}from"./dialog-DMCjFdvK.js";import{B as i}from"./button-Bs-Z7sty.js";import"./index-yBjzXJbu.js";import"./index-DWczGfFj.js";import"./index-Csl6Qs-8.js";import"./index-dzDNzLhD.js";import"./index-DVHVyCJ9.js";import"./index-BSUbL-Ji.js";import"./index-DuqhnXMO.js";import"./index-fNjTmf9T.js";import"./index-zqMI6Cwu.js";import"./utils-DjqsqOe8.js";import"./x-RFX65JHz.js";import"./createLucideIcon-B24biV1q.js";const $={title:"UI/Dialog",component:r,tags:["autodocs"]},u={render:()=>e.jsxs(r,{children:[e.jsx(d,{asChild:!0,children:e.jsx(i,{variant:"outline",children:"Open Dialog"})}),e.jsxs(n,{children:[e.jsxs(a,{children:[e.jsx(s,{children:"Dialog Title"}),e.jsx(t,{children:"This is a dialog description that explains what this dialog is for."})]}),e.jsx("div",{className:"py-4",children:e.jsx("p",{className:"text-sm text-muted-foreground",children:"This is the main content of the dialog. You can put any content here."})}),e.jsxs(l,{children:[e.jsx(c,{asChild:!0,children:e.jsx(i,{variant:"outline",children:"Cancel"})}),e.jsx(i,{children:"Save Changes"})]})]})]})},g={render:()=>e.jsxs(r,{children:[e.jsx(d,{asChild:!0,children:e.jsx(i,{children:"Edit Profile"})}),e.jsxs(n,{className:"sm:max-w-[425px]",children:[e.jsxs(a,{children:[e.jsx(s,{children:"Edit profile"}),e.jsx(t,{children:"Make changes to your profile here. Click save when you're done."})]}),e.jsxs("div",{className:"grid gap-4 py-4",children:[e.jsxs("div",{className:"grid grid-cols-4 items-center gap-4",children:[e.jsx("label",{htmlFor:"name",className:"text-right text-sm font-medium text-foreground",children:"Name"}),e.jsx("input",{id:"name",defaultValue:"Pedro Duarte",className:"col-span-3 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"})]}),e.jsxs("div",{className:"grid grid-cols-4 items-center gap-4",children:[e.jsx("label",{htmlFor:"username",className:"text-right text-sm font-medium text-foreground",children:"Username"}),e.jsx("input",{id:"username",defaultValue:"@peduarte",className:"col-span-3 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"})]})]}),e.jsxs(l,{children:[e.jsx(c,{asChild:!0,children:e.jsx(i,{variant:"outline",children:"Cancel"})}),e.jsx(i,{type:"submit",children:"Save changes"})]})]})]})},m={render:()=>e.jsxs(r,{children:[e.jsx(d,{asChild:!0,children:e.jsx(i,{variant:"destructive",children:"Delete Account"})}),e.jsxs(n,{children:[e.jsxs(a,{children:[e.jsx(s,{children:"Are you absolutely sure?"}),e.jsx(t,{children:"This action cannot be undone. This will permanently delete your account and remove your data from our servers."})]}),e.jsxs(l,{children:[e.jsx(c,{asChild:!0,children:e.jsx(i,{variant:"outline",children:"Cancel"})}),e.jsx(i,{variant:"destructive",children:"Delete Account"})]})]})]})},p={render:()=>e.jsxs(r,{children:[e.jsx(d,{asChild:!0,children:e.jsx(i,{variant:"outline",children:"Terms & Conditions"})}),e.jsxs(n,{className:"max-h-[80vh] overflow-y-auto",children:[e.jsxs(a,{children:[e.jsx(s,{children:"Terms of Service"}),e.jsx(t,{children:"Please read our terms of service carefully."})]}),e.jsx("div",{className:"space-y-4 py-4",children:Array.from({length:10}).map((D,o)=>e.jsxs("div",{className:"space-y-2",children:[e.jsxs("h3",{className:"text-sm font-medium",children:["Section ",o+1]}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nulla facilisi. Donec eget nisl quis nunc aliquet aliquam. Nullam euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl."})]},o))}),e.jsxs(l,{children:[e.jsx(c,{asChild:!0,children:e.jsx(i,{variant:"outline",children:"Decline"})}),e.jsx(i,{children:"Accept"})]})]})]})},h={render:()=>{const[D,o]=P.useState(!1);return e.jsxs("div",{className:"flex flex-col gap-4 items-start",children:[e.jsx(i,{onClick:()=>o(!0),children:"Open Controlled Dialog"}),e.jsxs("div",{className:"text-sm text-muted-foreground",children:["Dialog is currently: ",e.jsx("span",{className:"font-medium",children:D?"Open":"Closed"})]}),e.jsx(r,{open:D,onOpenChange:o,children:e.jsxs(n,{children:[e.jsxs(a,{children:[e.jsx(s,{children:"Controlled Dialog"}),e.jsx(t,{children:"This dialog's state is controlled programmatically."})]}),e.jsx("div",{className:"py-4",children:e.jsx("p",{className:"text-sm text-muted-foreground",children:"You can open and close this dialog using the button outside."})}),e.jsx(l,{children:e.jsx(i,{variant:"outline",onClick:()=>o(!1),children:"Close"})})]})})]})}},x={render:()=>e.jsxs(r,{children:[e.jsx(d,{asChild:!0,children:e.jsx(i,{variant:"outline",children:"Custom Dialog"})}),e.jsxs(n,{className:"bg-primary text-primary-foreground border-0",children:[e.jsxs(a,{className:"border-b border-primary-foreground/20 pb-4",children:[e.jsx(s,{className:"text-2xl",children:"Custom Styled Dialog"}),e.jsx(t,{className:"text-primary-foreground/80",children:"This dialog has custom styling applied."})]}),e.jsx("div",{className:"py-4",children:e.jsx("p",{className:"text-primary-foreground/90",children:"You can customize the appearance of dialogs to match your brand."})}),e.jsxs(l,{className:"border-t border-primary-foreground/20 pt-4",children:[e.jsx(c,{asChild:!0,children:e.jsx(i,{className:"bg-transparent border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground",children:"Cancel"})}),e.jsx(i,{className:"bg-primary-foreground text-primary hover:bg-primary-foreground/90",children:"Continue"})]})]})]})};var f,v,j;u.parameters={...u.parameters,docs:{...(f=u.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a dialog description that explains what this dialog is for.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            This is the main content of the dialog. You can put any content here.
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
}`,...(j=(v=u.parameters)==null?void 0:v.docs)==null?void 0:j.source}}};var C,b,y;g.parameters={...g.parameters,docs:{...(C=g.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right text-sm font-medium text-foreground">
              Name
            </label>
            <input id="name" defaultValue="Pedro Duarte" className="col-span-3 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="username" className="text-right text-sm font-medium text-foreground">
              Username
            </label>
            <input id="username" defaultValue="@peduarte" className="col-span-3 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
}`,...(y=(b=g.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};var N,T,B;m.parameters={...m.parameters,docs:{...(N=m.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive">Delete Account</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
}`,...(B=(T=m.parameters)==null?void 0:T.docs)==null?void 0:B.source}}};var q,S,F;p.parameters={...p.parameters,docs:{...(q=p.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Terms & Conditions</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Terms of Service</DialogTitle>
          <DialogDescription>
            Please read our terms of service carefully.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {Array.from({
          length: 10
        }).map((_, i) => <div key={i} className="space-y-2">
              <h3 className="text-sm font-medium">Section {i + 1}</h3>
              <p className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis
                aliquam nisl nunc quis nisl. Nulla facilisi. Donec eget nisl quis
                nunc aliquet aliquam. Nullam euismod, nisl eget ultricies aliquam,
                nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
              </p>
            </div>)}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Decline</Button>
          </DialogClose>
          <Button>Accept</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
}`,...(F=(S=p.parameters)==null?void 0:S.docs)==null?void 0:F.source}}};var k,O,H;h.parameters={...h.parameters,docs:{...(k=h.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = React.useState(false);
    return <div className="flex flex-col gap-4 items-start">
        <Button onClick={() => setOpen(true)}>Open Controlled Dialog</Button>
        <div className="text-sm text-muted-foreground">
          Dialog is currently: <span className="font-medium">{open ? "Open" : "Closed"}</span>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Controlled Dialog</DialogTitle>
              <DialogDescription>
                This dialog's state is controlled programmatically.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-muted-foreground">
                You can open and close this dialog using the button outside.
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>;
  }
}`,...(H=(O=h.parameters)==null?void 0:O.docs)==null?void 0:H.source}}};var w,A,E;x.parameters={...x.parameters,docs:{...(w=x.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Custom Dialog</Button>
      </DialogTrigger>
      <DialogContent className="bg-primary text-primary-foreground border-0">
        <DialogHeader className="border-b border-primary-foreground/20 pb-4">
          <DialogTitle className="text-2xl">Custom Styled Dialog</DialogTitle>
          <DialogDescription className="text-primary-foreground/80">
            This dialog has custom styling applied.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-primary-foreground/90">
            You can customize the appearance of dialogs to match your brand.
          </p>
        </div>
        <DialogFooter className="border-t border-primary-foreground/20 pt-4">
          <DialogClose asChild>
            <Button className="bg-transparent border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              Cancel
            </Button>
          </DialogClose>
          <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
}`,...(E=(A=x.parameters)==null?void 0:A.docs)==null?void 0:E.source}}};const ee=["Default","WithForm","Destructive","LongContent","Controlled","CustomStyling"];export{h as Controlled,x as CustomStyling,u as Default,m as Destructive,p as LongContent,g as WithForm,ee as __namedExportsOrder,$ as default};
