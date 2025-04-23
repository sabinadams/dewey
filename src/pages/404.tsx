import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex items-center justify-center h-full">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">404 - Page Not Found</h1>
        <p className="text-muted-foreground mb-4">
          The page you're looking for doesn't exist.
        </p>
        <Button onClick={() => navigate('/')}>
          Return Home
        </Button>
      </div>
    </div>
  );
} 