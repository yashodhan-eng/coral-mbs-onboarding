import { useState, useEffect } from "react";
import { TopNav } from "@/components/TopNav";
import { QuestionScreen } from "@/components/QuestionScreen";
import { InputScreen } from "@/components/InputScreen";
import { ThankYouScreen } from "@/components/ThankYouScreen";
import { BackgroundTheme } from "@/components/BackgroundTheme";
import { contentSchema, OnboardingAnswers } from "@/data/contentSchema";
import heroImage from "@/assets/mini-business-hero.jpg";

const STORAGE_KEY = "coralOnboardingAnswers";
const SUBMISSION_KEY = "coralOnboardingSubmission";

const emailValidator = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }
  return null;
};

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<OnboardingAnswers>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Load saved answers from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsedAnswers = JSON.parse(saved);
        setAnswers(parsedAnswers);
        
        // Determine which step to resume from
        if (parsedAnswers.email) {
          setIsSubmitted(true);
        } else if (parsedAnswers.name) {
          setCurrentStep(5);
        } else if (parsedAnswers.q3) {
          setCurrentStep(4);
        } else if (parsedAnswers.q2) {
          setCurrentStep(3);
        } else if (parsedAnswers.q1) {
          setCurrentStep(2);
        }
      } catch (e) {
        console.error("Failed to parse saved answers", e);
      }
    }
  }, []);

  // Save answers to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    }
  }, [answers]);

  const handleQuestionSelect = (questionKey: string, value: string) => {
    const newAnswers = { ...answers, [questionKey]: value };
    setAnswers(newAnswers);
    
    // Auto-advance after a brief delay for visual feedback
    setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, 200);
  };

  const handleNameSubmit = (name: string) => {
    const newAnswers = { ...answers, name };
    setAnswers(newAnswers);
    setCurrentStep(5);
  };

  const handleEmailSubmit = (email: string) => {
    const finalAnswers = { 
      ...answers, 
      email,
      timestamp: Date.now()
    };
    setAnswers(finalAnswers);
    
    // Save submission
    localStorage.setItem(SUBMISSION_KEY, JSON.stringify(finalAnswers));
    
    setIsSubmitted(true);
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background relative">
        <BackgroundTheme />
        <ThankYouScreen
          title={contentSchema.thankyou.title}
          subtext={contentSchema.thankyou.subtext}
          delayMs={contentSchema.thankyou.delayMs}
          redirectUrl={contentSchema.redirectUrl}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundTheme />
      
      <TopNav 
        currentStep={currentStep} 
        totalSteps={5}
        logoSrc={contentSchema.logoSrc}
      />

      <main className="pb-8">
        {currentStep === 1 && (
          <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 animate-fade-in">
            <div className="w-full max-w-[360px] md:max-w-[520px] lg:max-w-[640px] space-y-8 md:space-y-10">
              <div className="w-full rounded-3xl overflow-hidden shadow-lg mb-6">
                <img 
                  src={heroImage} 
                  alt="Mini Business Series" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="text-center space-y-4">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground leading-tight">
                  {contentSchema.q1.title}
                </h1>
                {contentSchema.q1.subtext && (
                  <p className="text-base md:text-lg text-deep-blue font-medium">
                    {contentSchema.q1.subtext}
                  </p>
                )}
              </div>
              <div className="space-y-4">
                {contentSchema.q1.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuestionSelect("q1", option)}
                    className="w-full h-auto py-4 px-6 text-base md:text-lg font-medium rounded-full 
                             bg-card text-foreground border border-border 
                             shadow-sm hover:shadow-md hover:scale-[1.02] 
                             active:scale-[0.98] transition-all duration-200
                             focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    data-step={1}
                    data-question="q1"
                    data-option-index={index}
                    data-option-text={option}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <QuestionScreen
            step={2}
            title={contentSchema.q2.title}
            options={contentSchema.q2.options}
            onSelect={(option, index) => handleQuestionSelect("q2", option)}
            onBack={handleBack}
          />
        )}

        {currentStep === 3 && (
          <QuestionScreen
            step={3}
            title={contentSchema.q3.title}
            options={contentSchema.q3.options}
            onSelect={(option, index) => handleQuestionSelect("q3", option)}
            onBack={handleBack}
          />
        )}

        {currentStep === 4 && (
          <InputScreen
            step={4}
            title={contentSchema.name.title}
            label={contentSchema.name.label}
            type="text"
            buttonText={contentSchema.name.button}
            onSubmit={handleNameSubmit}
            onBack={handleBack}
            placeholder="Enter your name"
          />
        )}

        {currentStep === 5 && (
          <InputScreen
            step={5}
            title={contentSchema.email.title}
            label={contentSchema.email.label}
            type="email"
            buttonText={contentSchema.email.button}
            onSubmit={handleEmailSubmit}
            validator={emailValidator}
            onBack={handleBack}
            placeholder="Enter your email"
          />
        )}
      </main>
    </div>
  );
};

export default Index;
