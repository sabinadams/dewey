import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useOS } from '@/hooks/useOS';
import UserMenu from '@/components/navigation/UserMenu';
import { Folder, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  ScrollArea,
  Button,
  buttonVariants,
  ThemeToggle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  LoadingSpinner
} from '@/components/ui';
import { ReactComponent as LogoSVG } from '@/assets/dewey.svg';
import { useEffect, useState } from 'react';
import { useGetProjectsQuery } from '@/store/api/projects.api';

interface NavItemProps {
  to: string;
  icon?: React.ReactNode;
  label: string;
  imageSrc?: string;
  active?: boolean;
}

function NavItem({ to, label, imageSrc }: NavItemProps) {
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

export default function Navigation() {
  const { user } = useAuth();
  const { isMac } = useOS();
  const navigate = useNavigate();
  
  const { data: projects = [], isLoading } = useGetProjectsQuery(user?.id || '', {
    skip: !user?.id,
  });

  if (isLoading) {
    return (
      <aside className={cn(
        "min-w-18 flex flex-col items-center justify-center",
        isMac ? "mt-10" : "",
        "h-[calc(100vh-2.5rem)]"
      )}>
        <LoadingSpinner />
      </aside>
    );
  }

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
        <LogoSVG 
          width="48" 
          height="48" 
          className="text-sidebar-foreground" 
        />
      </div>

      {/* Projects Navigation */}
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-1 p-2">
          {projects.map((project) => (
            <NavLink
              key={project.id}
              to={`/project/${project.id}`}
              className={({ isActive }) =>
                cn(
                  buttonVariants({
                    variant: isActive ? "secondary" : "ghost",
                    size: "sm",
                  }),
                  "justify-start gap-2"
                )
              }
            >
              <Folder className="h-4 w-4" />
              <span className="truncate">{project.name}</span>
            </NavLink>
          ))}
        </nav>
      </ScrollArea>

      {/* Bottom Section */}
      <div className="shrink-0 p-2 flex flex-col gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-full"
                onClick={() => navigate('/project/new')}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create New Project</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex items-center justify-between gap-2">
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </aside>
  );
} 