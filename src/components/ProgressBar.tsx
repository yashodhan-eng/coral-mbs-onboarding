interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full px-4 md:px-6">
      <div className="flex items-center justify-center mb-2">
        <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full text-sm font-semibold text-white" 
              style={{ backgroundColor: '#F05A26' }}>
          Step {currentStep}/{totalSteps}
        </span>
      </div>
      <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
