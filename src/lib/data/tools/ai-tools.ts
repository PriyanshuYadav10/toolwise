import type { Tool } from "../types";

const AI_PRIVACY_NOTE =
  "The text you enter is sent securely to our server to generate a response using an AI model. It is not stored permanently or used to train models.";

export const aiTools: Tool[] = [
  {
    id: "tool-ai-resume-builder",
    name: "AI Resume Builder",
    slug: "ai-resume-builder",
    category: "ai-tools",
    shortDescription: "Generate a professional resume summary, skills and experience with AI.",
    description:
      "Enter your job title, experience and skills to generate a polished, ready-to-use resume draft you can copy and refine.",
    icon: "FileUser",
    componentKey: "ai-resume-builder",
    status: "live",
    featured: true,
    popular: true,
    runsInBrowser: false,
    privacyNote: AI_PRIVACY_NOTE,
    seoTitle: "AI Resume Builder – Free Resume Generator | Toolwise",
    seoDescription:
      "Generate a professional resume summary, skills section and experience bullet points with our free AI resume builder.",
    keywords: ["ai resume builder", "resume generator free", "resume summary generator"],
    relatedTools: ["cover-letter-generator", "paragraph-rewriter", "linkedin-headline-generator"],
    content: {
      intro:
        "Writing a resume from scratch is slow and it's easy to undersell your own experience. This tool takes your job title, experience, skills and education, and drafts a professional summary, skills list and achievement-oriented experience bullet points you can copy, edit and refine.",
      howToUse: [
        "Enter your target job title and years of experience.",
        "List your key skills, education and notable projects.",
        "Click Generate to get a full resume draft.",
        "Copy sections you like, or click Regenerate for alternatives.",
      ],
      benefits: [
        "Turn a rough list of skills and experience into polished, professional wording.",
        "Get achievement-focused bullet points instead of generic duty descriptions.",
        "Regenerate any section until the wording feels right.",
        "Break through blank-page paralysis — it's far easier to edit a draft than to start from nothing.",
      ],
      commonMistakes: [
        "Copying the AI output verbatim without checking accuracy — always verify facts, dates and numbers yourself.",
        "Giving too little detail, which produces a generic result. The more specific your input, the better the draft.",
        "Using the same generated resume for every application instead of tailoring it to each job description.",
        "Letting the AI invent metrics or achievements you can't back up in an interview — replace any number you didn't provide with a real one or remove it.",
      ],
      faq: [
        {
          question: "Is the generated content unique to me?",
          answer:
            "Yes, the output is generated based on the specific details you provide, though you should always review and personalise it before using it.",
        },
        {
          question: "Is my information stored?",
          answer: AI_PRIVACY_NOTE,
        },
        {
          question: "Will this resume pass an ATS (Applicant Tracking System)?",
          answer:
            "The output is plain text with standard section headings, which parses cleanly in most applicant tracking systems. But ATS ranking also depends on how well your content matches the specific job description, so add the relevant keywords and skills from the posting before you submit.",
        },
        {
          question: "Can employers tell a resume was written with AI?",
          answer:
            "There's no reliable way to detect AI-assisted writing, and using a tool to draft your resume isn't dishonest. What matters is that every claim is accurate and that the final wording sounds like you — so always edit the draft rather than sending it as-is.",
        },
        {
          question: "How should I tailor the draft for a specific job?",
          answer:
            "Read the job description and note the skills and responsibilities it emphasises. Then reorder your bullet points so the most relevant experience appears first, and make sure the terminology in your resume matches the terminology in the posting where it genuinely applies to you.",
        },
      ],
    },
  },
  {
    id: "tool-cover-letter-generator",
    name: "Cover Letter Generator",
    slug: "cover-letter-generator",
    category: "ai-tools",
    shortDescription: "Generate a tailored cover letter for any job in seconds.",
    description: "Enter the job title, company and your background to generate a tailored, professional cover letter.",
    icon: "Mail",
    componentKey: "cover-letter-generator",
    status: "live",
    featured: true,
    popular: true,
    runsInBrowser: false,
    privacyNote: AI_PRIVACY_NOTE,
    seoTitle: "Cover Letter Generator – Free AI Tool | Toolwise",
    seoDescription:
      "Generate a tailored, professional cover letter for any job application with our free AI cover letter generator.",
    keywords: ["cover letter generator", "ai cover letter", "free cover letter maker"],
    relatedTools: ["ai-resume-builder", "paragraph-rewriter", "job-description-analyzer"],
    content: {
      intro:
        "A generic cover letter rarely stands out. This tool drafts a cover letter tailored to the specific job title, company and your background, giving you a strong starting point to personalise further. A good cover letter adds the context a resume can't — why this role, why this company, and how your experience connects to what they're actually hiring for.",
      howToUse: [
        "Enter the job title and company you're applying to.",
        "Summarise your relevant experience and why you're interested.",
        "Click Generate to get a full cover letter draft.",
        "Edit the tone or details, then copy or download it.",
      ],
      benefits: [
        "Save time writing a first draft for every application.",
        "Get a structure that highlights relevant experience for the specific role.",
        "Start from a proper opening, middle and closing instead of staring at a blank page.",
        "Adjust the tone and length quickly when you're applying to several roles in one sitting.",
      ],
      commonMistakes: [
        "Sending the AI draft without personalising it — always add specific details about why you want that particular role.",
        "Simply restating your resume in paragraph form instead of adding context the resume can't convey.",
        "Forgetting to update the company or role name when reusing a previous letter — hiring managers notice immediately.",
      ],
      faq: [
        {
          question: "Will this write a completely unique cover letter?",
          answer:
            "It generates a draft based on your specific inputs, but you should review, personalise and fact-check it before sending.",
        },
        {
          question: "How long should a cover letter be?",
          answer:
            "Roughly 250-400 words, comfortably fitting on one page. Hiring managers usually skim, so three to four tight paragraphs beat a full page of dense text.",
        },
        {
          question: "Do cover letters still matter if the application says they're optional?",
          answer:
            "Often yes. When a letter is optional, many candidates skip it, so a short, specific one is a low-cost way to explain a career change, a gap, or why you're genuinely interested in that company. If the application does not accept one at all, put that context into your resume summary instead.",
        },
        {
          question: "Is my information stored?",
          answer: AI_PRIVACY_NOTE,
        },
      ],
    },
  },
  {
    id: "tool-paragraph-rewriter",
    name: "Paragraph Rewriter",
    slug: "paragraph-rewriter",
    category: "ai-tools",
    shortDescription: "Rewrite any text to be clearer, more formal, or more concise.",
    description: "Paste any paragraph and instantly get a rewritten version in the tone you choose.",
    icon: "PenLine",
    componentKey: "paragraph-rewriter",
    status: "live",
    popular: true,
    runsInBrowser: false,
    privacyNote: AI_PRIVACY_NOTE,
    seoTitle: "Paragraph Rewriter – Free AI Rewriting Tool | Toolwise",
    seoDescription:
      "Rewrite any paragraph to be clearer, more formal or more concise with our free AI paragraph rewriter.",
    keywords: ["paragraph rewriter", "ai text rewriter", "rewrite paragraph online"],
    relatedTools: ["grammar-checker", "text-summarizer", "cover-letter-generator"],
    content: {
      intro:
        "Whether you need a paragraph to sound more formal, more concise, or simply clearer, this tool rewrites your text while preserving its original meaning. It's useful when you know what you want to say but the wording isn't landing — for work emails, application essays, product copy or anything where tone matters as much as content. You stay in control: the rewrite is a suggestion you can accept, edit or regenerate.",
      howToUse: [
        "Paste the paragraph you want to rewrite.",
        "Choose a tone: formal, casual, concise or simple.",
        "Click Rewrite to get the result, and regenerate for alternatives.",
      ],
      benefits: [
        "Quickly adjust tone for emails, reports or academic writing.",
        "Get multiple phrasing options by regenerating.",
        "Tighten wordy drafts down to something a reader will actually finish.",
        "See how the same idea reads in a different register, which is helpful if you're writing in a second language.",
      ],
      commonMistakes: [
        "Rewriting highly technical or legal text without double-checking that precise meaning is preserved.",
        "Pasting in very long passages at once — rewriting a few paragraphs at a time gives tighter, more accurate results.",
        "Accepting a rewrite that sounds polished but has quietly dropped a specific detail, number or caveat from the original.",
      ],
      faq: [
        {
          question: "Does this change the meaning of my text?",
          answer:
            "The tool aims to preserve meaning while adjusting tone and clarity, but always review the output for accuracy, especially for technical content.",
        },
        {
          question: "Can I use this for academic work or assignments?",
          answer:
            "Use it to improve your own writing, not to disguise someone else's. Many institutions have specific policies on AI assistance, and some run similarity or AI-detection checks, so check your course rules before submitting rewritten text.",
        },
        {
          question: "Will the rewritten text be free of plagiarism?",
          answer:
            "The rewrite is newly generated from your input rather than copied from a source, but rewording text you didn't write does not make it yours. If the original content came from somewhere else, you still need to cite it.",
        },
        {
          question: "Is my text stored?",
          answer: AI_PRIVACY_NOTE,
        },
      ],
    },
  },
  {
    id: "tool-prompt-generator",
    name: "Prompt Generator",
    slug: "prompt-generator",
    category: "ai-tools",
    shortDescription: "Turn a rough idea into a detailed, well-structured AI prompt.",
    description: "Describe what you want in plain language and get a detailed, structured prompt for any AI tool.",
    icon: "Wand2",
    componentKey: "prompt-generator",
    status: "live",
    popular: false,
    runsInBrowser: false,
    privacyNote: AI_PRIVACY_NOTE,
    seoTitle: "AI Prompt Generator – Free Prompt Writing Tool | Toolwise",
    seoDescription:
      "Turn a rough idea into a detailed, well-structured AI prompt with our free prompt generator tool.",
    keywords: ["ai prompt generator", "prompt generator free", "chatgpt prompt generator"],
    relatedTools: ["paragraph-rewriter", "ai-resume-builder"],
    content: {
      intro:
        "Getting good results from an AI tool often depends on how well-structured your prompt is. Describe your goal in plain language, and this tool expands it into a detailed, structured prompt with context, constraints and format instructions.",
      howToUse: [
        "Describe what you want to achieve in a sentence or two.",
        "Select the type of output you need (writing, code, image prompt, etc.).",
        "Click Generate to get a detailed, structured prompt you can paste into any AI tool.",
      ],
      benefits: [
        "Get noticeably better AI output by starting from a well-structured prompt.",
        "Save time crafting prompts manually for repetitive tasks.",
      ],
      commonMistakes: ["Using an overly vague starting description, which limits how specific the generated prompt can be."],
      faq: [],
    },
  },
  {
    id: "tool-grammar-checker",
    name: "Grammar Checker",
    slug: "grammar-checker",
    category: "ai-tools",
    shortDescription: "Check text for grammar, spelling and style issues.",
    description: "Catch grammar, spelling and style issues in your writing.",
    icon: "SpellCheck",
    componentKey: "coming-soon",
    status: "coming-soon",
    runsInBrowser: false,
    seoTitle: "Grammar Checker Online | Toolwise",
    seoDescription: "Check grammar, spelling and style online for free.",
    keywords: ["grammar checker", "spelling checker online"],
    relatedTools: ["paragraph-rewriter", "text-summarizer"],
  },
  {
    id: "tool-text-summarizer",
    name: "Text Summarizer",
    slug: "text-summarizer",
    category: "ai-tools",
    shortDescription: "Summarise long text into key points instantly.",
    description: "Condense long articles or documents into a short summary.",
    icon: "FileMinus",
    componentKey: "coming-soon",
    status: "coming-soon",
    runsInBrowser: false,
    seoTitle: "Text Summarizer Online | Toolwise",
    seoDescription: "Summarise long text into key points online for free.",
    keywords: ["text summarizer", "summarize text online"],
    relatedTools: ["paragraph-rewriter", "grammar-checker"],
  },
  {
    id: "tool-linkedin-headline-generator",
    name: "LinkedIn Headline Generator",
    slug: "linkedin-headline-generator",
    category: "ai-tools",
    shortDescription: "Generate a compelling LinkedIn headline in seconds.",
    description: "Turn your role and skills into a compelling LinkedIn headline.",
    icon: "Contact",
    componentKey: "coming-soon",
    status: "coming-soon",
    runsInBrowser: false,
    seoTitle: "LinkedIn Headline Generator | Toolwise",
    seoDescription: "Generate a compelling LinkedIn headline online for free.",
    keywords: ["linkedin headline generator"],
    relatedTools: ["ai-resume-builder", "cover-letter-generator"],
  },
  {
    id: "tool-job-description-analyzer",
    name: "Job Description Analyzer",
    slug: "job-description-analyzer",
    category: "ai-tools",
    shortDescription: "Extract key requirements and keywords from a job description.",
    description: "Paste a job description to extract key requirements, skills and keywords.",
    icon: "SearchCheck",
    componentKey: "coming-soon",
    status: "coming-soon",
    runsInBrowser: false,
    seoTitle: "Job Description Analyzer | Toolwise",
    seoDescription: "Extract key requirements and keywords from a job description online for free.",
    keywords: ["job description analyzer"],
    relatedTools: ["ai-resume-builder", "cover-letter-generator"],
  },
];
