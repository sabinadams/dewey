// This component should ideally never be fully visible if redirects in RouteRenderer work.
// Keep a simple welcome message as a fallback.
export default function HomePage() {
  console.warn("[HomePage] Rendering fallback content - check RouteRenderer logic if seen often.");
  return (
    <div className="flex-1 flex items-center justify-center h-full">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Welcome to Dewey</h1>
        <p className="text-muted-foreground">
          Loading your workspace...
        </p>
      </div>
    </div>
  );
} 