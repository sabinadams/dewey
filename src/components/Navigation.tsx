import { NavLink } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import * as DeweyLogo from '@/assets/dewey.svg';
import { UserMenu } from '@/components/UserMenu';
import { Folder, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea } from './ui/scroll-area';
import { Button, buttonVariants } from './ui/button';
import { createProject } from '@/store/slices/projectsSlice';
import { useAuth } from '@clerk/clerk-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useEffect, useState } from 'react';

interface NavItemProps {
  to: string;
  icon?: React.ReactNode;
  label: string;
  imageSrc?: string;
  active?: boolean;
}

function NavItem({ to, label, imageSrc, active }: NavItemProps) {
  const [iconUrl, setIconUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function loadIconUrl() {
      if (imageSrc) {
        const parts = imageSrc.split(/[/\\]/);
        const filename = parts[parts.length - 1];
        if (filename) {
          setIconUrl(`icon://${filename}`);
        }
      }
    }
    loadIconUrl();
  }, [imageSrc]);

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          buttonVariants({
            variant: "ghost",
            size: "icon",
            className: cn(
              'w-10 h-10 p-0 grid place-items-center rounded-lg transition-colors',
              'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
              'data-[state=active]:bg-sidebar-accent data-[state=active]:text-sidebar-accent-foreground',
              isActive && 'bg-sidebar-accent text-sidebar-accent-foreground'
            )
          })
        )
      }
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="grid place-items-center w-8 h-8">
              {iconUrl ? (
                <img 
                  src={iconUrl} 
                  alt={label} 
                  className="w-8 h-8 rounded"
                />
              ) : (
                <Folder size={20} className="text-sidebar-foreground" />
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </NavLink>
  );
}

export function Navigation() {
  const { isMac } = useAppSelector(state => state.system);
  const projects = useAppSelector(state => state.projects.items);
  const dispatch = useAppDispatch();
  const { userId } = useAuth();

  const handleCreateProject = () => {
    if (userId) {
      dispatch(createProject(userId));
    }
  };

  return (
    <aside 
      className={cn(
        "min-w-18 flex flex-col text-sidebar-foreground",
        isMac ? "mt-10" : "",
        "h-[calc(100vh-2.5rem)]"
      )}
    >
      {/* Top Section with Logo */}
      <div className="shrink-0 grid place-items-center pb-2 pt-2">
        <img src={DeweyLogo.default} className="w-12 h-12" alt="Dewey Logo" />
      </div>

      {/* Projects Navigation */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="grid auto-rows-max justify-items-center gap-3 p-2">
            {projects.map(project => (
              <NavItem
                key={project.id}
                to={`/project/${project.id}`}
                imageSrc={project.icon_path || undefined}
                label={project.name}
              />
            ))}
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="grid place-items-center w-10 h-10 border border-sidebar-border rounded-lg hover:bg-sidebar-accent cursor-pointer"
                      onClick={handleCreateProject}
                    >
                      <Plus size={20} className="text-sidebar-foreground" />
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>New Project</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </ScrollArea>
      </div>

      {/* Bottom Section with Theme Toggle and User Menu */}
      <div className="shrink-0 grid place-items-center gap-2 py-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <ThemeToggle />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Toggle Theme</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <UserMenu />
      </div>
    </aside>
  );
} 