import * as React from "react";
import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings, Menu, User, CreditCard, HelpCircle } from "lucide-react";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Sheet> = {
  title: "UI/Sheet",
  component: Sheet,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Sheet>;

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>
            This is a description of the sheet and its purpose.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            This is the main content of the sheet. You can put anything here.
          </p>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button>Close Sheet</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const SideVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {["top", "right", "bottom", "left"].map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant="outline">Open {side}</Button>
          </SheetTrigger>
          <SheetContent side={side as any}>
            <SheetHeader>
              <SheetTitle>Sheet from {side}</SheetTitle>
              <SheetDescription>
                This sheet slides in from the {side} of the screen.
              </SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <p className="text-sm text-muted-foreground">
                The content for the sheet that appears from the {side}.
              </p>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button>Close</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Edit Profile</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right text-sm font-medium">
              Name
            </label>
            <Input id="name" value="John Doe" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="username" className="text-right text-sm font-medium">
              Username
            </label>
            <Input id="username" value="@johndoe" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="email" className="text-right text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              value="john.doe@example.com"
              className="col-span-3"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button>Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const MobileMenu: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-4">
          <Button variant="ghost" className="justify-start">
            <User className="mr-2 h-5 w-5" />
            Profile
          </Button>
          <Button variant="ghost" className="justify-start">
            <CreditCard className="mr-2 h-5 w-5" />
            Billing
          </Button>
          <Button variant="ghost" className="justify-start">
            <Settings className="mr-2 h-5 w-5" />
            Settings
          </Button>
          <Button variant="ghost" className="justify-start">
            <HelpCircle className="mr-2 h-5 w-5" />
            Help & Support
          </Button>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline" className="w-full">
              Close Menu
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const ShoppingCart: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>View Cart (3)</Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:max-w-none">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>You have 3 items in your cart.</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-5 py-4">
          {[
            { name: "Product 1", price: "$19.99" },
            { name: "Product 2", price: "$29.99" },
            { name: "Product 3", price: "$39.99" },
          ].map((product, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b pb-3"
            >
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-muted-foreground">Qty: 1</p>
              </div>
              <p className="font-medium">{product.price}</p>
            </div>
          ))}
          <div className="flex items-center justify-between border-t pt-3">
            <p className="font-medium">Total</p>
            <p className="font-bold">$89.97</p>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Continue Shopping</Button>
          </SheetClose>
          <Button>Checkout</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    
    return (
      <div className="flex flex-col gap-4 items-start">
        <Button onClick={() => setOpen(true)}>Open Controlled Sheet</Button>
        <div className="text-sm text-muted-foreground">
          Sheet is currently: <span className="font-medium">{open ? "Open" : "Closed"}</span>
        </div>
        
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Controlled Sheet</SheetTitle>
              <SheetDescription>
                This sheet's state is controlled programmatically.
              </SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <p className="text-sm text-muted-foreground">
                You can open and close this sheet using the button outside.
              </p>
            </div>
            <SheetFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Close
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    );
  },
}; 