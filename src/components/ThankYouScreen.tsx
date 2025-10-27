import { useEffect, useState } from "react";
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
  const [showContent, setShowContent] = useState(false);
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    // Generate confetti particles
    const particles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 1 + Math.random() * 0.5
    }));
    setConfetti(particles);

    // Show content after confetti animation starts
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 800);

    // Redirect after delay
    const redirectTimer = setTimeout(() => {
      window.location.assign(redirectUrl);
    }, delayMs);

    return () => {
      clearTimeout(contentTimer);
      clearTimeout(redirectTimer);
    };
  }, [delayMs, redirectUrl]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 relative overflow-hidden">
      {/* Confetti Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {confetti.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full animate-fade-in"
            style={{
              left: `${particle.left}%`,
              top: '-10px',
              backgroundColor: Math.random() > 0.5 ? '#F05A26' : '#2788A0',
              animation: `fall ${particle.duration}s linear ${particle.delay}s forwards`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      {showContent && (
        <div className="text-center space-y-6 relative z-10 animate-fade-in">
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
      )}

      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
