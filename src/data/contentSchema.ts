export const contentSchema = {
  redirectUrl: "https://www.coralacademy.com/class/minibusinessseries-c61a217d-9826-45e5-81a7-ff7cdca717b3",
  logoSrc: "/src/assets/coral-academy-logo.png",
  q1: {
    title: "What made you curious to check out this class today?",
    subtext: "Pick one to get started",
    options: [
      "My child loves business-type topics",
      "We've tried similar classes before",
      "Looking for something new and engaging",
      "Just exploring what's out there"
    ]
  },
  q2: {
    title: "What's the best way for kids to learn about business?",
    options: [
      "Through real stories of famous brands",
      "By doing creative, hands-on activities",
      "Through fun challenges and games",
      "By learning simple money concepts early"
    ]
  },
  q3: {
    title: "What do you hope your child gains from this class?",
    options: [
      "Confidence to share and present ideas",
      "Understanding how money and business work",
      "Creativity and problem-solving skills",
      "Real-world knowledge schools don't teach"
    ]
  },
  name: {
    title: "Almost done—your name?",
    label: "Parent Name",
    button: "Next"
  },
  email: {
    title: "Where should we send class details?",
    label: "Email Address",
    button: "Submit"
  },
  thankyou: {
    title: "Thanks! You're all set.",
    subtext: "Taking you to the class page…",
    delayMs: 1800
  }
};

export type OnboardingAnswers = {
  q1?: string;
  q2?: string;
  q3?: string;
  name?: string;
  email?: string;
  timestamp?: number;
};
