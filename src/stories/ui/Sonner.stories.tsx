import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { Meta, StoryObj } from "@storybook/react";
import { 
  Check, 
  AlertCircle, 
  Info, 
  Ban,
  Loader2 
} from "lucide-react";

const meta: Meta<typeof Toaster> = {
  title: "UI/Toaster",
  component: Toaster,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    position: {
      control: "select",
      options: [
        "top-left",
        "top-center",
        "top-right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ],
      description: "The position of the toast notifications",
      defaultValue: "bottom-right"
    },
    expand: {
      control: "boolean",
      description: "Whether to expand toasts to fit content",
      defaultValue: false
    },
    closeButton: {
      control: "boolean",
      description: "Whether to show a close button",
      defaultValue: true
    },
    offset: {
      control: "number",
      description: "Distance in pixels from the viewport edges",
      defaultValue: 16
    },
    duration: {
      control: "number", 
      description: "Default duration in milliseconds for toasts",
      defaultValue: 4000
    },
    richColors: {
      control: "boolean",
      description: "Whether to use rich colors for toasts",
      defaultValue: false
    }
  },
  decorators: [
    (Story) => (
      <div className="flex flex-col items-center justify-center gap-4">
        <Story />
      </div>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof Toaster>;

// ToastTrigger component to demonstrate various toast types
const ToastTrigger = () => {
  return (
    <div className="flex flex-wrap gap-4 max-w-[600px]">
      <Button onClick={() => toast('Default notification')}>
        Default Toast
      </Button>
      
      <Button onClick={() => toast.success('Successfully completed operation')}>
        Success Toast
      </Button>
      
      <Button onClick={() => toast.error('An error occurred')}>
        Error Toast
      </Button>
      
      <Button onClick={() => toast.info('For your information...')}>
        Info Toast
      </Button>
      
      <Button onClick={() => toast.warning('Warning: approaching limit')}>
        Warning Toast
      </Button>
      
      <Button onClick={() => 
        toast.promise(
          // Simulating an async operation
          new Promise(resolve => setTimeout(resolve, 2000)),
          {
            loading: 'Loading...',
            success: 'Operation completed successfully',
            error: 'Operation failed'
          }
        )
      }>
        Promise Toast
      </Button>
      
      <Button onClick={() => toast.loading('Loading resources...')}>
        Loading Toast
      </Button>
    </div>
  );
};

// Base Toaster example with default settings
export const Default: Story = {
  render: () => (
    <>
      <ToastTrigger />
      <Toaster />
    </>
  ),
};

// Custom position examples
export const Positions: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Button onClick={() => toast('Top Left Notification', {
          position: 'top-left'
        })}>
          Top Left
        </Button>
        
        <Button onClick={() => toast('Top Center Notification', {
          position: 'top-center'
        })}>
          Top Center
        </Button>
        
        <Button onClick={() => toast('Top Right Notification', {
          position: 'top-right'
        })}>
          Top Right
        </Button>
        
        <Button onClick={() => toast('Bottom Left Notification', {
          position: 'bottom-left'
        })}>
          Bottom Left
        </Button>
        
        <Button onClick={() => toast('Bottom Center Notification', {
          position: 'bottom-center'
        })}>
          Bottom Center
        </Button>
        
        <Button onClick={() => toast('Bottom Right Notification', {
          position: 'bottom-right'
        })}>
          Bottom Right
        </Button>
      </div>
      <Toaster />
    </div>
  ),
};

// Custom styling with icons
export const CustomStyling: Story = {
  render: () => (
    <>
      <div className="flex flex-wrap gap-4">
        <Button onClick={() => 
          toast('Operation completed', {
            icon: <Check className="h-4 w-4 text-green-500" />,
            className: 'border-l-4 border-green-500',
          })
        }>
          With Success Icon
        </Button>
        
        <Button onClick={() => 
          toast('Critical alert', {
            icon: <AlertCircle className="h-4 w-4 text-red-500" />,
            className: 'border-l-4 border-red-500',
          })
        }>
          With Error Icon
        </Button>
        
        <Button onClick={() => 
          toast('Information message', {
            icon: <Info className="h-4 w-4 text-blue-500" />,
            className: 'border-l-4 border-blue-500',
          })
        }>
          With Info Icon
        </Button>
        
        <Button onClick={() => 
          toast('Warning alert', {
            icon: <Ban className="h-4 w-4 text-yellow-500" />,
            className: 'border-l-4 border-yellow-500',
          })
        }>
          With Warning Icon
        </Button>
      </div>
      <Toaster />
    </>
  ),
};

// Different durations
export const Durations: Story = {
  render: () => (
    <>
      <div className="flex flex-wrap gap-4">
        <Button onClick={() => 
          toast('Quick notification', { duration: 1000 })
        }>
          1s Duration
        </Button>
        
        <Button onClick={() => 
          toast('Standard notification', { duration: 4000 })
        }>
          4s Duration (Default)
        </Button>
        
        <Button onClick={() => 
          toast('Long notification', { duration: 8000 })
        }>
          8s Duration
        </Button>
        
        <Button onClick={() => 
          toast('Persistent notification', { duration: Infinity })
        }>
          Persistent (No Auto-Close)
        </Button>
      </div>
      <Toaster />
    </>
  ),
};

// Rich colored toasts
export const RichColors: Story = {
  render: () => (
    <>
      <div className="flex flex-wrap gap-4">
        <Button onClick={() => toast('Default with rich colors')}>
          Default
        </Button>
        
        <Button onClick={() => toast.success('Success with rich colors')}>
          Success
        </Button>
        
        <Button onClick={() => toast.error('Error with rich colors')}>
          Error
        </Button>
        
        <Button onClick={() => toast.info('Info with rich colors')}>
          Info
        </Button>
        
        <Button onClick={() => toast.warning('Warning with rich colors')}>
          Warning
        </Button>
      </div>
      <Toaster richColors />
    </>
  ),
};

// Interactive toasts with action buttons
export const WithActions: Story = {
  render: () => (
    <>
      <div className="flex flex-wrap gap-4">
        <Button onClick={() => 
          toast('Confirm your action', {
            action: {
              label: 'Confirm',
              onClick: () => toast.success('Action confirmed!')
            },
          })
        }>
          With Confirm Action
        </Button>
        
        <Button onClick={() => 
          toast('Changes saved', {
            action: {
              label: 'Undo',
              onClick: () => toast.info('Changes undone')
            },
            cancel: {
              label: 'Dismiss',
              onClick: () => console.log('Dismissed')
            }
          })
        }>
          With Undo/Dismiss
        </Button>
        
        <Button onClick={() => 
          toast('Multiple actions available', {
            description: 'You can choose from these options',
            action: {
              label: 'Accept',
              onClick: () => toast.success('Accepted')
            },
            cancel: {
              label: 'Reject',
              onClick: () => toast.error('Rejected')
            }
          })
        }>
          With Description & Actions
        </Button>
      </div>
      <Toaster />
    </>
  ),
};

// Custom content
export const CustomContent: Story = {
  render: () => (
    <>
      <div className="flex flex-wrap gap-4">
        <Button onClick={() => 
          toast('Custom styled toast', {
            className: 'bg-blue-50 border-blue-200',
            description: 'This is a customized description with specialized styling',
            icon: <Info className="h-4 w-4 text-blue-500" />,
            style: { padding: '16px' }
          })
        }>
          Styled Toast
        </Button>
        
        <Button onClick={() => 
          toast('Toast with HTML content', {
            description: (
              <div className="mt-2">
                <p>This toast contains <strong>formatted</strong> <em>HTML content</em> in the description.</p>
                <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
                  And even a code-like block!
                </div>
              </div>
            )
          })
        }>
          HTML Content Toast
        </Button>
      </div>
      <Toaster />
    </>
  ),
};

// Toast with different expand values
export const ExpandBehavior: Story = {
  render: () => (
    <>
      <div className="flex flex-wrap gap-4">
        <Button onClick={() => 
          toast('This is a very long notification message that will wrap to multiple lines. This demonstrates how the expand property affects the layout of toast notifications with varying amounts of content.')
        }>
          Long Content (expand=false)
        </Button>
        
        <Button onClick={() => 
          toast('Short message')
        }>
          Short Content (expand=false)
        </Button>
      </div>
      <Toaster expand={false} />
      
      <div className="h-8" />
      
      <div className="flex flex-wrap gap-4">
        <Button onClick={() => 
          toast('This is a very long notification message that will wrap to multiple lines. This demonstrates how the expand property affects the layout of toast notifications with varying amounts of content.')
        }>
          Long Content (expand=true)
        </Button>
        
        <Button onClick={() => 
          toast('Short message')
        }>
          Short Content (expand=true)
        </Button>
      </div>
      <Toaster expand={true} />
    </>
  ),
};

// Close button options
export const CloseButtonOptions: Story = {
  render: () => (
    <>
      <div className="flex flex-wrap gap-4">
        <Button onClick={() => 
          toast('Notification with close button')
        }>
          With Close Button
        </Button>
      </div>
      <Toaster closeButton={true} />
      
      <div className="h-8" />
      
      <div className="flex flex-wrap gap-4">
        <Button onClick={() => 
          toast('Notification without close button')
        }>
          Without Close Button
        </Button>
      </div>
      <Toaster closeButton={false} />
    </>
  ),
}; 