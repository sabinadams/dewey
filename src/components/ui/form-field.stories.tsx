import type { Meta, StoryObj } from '@storybook/react';
import { ValidatedFormField } from './form-field';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from './form';
import { within, userEvent, expect } from '@storybook/test';

const formSchema = z.object({
  username: z.string().min(2, 'Username must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type FormData = z.infer<typeof formSchema>;

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        {children}
      </form>
    </Form>
  );
};

type Story = StoryObj<typeof ValidatedFormField>;

const meta = {
  title: 'UI/ValidatedFormField',
  component: ValidatedFormField,
  parameters: {
    layout: 'centered',
  },
  render: (args) => {
    const form = useForm<FormData>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: '',
        email: '',
        password: '',
      },
    });
    return <ValidatedFormField {...args} form={form} />;
  },
  decorators: [
    (Story) => (
      <FormWrapper>
        <Story />
      </FormWrapper>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof ValidatedFormField>;

export default meta;

export const Default: Story = {
  args: {
    name: 'username',
    label: 'Username',
    inputProps: {
      placeholder: 'Enter your username',
    },
  },
};

export const WithDescription: Story = {
  args: {
    name: 'username',
    label: 'Username',
    description: <p className="text-sm text-muted-foreground">This will be your public display name</p>,
    inputProps: {
      placeholder: 'Enter your username',
    },
  },
};

export const WithValidation: Story = {
  args: {
    name: 'email',
    label: 'Email',
    inputProps: {
      placeholder: 'Enter your email',
      type: 'email',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('Enter your email');
    
    await userEvent.type(input, 'invalid-email');
    await userEvent.tab(); // Trigger blur event
    
    // Wait for error message
    await expect(canvas.getByText('Invalid email address')).toBeInTheDocument();
  },
};

export const Password: Story = {
  args: {
    name: 'password',
    label: 'Password',
    inputProps: {
      type: 'password',
      placeholder: '••••••••',
    },
  },
};

export const WithCustomClassName: Story = {
  args: {
    name: 'username',
    label: 'Username',
    className: 'w-[400px]',
    inputProps: {
      placeholder: 'Enter your username',
    },
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

export const WithError: Story = {
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
    
    await userEvent.type(input, 'a');
    await userEvent.tab(); // Trigger blur event
    
    // Wait for error message
    await expect(canvas.getByText('Username must be at least 2 characters')).toBeInTheDocument();
  },
}; 