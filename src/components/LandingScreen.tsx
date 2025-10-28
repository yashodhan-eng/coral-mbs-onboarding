import { Button } from "@/components/ui/button";
import coralLogo from "@/assets/coral-academy-logo.png";
import heroImage from "@/assets/mini-business-hero.jpg";

interface LandingScreenProps {
  onContinue: () => void;
}

export const LandingScreen = ({ onContinue }: LandingScreenProps) => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Logo at top center */}
      <div className="flex items-center justify-center px-4 py-6">
        <img 
          src={coralLogo} 
          alt="Coral Academy" 
          className="h-10 md:h-12"
        />
      </div>

      <main className="pb-8">
        <div className="animate-fade-in">
          <div className="w-full max-w-[1000px] mx-auto px-4 pt-4">
            {/* Title Section */}
            <div className="text-center mb-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                Mini Business Series
              </h1>
              <p className="text-xl md:text-2xl text-[#2788A0] font-medium">
                Fun, hands-on business classes for curious kids (Ages 8–13)
              </p>
            </div>

            {/* Hero Image */}
            <div className="mb-8">
              <img 
                src={heroImage} 
                alt="Mini Business Series - Brand Logos Collage" 
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>

            {/* Highlighted Quote Section */}
            <div className="text-center mb-8">
              <div className="inline-block bg-card border-2 border-primary/20 rounded-2xl px-8 py-6 shadow-lg">
                <p className="text-xl md:text-2xl font-semibold text-foreground">
                  Classes every Thursday at 4:00 PM PST.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <Button
                onClick={onContinue}
                className="h-auto py-5 px-12 text-lg md:text-xl font-semibold rounded-2xl
                         shadow-lg hover:shadow-xl hover:scale-[1.02]
                         active:scale-[0.98] transition-all duration-200"
                style={{ backgroundColor: '#F05A26' }}
              >
                Try for Free Now
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
