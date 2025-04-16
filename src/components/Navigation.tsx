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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

function NavItem({ to, icon, label }: NavItemProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <NavLink
          to={to}
          className={({ isActive }) =>
            cn(
              "relative grid place-items-center w-10 h-10 rounded-lg transition-colors",
              isActive ? "bg-zinc-700 text-white" : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
            )
          }
        >
          <div className="flex items-center justify-center">
            {icon}
          </div>
        </NavLink>
      </TooltipTrigger>
      <TooltipContent side="right">
        {label}
      </TooltipContent>
    </Tooltip>
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
    <aside className={`w-[72px] flex flex-col ${isMac ? 'mt-10' : 'mt-0'}`}>
      {/* Top Section with Logo */}
      <div className="grid place-items-center pb-2">
        <img src={DeweyLogo.default} className="w-12 h-12" alt="Dewey Logo" />
      </div>

      {/* Projects Navigation */}
      <nav className="flex-1 min-h-0">
        <ScrollArea>
          <div className="grid auto-rows-max justify-items-center gap-2 py-2">
            {projects.map(project => (
              <NavItem
                key={project.id}
                to={`/project/${project.id}`}
                icon={<Folder size={20} />}
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
      </nav>

      {/* User Menu */}
      <div className="grid place-items-center py-4">
        <UserMenu />
      </div>
    </aside>
  );
} 