import { useState, useEffect } from "react";
import { TopNav } from "@/components/TopNav";
import { QuestionScreen } from "@/components/QuestionScreen";
import { InputScreen } from "@/components/InputScreen";
import { ThankYouScreen } from "@/components/ThankYouScreen";
import { BackgroundTheme } from "@/components/BackgroundTheme";
import { contentSchema, OnboardingAnswers } from "@/data/contentSchema";
import heroImage from "@/assets/mini-business-hero.jpg";
import screen2Hero from "@/assets/screen2-hero.jpg";
import screen3Hero from "@/assets/screen3-hero.jpg";
import screen4Hero from "@/assets/screen4-hero.jpg";
import screen5Hero from "@/assets/screen5-hero.jpg";

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

  // Clear storage and start fresh for preview
  useEffect(() => {
    localStorage.removeItem(SUBMISSION_KEY);
    localStorage.removeItem(STORAGE_KEY);
    setCurrentStep(1);
    setAnswers({});
    setIsSubmitted(false);
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
      />

      <main className="pb-8">
        {currentStep === 1 && (
          <div className="animate-fade-in">
            <div className="w-full max-w-[1000px] mx-auto px-4 pt-8">
              {/* Title Section */}
              <div className="text-center mb-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
                  Mini Business Series
                </h1>
                <p className="text-lg md:text-xl text-[#2788A0] font-medium">
                  The Entrepreneurship Class for Kids Every Parent Recommends
                </p>
              </div>

              {/* Hero Image */}
              <div className="mb-10">
                <img 
                  src={heroImage} 
                  alt="Mini Business Series - Brand Logos Collage" 
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
            </div>

            {/* Question Section */}
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
          <div className="animate-fade-in">
            <div className="w-full max-w-[1000px] mx-auto px-4 pt-8">
              <div className="mb-10">
                <img 
                  src={screen2Hero} 
                  alt="Kids learning about business" 
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
            </div>

            <QuestionScreen
              step={2}
              title={contentSchema.q2.title}
              options={contentSchema.q2.options}
              onSelect={(option, index) => handleQuestionSelect("q2", option)}
              onBack={handleBack}
            />
          </div>
        )}

        {currentStep === 3 && (
          <div className="animate-fade-in">
            <div className="w-full max-w-[1000px] mx-auto px-4 pt-8">
              <div className="mb-10">
                <img 
                  src={screen3Hero} 
                  alt="Child presenting ideas" 
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
            </div>

            <QuestionScreen
              step={3}
              title={contentSchema.q3.title}
              options={contentSchema.q3.options}
              onSelect={(option, index) => handleQuestionSelect("q3", option)}
              onBack={handleBack}
            />
          </div>
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
            heroImage={screen4Hero}
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
            heroImage={screen5Hero}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
