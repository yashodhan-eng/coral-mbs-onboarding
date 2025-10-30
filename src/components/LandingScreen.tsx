import coralLogo from "@/assets/coral-academy-logo.png";
import heroImage from "@/assets/mbs-hero.webp";
import heroVideo from "@/assets/mbs-video.mp4";
import { Lightbulb, Palette, MessageCircle, Rocket, ChevronDown, Play } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface LandingScreenProps {
  onContinue: () => void;
}

export const LandingScreen = ({ onContinue }: LandingScreenProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  
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

            {/* Hero Image with Video */}
            <div className="mb-10 md:mb-12">
              <div className="max-w-[90%] md:max-w-[85%] mx-auto">
                <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
                  <DialogTrigger asChild>
                    <div className="relative cursor-pointer group">
                      <img 
                        src={heroImage} 
                        alt="Mini Business Series - Brand Logos Collage" 
                        className="w-full h-auto rounded-2xl border-4 border-white shadow-[0_12px_40px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.08)] transition-transform duration-200 group-hover:scale-[1.02]"
                      />
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-[0_8px_24px_rgba(240,90,38,0.4)] group-hover:bg-primary group-hover:scale-110 transition-all duration-200">
                          <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white ml-1" />
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-[90vw] md:max-w-[500px] p-0 bg-black border-none">
                    <video 
                      src={heroVideo} 
                      controls 
                      autoPlay
                      className="w-full h-auto"
                    />
                  </DialogContent>
                </Dialog>
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
              <p className="font-inter text-[14px] md:text-[15px] text-accent italic font-medium">
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
                <div className="mb-4 flex items-center gap-3">
                  {/* Avatar Circle */}
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#FFE5DC] flex items-center justify-center flex-shrink-0">
                    <span className="font-poppins font-semibold text-[20px] md:text-[22px] text-primary">
                      S
                    </span>
                  </div>
                  {/* Name and Location */}
                  <div>
                    <h3 className="font-poppins font-semibold text-[16px] md:text-[17px] text-foreground">
                      Sarah
                    </h3>
                    <p className="font-poppins text-[13px] md:text-[14px] text-secondary flex items-center gap-1">
                      <span className="text-primary">📍</span> California
                    </p>
                  </div>
                </div>

                {/* Testimonial Text */}
                <div className="relative">
                  <div className={`${!isExpanded ? 'max-h-[140px] md:max-h-[120px]' : ''} overflow-hidden relative`}>
                    <p className="font-poppins text-[14px] md:text-[15px] text-foreground leading-relaxed">
                      I have a business background, and honestly, I wish I had something like this when I was a kid. My 9-year-old is super into Shark Tank, lemonade stands, and how companies make money. We've tried a couple of online classes before, but this class remains his favourite.
                      {isExpanded && (
                        <span>
                          {" "}Every week, they discuss real companies like how LEGO bounced back from bankruptcy or how big brands got started. But what I really appreciate is that it's not just passive learning. During the Nike class, my son designed his own shoe, gave it a name, figured out the pricing, and even pitched it to his friends. I was genuinely impressed by the thought he put into it.
                          {" "}I often find myself listening in while doing chores because the discussions are genuinely interesting. I can't thank the teacher and the platform enough for such a hands-on, fun class.
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
