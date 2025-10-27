import { ProgressBar } from "./ProgressBar";

interface TopNavProps {
  currentStep: number;
  totalSteps: number;
  logoSrc: string;
}

export const TopNav = ({ currentStep, totalSteps, logoSrc }: TopNavProps) => {
  return (
    <nav className="w-full">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        <img 
          src={logoSrc} 
          alt="Coral Academy" 
          className="h-6 md:h-7"
        />
      </div>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
    </nav>
  );
};
