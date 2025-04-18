import { ScrollArea } from "@/components/ui/scroll-area";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ScrollArea> = {
  title: "UI/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ScrollArea>;

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium">Tags</h4>
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="mt-2 rounded-md bg-secondary p-2 text-sm">
            Tag {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const HorizontalScrolling: Story = {
  render: () => (
    <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
      <div className="flex p-4">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="mr-4 w-40 shrink-0 rounded-md bg-secondary p-4 text-center text-sm"
          >
            Horizontal Item {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const WithContent: Story = {
  render: () => (
    <ScrollArea className="h-72 w-72 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-lg font-medium">Terms of Service</h4>
        <p className="text-sm text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis fugit earum minima, 
          beatae facere quisquam itaque quae voluptatibus consequuntur, deleniti temporibus excepturi 
          tempora nisi ratione exercitationem esse autem? Accusantium, provident.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Ducimus mollitia deleniti consectetur officia, voluptate non dolorem. Nobis, incidunt 
          doloremque, neque iusto explicabo ipsum quasi illum rerum tempora facere sapiente aspernatur 
          exercitationem nemo quis nulla enim aut! Dolorum, perferendis.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Quam possimus sequi, atque similique nisi veritatis. Ea illo iure alias nisi voluptatum, 
          maxime perferendis voluptatibus officia cupiditate tenetur blanditiis quos ab porro, dolorem 
          beatae mollitia quas incidunt laboriosam. Illum.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Consequuntur nam deleniti, hic voluptate quae laudantium odit fugit eum possimus officia 
          commodi eligendi porro veritatis provident harum cumque accusantium iste eius? Recusandae 
          quod culpa dolorem, quis incidunt ullam illo!
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Tempora ipsam hic, sit commodi perferendis ratione? Ut, quod eaque? Architecto quas laboriosam 
          eligendi rem iure, aspernatur porro facere, amet minus explicabo veritatis illo, deleniti nemo 
          ducimus harum rerum? Rerum.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Eius laborum, voluptatem sequi odio iusto distinctio quam officia pariatur, beatae voluptate 
          minima quo totam a consectetur perspiciatis eum? Libero dolorum maiores magni neque est fugiat 
          consequuntur praesentium ipsa eligendi.
        </p>
      </div>
    </ScrollArea>
  ),
};

export const NestedScrollAreas: Story = {
  render: () => (
    <ScrollArea className="h-72 w-96 rounded-md border p-4">
      <h4 className="mb-4 text-sm font-medium">Outer Scroll Area</h4>
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          This is content in the outer scroll area.
        </p>
        <ScrollArea className="h-32 rounded-md border">
          <div className="p-4">
            <h4 className="mb-2 text-sm font-medium">Inner Scroll Area</h4>
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="mt-2 rounded-md bg-secondary p-2 text-xs">
                Inner Item {i + 1}
              </div>
            ))}
          </div>
        </ScrollArea>
        <p className="text-sm text-muted-foreground">
          More content in the outer scroll area.
        </p>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="rounded-md bg-secondary p-4 text-sm">
            Outer Item {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <ScrollArea className="h-72 w-48 rounded-md border bg-card p-4">
      <div className="grid grid-cols-1 gap-4">
        {Array.from({ length: 40 }).map((_, i) => (
          <div 
            key={i} 
            className="rounded-md p-2 text-center text-sm border border-border bg-background"
          >
            Item {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}; 