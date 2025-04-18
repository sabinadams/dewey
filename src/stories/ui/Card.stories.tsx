import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent>A simple card with just content</CardContent>
    </Card>
  ),
};

export const WithHeaderAndFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
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
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card className="w-[350px]">
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
  ),
};

export const ComplexContent: Story = {
  render: () => (
    <Card className="w-[350px]">
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
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Card className="w-[350px] border-primary/20">
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
  ),
};

export const Horizontal: Story = {
  render: () => (
    <Card className="flex flex-row w-[500px] py-0">
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
  ),
};

export const Responsive: Story = {
  render: () => (
    <Card className="w-full max-w-[500px]">
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
        <Button 
          className="w-full sm:w-auto" 
          variant="secondary" 
          size="sm"
        >
          Secondary Action
        </Button>
        <Button 
          className="w-full sm:w-auto" 
          size="sm"
        >
          Primary Action
        </Button>
      </CardFooter>
    </Card>
  ),
};

