import { useEffect } from "react";
import { Loader2 } from "lucide-react";

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
      <div className="text-center space-y-6">
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
