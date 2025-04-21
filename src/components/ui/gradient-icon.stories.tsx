import type { Meta, StoryObj } from "@storybook/react"
import { GradientIcon } from "./gradient-icon"
import { 
  Sparkles, 
  Heart, 
  Star, 
  Sun, 
  Moon, 
  Github,
  CircleDot,
  Activity,
  Zap
} from "lucide-react"

const meta: Meta<typeof GradientIcon> = {
  title: "UI/GradientIcon",
  component: GradientIcon,
  tags: ["autodocs"],
  argTypes: {
    icon: {
      control: "select",
      options: ["Sparkles", "Heart", "Star", "Sun", "Moon", "Github", "CircleDot", "Activity", "Zap"],
      mapping: {
        Sparkles,
        Heart,
        Star,
        Sun,
        Moon,
        Github,
        CircleDot,
        Activity,
        Zap
      }
    },
    size: {
      control: { type: "range", min: 16, max: 96, step: 4 }
    },
    gradient: {
      control: "object"
    }
  }
}

export default meta
type Story = StoryObj<typeof GradientIcon>

// Default example with Sparkles icon
export const Default: Story = {
  args: {
    icon: Sparkles,
    size: 24
  }
}

// Larger size example
export const Large: Story = {
  args: {
    icon: Star,
    size: 48
  }
}

// Custom gradient colors
export const CustomGradient: Story = {
  args: {
    icon: Heart,
    size: 32,
    gradient: {
      from: "rgb(34, 197, 94)", // green-500
      via: "rgb(59, 130, 246)", // blue-500
      to: "rgb(139, 92, 246)"   // violet-500
    }
  }
}

// Two-color gradient (no via color)
export const TwoColorGradient: Story = {
  args: {
    icon: Sun,
    size: 32,
    gradient: {
      from: "rgb(234, 179, 8)",  // yellow-500
      to: "rgb(239, 68, 68)"     // red-500
    }
  }
}

// Grid of different icons with the same gradient
export const IconGrid: Story = {
  decorators: [
    (Story) => (
      <div className="grid grid-cols-3 gap-4">
        <GradientIcon icon={Sparkles} size={32} />
        <GradientIcon icon={Heart} size={32} />
        <GradientIcon icon={Star} size={32} />
        <GradientIcon icon={Sun} size={32} />
        <GradientIcon icon={Moon} size={32} />
        <GradientIcon icon={Github} size={32} />
        <GradientIcon icon={CircleDot} size={32} />
        <GradientIcon icon={Activity} size={32} />
        <GradientIcon icon={Zap} size={32} />
      </div>
    )
  ]
}

// Size comparison
export const SizeComparison: Story = {
  decorators: [
    (Story) => (
      <div className="flex items-end gap-4">
        <GradientIcon icon={Star} size={16} />
        <GradientIcon icon={Star} size={24} />
        <GradientIcon icon={Star} size={32} />
        <GradientIcon icon={Star} size={48} />
        <GradientIcon icon={Star} size={64} />
      </div>
    )
  ]
}

// Different gradient examples
export const GradientVariations: Story = {
  decorators: [
    (Story) => (
      <div className="flex gap-4">
        {/* Default - Purple to Rose */}
        <GradientIcon 
          icon={Heart} 
          size={32} 
          gradient={{
            from: "rgb(192, 132, 252)", // purple-400
            via: "rgb(244, 114, 182)", // pink-400
            to: "rgb(251, 113, 133)"  // rose-400
          }}
        />
        {/* Emerald to Sky */}
        <GradientIcon 
          icon={Heart} 
          size={32} 
          gradient={{
            from: "rgb(52, 211, 153)", // emerald-400
            via: "rgb(56, 189, 248)", // sky-400
            to: "rgb(96, 165, 250)"  // blue-400
          }}
        />
        {/* Amber to Orange */}
        <GradientIcon 
          icon={Heart} 
          size={32} 
          gradient={{
            from: "rgb(251, 191, 36)", // amber-400
            to: "rgb(251, 146, 60)"   // orange-400
          }}
        />
        {/* Indigo to Violet */}
        <GradientIcon 
          icon={Heart} 
          size={32} 
          gradient={{
            from: "rgb(129, 140, 248)", // indigo-400
            via: "rgb(167, 139, 250)", // violet-400
            to: "rgb(232, 121, 249)"   // fuchsia-400
          }}
        />
      </div>
    )
  ]
}

// Modern Vibrant Examples
export const VibrantGradients: Story = {
  decorators: [
    (Story) => (
      <div className="flex gap-4">
        {/* Teal to Cyan */}
        <GradientIcon 
          icon={Star} 
          size={32} 
          gradient={{
            from: "rgb(45, 212, 191)", // teal-400
            via: "rgb(34, 211, 238)", // cyan-400
            to: "rgb(56, 189, 248)"   // sky-400
          }}
        />
        {/* Lime to Green */}
        <GradientIcon 
          icon={Star} 
          size={32} 
          gradient={{
            from: "rgb(163, 230, 53)", // lime-400
            to: "rgb(74, 222, 128)"    // green-400
          }}
        />
        {/* Yellow to Red */}
        <GradientIcon 
          icon={Star} 
          size={32} 
          gradient={{
            from: "rgb(250, 204, 21)", // yellow-400
            via: "rgb(251, 146, 60)",  // orange-400
            to: "rgb(248, 113, 113)"   // red-400
          }}
        />
        {/* Blue to Violet */}
        <GradientIcon 
          icon={Star} 
          size={32} 
          gradient={{
            from: "rgb(96, 165, 250)", // blue-400
            to: "rgb(167, 139, 250)"   // violet-400
          }}
        />
      </div>
    )
  ]
}

// Modern Pastel Examples
export const PastelGradients: Story = {
  decorators: [
    (Story) => (
      <div className="flex gap-4">
        {/* Teal to Blue */}
        <GradientIcon 
          icon={Star} 
          size={32} 
          gradient={{
            from: "rgb(153, 246, 228)", // teal-200
            via: "rgb(196, 231, 252)", // light-blue-200
            to: "rgb(191, 219, 254)"   // blue-200
          }}
        />
        {/* Lime to Green */}
        <GradientIcon 
          icon={Star} 
          size={32} 
          gradient={{
            from: "rgb(217, 249, 157)", // lime-200
            to: "rgb(187, 247, 208)"    // green-200
          }}
        />
        {/* Yellow to Orange */}
        <GradientIcon 
          icon={Star} 
          size={32} 
          gradient={{
            from: "rgb(254, 240, 138)", // yellow-200
            via: "rgb(253, 224, 71)",   // yellow-300
            to: "rgb(254, 215, 170)"    // orange-200
          }}
        />
        {/* Rose to Pink */}
        <GradientIcon 
          icon={Star} 
          size={32} 
          gradient={{
            from: "rgb(254, 205, 211)", // rose-200
            to: "rgb(251, 207, 232)"    // pink-200
          }}
        />
      </div>
    )
  ]
} 