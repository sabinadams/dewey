import type { Meta, StoryObj } from "@storybook/react"
import { Textarea } from "./textarea"

const meta = {
  title: "UI/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
      description: "Whether the textarea is disabled",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text to show when empty",
    },
    rows: {
      control: { type: "number", min: 1, max: 20 },
      description: "Number of visible text lines",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

// Base story with default styling
export const Default: Story = {
  args: {
    placeholder: "Type your message here.",
  },
}

// Disabled state
export const Disabled: Story = {
  args: {
    placeholder: "This textarea is disabled",
    disabled: true,
  },
}

// With initial value
export const WithValue: Story = {
  args: {
    value: "This is some initial content in the textarea.\nIt can span multiple lines.",
  },
}

// Custom height
export const CustomHeight: Story = {
  args: {
    placeholder: "This textarea has 10 visible lines",
    rows: 10,
  },
}

// Error state
export const Error: Story = {
  args: {
    placeholder: "This textarea shows an error state",
    className: "border-red-500 focus-visible:ring-red-500",
  },
}

// Success state
export const Success: Story = {
  args: {
    placeholder: "This textarea shows a success state",
    className: "border-green-500 focus-visible:ring-green-500",
  },
}

// Read-only
export const ReadOnly: Story = {
  args: {
    value: "This content is read-only and cannot be modified.",
    readOnly: true,
  },
}

// Required
export const Required: Story = {
  args: {
    placeholder: "This field is required",
    required: true,
  },
}

// With max length
export const WithMaxLength: Story = {
  args: {
    placeholder: "Limited to 50 characters",
    maxLength: 50,
  },
}

// Resizable
export const Resizable: Story = {
  args: {
    placeholder: "This textarea can be resized",
    className: "resize-y",
  },
}

// Full width
export const FullWidth: Story = {
  args: {
    placeholder: "This textarea takes up the full width",
    className: "w-full",
  },
  parameters: {
    layout: "padded",
  },
}

// With label and description (using render function)
export const WithLabelAndDescription: Story = {
  render: () => (
    <div className="space-y-2">
      <label 
        htmlFor="message" 
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Your message
      </label>
      <Textarea
        id="message"
        placeholder="Type your message here."
      />
      <p className="text-sm text-muted-foreground">
        Your message will be sent to our support team.
      </p>
    </div>
  ),
}

// Form example (using render function)
export const FormExample: Story = {
  render: () => (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      <div className="space-y-2">
        <label 
          htmlFor="feedback" 
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Feedback
        </label>
        <Textarea
          id="feedback"
          placeholder="Share your thoughts..."
          required
          className="min-h-[100px]"
        />
        <p className="text-sm text-muted-foreground">
          Please provide your feedback in detail.
        </p>
      </div>
      <button 
        type="submit"
        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
      >
        Submit Feedback
      </button>
    </form>
  ),
  parameters: {
    layout: "padded",
  },
} 