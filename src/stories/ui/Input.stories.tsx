import { Input } from "@/components/ui/input";
import type { Meta, StoryObj } from "@storybook/react";
import { Search, Mail, Lock, User, Calendar } from "lucide-react";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled"
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the input"
    },
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "date", "file"],
      description: "Type of the input"
    }
  }
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Enter text here...",
    type: "text"
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <label htmlFor="email" className="text-sm font-medium">Email</label>
      <Input type="email" id="email" placeholder="name@example.com" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled input",
    value: "You cannot change this"
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input className="pl-8" type="search" placeholder="Search..." />
      </div>
      <div className="relative">
        <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input className="pl-8" type="email" placeholder="Email address" />
      </div>
      <div className="relative">
        <Lock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input className="pl-8" type="password" placeholder="Password" />
      </div>
    </div>
  ),
};

export const InputTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <div className="grid gap-1.5">
        <label htmlFor="text" className="text-sm font-medium">Text</label>
        <Input id="text" placeholder="Text input" />
      </div>
      <div className="grid gap-1.5">
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <Input id="email" type="email" placeholder="name@example.com" />
      </div>
      <div className="grid gap-1.5">
        <label htmlFor="password" className="text-sm font-medium">Password</label>
        <Input id="password" type="password" placeholder="Password" />
      </div>
      <div className="grid gap-1.5">
        <label htmlFor="number" className="text-sm font-medium">Number</label>
        <Input id="number" type="number" placeholder="0" />
      </div>
      <div className="grid gap-1.5">
        <label htmlFor="date" className="text-sm font-medium">Date</label>
        <Input id="date" type="date" />
      </div>
    </div>
  ),
};

export const Validation: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <div className="grid gap-1.5">
        <label htmlFor="valid" className="text-sm font-medium">Valid</label>
        <Input id="valid" className="border-green-500 focus-visible:ring-green-500/20" placeholder="Valid input" />
        <p className="text-xs text-green-500">This input is valid</p>
      </div>
      <div className="grid gap-1.5">
        <label htmlFor="invalid" className="text-sm font-medium">Invalid</label>
        <Input id="invalid" aria-invalid="true" placeholder="Invalid input" />
        <p className="text-xs text-destructive">This input is invalid</p>
      </div>
    </div>
  ),
};

export const FileInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <label htmlFor="file" className="text-sm font-medium">Upload file</label>
      <Input id="file" type="file" />
    </div>
  ),
};

export const WithButton: Story = {
  render: () => (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="email" placeholder="Email" />
      <button className="rounded-md bg-primary px-3 py-2 text-white text-sm">
        Subscribe
      </button>
    </div>
  ),
}; 