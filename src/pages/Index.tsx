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
    // Clear previous submission to allow fresh preview
    localStorage.removeItem(SUBMISSION_KEY);
    
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsedAnswers = JSON.parse(saved);
        // Only resume if not fully completed
        if (!parsedAnswers.email) {
          setAnswers(parsedAnswers);
          
          // Determine which step to resume from
          if (parsedAnswers.name) {
            setCurrentStep(5);
          } else if (parsedAnswers.q3) {
            setCurrentStep(4);
          } else if (parsedAnswers.q2) {
            setCurrentStep(3);
          } else if (parsedAnswers.q1) {
            setCurrentStep(2);
          }
        } else {
          // Clear completed flow to start fresh
          localStorage.removeItem(STORAGE_KEY);
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

  const handleBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
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
          <div className="animate-fade-in">
            <div className="w-full max-w-[1200px] mx-auto px-4 pt-6">
              <img 
                src={heroImage} 
                alt="Mini Business Series" 
                className="w-full h-auto rounded-2xl shadow-lg mb-8"
              />
            </div>
            <QuestionScreen
              step={1}
              title={contentSchema.q1.title}
              subtext={contentSchema.q1.subtext}
              options={contentSchema.q1.options}
              onSelect={(option, index) => handleQuestionSelect("q1", option)}
            />
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
          />
        )}
      </main>
    </div>
  );
};

export default Index;
