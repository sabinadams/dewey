import { NavLink } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import * as DeweyLogo from '@/assets/dewey.svg';
import { UserMenu } from '@/components/UserMenu';
import { Folder, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import { createProject } from '@/store/slices/projectsSlice';
import { useAuth } from '@clerk/clerk-react';
import { basename } from '@tauri-apps/api/path';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface NavItemProps {
  to: string;
  icon?: React.ReactNode;
  label: string;
  imageSrc?: string;
}

function NavItem({ to, label, imageSrc }: NavItemProps) {
  const iconUrl = imageSrc ? `icon://${basename(imageSrc)}` : undefined;
  console.log(iconUrl);
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'w-10 h-10 grid place-items-center rounded-lg transition-colors',
          'hover:bg-zinc-200 dark:hover:bg-zinc-800',
          isActive && 'bg-zinc-200 dark:bg-zinc-800'
        )
      }
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="grid place-items-center w-6 h-6">
              {iconUrl ? (
                <img 
                  src={iconUrl} 
                  alt={label} 
                  className="w-6 h-6 rounded"
                />
              ) : (
                <Folder size={20} />
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
    <aside className={`min-w-18 flex flex-col ${isMac ? 'mt-10 ' : ''} h-[calc(100vh-2.5rem)]`}>
      {/* Top Section with Logo */}
      <div className="shrink-0 grid place-items-center pb-2">
        <img src={DeweyLogo.default} className="w-12 h-12" alt="Dewey Logo" />
      </div>

      {/* Projects Navigation */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="grid auto-rows-max justify-items-center gap-2 p-2">
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
                    <div className="grid place-items-center w-6 h-6">
                      <Plus size={20} />
                    </div>
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