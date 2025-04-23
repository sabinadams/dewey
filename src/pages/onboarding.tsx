import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useStoreOnboardingMutation } from '@/store/api/onboarding.api';

export default function Onboarding() {
  const navigate = useNavigate();
  const [storeOnboarding] = useStoreOnboardingMutation();

  const handleComplete = async () => {
    try {
      await storeOnboarding(true);
      navigate('/');
    } catch (error) {
      console.error('Failed to store onboarding completion:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to Dewey</h1>
        <p className="text-muted-foreground">
          Let's get you started with your database management journey.
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-muted p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">What's Next?</h2>
          <ol className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">1</span>
              <div>
                <h3 className="font-medium">Create Your First Project</h3>
                <p className="text-sm text-muted-foreground">Organize your database connections in projects</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">2</span>
              <div>
                <h3 className="font-medium">Add Database Connections</h3>
                <p className="text-sm text-muted-foreground">Connect to your MySQL, PostgreSQL, SQLite, or MongoDB databases</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">3</span>
              <div>
                <h3 className="font-medium">Start Managing Your Data</h3>
                <p className="text-sm text-muted-foreground">View tables, run queries, and manage your database schema</p>
              </div>
            </li>
          </ol>
        </div>

        <div className="flex justify-center">
          <Button size="lg" onClick={handleComplete}>
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}