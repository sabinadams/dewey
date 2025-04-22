import type { Meta, StoryObj } from '@storybook/react';
import { ValidatedFormField } from '@/components/ui/form-field';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { within, userEvent } from '@storybook/test';

const formSchema = z.object({
  username: z.string().min(2, 'Username must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
});

type FormData = z.infer<typeof formSchema>;

const StoryForm = (Story: any, { args }: any) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
    },
    mode: 'onChange'
  });

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Story args={{ ...args, form }} />
      </form>
    </Form>
  );
};

const meta = {
  title: 'UI/ValidatedFormField',
  component: ValidatedFormField,
  parameters: {
    layout: 'centered',
  },
  decorators: [StoryForm],
  tags: ['autodocs'],
} satisfies Meta<typeof ValidatedFormField>;

export default meta;

type Story = StoryObj<typeof ValidatedFormField>;

export const Untouched: Story = {
  args: {
    name: 'username',
    label: 'Username',
    inputProps: {
      placeholder: 'Enter your username',
    },
  },
};

export const Valid: Story = {
  args: {
    name: 'username',
    label: 'Username',
    inputProps: {
      placeholder: 'Enter your username',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('Enter your username');
    
    await userEvent.type(input, 'validusername');
    await userEvent.tab();
  },
};

export const Invalid: Story = {
  args: {
    name: 'username',
    label: 'Username',
    description: <p className="text-sm text-muted-foreground">Must be at least 2 characters</p>,
    inputProps: {
      placeholder: 'Enter your username',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('Enter your username');
    
    await userEvent.type(input, 'a');
    await userEvent.tab();
  },
};

export const InvalidEmail: Story = {
  args: {
    name: 'email',
    label: 'Email',
    description: <p className="text-sm text-muted-foreground">Enter a valid email address</p>,
    inputProps: {
      type: 'email',
      placeholder: 'Enter your email',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('Enter your email');
    
    await userEvent.type(input, 'invalid-email');
    await userEvent.tab();
  },
};

export const Disabled: Story = {
  args: {
    name: 'username',
    label: 'Username',
    inputProps: {
      placeholder: 'Enter your username',
      disabled: true,
    },
  },
}; 