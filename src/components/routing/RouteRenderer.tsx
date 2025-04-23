import { useEffect } from 'react';
import { Routes, useRoutes, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { useDispatch } from 'react-redux';
import { setReturnToPath } from '@/store/slices/ui.slice';
import { routes } from '@/routes';
import { LoadingScreen } from '@/components/feedback/LoadingScreen'; // Import LoadingScreen
import { AppLayout } from '@/components/layouts/AppLayout'; // Import AppLayout
import { PublicLayout } from '@/components/layouts/PublicLayout'; // Import PublicLayout
import { useGetProjectsQuery } from '@/store/api/projects.api'; // Re-import project query
import { useShouldRunOnboardingQuery } from '@/store/api/onboarding.api';

export function RouteRenderer() {
  const { isLoaded: isAuthLoaded, isSignedIn, userId } = useAuth(); // Get userId
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const element = useRoutes(routes); // Get the matched route element early
  const { data: shouldRunOnboarding } = useShouldRunOnboardingQuery();

  useEffect(() => {
    console.log("[RouteRenderer] shouldRunOnboarding", shouldRunOnboarding);
    console.log("[RouteRenderer] current path:", location.pathname);
  }, [shouldRunOnboarding, location.pathname]);
  // Fetch projects conditionally
  const {
    data: projects,
    isSuccess: projectsSuccess
  } = useGetProjectsQuery(userId ?? "", {
    skip: !isSignedIn || !userId, // Skip if not signed in or userId unknown
  });


  const publicPaths = ['/auth', '/onboarding'];
  const isPublic = publicPaths.includes(location.pathname);
  const isOnRoot = location.pathname === '/';

  // --- Determine Redirects --- 
  let shouldRedirectToAuth = false;
  let shouldRedirectToRoot = false;
  let shouldRedirectToProject = false;
  let targetProjectRoute = '';

  if (isAuthLoaded) {
    if (isSignedIn && userId) {
      if (isPublic && location.pathname !== '/onboarding') {
        shouldRedirectToRoot = true;
      } else if (isOnRoot) {
        // Only consider redirecting from root if projects have successfully loaded
        if (projectsSuccess && projects && projects.length > 0) {
          shouldRedirectToProject = true;
          targetProjectRoute = `/project/${projects[0].id}`;
        }
        // If projects are loading, pending, or empty, we will eventually render the AppLayout with HomePage
      }
    } else { // Not signed in
      if (!isPublic) {
        shouldRedirectToAuth = true;
      }
    }
  }

  // --- Perform Redirects using useEffect --- 
  useEffect(() => {
    // Only redirect to onboarding if we're not already there
    if (shouldRunOnboarding && location.pathname !== '/onboarding') {
      console.log("[RouteRenderer] Redirecting to onboarding");
      navigate('/onboarding', { replace: true });
    } else if (shouldRedirectToRoot) {
      // No need to check isAuthLoaded here, decision flags depend on it already
      console.log("[RouteRenderer] Redirecting to / (from public)");
      navigate('/', { replace: true });
    } else if (shouldRedirectToAuth) {
      console.log("[RouteRenderer] Redirecting to /auth (from private)");
      dispatch(setReturnToPath(location.pathname));
      navigate('/auth', { replace: true });
    } else if (shouldRedirectToProject) {
      console.log(`[RouteRenderer] Redirecting to project: ${targetProjectRoute}`);
      navigate(targetProjectRoute, { replace: true });
    }
    // Re-run effect if redirect conditions change
  }, [shouldRedirectToRoot, shouldRedirectToAuth, shouldRedirectToProject, targetProjectRoute, navigate, dispatch, location.pathname, shouldRunOnboarding]);


  // --- Loading State --- 
  // Show loading if auth isn't ready OR 
  // if we are signed in, on root, projects haven't loaded successfully yet, AND we are not already meant to redirect to a project 
  const showLoading = !isAuthLoaded || 
                     (isSignedIn && userId && isOnRoot && !projectsSuccess && !shouldRedirectToProject);
  
  if (showLoading) {
    console.log("[RouteRenderer] Auth or initial project loading for root...");
    return <LoadingScreen />;
  }

  // --- Render Null during Redirect --- 
  // If any redirect should happen, render null while useEffect handles it
  if (shouldRedirectToRoot || shouldRedirectToAuth || shouldRedirectToProject) {
    console.log("[RouteRenderer] Redirect pending, rendering null");
    return null;
  }

  // --- Render Layout + Content --- 
  // If we reach here, no redirect is needed and nothing critical is loading
  if (isPublic) {
    console.log("[RouteRenderer] Rendering Public Layout");
    return <PublicLayout>{element}</PublicLayout>;
  }
   
  // Signed in, on a private route (could be / or /project/...)
  console.log("[RouteRenderer] Rendering App Layout");
  return <AppLayout>{element}</AppLayout>;
} 