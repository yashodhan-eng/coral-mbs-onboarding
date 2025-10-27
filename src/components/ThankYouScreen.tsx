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
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 animate-fade-in">
      <div className="text-center space-y-6 relative">
        <div className="flex justify-center mb-4 relative">
          <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-coral absolute -top-4 -left-8 animate-pulse" />
          <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-deep-blue absolute -top-2 -right-6 animate-pulse delay-100" />
          <Loader2 className="w-12 h-12 md:w-16 md:h-16 text-coral animate-spin" />
          <Sparkles className="w-7 h-7 md:w-9 md:h-9 text-purple-shell absolute -bottom-4 left-4 animate-pulse delay-200" />
        </div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground">
          {title}
        </h1>
        <p className="text-base md:text-lg text-deep-blue max-w-md mx-auto">
          {subtext}
        </p>
      </div>
    </div>
  );
};
