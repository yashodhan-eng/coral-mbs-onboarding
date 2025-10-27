import { ProgressBar } from "./ProgressBar";
import coralLogo from "@/assets/coral-academy-logo.png";

interface TopNavProps {
  currentStep: number;
  totalSteps: number;
  logoSrc?: string;
}

export const TopNav = ({ currentStep, totalSteps }: TopNavProps) => {
  return (
    <nav className="w-full">
      <div className="flex items-center justify-center px-4 py-3 md:px-6">
        <img 
          src={coralLogo} 
          alt="Coral Academy" 
          className="h-8 md:h-10"
        />
      </div>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
    </nav>
  );
};
