import { Lightbulb, Rocket, TrendingUp, Star, Sparkles, Target } from "lucide-react";

export const BackgroundTheme = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.04]">
      <Lightbulb className="absolute top-[15%] left-[10%] w-16 h-16 md:w-24 md:h-24 text-accent rotate-12" />
      <Rocket className="absolute top-[25%] right-[15%] w-20 h-20 md:w-32 md:h-32 text-primary -rotate-12" />
      <TrendingUp className="absolute top-[55%] left-[8%] w-24 h-24 md:w-36 md:h-36 text-secondary rotate-6" />
      <Star className="absolute bottom-[20%] right-[12%] w-16 h-16 md:w-28 md:h-28 text-accent -rotate-12" />
      <Sparkles className="absolute top-[70%] right-[25%] w-14 h-14 md:w-20 md:h-20 text-primary rotate-45" />
      <Target className="absolute bottom-[35%] left-[18%] w-18 h-18 md:w-24 md:h-24 text-secondary -rotate-6" />
    </div>
  );
};
