import { Separator } from "@/components/ui/separator";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Separator> = {
  title: "UI/Separator",
  component: Separator,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "The orientation of the separator"
    },
    decorative: {
      control: "boolean",
      description: "Whether the separator is purely decorative"
    }
  }
};

export default meta;

type Story = StoryObj<typeof Separator>;

export const Default: Story = {
  args: {
    orientation: "horizontal",
    decorative: true
  },
  render: (args) => (
    <div className="w-80">
      <div className="text-lg font-medium">Separator</div>
      <Separator {...args} className="my-4" />
      <div className="text-sm text-muted-foreground">
        A visual divider between content.
      </div>
    </div>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <div>
        <h4 className="text-sm font-medium">First Section</h4>
        <p className="text-sm text-muted-foreground">
          This is the first section of the content.
        </p>
      </div>
      <Separator />
      <div>
        <h4 className="text-sm font-medium">Second Section</h4>
        <p className="text-sm text-muted-foreground">
          This is the second section of the content.
        </p>
      </div>
      <Separator />
      <div>
        <h4 className="text-sm font-medium">Third Section</h4>
        <p className="text-sm text-muted-foreground">
          This is the third section of the content.
        </p>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-40 items-center">
      <div className="space-y-1">
        <h4 className="text-sm font-medium">Left Content</h4>
        <p className="text-sm text-muted-foreground">
          This content is on the left side.
        </p>
      </div>
      <Separator orientation="vertical" className="mx-8 h-full" />
      <div className="space-y-1">
        <h4 className="text-sm font-medium">Right Content</h4>
        <p className="text-sm text-muted-foreground">
          This content is on the right side.
        </p>
      </div>
    </div>
  ),
};

export const WithLabels: Story = {
  render: () => (
    <div className="w-80">
      <div className="flex items-center">
        <span className="text-sm text-muted-foreground">Account</span>
        <Separator className="mx-2 flex-1" />
        <span className="text-sm text-muted-foreground">Password</span>
        <Separator className="mx-2 flex-1" />
        <span className="text-sm text-muted-foreground">Settings</span>
      </div>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Separator className="bg-primary" />
      <Separator className="bg-destructive h-0.5" />
      <Separator className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full" />
      <div className="flex h-20 items-center">
        <div className="space-y-1">
          <p className="text-sm">Left</p>
        </div>
        <Separator orientation="vertical" className="mx-4 h-full bg-primary" />
        <div className="space-y-1">
          <p className="text-sm">Right</p>
        </div>
      </div>
    </div>
  ),
};

export const InCard: Story = {
  render: () => (
    <div className="w-80 rounded-lg border p-4">
      <h4 className="text-lg font-medium">Card Title</h4>
      <p className="text-sm text-muted-foreground">Card description</p>
      <Separator className="my-4" />
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm">Item 1</span>
          <span className="text-sm">Value 1</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Item 2</span>
          <span className="text-sm">Value 2</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Item 3</span>
          <span className="text-sm">Value 3</span>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="flex justify-end">
        <button className="rounded-md bg-primary px-3 py-1 text-xs text-white">
          Action
        </button>
      </div>
    </div>
  ),
}; 