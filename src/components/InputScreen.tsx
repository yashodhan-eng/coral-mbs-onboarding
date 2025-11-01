import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      render: (container: HTMLElement, options: {
        sitekey: string;
        callback?: (token: string) => void;
        'error-callback'?: () => void;
        size?: 'normal' | 'compact';
        theme?: 'light' | 'dark';
      }) => number;
      reset: (widgetId: number) => void;
      getResponse: (widgetId: number) => string;
    };
  }
}

interface InputScreenProps {
  step: number;
  title: string;
  label: string;
  type: "text" | "email";
  buttonText: string;
  onSubmit: (value: string, recaptchaToken?: string | null) => void;
  validator?: (value: string) => string | null;
  onBack?: () => void;
  heroImage?: string;
}

export const InputScreen = ({
  step,
  title,
  label,
  type,
  buttonText,
  onSubmit,
  validator,
  onBack,
  heroImage
}: InputScreenProps) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const recaptchaWidgetId = useRef<number | null>(null);
  const recaptchaContainerRef = useRef<HTMLDivElement>(null);

  // Load reCAPTCHA script for email type immediately
  useEffect(() => {
    if (type === "email" && !recaptchaLoaded) {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setRecaptchaLoaded(true);
      };
      document.body.appendChild(script);
    }
  }, [type, recaptchaLoaded]);

  // Render reCAPTCHA immediately for email type when script loads
  useEffect(() => {
    if (type !== "email" || !recaptchaContainerRef.current || !window.grecaptcha || !recaptchaLoaded) {
      return;
    }

    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

    window.grecaptcha.ready(() => {
      if (!recaptchaContainerRef.current) return;

      try {
        // If widget already exists, just reset it
        if (recaptchaWidgetId.current !== null) {
          window.grecaptcha.reset(recaptchaWidgetId.current);
          setRecaptchaToken(null);
          return;
        }

        // Render new widget
        const widgetId = window.grecaptcha.render(recaptchaContainerRef.current, {
          sitekey: siteKey,
          callback: (token: string) => {
            console.log('reCAPTCHA token received:', token ? `${token.substring(0, 20)}...` : 'null');
            setRecaptchaToken(token);
          },
          'error-callback': () => {
            console.error('reCAPTCHA error callback triggered');
            setRecaptchaToken(null);
          },
          size: 'normal',
          theme: 'light',
        });
        recaptchaWidgetId.current = widgetId;
      } catch (error) {
        console.error('Error rendering reCAPTCHA:', error);
      }
    });
  }, [type, recaptchaLoaded]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    const trimmedValue = value.trim();
    
    if (!trimmedValue) {
      setError(`${label} is required`);
      return;
    }

    if (validator) {
      const validationError = validator(trimmedValue);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    // For email type, check if reCAPTCHA is completed and get fresh token
    if (type === "email") {
      if (!recaptchaToken) {
        setError("Please complete the reCAPTCHA verification");
        return;
      }

      // Get fresh token right before submission (reCAPTCHA tokens can expire)
      if (recaptchaWidgetId.current !== null && window.grecaptcha) {
        try {
          const freshToken = window.grecaptcha.getResponse(recaptchaWidgetId.current);
          if (freshToken) {
            console.log('Using fresh reCAPTCHA token for submission');
            setError(null);
            onSubmit(trimmedValue, freshToken);
            return;
          } else {
            // Token might have expired, reset and ask user to complete again
            setError("reCAPTCHA token expired. Please complete the verification again.");
            window.grecaptcha.reset(recaptchaWidgetId.current);
            setRecaptchaToken(null);
            return;
          }
        } catch (error) {
          console.error('Error getting reCAPTCHA response:', error);
          setError("Please complete the reCAPTCHA verification");
          return;
        }
      }
    }

    setError(null);
    onSubmit(trimmedValue, recaptchaToken);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (touched) {
      setError(null);
    }
  };

  const isDisabled = !value.trim();
  
  const placeholderText = type === "email" ? "Enter your email" : "Enter your name";

  return (
    <div className="animate-fade-in">
      {heroImage && (
        <div className="w-full max-w-[1000px] mx-auto px-4 pt-8 mb-8">
          <div className="mb-10">
            <img 
              src={heroImage} 
              alt={`${title} illustration`}
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>
        </div>
      )}
      
      <div className="flex flex-col items-center justify-center px-4">
        {onBack && (
          <button
            onClick={onBack}
            className="fixed top-[3.75rem] left-4 z-10 p-2 rounded-full hover:bg-accent transition-colors"
            aria-label="Go back"
          >
            <ChevronLeft className="w-6 h-6" style={{ color: '#F05A26' }} />
          </button>
        )}
        <div className="w-full max-w-[360px] md:max-w-[520px] lg:max-w-[640px] space-y-8 md:space-y-10">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground leading-tight">
              {title}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor={`input-${step}`} className="text-base md:text-lg font-medium">
                {label}
              </Label>
              <Input
                id={`input-${step}`}
                type={type}
                value={value}
                onChange={handleChange}
                onBlur={() => setTouched(true)}
                className="h-14 text-base md:text-lg rounded-full px-6 bg-white border border-gray-300
                         focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder={placeholderText}
                data-step={step}
              />
              {error && touched && (
                <p className="text-sm text-destructive mt-2 px-2">
                  {error}
                </p>
              )}
            </div>

            {/* reCAPTCHA Container - always shown for email type */}
            {type === "email" && (
              <div className="flex justify-center my-4 min-h-[78px]">
                <div 
                  ref={recaptchaContainerRef}
                  id={`recaptcha-container-${step}`}
                  className="flex justify-center"
                />
              </div>
            )}

            <Button
              type="submit"
              disabled={isDisabled || (type === "email" && !recaptchaToken)}
              className="w-full h-14 text-base md:text-lg font-semibold rounded-full
                       bg-primary text-primary-foreground 
                       hover:opacity-90 active:scale-[0.98]
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-200
                       shadow-md hover:shadow-lg"
              data-cta={buttonText.toLowerCase()}
              data-step={step}
            >
              {buttonText}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
