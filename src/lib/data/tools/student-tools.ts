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
        "CGPA (Cumulative Grade Point Average) is a credit-weighted average of your grade points across all subjects or semesters. Enter each subject's grade point and credit hours to get your overall CGPA. Because the average is weighted by credits, a high-credit core subject moves your CGPA far more than a one-credit elective with the same grade — which is exactly why a simple average of your grade points gives the wrong answer.",
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
        "Avoid the credit-weighting error that makes a hand-calculated average come out wrong.",
        "Work out what grades you'd need next semester to reach a target CGPA, by adding hypothetical rows.",
      ],
      commonMistakes: [
        "Mixing grade point scales (e.g. a 4.0 scale with a 10.0 scale) within the same calculation.",
        "Averaging grade points directly instead of multiplying each one by its credit hours first.",
        "Averaging your semester CGPAs together instead of recombining all subjects' grade points and credits — that only gives the same answer if every semester carried identical credits.",
      ],
      faq: [
        {
          question: "What's the difference between CGPA and GPA?",
          answer:
            "GPA typically refers to a single semester's average, while CGPA is the cumulative average across all semesters completed so far.",
        },
        {
          question: "How do I convert CGPA to a percentage?",
          answer:
            "Many institutions publish their own conversion formula — a multiplier such as CGPA × 9.5 is common in some Indian boards, but it is not universal. Always use the official formula from your own institution or board rather than a generic one, since the result may appear on official documents.",
        },
        {
          question: "How do backlogs or repeated subjects affect my CGPA?",
          answer:
            "It depends on your institution's policy. Some replace the failing grade with the re-attempt grade, some average both attempts, and some count only the better one. Check your academic regulations before assuming which applies.",
        },
        {
          question: "Can my CGPA drop even if I did well this semester?",
          answer:
            "Yes. CGPA is cumulative, so a semester only raises it if its credit-weighted average is higher than your existing CGPA. A decent-but-below-average semester will pull the number down slightly.",
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
        "Most institutions require a minimum attendance percentage to be eligible to sit exams — 75% is a common threshold, though the exact figure varies by institution, so check your own regulations. This calculator shows your current attendance and how many more classes you can afford to miss (or need to attend) to stay above your required minimum, so you find out while there's still time to fix it.",
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
      benefits: [
        "Avoid attendance shortfalls by planning ahead instead of finding out too late.",
        "See exactly how many classes you can still miss before you drop below the required minimum.",
        "Work out how many consecutive classes you'd need to attend to recover from a shortfall.",
        "Check each subject separately, since many institutions apply the attendance rule per subject rather than overall.",
      ],
      commonMistakes: [
        "Not accounting for classes still remaining in the term when planning how many to skip.",
        "Assuming the threshold is 75% everywhere — confirm the exact requirement in your institution's regulations.",
        "Counting only lectures and forgetting labs, tutorials or practicals that are recorded separately.",
        "Skipping classes early in the term, when the total class count is small and each absence swings the percentage much harder.",
      ],
      faq: [
        {
          question: "What attendance percentage do I actually need?",
          answer:
            "It varies. Many colleges and universities set the bar at 75% for exam eligibility, but some use 70%, 80% or a different figure, and rules can differ between theory and practical sessions. Check your institution's academic regulations rather than relying on a general number.",
        },
        {
          question: "How do I calculate how many classes I can miss?",
          answer:
            "Take the total classes expected for the term, multiply by your required percentage to get the minimum you must attend, then subtract the classes you've already attended. Whatever is left is what you still need to attend — and the remaining classes minus that figure is how many you can safely miss. The calculator does this for you.",
        },
        {
          question: "Do medical or approved leaves count towards attendance?",
          answer:
            "Many institutions allow a documented medical or duty leave to be condoned, sometimes up to a capped percentage. This is a policy question, not a maths one, so ask your department rather than assuming absences will be excused.",
        },
        {
          question: "Can I recover if I'm already below the minimum?",
          answer:
            "Sometimes, if enough classes remain. Enter the classes still left in the term and the calculator will show whether attending all of them is enough to cross the threshold. If the maths says it isn't, speak to your department early rather than at the end of term.",
        },
      ],
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
        "Add the marks obtained and maximum marks for each subject to calculate your overall percentage across all subjects combined. The tool sums all marks obtained and divides by the sum of all maximum marks, which is the correct method when subjects are out of different totals — averaging each subject's individual percentage instead is a common mistake that produces a different, and wrong, result.",
      howToUse: [
        "Add a row for each subject with marks obtained and maximum marks.",
        "Your overall percentage updates instantly.",
      ],
      formula: {
        title: "Percentage Formula",
        expression: "Percentage = (Total Marks Obtained / Total Maximum Marks) × 100",
        description: "Marks across all subjects are summed before calculating the overall percentage.",
      },
      benefits: [
        "Quickly calculate your result percentage across any number of subjects.",
        "Handle subjects with different maximum marks correctly, without manual weighting.",
        "Check your own arithmetic against the marksheet before assuming a result is wrong.",
        "See how one subject's marks change your overall percentage before results are finalised.",
      ],
      commonMistakes: [
        "Entering marks obtained higher than the maximum marks for a subject by mistake.",
        "Averaging each subject's individual percentage instead of summing marks and totals — these only match when every subject has the same maximum marks.",
        "Leaving out a subject, or including an optional subject your board excludes from the aggregate.",
      ],
      faq: [
        {
          question: "How do I calculate percentage across subjects with different maximum marks?",
          answer:
            "Add up the marks you obtained in every subject, add up the maximum marks for every subject, then divide the first total by the second and multiply by 100. Do not average the individual subject percentages — that treats a 50-mark subject as equal to a 100-mark one.",
        },
        {
          question: "Is percentage the same as CGPA?",
          answer:
            "No. Percentage is calculated directly from raw marks, while CGPA is a credit-weighted average of grade points. Some institutions publish a conversion formula between the two, but the two numbers are calculated in completely different ways and are not interchangeable.",
        },
        {
          question: "How do I convert my percentage into a letter grade?",
          answer:
            "Use the conversion scale published by your own institution or board. Grade bands vary widely — the same 78% can be a distinction on one scale and a mid-range grade on another — so a generic table is not reliable.",
        },
        {
          question: "Should I include practical or internal assessment marks?",
          answer:
            "Include them if your board or university counts them towards the aggregate, and add their maximum marks to the total as well. If they are reported separately and excluded from the final percentage, leave them out of the calculation.",
        },
      ],
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
