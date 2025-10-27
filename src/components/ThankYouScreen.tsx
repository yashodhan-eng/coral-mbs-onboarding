import { useEffect } from "react";
import { Loader2, Sparkles } from "lucide-react";

interface ThankYouScreenProps {
  title: string;
  subtext: string;
  delayMs: number;
  redirectUrl: string;
}

export const ThankYouScreen = ({
  title,
  subtext,
  delayMs,
  redirectUrl
}: ThankYouScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.assign(redirectUrl);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [delayMs, redirectUrl]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 animate-fade-in relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <Sparkles className="w-8 h-8 text-primary absolute top-1/4 left-1/4 animate-pulse" style={{ animationDelay: '0s' }} />
        <Sparkles className="w-6 h-6 text-primary absolute top-1/3 right-1/4 animate-pulse" style={{ animationDelay: '0.3s' }} />
        <Sparkles className="w-10 h-10 text-primary absolute bottom-1/3 left-1/3 animate-pulse" style={{ animationDelay: '0.6s' }} />
        <Sparkles className="w-7 h-7 text-primary absolute bottom-1/4 right-1/3 animate-pulse" style={{ animationDelay: '0.9s' }} />
      </div>
      <div className="text-center space-y-6 relative z-10">
        <div className="flex justify-center mb-4">
          <Loader2 className="w-12 h-12 md:w-16 md:h-16 text-primary animate-spin" />
        </div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground">
          {title}
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-md mx-auto">
          {subtext}
        </p>
      </div>
    </div>
  );
};
