interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full px-4 md:px-6">
      <div className="flex items-center justify-center mb-3">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-coral/10 to-deep-blue/10 border border-coral/20">
          <span className="text-sm md:text-base font-semibold text-coral">
            Step {currentStep}
          </span>
          <span className="text-sm md:text-base font-medium text-deep-blue/60">
            / {totalSteps}
          </span>
        </div>
      </div>
      <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-coral transition-all duration-500 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
