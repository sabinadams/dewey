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

export const Default: Story = {};

export const InNavbar: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: '600px', padding: '16px' }}>
        <header className="flex items-center justify-between p-4 bg-card rounded-lg">
          <div className="text-lg font-medium text-card-foreground">App</div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-card-foreground">Menu</span>
            {Story()}
          </div>
        </header>
      </div>
    ),
  ],
};

export const InSidebar: Story = {
  decorators: [
    (Story) => (
      <div style={{ height: '200px', width: '60px' }} className="bg-sidebar rounded-lg p-2 flex flex-col">
        <div className="flex-1"></div>
        <div className="flex justify-center">
          {Story()}
        </div>
      </div>
    ),
  ],
};

export const WithBadge: Story = {
  decorators: [
    (Story) => (
      <div className="relative inline-block">
        {Story()}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full flex items-center justify-center">
          <span className="text-[10px] text-destructive-foreground font-bold">1</span>
        </div>
      </div>
    ),
  ],
}; 