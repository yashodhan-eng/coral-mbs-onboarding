export const contentSchema = {
  redirectUrl: "https://www.coralacademy.com/class/minibusinessseries-c61a217d-9826-45e5-81a7-ff7cdca717b3",
  logoSrc: "/coral-logo.png",
  q1: {
    title: "What are you looking to explore?",
    subtext: "Pick one to get started",
    options: [
      "Just the basics",
      "Creative brand stories",
      "Real-world money sense",
      "Fun quizzes & challenges"
    ]
  },
  q2: {
    title: "Your child learns best when it's…",
    options: [
      "Hands-on",
      "Fun & social",
      "Real-life examples"
    ]
  },
  q3: {
    title: "Build more of this:",
    options: [
      "Confidence",
      "Creativity",
      "Smart decisions"
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
