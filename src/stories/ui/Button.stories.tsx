import { Button } from "@/components/ui/button";
import type { Meta, StoryObj } from "@storybook/react";
import { LucideCircle, Plus, Mail, Loader2 } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
      description: "The visual style of the button"
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
      description: "The size of the button"
    },
    asChild: {
      control: "boolean",
      description: "Whether to render as a child component (using Radix UI Slot)"
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled"
    }
  }
};

export default meta;

type Story = StoryObj<typeof Button>;

// Base Button
export const Default: Story = {
  args: {
    children: "Button",
    variant: "default",
    size: "default"
  },
};

// Button Variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

// Button Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  ),
};

// With Icons
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>
        <Mail className="mr-2 h-4 w-4" /> Login with Email
      </Button>
      <Button variant="outline">
        <LucideCircle className="mr-2 h-4 w-4" /> Download
      </Button>
      <Button variant="secondary">
        Upload <Plus className="ml-2 h-4 w-4" />
      </Button>
    </div>
  ),
};

// Icon Only Buttons
export const IconOnly: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button size="icon" variant="default">
        <Plus className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="secondary">
        <Mail className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="outline">
        <LucideCircle className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="ghost">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  ),
};

// Loading State
export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Please wait
      </Button>
      <Button variant="outline" disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    </div>
  ),
};

// Disabled State
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button disabled>Disabled</Button>
      <Button variant="destructive" disabled>Disabled</Button>
      <Button variant="outline" disabled>Disabled</Button>
      <Button variant="secondary" disabled>Disabled</Button>
      <Button variant="ghost" disabled>Disabled</Button>
      <Button variant="link" disabled>Disabled</Button>
    </div>
  ),
};

// Block Button (Full Width)
export const FullWidth: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-4">
      <Button className="w-full">Full Width Button</Button>
      <Button variant="outline" className="w-full">Full Width Outline</Button>
    </div>
  ),
};

// Combinations
export const Combinations: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {["default", "destructive", "outline", "secondary", "ghost", "link"].map((variant) => (
        ["default", "sm", "lg"].map((size) => (
          <Button 
            key={`${variant}-${size}`} 
            variant={variant as any} 
            size={size as any}
          >
            {variant}/{size}
          </Button>
        ))
      ))}
    </div>
  ),
};

// Usage in a form
export const InForm: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-4 rounded-lg border border-input p-4 bg-card">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
        <input
          id="email"
          type="email"
          placeholder="name@example.com"
          className="w-full rounded-md border border-input bg-background px-3 py-2"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-foreground">Password</label>
        <input
          id="password"
          type="password"
          placeholder="********"
          className="w-full rounded-md border border-input bg-background px-3 py-2"
        />
      </div>
      <div className="flex items-center justify-between pt-2">
        <Button variant="outline" size="sm">Cancel</Button>
        <Button>Submit</Button>
      </div>
    </div>
  ),
};