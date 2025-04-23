import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface WizardStepsIndicatorProps {
    steps: { id: string; title: string }[];
    currentStep: string;
    onStepClick?: (stepId: string) => void;
}

// Update the glowEffect class to include a transition for the box-shadow
const glowEffect = 'relative before:absolute before:inset-0 before:rounded-full before:shadow-[0_0_20px_rgba(255,255,255,0.8)] before:transition-shadow before:duration-500 before:ease-in-out after:absolute after:inset-[-2px] after:rounded-full after:outline after:outline-[0.5px] after:outline-primary';

const WizardStepsIndicator: React.FC<WizardStepsIndicatorProps> = ({
    steps,
    currentStep,
    onStepClick
}) => {
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    const canGoBack = currentIndex > 0;
    const canGoForward = currentIndex < steps.length - 1;

    const handleNavigation = (direction: 'prev' | 'next') => {
        if (direction === 'prev' && canGoBack) {
            onStepClick?.(steps[currentIndex - 1].id);
        } else if (direction === 'next' && canGoForward) {
            onStepClick?.(steps[currentIndex + 1].id);
        }
    };

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="flex justify-between items-center w-full px-4">
                <button
                    onClick={() => handleNavigation('prev')}
                    disabled={!canGoBack}
                    className={`p-2 rounded-full transition-colors ${
                        canGoBack 
                            ? 'text-primary hover:bg-primary/10' 
                            : 'text-muted/70 bg-muted/10 cursor-not-allowed'
                    }`}
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={() => handleNavigation('next')}
                    disabled={!canGoForward}
                    className={`p-2 rounded-full transition-colors ${
                        canGoForward 
                            ? 'text-primary hover:bg-primary/10' 
                            : 'text-muted/70 bg-muted/10 cursor-not-allowed'
                    }`}
                >
                    <ChevronRight size={24} />
                </button>
            </div>
            <div className="flex justify-between items-center w-full">
                {steps.map((step, index) => (
                    <div 
                        key={step.id} 
                        className="flex items-center flex-1"
                        onClick={() => {
                            if (steps.findIndex(s => s.id === currentStep) >= index) {
                                onStepClick?.(step.id);
                            }
                        }}
                    >
                        <div className="w-full">
                            <div
                                className={`rounded-full transition-all duration-300 ease-in-out ${
                                    steps.findIndex(s => s.id === currentStep) >= index
                                        ? `bg-primary ${
                                            steps.findIndex(s => s.id === currentStep) === index 
                                                ? `${glowEffect} h-1.5` 
                                                : 'h-1 hover:scale-105 hover:h-1.5 hover:after:absolute hover:after:inset-[-2px] hover:after:rounded-full hover:after:outline hover:after:outline-[0.5px] hover:after:outline-primary cursor-pointer'
                                          }`
                                        : 'bg-muted h-1'
                                }`}
                            />
                        </div>
                        {index < steps.length - 1 && (
                            <div className="w-1.5 h-1.5 rounded-full mx-2 bg-muted" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WizardStepsIndicator; 