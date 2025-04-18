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
  render: () => (
    <div className="p-6 border rounded-lg flex items-center justify-center">
      <ThemeToggle />
    </div>
  ),
};

export const InDifferentBackgrounds: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="p-6 bg-background rounded-lg flex items-center justify-center">
        <div className="flex items-center gap-4 border-2 border-dashed border-primary/40 p-4 rounded-lg">
          <div className="bg-background/50 p-1 rounded-lg">
            <ThemeToggle />
          </div>
          <span className="text-sm font-medium text-foreground">On background color</span>
        </div>
      </div>
      <div className="p-6 bg-card rounded-lg flex items-center justify-center">
        <div className="flex items-center gap-4 border-2 border-dashed border-primary/40 p-4 rounded-lg">
          <div className="bg-card/50 p-1 rounded-lg">
            <ThemeToggle />
          </div>
          <span className="text-sm font-medium text-card-foreground">On card color</span>
        </div>
      </div>
      <div className="p-6 bg-secondary rounded-lg flex items-center justify-center">
        <div className="flex items-center gap-4 border-2 border-dashed border-primary/40 p-4 rounded-lg">
          <div className="bg-secondary/50 p-1 rounded-lg">
            <ThemeToggle />
          </div>
          <span className="text-sm font-medium text-secondary-foreground">On secondary color</span>
        </div>
      </div>
      <div className="p-6 bg-sidebar rounded-lg flex items-center justify-center">
        <div className="flex items-center gap-4 border-2 border-dashed border-primary/40 p-4 rounded-lg">
          <div className="bg-sidebar/50 p-1 rounded-lg shadow-sm">
            <ThemeToggle />
          </div>
          <span className="text-sm font-medium text-sidebar-foreground">On sidebar color</span>
        </div>
      </div>
    </div>
  ),
};

export const InNavbar: Story = {
  render: () => (
    <div className="w-full max-w-3xl mx-auto">
      <header className="flex items-center justify-between p-6 bg-card rounded-lg shadow-md">
        <div className="text-lg font-bold text-card-foreground">App Name</div>
        <div className="flex items-center gap-6">
          <div className="text-sm text-card-foreground">Menu Item</div>
          <div className="text-sm text-card-foreground">Menu Item</div>
          <div className="text-sm text-card-foreground">Menu Item</div>
          <div className="p-1.5 bg-secondary/30 rounded-lg shadow-sm ring-1 ring-primary/10">
            <ThemeToggle />
          </div>
        </div>
      </header>
    </div>
  ),
};

export const InSidebar: Story = {
  render: () => (
    <div className="h-96 w-20 bg-sidebar flex flex-col items-center p-3 rounded-lg shadow-md">
      <div className="flex-1 flex flex-col items-center gap-6 pt-6">
        <div className="w-10 h-10 rounded-full bg-sidebar-accent grid place-items-center shadow-md">
          <span className="text-sidebar-accent-foreground font-medium">A</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-sidebar-accent grid place-items-center shadow-md">
          <span className="text-sidebar-accent-foreground font-medium">B</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-sidebar-accent grid place-items-center shadow-md">
          <span className="text-sidebar-accent-foreground font-medium">C</span>
        </div>
      </div>
      <div className="py-4 bg-sidebar-accent/30 rounded-lg w-full flex justify-center mt-4 mb-2 ring-1 ring-primary/20">
        <ThemeToggle />
      </div>
    </div>
  ),
};

export const WithCustomStyling: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="flex items-center gap-4 p-4 bg-background rounded-lg shadow-sm">
        <div className="p-1 bg-secondary/20 rounded-lg">
          <ThemeToggle />
        </div>
        <span className="text-sm text-foreground">Default styling</span>
      </div>
      <div className="flex items-center gap-4 p-4 bg-background rounded-lg shadow-sm">
        <div className="relative">
          <div className="p-1 bg-secondary/20 rounded-lg">
            <ThemeToggle />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full flex items-center justify-center">
            <span className="text-[10px] text-destructive-foreground font-bold">1</span>
          </div>
        </div>
        <span className="text-sm text-foreground">With notification badge</span>
      </div>
      <div className="flex items-center gap-4 p-4 bg-background rounded-lg shadow-sm">
        <div className="p-1 bg-secondary/20 rounded-lg">
          <ThemeToggle />
        </div>
        <span className="text-xs px-3 py-1 bg-primary text-primary-foreground font-medium rounded-full shadow-sm">
          Theme Toggle
        </span>
      </div>
    </div>
  ),
}; 