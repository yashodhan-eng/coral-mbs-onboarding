import coralLogo from "@/assets/coral-academy-logo.png";
import heroImage from "@/assets/mbs-hero.webp";
import heroVideo from "@/assets/mbs-video.mp4";
import { Lightbulb, Palette, MessageSquare, TrendingUp, Calendar, ChevronDown, Play, Star, Award, GraduationCap, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface LandingScreenProps {
  onContinue: () => void;
}

const testimonials = [
  {
    text: "My son now talks about brands like Apple and LEGO with real excitement!",
    name: "Emily",
    location: "California",
    initial: "E",
    rating: 5
  },
  {
    text: "Creative, smart, and fun — exactly how kids should learn business.",
    name: "Jacob",
    location: "Texas",
    initial: "J",
    rating: 4.5
  },
  {
    text: "Loved how each class explored a different company every week.",
    name: "Priya",
    location: "New York",
    initial: "P",
    rating: 5
  },
  {
    text: "My daughter actually explained marketing to me after class!",
    name: "Ryan",
    location: "Florida",
    initial: "R",
    rating: 4.5
  },
  {
    text: "The Mini Business Series made my child think like an entrepreneur.",
    name: "Sarah",
    location: "Oregon",
    initial: "S",
    rating: 5
  }
];

const features = [
  { icon: Award, text: "100+ Years of Teacher Experience" },
  { icon: GraduationCap, text: "Founded by a Stanford Alum & Mom" },
  { icon: Users, text: "Loved by 1000+ Families" }
];

export const LandingScreen = ({ onContinue }: LandingScreenProps) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isScheduleExpanded, setIsScheduleExpanded] = useState(false);

  // Auto-rotate testimonials every 3 seconds with animation key
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate features every 3 seconds with animation key
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-3.5 h-3.5 ${
          i < Math.floor(rating)
            ? "fill-primary text-primary"
            : i < rating
            ? "fill-primary/50 text-primary"
            : "fill-gray-200 text-gray-200"
        }`}
      />
    ));
  };

  const FeatureIcon = features[currentFeature].icon;
  
  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#FFF8F6' }}>
      {/* Logo at top center */}
      <div className="flex items-center justify-center px-6 md:px-10 py-6 md:py-8">
        <img 
          src={coralLogo} 
          alt="Coral Academy" 
          className="h-9 md:h-12"
        />
      </div>

      {/* Trustpilot Badge */}
      <div className="flex items-center justify-center px-6 mb-4 md:mb-6">
        <div className="flex items-center gap-2 bg-white rounded-full px-5 md:px-6 py-2.5 md:py-3 shadow-sm">
          <span className="font-poppins font-semibold text-gray-900 text-[13px] md:text-[14px]">Excellent</span>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-green-500 text-green-500" />
            ))}
          </div>
          <span className="text-gray-900 text-[13px] md:text-[14px]">
            <span className="font-semibold">4.7</span>
            <span className="text-gray-500">/5</span>
          </span>
          <span className="text-gray-900 font-medium text-[13px] md:text-[14px]">Trustpilot</span>
        </div>
      </div>

      {/* Ages Tag */}
      <div className="flex justify-center mb-4 md:mb-6">
        <div className="inline-block bg-[#FFF1EC] border border-primary rounded-full px-3.5 md:px-[14px] py-1.5 md:py-[6px]">
          <span className="font-poppins font-medium text-[13px] md:text-[14px] text-primary">
            Ages 8–13
          </span>
        </div>
      </div>

      <main className="pb-12">
        <div className="animate-fade-in">
          <div className="w-full max-w-[900px] mx-auto px-6 md:px-10 lg:px-20">
            {/* Title Section */}
            <div className="text-center mb-5 md:mb-8">
              <h1 className="font-poppins font-semibold text-[24px] md:text-[32px] lg:text-[36px] text-foreground mb-2 md:mb-3 tracking-tight leading-tight">
                Mini Business Series
              </h1>
              <p className="font-poppins text-[15px] md:text-[18px] text-secondary font-normal tracking-wide">
                Weekly, Hands-On Business Classes for Kids
              </p>
            </div>

            {/* Testimonial Slider */}
            <div className="mb-5 md:mb-8 max-w-[600px] mx-auto overflow-hidden">
              <div 
                key={currentTestimonial}
                className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] p-4 min-h-[110px] md:min-h-[120px] flex flex-col justify-center animate-slide-in-right"
              >
                <div className="flex gap-1 mb-2">
                  {renderStars(testimonials[currentTestimonial].rating)}
                </div>
                <p className="font-poppins text-[13px] md:text-[14px] text-foreground text-left leading-relaxed mb-3">
                  "{testimonials[currentTestimonial].text}"
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#FFE5DC] flex items-center justify-center flex-shrink-0">
                    <span className="font-poppins font-semibold text-[14px] text-primary">
                      {testimonials[currentTestimonial].initial}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="font-poppins font-medium text-[13px] text-foreground">
                      {testimonials[currentTestimonial].name}
                    </p>
                    <p className="font-poppins text-[12px] text-secondary">
                      {testimonials[currentTestimonial].location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule Line */}
            <div className="text-center mb-5 md:mb-8">
              <p className="font-inter text-[13px] md:text-[15px] text-accent italic font-medium">
                Classes every Thursday at 4:00 PM PST.
              </p>
            </div>

            {/* Feature Slider */}
            <div className="mb-5 md:mb-8 max-w-[500px] mx-auto overflow-hidden">
              <div 
                key={currentFeature}
                className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] p-3.5 md:p-4 flex items-center justify-center gap-3 min-h-[65px] md:min-h-[70px] animate-slide-in-right"
              >
                <FeatureIcon className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0" strokeWidth={2} />
                <p className="font-poppins font-medium text-[13px] md:text-[15px] text-foreground text-center">
                  {features[currentFeature].text}
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center mb-10">
              <button
                onClick={onContinue}
                className="h-[48px] md:h-[52px] px-9 md:px-12 font-poppins font-semibold text-[14px] md:text-[15px] 
                         text-white rounded-full
                         shadow-[0_3px_10px_rgba(240,90,38,0.25)] hover:shadow-[0_6px_20px_rgba(240,90,38,0.35)]
                         hover:scale-[1.02] active:scale-[0.98] 
                         transition-all duration-200"
                style={{ 
                  background: 'linear-gradient(180deg, #F46A37 0%, #E85522 100%)'
                }}
              >
                Try For Free
              </button>
            </div>

            {/* What Kids Learn Section */}
            <div className="mb-10">
              <h2 className="font-poppins font-semibold text-[22px] md:text-[24px] text-foreground text-center mb-6">
                What Kids Learn
              </h2>
              
              {/* 2x2 grid on mobile, 4x1 on tablet/desktop */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-[800px] mx-auto">
                {/* Learning Point 1 */}
                <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] p-4 flex flex-col items-center text-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FFE5DC] flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-5 h-5 text-primary" strokeWidth={2} />
                  </div>
                  <p className="font-poppins text-[13px] md:text-[14px] text-foreground font-medium leading-snug">
                    Learn About Real Brands
                  </p>
                </div>

                {/* Learning Point 2 */}
                <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] p-4 flex flex-col items-center text-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FFE5DC] flex items-center justify-center flex-shrink-0">
                    <Palette className="w-5 h-5 text-primary" strokeWidth={2} />
                  </div>
                  <p className="font-poppins text-[13px] md:text-[14px] text-foreground font-medium leading-snug">
                    Create Logos & Business Ideas
                  </p>
                </div>

                {/* Learning Point 3 */}
                <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] p-4 flex flex-col items-center text-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FFE5DC] flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-primary" strokeWidth={2} />
                  </div>
                  <p className="font-poppins text-[13px] md:text-[14px] text-foreground font-medium leading-snug">
                    Pitch & Present Like Founders
                  </p>
                </div>

                {/* Learning Point 4 */}
                <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] p-4 flex flex-col items-center text-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FFE5DC] flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-primary" strokeWidth={2} />
                  </div>
                  <p className="font-poppins text-[13px] md:text-[14px] text-foreground font-medium leading-snug">
                    Explore How Companies Grow
                  </p>
                </div>
              </div>
            </div>

            {/* Upcoming Schedule - Expandable */}
            <div className="mb-10">
              <div className="max-w-[700px] mx-auto">
                <button
                  onClick={() => setIsScheduleExpanded(!isScheduleExpanded)}
                  className="w-full bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] p-4 md:p-5 flex items-center gap-4 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-shadow"
                >
                  <div className="w-10 h-10 rounded-full bg-[#FFE5DC] flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-primary" strokeWidth={2} />
                  </div>
                  <h2 className="font-poppins font-semibold text-[16px] md:text-[18px] text-foreground text-left flex-1">
                    Upcoming Schedule
                  </h2>
                  <ChevronDown 
                    className={`w-5 h-5 text-foreground transition-transform duration-200 ${isScheduleExpanded ? 'rotate-180' : ''}`}
                  />
                </button>

                {isScheduleExpanded && (
                  <div className="mt-4 bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] p-5 md:p-6 animate-fade-in">
                    <div className="space-y-6">
                      {/* Week 1 */}
                      <div className="flex gap-5">
                        <div className="flex-shrink-0 w-[60px]">
                          <span className="font-poppins font-semibold text-[14px] text-primary">Week 1</span>
                        </div>
                        <div className="flex-1 border-l-2 border-[#F5F5F5] pl-5">
                          <h3 className="font-poppins font-semibold text-[15px] text-foreground mb-1">
                            DreamWorks
                          </h3>
                          <p className="font-poppins text-[13px] text-secondary leading-snug">
                            Storytelling, franchises &<br />creativity in business
                          </p>
                        </div>
                      </div>

                      {/* Week 2 */}
                      <div className="flex gap-5">
                        <div className="flex-shrink-0 w-[60px]">
                          <span className="font-poppins font-semibold text-[14px] text-primary">Week 2</span>
                        </div>
                        <div className="flex-1 border-l-2 border-[#F5F5F5] pl-5">
                          <h3 className="font-poppins font-semibold text-[15px] text-foreground mb-1">
                            Apple
                          </h3>
                          <p className="font-poppins text-[13px] text-secondary leading-snug">
                            Product design, innovation<br />& brand identity
                          </p>
                        </div>
                      </div>

                      {/* Week 3 */}
                      <div className="flex gap-5">
                        <div className="flex-shrink-0 w-[60px]">
                          <span className="font-poppins font-semibold text-[14px] text-primary">Week 3</span>
                        </div>
                        <div className="flex-1 border-l-2 border-[#F5F5F5] pl-5">
                          <h3 className="font-poppins font-semibold text-[15px] text-foreground mb-1">
                            Starbucks
                          </h3>
                          <p className="font-poppins text-[13px] text-secondary leading-snug">
                            Experience-driven branding<br />& global expansion
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* A Sneak Peek of Our Class Section */}
            <div className="mb-10">
              <h2 className="font-poppins font-semibold text-[22px] md:text-[24px] text-foreground text-center mb-3">
                A Sneak Peek of Our Class
              </h2>
              <p className="font-poppins text-[14px] md:text-[15px] text-accent text-center mb-6 max-w-[600px] mx-auto">
                See what makes each session interactive, creative, and full of discovery
              </p>

              {/* Video Section */}
              <div className="max-w-[90%] md:max-w-[85%] mx-auto mb-8">
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

            {/* Final CTA Button */}
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
                Try For Free
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
