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
import { basename } from '@tauri-apps/api/path';
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
              'data-[state=active]:bg-accent data-[state=active]:text-accent-foreground',
              isActive && 'bg-accent text-accent-foreground'
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
                <Folder size={20} className="text-foreground" />
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
        "min-w-18 flex flex-col",
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
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="grid place-items-center w-10 h-10"
                    onClick={handleCreateProject}
                  >
                    <Plus size={20} className="text-foreground" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  New Project
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </ScrollArea>
      </div>

      {/* User Menu */}
      <div className="shrink-0 grid place-items-center py-4">
        <UserMenu />
      </div>
    </aside>
  );
} 