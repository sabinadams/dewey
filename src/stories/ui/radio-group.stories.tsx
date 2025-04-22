import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Label } from "../../components/ui/label";

const meta: Meta<typeof RadioGroup> = {
  title: "UI/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

// Basic example with simple options
export const Basic: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="option1" />
        <Label htmlFor="option1">Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="option2" />
        <Label htmlFor="option2">Option 2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option3" id="option3" />
        <Label htmlFor="option3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
};

// Example with a disabled option
export const WithDisabledOption: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="r1" />
        <Label htmlFor="r1">Available option</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="r2" disabled />
        <Label htmlFor="r2" className="text-muted-foreground">
          Disabled option
        </Label>
      </div>
    </RadioGroup>
  ),
};

// Example with horizontal layout
export const HorizontalLayout: Story = {
  render: () => (
    <RadioGroup defaultValue="option1" className="flex space-x-4">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="h1" />
        <Label htmlFor="h1">Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="h2" />
        <Label htmlFor="h2">Option 2</Label>
      </div>
    </RadioGroup>
  ),
};

// Example with custom styling
export const CustomStyling: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="option1"
          id="c1"
          className="border-primary data-[state=checked]:bg-primary/10"
        />
        <Label htmlFor="c1" className="font-semibold">
          Custom styled option
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="option2"
          id="c2"
          className="border-primary data-[state=checked]:bg-primary/10"
        />
        <Label htmlFor="c2" className="font-semibold">
          Custom styled option
        </Label>
      </div>
    </RadioGroup>
  ),
};

// Example with required selection and form integration
export const FormIntegration: Story = {
  render: () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert("Form submitted!");
      }}
    >
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold mb-2">
          Select an option (Required)
        </legend>
        <RadioGroup defaultValue="option1" required name="form-example">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option1" id="f1" />
            <Label htmlFor="f1">Option 1</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option2" id="f2" />
            <Label htmlFor="f2">Option 2</Label>
          </div>
        </RadioGroup>
        <button
          type="submit"
          className="bg-primary text-primary-foreground px-4 py-2 rounded"
        >
          Submit
        </button>
      </fieldset>
    </form>
  ),
};

// Example with description text
export const WithDescription: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option1" id="d1" />
          <div>
            <Label htmlFor="d1">Option with description</Label>
            <p className="text-sm text-muted-foreground">
              This option includes additional descriptive text below the label
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option2" id="d2" />
          <div>
            <Label htmlFor="d2">Another option</Label>
            <p className="text-sm text-muted-foreground">
              With its own description text
            </p>
          </div>
        </div>
      </div>
    </RadioGroup>
  ),
}; 