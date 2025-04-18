import { ThemeToggle } from "@/components/ui/theme-toggle";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ThemeToggle> = {
  title: "UI/ThemeToggle",
  component: ThemeToggle,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {
  render: () => <ThemeToggle />,
};

export const InDifferentBackgrounds: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="p-4 bg-background rounded-lg flex justify-center">
        <ThemeToggle />
        <span className="ml-4 text-sm font-medium">On background color</span>
      </div>
      <div className="p-4 bg-card rounded-lg flex justify-center">
        <ThemeToggle />
        <span className="ml-4 text-sm font-medium">On card color</span>
      </div>
      <div className="p-4 bg-secondary rounded-lg flex justify-center">
        <ThemeToggle />
        <span className="ml-4 text-sm font-medium">On secondary color</span>
      </div>
      <div className="p-4 bg-sidebar rounded-lg flex justify-center">
        <ThemeToggle />
        <span className="ml-4 text-sm font-medium">On sidebar color</span>
      </div>
    </div>
  ),
};

export const InNavbar: Story = {
  render: () => (
    <div className="w-full max-w-3xl mx-auto">
      <header className="flex items-center justify-between p-4 bg-card rounded-lg">
        <div className="text-lg font-bold">App Name</div>
        <div className="flex items-center gap-4">
          <div className="text-sm">Menu Item</div>
          <div className="text-sm">Menu Item</div>
          <div className="text-sm">Menu Item</div>
          <ThemeToggle />
        </div>
      </header>
    </div>
  ),
};

export const InSidebar: Story = {
  render: () => (
    <div className="h-96 w-16 bg-sidebar flex flex-col items-center p-2 rounded-lg">
      <div className="flex-1 flex flex-col items-center gap-4 pt-4">
        <div className="w-10 h-10 rounded-full bg-sidebar-accent grid place-items-center">
          <span className="text-sidebar-accent-foreground">A</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-sidebar-accent grid place-items-center">
          <span className="text-sidebar-accent-foreground">B</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-sidebar-accent grid place-items-center">
          <span className="text-sidebar-accent-foreground">C</span>
        </div>
      </div>
      <div className="py-4">
        <ThemeToggle />
      </div>
    </div>
  ),
};

export const WithCustomStyling: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <ThemeToggle />
        <span className="ml-4 text-sm">Default styling</span>
      </div>
      <div className="flex items-center">
        <div className="relative">
          <ThemeToggle />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
        </div>
        <span className="ml-4 text-sm">With notification badge</span>
      </div>
      <div className="flex items-center">
        <ThemeToggle />
        <span className="ml-2 text-xs px-2 py-1 bg-primary text-primary-foreground rounded-full">
          Toggle
        </span>
      </div>
    </div>
  ),
}; 