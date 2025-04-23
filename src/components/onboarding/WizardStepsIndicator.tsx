import React from 'react';

interface WizardStepsIndicatorProps {
    steps: { id: string; title: string }[];
    currentStep: string;
}

// Update the glowEffect class to include a transition for the box-shadow
const glowEffect = 'relative before:absolute before:inset-0 before:rounded-full before:shadow-[0_0_20px_rgba(255,255,255,0.8)] before:transition-shadow before:duration-500 before:ease-in-out after:absolute after:inset-[-2px] after:rounded-full after:outline after:outline-[0.5px] after:outline-primary';

const WizardStepsIndicator: React.FC<WizardStepsIndicatorProps> = ({
    steps,
    currentStep
}) => {
    return (
        <div className="flex flex-col items-center">
            <div className="flex justify-between items-center w-full">
                {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center flex-1">
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