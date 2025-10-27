import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

interface InputScreenProps {
  step: number;
  title: string;
  label: string;
  type: "text" | "email";
  buttonText: string;
  onSubmit: (value: string) => void;
  validator?: (value: string) => string | null;
  onBack?: () => void;
  placeholder?: string;
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
  placeholder
}: InputScreenProps) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
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

    setError(null);
    onSubmit(trimmedValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (touched) {
      setError(null);
    }
  };

  const isDisabled = !value.trim();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 animate-fade-in">
      <div className="w-full max-w-[360px] md:max-w-[520px] lg:max-w-[640px] space-y-8 md:space-y-10">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-deep-blue hover:text-coral transition-colors mb-4"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
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
                       focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
              placeholder={placeholder || label}
              data-step={step}
            />
            {error && touched && (
              <p className="text-sm text-destructive mt-2 px-2">
                {error}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isDisabled}
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
  );
};
