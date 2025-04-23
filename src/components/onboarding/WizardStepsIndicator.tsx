import React from 'react';

interface WizardStepsIndicatorProps {
    steps: { id: string; title: string }[];
    currentStep: string;
}

// Update the glowEffect class to include a transition for the box-shadow
const glowEffect = 'shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-shadow duration-300';

// Update the ringEffect class to use a pseudo-element for the ring
const ringEffect = 'outline outline-[0.5px] outline-primary outline-offset-1 transition-opacity duration-300 rounded-full';

const WizardStepsIndicator: React.FC<WizardStepsIndicatorProps> = ({
    steps,
    currentStep
}) => {
    return (
        <div className="flex flex-col items-center">
            <div className="flex justify-between items-center w-full">
                {steps.map((step, index) => (
                    <div key={step.id} className="flex-1 flex items-center" style={{ width: '25%' }}>
                        <div className="flex-1 flex items-center">
                            <div
                                className={`h-1 rounded-full transition-all duration-300 ${steps.findIndex(s => s.id === currentStep) >= index
                                        ? `bg-primary ${steps.findIndex(s => s.id === currentStep) === index ? `${glowEffect} ${ringEffect}` : ''}`
                                        : 'bg-muted'
                                    }`}
                                style={{
                                    width: '100%',
                                    transform: steps.findIndex(s => s.id === currentStep) === index ? 'scaleY(1.5)' : 'scaleY(1)',
                                }}
                            />
                        </div>
                        {index < steps.length - 1 && (
                            <div className="w-2 h-2 rounded-full mx-2 bg-muted" />
                        )}
                    </div>
                ))}
            </div>
            <div className="text-center mt-2">
                <h3 className="text-sm font-medium text-muted-foreground" style={{ minWidth: '100px' }}>
                    {steps.find(step => step.id === currentStep)?.title}
                </h3>
            </div>
        </div>
    );
};

export default WizardStepsIndicator; 