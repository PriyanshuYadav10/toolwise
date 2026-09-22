import type { Tool } from "../types";

export const studentTools: Tool[] = [
  {
    id: "tool-cgpa-calculator",
    name: "CGPA Calculator",
    slug: "cgpa-calculator",
    category: "student-tools",
    shortDescription: "Calculate your CGPA from semester grade points and credits.",
    description: "Add each subject's grade point and credit hours to calculate your overall CGPA.",
    icon: "GraduationCap",
    componentKey: "cgpa-calculator",
    status: "live",
    featured: true,
    popular: true,
    runsInBrowser: true,
    seoTitle: "CGPA Calculator – Free Online Tool | Toolwise",
    seoDescription:
      "Calculate your CGPA from subject grade points and credit hours instantly with our free CGPA calculator.",
    keywords: ["cgpa calculator", "cgpa calculator online", "calculate cgpa"],
    relatedTools: ["gpa-calculator", "marks-percentage-calculator", "attendance-calculator"],
    content: {
      intro:
        "CGPA (Cumulative Grade Point Average) is a credit-weighted average of your grade points across all subjects or semesters. Enter each subject's grade point and credit hours to get your overall CGPA.",
      howToUse: [
        "Add a row for each subject with its grade point (on your institution's scale) and credit hours.",
        "Add more rows as needed for all your subjects.",
        "Your CGPA is calculated and updated instantly.",
      ],
      formula: {
        title: "CGPA Formula",
        expression: "CGPA = Σ(Grade Point × Credit Hours) / Σ(Credit Hours)",
        description:
          "Each subject's grade point is weighted by its credit hours, then averaged across all subjects.",
      },
      benefits: [
        "Track your CGPA across semesters without manual calculation.",
        "See instantly how a new subject's grade will affect your overall average.",
      ],
      commonMistakes: [
        "Mixing grade point scales (e.g. a 4.0 scale with a 10.0 scale) within the same calculation.",
      ],
      faq: [
        {
          question: "What's the difference between CGPA and GPA?",
          answer:
            "GPA typically refers to a single semester's average, while CGPA is the cumulative average across all semesters completed so far.",
        },
      ],
    },
  },
  {
    id: "tool-gpa-calculator",
    name: "GPA Calculator",
    slug: "gpa-calculator",
    category: "student-tools",
    shortDescription: "Calculate your GPA for a single semester from grades and credits.",
    description: "Add each course's letter grade and credit hours to calculate your semester GPA.",
    icon: "GraduationCap",
    componentKey: "gpa-calculator",
    status: "live",
    popular: false,
    runsInBrowser: true,
    seoTitle: "GPA Calculator – Free Online Tool | Toolwise",
    seoDescription: "Calculate your semester GPA from course grades and credit hours with our free GPA calculator.",
    keywords: ["gpa calculator", "calculate gpa online"],
    relatedTools: ["cgpa-calculator", "marks-percentage-calculator"],
    content: {
      intro:
        "This calculator finds your semester GPA on a standard 4.0 scale, using each course's letter grade and credit hours.",
      howToUse: [
        "Add a row for each course with its letter grade and credit hours.",
        "Your GPA updates instantly as you add courses.",
      ],
      formula: {
        title: "GPA Formula",
        expression: "GPA = Σ(Grade Points × Credit Hours) / Σ(Credit Hours)",
        description: "Letter grades are converted to grade points on a 4.0 scale, then weighted by credit hours.",
      },
      benefits: ["Quickly check your semester GPA before it's officially posted."],
      commonMistakes: ["Using a grading scale different from the standard 4.0 scale this calculator assumes."],
      faq: [],
    },
  },
  {
    id: "tool-attendance-calculator",
    name: "Attendance Calculator",
    slug: "attendance-calculator",
    category: "student-tools",
    shortDescription: "Calculate your attendance percentage and classes you can safely miss.",
    description: "Find your current attendance percentage and how many more classes you can miss while staying above the required minimum.",
    icon: "CalendarCheck",
    componentKey: "attendance-calculator",
    status: "live",
    popular: true,
    runsInBrowser: true,
    seoTitle: "Attendance Calculator – Free Online Tool | Toolwise",
    seoDescription:
      "Calculate your attendance percentage and how many classes you can miss with our free attendance calculator.",
    keywords: ["attendance calculator", "attendance percentage calculator"],
    relatedTools: ["cgpa-calculator", "marks-percentage-calculator", "study-time-calculator"],
    content: {
      intro:
        "Most institutions require a minimum attendance percentage. This calculator shows your current attendance and how many more classes you can afford to miss (or need to attend) to stay above your required minimum.",
      howToUse: [
        "Enter the total classes held and classes attended so far.",
        "Enter the minimum required attendance percentage.",
        "See your current percentage and how many classes you can safely miss.",
      ],
      formula: {
        title: "Attendance Formula",
        expression: "Attendance % = (Classes Attended / Total Classes) × 100",
        description: "The tool also projects future classes to estimate how many you can miss while staying compliant.",
      },
      benefits: ["Avoid attendance shortfalls by planning ahead instead of finding out too late."],
      commonMistakes: ["Not accounting for classes still remaining in the term when planning how many to skip."],
      faq: [],
    },
  },
  {
    id: "tool-marks-percentage-calculator",
    name: "Marks Percentage Calculator",
    slug: "marks-percentage-calculator",
    category: "student-tools",
    shortDescription: "Calculate percentage from marks obtained and total marks.",
    description: "Enter marks obtained and total marks across subjects to calculate your overall percentage.",
    icon: "Percent",
    componentKey: "marks-percentage-calculator",
    status: "live",
    popular: true,
    runsInBrowser: true,
    seoTitle: "Marks Percentage Calculator – Free Online Tool | Toolwise",
    seoDescription:
      "Calculate your marks percentage across subjects instantly with our free marks percentage calculator.",
    keywords: ["marks percentage calculator", "percentage calculator for students"],
    relatedTools: ["percentage-calculator", "cgpa-calculator", "attendance-calculator"],
    content: {
      intro:
        "Add the marks obtained and maximum marks for each subject to calculate your overall percentage across all subjects combined.",
      howToUse: [
        "Add a row for each subject with marks obtained and maximum marks.",
        "Your overall percentage updates instantly.",
      ],
      formula: {
        title: "Percentage Formula",
        expression: "Percentage = (Total Marks Obtained / Total Maximum Marks) × 100",
        description: "Marks across all subjects are summed before calculating the overall percentage.",
      },
      benefits: ["Quickly calculate your result percentage across any number of subjects."],
      commonMistakes: ["Entering marks obtained higher than the maximum marks for a subject by mistake."],
      faq: [],
    },
  },
  {
    id: "tool-study-time-calculator",
    name: "Study Time Calculator",
    slug: "study-time-calculator",
    category: "student-tools",
    shortDescription: "Plan how to split your available time across subjects before an exam.",
    description: "Enter your available study hours and subjects to get a suggested time allocation plan.",
    icon: "Timer",
    componentKey: "coming-soon",
    status: "coming-soon",
    runsInBrowser: true,
    seoTitle: "Study Time Calculator | Toolwise",
    seoDescription: "Plan your study time across subjects online for free.",
    keywords: ["study time calculator", "study planner"],
    relatedTools: ["attendance-calculator", "cgpa-calculator"],
  },
];
