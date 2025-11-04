export const contentSchema = {
  redirectUrl: "https://www.coralacademy.com/class/minibusinessseries-c61a217d-9826-45e5-81a7-ff7cdca717b3",
  logoSrc: "/src/assets/coral-academy-logo.png",
  q1: {
    title: "How soon are you looking to try our free classes?",
    subtext: "Help your child think like a young entrepreneur",
    options: [
      "Right away",
      "In 1–2 weeks",
      "Next month",
      "Just exploring"
    ]
  },
  q2: {
    title: "What topics is your child interested in?",
    subtext: "Select multiple and submit.",
    options: [
      "Entrepreneurship",
      "Science",
      "Coding",
      "AI",
      "Drawing",
      "Logic",
      "History",
      "Finance"
    ]
  },
  name: {
    title: "What's your name?",
    label: "Enter your name",
    button: "Next"
  },
  email: {
    title: "Kindly share your email address",
    label: "Enter your email",
    button: "Submit"
  },
  thankyou: {
    title: "Thanks! You're all set.",
    subtext: "Taking you to the class page…",
    delayMs: 1800
  }
};

export type OnboardingAnswers = {
  q1?: string;  // "How soon are you looking to try our free classes?"
  q2?: string[];  // "What topics is your child interested in?" (multi-select)
  name?: string;
  email?: string;
  timestamp?: number;
};
