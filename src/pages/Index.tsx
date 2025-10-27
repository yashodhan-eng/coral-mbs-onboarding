import { useState, useEffect } from "react";
import { TopNav } from "@/components/TopNav";
import { QuestionScreen } from "@/components/QuestionScreen";
import { InputScreen } from "@/components/InputScreen";
import { ThankYouScreen } from "@/components/ThankYouScreen";
import { BackgroundTheme } from "@/components/BackgroundTheme";
import { contentSchema, OnboardingAnswers } from "@/data/contentSchema";

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
          <QuestionScreen
            step={1}
            title={contentSchema.q1.title}
            subtext={contentSchema.q1.subtext}
            options={contentSchema.q1.options}
            onSelect={(option, index) => handleQuestionSelect("q1", option)}
          />
        )}

        {currentStep === 2 && (
          <QuestionScreen
            step={2}
            title={contentSchema.q2.title}
            options={contentSchema.q2.options}
            onSelect={(option, index) => handleQuestionSelect("q2", option)}
          />
        )}

        {currentStep === 3 && (
          <QuestionScreen
            step={3}
            title={contentSchema.q3.title}
            options={contentSchema.q3.options}
            onSelect={(option, index) => handleQuestionSelect("q3", option)}
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
          />
        )}
      </main>
    </div>
  );
};

export default Index;
