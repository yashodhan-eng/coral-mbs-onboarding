import coralLogo from "@/assets/coral-academy-logo.png";
import heroImage from "@/assets/mbs-hero.webp";
import { Lightbulb, Palette, MessageCircle, Rocket, ChevronDown } from "lucide-react";
import { useState } from "react";

interface LandingScreenProps {
  onContinue: () => void;
}

export const LandingScreen = ({ onContinue }: LandingScreenProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="min-h-screen bg-background relative">
      {/* Logo at top center */}
      <div className="flex items-center justify-center px-6 md:px-10 py-8">
        <img 
          src={coralLogo} 
          alt="Coral Academy" 
          className="h-10 md:h-12"
        />
      </div>

      <main className="pb-12">
        <div className="animate-fade-in">
          <div className="w-full max-w-[900px] mx-auto px-6 md:px-10 lg:px-20">
            {/* Title Section */}
            <div className="text-center mb-8 md:mb-10">
              <h1 className="font-poppins font-semibold text-[28px] md:text-[32px] lg:text-[36px] text-foreground mb-3 tracking-tight leading-tight">
                Mini Business Series
              </h1>
              <p className="font-poppins text-[16px] md:text-[18px] text-secondary font-normal tracking-wide mb-3">
                Fun, hands-on business classes for curious kids
              </p>
              {/* Ages Tag */}
              <div className="inline-block bg-[#FFF1EC] border border-primary rounded-full px-[14px] py-[6px]">
                <span className="font-poppins font-medium text-[14px] text-primary">
                  Ages 8–13
                </span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="mb-10 md:mb-12">
              <div className="max-w-[90%] md:max-w-[85%] mx-auto">
                <img 
                  src={heroImage} 
                  alt="Mini Business Series - Brand Logos Collage" 
                  className="w-full h-auto rounded-2xl border-4 border-white shadow-[0_12px_40px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.08)]"
                />
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center mb-10 md:mb-12">
              <button
                onClick={onContinue}
                className="h-[50px] md:h-[52px] px-10 md:px-12 font-poppins font-semibold text-[15px] 
                         text-white rounded-full
                         shadow-[0_3px_10px_rgba(240,90,38,0.25)] hover:shadow-[0_6px_20px_rgba(240,90,38,0.35)]
                         hover:scale-[1.02] active:scale-[0.98] 
                         transition-all duration-200"
                style={{ 
                  background: 'linear-gradient(180deg, #F46A37 0%, #E85522 100%)'
                }}
              >
                Try for Free Now
              </button>
            </div>

            {/* Learning Outcomes Section */}
            <div className="mb-10 md:mb-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[700px] mx-auto">
                {/* Real Brand Stories */}
                <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] p-3 md:p-4 flex flex-col items-center justify-center text-center">
                  <Lightbulb className="w-6 h-6 text-primary mb-2" strokeWidth={2} />
                  <p className="font-poppins font-medium text-[13px] md:text-[14px] text-foreground">
                    Real Brand Stories
                  </p>
                </div>
                
                {/* Creative Projects */}
                <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] p-3 md:p-4 flex flex-col items-center justify-center text-center">
                  <Palette className="w-6 h-6 text-accent mb-2" strokeWidth={2} />
                  <p className="font-poppins font-medium text-[13px] md:text-[14px] text-foreground">
                    Creative Projects
                  </p>
                </div>
                
                {/* Fun Quizzes */}
                <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] p-3 md:p-4 flex flex-col items-center justify-center text-center">
                  <MessageCircle className="w-6 h-6 text-secondary mb-2" strokeWidth={2} />
                  <p className="font-poppins font-medium text-[13px] md:text-[14px] text-foreground">
                    Fun Quizzes
                  </p>
                </div>
                
                {/* Entrepreneurial Thinking */}
                <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] p-3 md:p-4 flex flex-col items-center justify-center text-center">
                  <Rocket className="w-6 h-6 text-primary mb-2" strokeWidth={2} />
                  <p className="font-poppins font-medium text-[13px] md:text-[14px] text-foreground">
                    Entrepreneurial Thinking
                  </p>
                </div>
              </div>
            </div>

            {/* Schedule Line */}
            <div className="text-center mb-10 md:mb-12">
              <p className="font-inter text-[14px] md:text-[15px] text-accent italic">
                Classes every Thursday at 4:00 PM PST.
              </p>
            </div>

            {/* Parent Testimonial Section */}
            <div className="mb-10 md:mb-12 max-w-[700px] mx-auto">
              {/* Section Title */}
              <h2 className="font-poppins font-semibold text-[22px] md:text-[24px] text-foreground text-center mb-6">
                Parent Testimonial
              </h2>

              <div 
                className="bg-white rounded-2xl p-5 md:p-6 relative overflow-hidden"
                style={{
                  boxShadow: '0 0 40px rgba(240, 90, 38, 0.15), 0 8px 24px rgba(0, 0, 0, 0.1)',
                  animation: 'pulse-glow 3s ease-in-out infinite'
                }}
              >
                {/* Parent Info at Top */}
                <div className="mb-4">
                  <h3 className="font-poppins font-semibold text-[16px] md:text-[17px] text-foreground">
                    Sarah
                  </h3>
                  <p className="font-poppins text-[13px] md:text-[14px] text-secondary">
                    California
                  </p>
                </div>

                {/* Testimonial Text */}
                <div className="relative">
                  <div className={`${!isExpanded ? 'max-h-[140px] md:max-h-[120px]' : ''} overflow-hidden relative`}>
                    <p className="font-poppins text-[14px] md:text-[15px] text-foreground leading-relaxed">
                      As a parent with an MBA, I genuinely wish I had something like this growing up. My 9-year-old son dreams of becoming an entrepreneur — he loves watching Shark Tank, setting up lemonade stands, and learning how companies are built. We've tried a few online classes before, but Coral Academy's Mini Business Series truly stands out.
                      {isExpanded && (
                        <span>
                          {" "}Each week, they explore a real company — from LEGO's bankruptcy turnaround to how founders built their brands. What I love most is that it's not just storytelling — kids get to think, create, and present their ideas. In a recent class on Nike, my son designed his own shoe, decided its USP, and even set a price for it! I was amazed hearing the creative ideas the kids shared. The class is engaging, hands-on, and teaches real-world thinking in such a fun way. I often find myself listening in while doing chores because the discussions are genuinely interesting!
                        </span>
                      )}
                    </p>
                    
                    {/* Gradient Fade Overlay (only when collapsed) */}
                    {!isExpanded && (
                      <div 
                        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                        style={{
                          background: 'linear-gradient(to bottom, transparent, white)'
                        }}
                      />
                    )}
                  </div>

                  {/* Show More/Less Button */}
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-3 flex items-center gap-1 font-poppins font-medium text-[14px] text-primary hover:text-primary/90 transition-colors"
                  >
                    {isExpanded ? 'Show less' : 'Show more'}
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <button
                onClick={onContinue}
                className="h-[50px] md:h-[52px] px-10 md:px-12 font-poppins font-semibold text-[15px] 
                         text-white rounded-full
                         shadow-[0_3px_10px_rgba(240,90,38,0.25)] hover:shadow-[0_6px_20px_rgba(240,90,38,0.35)]
                         hover:scale-[1.02] active:scale-[0.98] 
                         transition-all duration-200"
                style={{ 
                  background: 'linear-gradient(180deg, #F46A37 0%, #E85522 100%)'
                }}
              >
                Try for Free Now
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
