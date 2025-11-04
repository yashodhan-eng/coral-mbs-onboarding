import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface MultiSelectScreenProps {
  step: number;
  title: string;
  subtext?: string;
  options: string[];
  onSubmit: (selected: string[]) => void;
  onBack?: () => void;
  heroImage?: string;
}

export const MultiSelectScreen = ({ 
  step, 
  title, 
  subtext, 
  options, 
  onSubmit,
  onBack,
  heroImage
}: MultiSelectScreenProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleOption = (option: string) => {
    setSelectedOptions(prev => 
      prev.includes(option) 
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = () => {
    if (selectedOptions.length > 0) {
      onSubmit(selectedOptions);
    }
  };

  return (
    <div className="animate-fade-in">
      {heroImage && (
        <div className="w-full max-w-[900px] mx-auto px-4 pt-4 md:pt-8">
          <div className="mb-4 md:mb-8">
            <img 
              src={heroImage} 
              alt="Kids learning about different subjects" 
              className="w-full h-auto max-h-[180px] md:max-h-none object-cover md:object-contain rounded-2xl shadow-lg"
              loading="eager"
            />
          </div>
        </div>
      )}

      <div className="flex flex-col items-center justify-center px-4 py-2">
        {onBack && (
          <button
            onClick={onBack}
            className="fixed top-[3.75rem] left-4 z-10 p-2 rounded-full hover:bg-accent transition-colors"
            aria-label="Go back"
          >
            <ChevronLeft className="w-6 h-6" style={{ color: '#F05A26' }} />
          </button>
        )}
        
        <div className="w-full max-w-[360px] md:max-w-[520px] lg:max-w-[640px] space-y-4 md:space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-xl md:text-3xl lg:text-4xl font-semibold text-foreground leading-tight">
              {title}
            </h1>
            {subtext && (
              <p className="text-sm md:text-lg font-medium" style={{ color: '#2788A0' }}>
                {subtext}
              </p>
            )}
          </div>

          {/* Multi-select grid: 2x3 on mobile, 3x2 on tablet/laptop */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {options.map((option, index) => {
              const isSelected = selectedOptions.includes(option);
              return (
                <button
                  key={index}
                  onClick={() => toggleOption(option)}
                  className={`
                    h-[52px] md:h-[56px] px-4 text-[14px] md:text-[15px] font-medium rounded-full
                    border-2 transition-all duration-200
                    hover:scale-[1.02] active:scale-[0.98]
                    focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                    ${isSelected 
                      ? 'border-transparent text-white shadow-md' 
                      : 'bg-white border-gray-200 text-foreground shadow-sm hover:border-gray-300'
                    }
                  `}
                  style={isSelected ? { backgroundColor: '#F05A26' } : {}}
                  data-step={step}
                  data-question={`q${step}`}
                  data-option-index={index}
                  data-option-text={option}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <Button
              onClick={handleSubmit}
              disabled={selectedOptions.length === 0}
              className="w-full h-[52px] md:h-[56px] text-[15px] md:text-lg font-semibold rounded-full
                       shadow-lg hover:shadow-xl hover:scale-[1.02]
                       active:scale-[0.98] transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                backgroundColor: selectedOptions.length > 0 ? '#F05A26' : undefined,
                color: 'white'
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
