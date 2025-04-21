import * as React from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Meta, StoryObj } from "@storybook/react";
import { File, Settings, Users, Layout, CircleHelp } from "lucide-react";

const meta: Meta<typeof Tabs> = {
  title: "UI/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    className: {
      description: "Additional CSS class names",
      type: "string"
    },
    defaultValue: {
      description: "The default selected tab value",
      type: "string"
    },
    value: {
      description: "The controlled tab value (when using controlled mode)",
      type: "string"
    },
    onValueChange: {
      description: "Callback that fires when the tab selection changes",
      action: "valueChanged"
    }
  }
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-full max-w-3xl">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="p-4 border rounded-md mt-2">
        <h3 className="text-lg font-medium mb-2">Account Settings</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Manage your account information and preferences.
        </p>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">Name</label>
            <Input id="name" placeholder="Your name" />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <Input id="email" type="email" placeholder="Your email" />
          </div>
          <Button>Save Changes</Button>
        </div>
      </TabsContent>
      <TabsContent value="password" className="p-4 border rounded-md mt-2">
        <h3 className="text-lg font-medium mb-2">Password Settings</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Update your password to keep your account secure.
        </p>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="current" className="text-sm font-medium">Current Password</label>
            <Input id="current" type="password" />
          </div>
          <div className="space-y-2">
            <label htmlFor="new" className="text-sm font-medium">New Password</label>
            <Input id="new" type="password" />
          </div>
          <div className="space-y-2">
            <label htmlFor="confirm" className="text-sm font-medium">Confirm Password</label>
            <Input id="confirm" type="password" />
          </div>
          <Button>Update Password</Button>
        </div>
      </TabsContent>
      <TabsContent value="settings" className="p-4 border rounded-md mt-2">
        <h3 className="text-lg font-medium mb-2">General Settings</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Configure your application preferences.
        </p>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive email notifications</p>
            </div>
            <div className="h-6 w-11 rounded-full bg-muted relative cursor-pointer" role="switch" aria-checked="true">
              <div className="absolute h-5 w-5 rounded-full bg-foreground transform translate-x-5 translate-y-[2px]"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Dark Mode</p>
              <p className="text-sm text-muted-foreground">Enable dark mode</p>
            </div>
            <div className="h-6 w-11 rounded-full bg-primary relative cursor-pointer" role="switch" aria-checked="true">
              <div className="absolute h-5 w-5 rounded-full bg-white transform translate-x-5 translate-y-[2px]"></div>
            </div>
          </div>
          <Button className="mt-2">Save Preferences</Button>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="users" className="w-full max-w-3xl">
      <TabsList className="w-full">
        <TabsTrigger value="users">
          <Users className="h-4 w-4 mr-2" />
          Users
        </TabsTrigger>
        <TabsTrigger value="settings">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </TabsTrigger>
        <TabsTrigger value="content">
          <Layout className="h-4 w-4 mr-2" />
          Content
        </TabsTrigger>
        <TabsTrigger value="help">
          <CircleHelp className="h-4 w-4 mr-2" />
          Help
        </TabsTrigger>
      </TabsList>
      {["users", "settings", "content", "help"].map((tab) => (
        <TabsContent key={tab} value={tab} className="p-4 border rounded-md mt-2">
          <h3 className="text-lg font-medium capitalize mb-2">{tab}</h3>
          <p className="text-sm text-muted-foreground">
            This is the {tab} tab content. You can put any content here.
          </p>
        </TabsContent>
      ))}
    </Tabs>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex gap-4 w-full max-w-3xl">
      <Tabs defaultValue="tab1" orientation="vertical" className="w-full">
        <TabsList className="flex-col h-auto w-48">
          <TabsTrigger value="tab1" className="justify-start">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2" className="justify-start">Tab 2</TabsTrigger>
          <TabsTrigger value="tab3" className="justify-start">Tab 3</TabsTrigger>
        </TabsList>
        <div className="flex-1">
          <TabsContent value="tab1" className="p-4 border rounded-md">
            <h3 className="text-lg font-medium mb-2">Tab 1 Content</h3>
            <p className="text-sm text-muted-foreground">
              This is the content for tab 1. The tabs are displayed vertically.
            </p>
          </TabsContent>
          <TabsContent value="tab2" className="p-4 border rounded-md">
            <h3 className="text-lg font-medium mb-2">Tab 2 Content</h3>
            <p className="text-sm text-muted-foreground">
              This is the content for tab 2. The tabs are displayed vertically.
            </p>
          </TabsContent>
          <TabsContent value="tab3" className="p-4 border rounded-md">
            <h3 className="text-lg font-medium mb-2">Tab 3 Content</h3>
            <p className="text-sm text-muted-foreground">
              This is the content for tab 3. The tabs are displayed vertically.
            </p>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  ),
};

export const FileTabsExample: Story = {
  render: () => (
    <Tabs defaultValue="file1" className="w-full max-w-3xl">
      <TabsList className="w-full">
        <TabsTrigger value="file1">
          <File className="h-4 w-4 mr-2" />
          index.tsx
        </TabsTrigger>
        <TabsTrigger value="file2">
          <File className="h-4 w-4 mr-2" />
          styles.css
        </TabsTrigger>
        <TabsTrigger value="file3">
          <File className="h-4 w-4 mr-2" />
          utils.ts
        </TabsTrigger>
      </TabsList>
      <TabsContent value="file1" className="p-4 bg-muted rounded-md mt-2 font-mono text-sm">
        <pre>{`
import React from 'react';
import styles from './styles.css';
import { formatDate } from './utils';

function App() {
  return (
    <div className="app">
      <h1>Hello World</h1>
      <p>Today is {formatDate(new Date())}</p>
    </div>
  );
}

export default App;
        `.trim()}</pre>
      </TabsContent>
      <TabsContent value="file2" className="p-4 bg-muted rounded-md mt-2 font-mono text-sm">
        <pre>{`
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #333;
  font-size: 2rem;
}

p {
  color: #666;
}
        `.trim()}</pre>
      </TabsContent>
      <TabsContent value="file3" className="p-4 bg-muted rounded-md mt-2 font-mono text-sm">
        <pre>{`
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}
        `.trim()}</pre>
      </TabsContent>
    </Tabs>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [activeTab, setActiveTab] = React.useState("tab1");
    
    return (
      <div className="space-y-4 w-full max-w-3xl">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setActiveTab("tab1")}
            className={activeTab === "tab1" ? "bg-secondary" : ""}
          >
            Set Tab 1
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setActiveTab("tab2")}
            className={activeTab === "tab2" ? "bg-secondary" : ""}
          >
            Set Tab 2
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setActiveTab("tab3")}
            className={activeTab === "tab3" ? "bg-secondary" : ""}
          >
            Set Tab 3
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Current active tab: <span className="font-medium">{activeTab}</span>
        </p>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium">Controlled Tab 1</h3>
            <p className="text-sm text-muted-foreground">
              This tab's state is controlled programmatically.
            </p>
          </TabsContent>
          <TabsContent value="tab2" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium">Controlled Tab 2</h3>
            <p className="text-sm text-muted-foreground">
              You can change tabs using the buttons above.
            </p>
          </TabsContent>
          <TabsContent value="tab3" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium">Controlled Tab 3</h3>
            <p className="text-sm text-muted-foreground">
              This demonstrates controlled tabs with external state.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    );
  },
};

export const CustomStyling: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-full max-w-3xl">
      <TabsList className="bg-background border border-input p-1">
        <TabsTrigger 
          value="tab1" 
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-sm"
        >
          Custom Tab 1
        </TabsTrigger>
        <TabsTrigger 
          value="tab2" 
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-sm"
        >
          Custom Tab 2
        </TabsTrigger>
        <TabsTrigger 
          value="tab3" 
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-sm"
        >
          Custom Tab 3
        </TabsTrigger>
      </TabsList>
      {["tab1", "tab2", "tab3"].map((tab, i) => (
        <TabsContent 
          key={tab} 
          value={tab} 
          className="p-4 bg-accent/20 border border-accent rounded-md mt-2"
        >
          <h3 className="text-lg font-medium">Custom Styled Tab {i + 1}</h3>
          <p className="text-sm text-muted-foreground">
            This demonstrates custom styling for tabs and content.
          </p>
        </TabsContent>
      ))}
    </Tabs>
  ),
};

export const DisabledTabs: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-full max-w-3xl">
      <TabsList>
        <TabsTrigger value="tab1">Enabled</TabsTrigger>
        <TabsTrigger value="tab2">Enabled</TabsTrigger>
        <TabsTrigger value="tab3" disabled>Disabled</TabsTrigger>
        <TabsTrigger value="tab4" disabled>Disabled</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="p-4 border rounded-md mt-2">
        <h3 className="text-lg font-medium">Enabled Tab Content</h3>
        <p className="text-sm text-muted-foreground">
          This is an enabled tab. Note that some tabs are disabled and cannot be selected.
        </p>
      </TabsContent>
      <TabsContent value="tab2" className="p-4 border rounded-md mt-2">
        <h3 className="text-lg font-medium">Another Enabled Tab</h3>
        <p className="text-sm text-muted-foreground">
          This is another enabled tab. The disabled tabs will not show their content.
        </p>
      </TabsContent>
      <TabsContent value="tab3" className="p-4 border rounded-md mt-2">
        <h3 className="text-lg font-medium">Disabled Tab Content</h3>
        <p className="text-sm text-muted-foreground">
          This content will not be displayed since its tab is disabled.
        </p>
      </TabsContent>
      <TabsContent value="tab4" className="p-4 border rounded-md mt-2">
        <h3 className="text-lg font-medium">Another Disabled Tab</h3>
        <p className="text-sm text-muted-foreground">
          This content will not be displayed since its tab is disabled.
        </p>
      </TabsContent>
    </Tabs>
  ),
};

export const DynamicTabs: Story = {
  render: () => {
    const tabs = [
      { id: "tab1", label: "First Tab", content: "Content for the first tab" },
      { id: "tab2", label: "Second Tab", content: "Content for the second tab" },
      { id: "tab3", label: "Third Tab", content: "Content for the third tab" },
      { id: "tab4", label: "Fourth Tab", content: "Content for the fourth tab" },
    ];
    
    return (
      <Tabs defaultValue="tab1" className="w-full max-w-3xl">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium">{tab.label}</h3>
            <p className="text-sm text-muted-foreground">
              {tab.content}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              This example demonstrates dynamically generating tabs from an array of data.
            </p>
          </TabsContent>
        ))}
      </Tabs>
    );
  },
}; 