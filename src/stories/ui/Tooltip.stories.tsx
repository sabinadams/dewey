import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

const meta: Meta<typeof Tooltip> = {
  title: "UI/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  decorators: [(story) => (
    <div className="flex items-center justify-center py-8">
      {story()}
    </div>
  )],
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>
        <Button variant="outline" size="icon">
          <Info className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Helpful information</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const TextTrigger: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger className="cursor-help text-sm text-primary underline">
        Hover me
      </TooltipTrigger>
      <TooltipContent>
        <p>Tooltip with text trigger</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const CustomDelay: Story = {
  render: () => (
    <TooltipProvider delayDuration={800}>
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline">Delayed Tooltip</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>This tooltip has a custom delay</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

export const Positions: Story = {
  decorators: [(story) => (
    <div className="flex flex-wrap items-center justify-center gap-8 py-16">
      {story()}
    </div>
  )],
  render: () => (
    <>
      {["top", "right", "bottom", "left"].map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger>
            <Button variant="outline">{side}</Button>
          </TooltipTrigger>
          <TooltipContent side={side as any}>
            <p>Tooltip on {side}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </>
  ),
};

export const WithArrow: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>
        <Button>With Arrow</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This tooltip has an arrow pointing to the trigger</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>
        <Button variant="outline">Custom Style</Button>
      </TooltipTrigger>
      <TooltipContent 
        className="bg-accent text-accent-foreground" 
        arrowClassName="bg-accent"
        sideOffset={5}
      >
        <p>Tooltip with custom background</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithinFormControls: Story = {
  decorators: [(story) => (
    <div className="space-y-2 w-64">
      {story()}
    </div>
  )],
  render: () => (
    <>
      <div className="flex items-center gap-2">
        <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Enter your full name</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <input
        id="name"
        type="text"
        className="w-full rounded-md border border-input bg-background px-3 py-2"
        placeholder="Enter your name"
      />
    </>
  ),
}; 