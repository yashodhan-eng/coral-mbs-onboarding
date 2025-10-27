interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full px-4 md:px-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground font-medium">
          Step {currentStep}/{totalSteps}
        </span>
        <span className="text-sm text-muted-foreground font-medium">
          {Math.round(progress)}%
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
