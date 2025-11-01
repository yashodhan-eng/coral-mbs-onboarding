import { useState, useEffect } from "react";
import { TopNav } from "@/components/TopNav";
import { LandingScreen } from "@/components/LandingScreen";
import { QuestionScreen } from "@/components/QuestionScreen";
import { InputScreen } from "@/components/InputScreen";
import { ThankYouScreen } from "@/components/ThankYouScreen";
import { BackgroundTheme } from "@/components/BackgroundTheme";
import { contentSchema, OnboardingAnswers } from "@/data/contentSchema";
import { adCampaignService } from "../lib/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import q1Hero from "@/assets/q1-hero.jpg";
import screen2Hero from "@/assets/screen2-hero.jpg";
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

// Map quiz answers to backend format
const mapHowSoon = (answer: string): string => {
  const mapping: Record<string, string> = {
    'Right away': 'Right Away',
    'In 1–2 weeks': '1-2 Weeks',
    'Next month': 'next month',
    'Just exploring': 'just exploring'
  };
  return mapping[answer] || answer;
};

const mapSchoolingMode = (answer: string): string => {
  const mapping: Record<string, string> = {
    'Public/Private schooling': 'Public/private schooling',
    'Homeschooling': 'homeschooling'
  };
  return mapping[answer] || answer;
};

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<OnboardingAnswers>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Clear storage and start fresh for preview
  useEffect(() => {
    localStorage.removeItem(SUBMISSION_KEY);
    localStorage.removeItem(STORAGE_KEY);
    setCurrentStep(0);
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
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const handleNameSubmit = (name: string) => {
    const newAnswers = { ...answers, name };
    setAnswers(newAnswers);
    setCurrentStep(4);
  };

  const handleEmailSubmit = async (email: string, recaptchaToken?: string | null) => {
    const finalAnswers = { 
      ...answers, 
      email,
      timestamp: Date.now()
    };
    setAnswers(finalAnswers);
    
    // Save submission locally
    localStorage.setItem(SUBMISSION_KEY, JSON.stringify(finalAnswers));
    
    // Submit to backend API
    setIsSubmitting(true);
    try {
      await submitToBackend(finalAnswers, recaptchaToken);
      setIsSubmitted(true);
    } catch (error: any) {
      setIsSubmitting(false);
      console.error('Submission error:', error);
      
      // Show error message
      let errorMessage = 'Registration failed. Please try again.';
      if (error.errorType === 'duplicate_email') {
        errorMessage = 'Email already registered. Please use a different email address.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    }
  };

  const submitToBackend = async (finalAnswers: OnboardingAnswers, recaptchaToken?: string | null) => {
    // Validate required fields before sending
    if (!finalAnswers.name || !finalAnswers.email) {
      throw new Error('Name and email are required');
    }

    if (!recaptchaToken) {
      throw new Error('reCAPTCHA verification is required. Please complete the verification.');
    }

    console.log('Submitting to backend with:', {
      name: finalAnswers.name,
      email: finalAnswers.email,
      source: 'MBS_Quiz_Page',
      how_soon: finalAnswers.q1 ? mapHowSoon(finalAnswers.q1) : null,
      schooling_mode: finalAnswers.q2 ? mapSchoolingMode(finalAnswers.q2) : null,
      hasRecaptchaToken: !!recaptchaToken,
    });

    const response = await adCampaignService.register({
      name: finalAnswers.name,
      email: finalAnswers.email,
      source: 'MBS_Quiz_Page',
      how_soon: finalAnswers.q1 ? mapHowSoon(finalAnswers.q1) : null,
      schooling_mode: finalAnswers.q2 ? mapSchoolingMode(finalAnswers.q2) : null,
      recaptchaToken: recaptchaToken,
    });

    if (!response.success) {
      throw new Error(response.error || 'Registration failed');
    }
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

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-background relative flex items-center justify-center">
        <BackgroundTheme />
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 md:w-16 md:h-16 text-primary animate-spin mx-auto" />
          <p className="text-lg text-muted-foreground">Submitting your information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundTheme />
      
      {currentStep > 0 && (
        <TopNav 
          currentStep={currentStep} 
          totalSteps={4}
        />
      )}

      <main className="pb-8">
        {currentStep === 0 && (
          <LandingScreen onContinue={() => setCurrentStep(1)} />
        )}

        {currentStep === 1 && (
          <div className="animate-fade-in">
            <div className="w-full max-w-[1000px] mx-auto px-4 pt-8">
              <div className="mb-10">
                <img 
                  src={q1Hero} 
                  alt="Parent and child discovering business class" 
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
            </div>

            <QuestionScreen
              step={1}
              title={contentSchema.q1.title}
              subtext={contentSchema.q1.subtext}
              options={contentSchema.q1.options}
              onSelect={(option, index) => handleQuestionSelect("q1", option)}
              onBack={handleBack}
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
          <InputScreen
            step={3}
            title={contentSchema.name.title}
            label={contentSchema.name.label}
            type="text"
            buttonText={contentSchema.name.button}
            onSubmit={handleNameSubmit}
            onBack={handleBack}
            heroImage={screen4Hero}
          />
        )}

        {currentStep === 4 && (
          <InputScreen
            step={4}
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
