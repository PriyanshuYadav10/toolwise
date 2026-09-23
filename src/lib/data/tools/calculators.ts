import type { Tool } from "../types";

export const calculatorTools: Tool[] = [
  {
    id: "tool-emi-calculator",
    name: "EMI Calculator",
    slug: "emi-calculator",
    category: "calculators",
    shortDescription: "Calculate your monthly loan EMI, total interest and payment breakdown.",
    description:
      "Work out the monthly instalment on a home, car or personal loan, and see exactly how much of it goes toward interest.",
    icon: "Landmark",
    componentKey: "emi-calculator",
    status: "live",
    featured: true,
    popular: true,
    runsInBrowser: true,
    seoTitle: "EMI Calculator – Calculate Monthly Loan EMI Free | Toolwise",
    seoDescription:
      "Calculate your monthly EMI, total interest and total payment instantly with our free EMI calculator for home, car and personal loans.",
    keywords: ["emi calculator", "loan emi", "home loan emi", "car loan emi calculator"],
    relatedTools: ["loan-calculator", "sip-calculator", "salary-calculator", "compound-interest-calculator"],
    content: {
      intro:
        "An EMI (Equated Monthly Instalment) is the fixed amount you repay each month on a loan, combining both principal and interest. This calculator uses the standard amortising-loan formula to show your monthly EMI, total interest paid over the loan term, and the total amount you'll repay.",
      howToUse: [
        "Enter the loan amount (principal) you plan to borrow.",
        "Enter the annual interest rate offered by your lender.",
        "Enter the loan tenure in years or months.",
        "Your EMI, total interest and total payment update instantly.",
      ],
      formula: {
        title: "EMI Formula",
        expression: "EMI = P × r × (1 + r)ⁿ / ((1 + r)ⁿ − 1)",
        description:
          "Where P is the principal loan amount, r is the monthly interest rate (annual rate ÷ 12 ÷ 100), and n is the number of monthly instalments.",
      },
      example: {
        title: "Example Calculation",
        summary: "A ₹20,00,000 loan at 8.5% annual interest over 20 years.",
        rows: [
          { label: "Principal", value: "₹20,00,000" },
          { label: "Interest Rate", value: "8.5% per year" },
          { label: "Tenure", value: "20 years (240 months)" },
          { label: "Monthly EMI", value: "≈ ₹17,357" },
          { label: "Total Interest", value: "≈ ₹21,65,680" },
          { label: "Total Payment", value: "≈ ₹41,65,680" },
        ],
      },
      benefits: [
        "Plan your monthly budget before committing to a loan.",
        "Compare EMIs across different tenures and interest rates in seconds.",
        "See how much of your repayment is interest versus principal.",
        "Stress-test affordability by re-running the numbers at a higher rate before you sign.",
      ],
      commonMistakes: [
        "Comparing only the EMI amount without checking the total interest paid over the full tenure.",
        "Forgetting that a longer tenure lowers EMI but significantly increases total interest.",
        "Not accounting for processing fees or prepayment charges, which this calculator does not include.",
        "Converting the annual rate to a monthly rate incorrectly — divide by 12 and by 100 exactly once each.",
        "Assuming a floating rate will stay at today's level for the entire tenure when budgeting.",
      ],
      faq: [
        {
          question: "Does this EMI calculator work for all loan types?",
          answer:
            "Yes — the same reducing-balance formula applies to home loans, car loans, personal loans and education loans, as long as the interest is compounded monthly.",
        },
        {
          question: "Is a lower EMI always better?",
          answer:
            "Not necessarily. A lower EMI usually means a longer tenure, which increases the total interest you pay over the life of the loan.",
        },
        {
          question: "Does this include processing fees or insurance?",
          answer:
            "No, this calculator only computes principal and interest. Add any fees your lender charges separately when budgeting.",
        },
        {
          question: "Why is the interest portion of my early EMIs so high?",
          answer:
            "Interest each month is charged on the outstanding balance, which is largest at the start. As the balance falls, the interest share of each fixed EMI falls too and the principal share rises — which is why prepaying early saves far more interest than prepaying late.",
        },
        {
          question: "How does a prepayment affect my EMI?",
          answer:
            "A lump-sum prepayment reduces the outstanding principal. Most lenders then let you choose between keeping the EMI the same and shortening the tenure, or keeping the tenure and lowering the EMI. Shortening the tenure saves more interest. Ask your lender which option they apply by default.",
        },
      ],
    },
  },
  {
    id: "tool-sip-calculator",
    name: "SIP Calculator",
    slug: "sip-calculator",
    category: "calculators",
    shortDescription: "Estimate the future value of your monthly SIP mutual fund investment.",
    description:
      "See how a fixed monthly investment can grow over time with compounding returns, and how much of the final value is your own contribution.",
    icon: "TrendingUp",
    componentKey: "sip-calculator",
    status: "live",
    featured: true,
    popular: false,
    runsInBrowser: true,
    seoTitle: "SIP Calculator – Estimate Mutual Fund Returns Free | Toolwise",
    seoDescription:
      "Calculate the future value of your SIP investment, total invested amount and estimated returns with our free SIP calculator.",
    keywords: ["sip calculator", "mutual fund sip calculator", "sip return calculator"],
    relatedTools: ["emi-calculator", "compound-interest-calculator", "fd-calculator", "rd-calculator"],
    content: {
      intro:
        "A Systematic Investment Plan (SIP) lets you invest a fixed amount every month into a mutual fund. Because returns compound monthly, even modest contributions can grow significantly over long periods. This calculator estimates the maturity value based on your monthly contribution, expected annual return and investment duration.",
      howToUse: [
        "Enter the amount you plan to invest every month.",
        "Enter the expected annual rate of return (mutual funds don't guarantee returns — use a realistic estimate).",
        "Enter the investment duration in years.",
        "View your estimated maturity value, total invested amount and total estimated gains.",
      ],
      formula: {
        title: "SIP Future Value Formula",
        expression: "FV = P × [((1 + i)ⁿ − 1) / i] × (1 + i)",
        description:
          "Where P is the monthly instalment, i is the monthly rate of return (annual rate ÷ 12 ÷ 100), and n is the total number of instalments.",
      },
      example: {
        title: "Example Calculation",
        summary: "Investing ₹10,000 per month for 15 years at an expected 12% annual return.",
        rows: [
          { label: "Monthly Investment", value: "₹10,000" },
          { label: "Duration", value: "15 years (180 months)" },
          { label: "Expected Return", value: "12% per year" },
          { label: "Total Invested", value: "₹18,00,000" },
          { label: "Estimated Returns", value: "≈ ₹32,40,000" },
          { label: "Maturity Value", value: "≈ ₹50,40,000" },
        ],
      },
      benefits: [
        "Visualise how compounding grows a monthly investment over the long term.",
        "Compare different monthly amounts or durations before you commit.",
        "Understand the split between your own contribution and market-driven gains.",
        "Work backwards from a target corpus to the monthly amount you'd need to invest.",
      ],
      commonMistakes: [
        "Assuming the expected return rate is guaranteed — mutual fund returns fluctuate with the market.",
        "Ignoring the effect of fund expense ratios and exit loads on real returns.",
        "Stopping a SIP during a market dip, which works against long-term compounding.",
        "Entering an unrealistically high expected return based on a fund's recent short-term performance.",
        "Forgetting that capital gains tax applies on redemption, which this calculator does not compute.",
      ],
      faq: [
        {
          question: "Is the SIP return shown by this calculator guaranteed?",
          answer:
            "No. Mutual fund returns are market-linked and not guaranteed. This calculator only projects a value based on the return rate you enter.",
        },
        {
          question: "Does this account for inflation?",
          answer:
            "No, the maturity value shown is in nominal terms. Reduce your expected return by an assumed inflation rate to see an inflation-adjusted estimate.",
        },
        {
          question: "What expected return rate should I enter?",
          answer:
            "There is no single correct figure, because returns depend on the fund category and market conditions. Many people model equity funds conservatively and debt funds lower still. Run the calculator at two or three different rates to see a range rather than a single number.",
        },
        {
          question: "Is a SIP better than investing a lump sum?",
          answer:
            "Neither is universally better. A SIP spreads purchases across market levels, so you buy more units when prices are low, and it suits a regular income. A lump sum puts the full amount to work immediately, which helps if markets rise afterwards and hurts if they fall.",
        },
        {
          question: "What is a step-up SIP?",
          answer:
            "A step-up (or top-up) SIP increases your monthly contribution by a set amount or percentage each year, usually in line with salary growth. It builds a noticeably larger corpus than a flat SIP over long periods. This calculator models a fixed monthly amount, so run it again with your higher future contribution to compare.",
        },
      ],
    },
  },
  {
    id: "tool-gst-calculator",
    name: "GST Calculator",
    slug: "gst-calculator",
    category: "calculators",
    shortDescription: "Add or remove GST from any amount at standard Indian GST rates.",
    description:
      "Quickly calculate GST-inclusive or GST-exclusive prices at 5%, 12%, 18% or 28%, with a full CGST/SGST breakdown.",
    icon: "Receipt",
    componentKey: "gst-calculator",
    status: "live",
    popular: true,
    runsInBrowser: true,
    seoTitle: "GST Calculator – Calculate GST Amount Instantly | Toolwise",
    seoDescription:
      "Add or remove GST from any amount with our free GST calculator. Supports 5%, 12%, 18% and 28% slabs with CGST/SGST split.",
    keywords: ["gst calculator", "gst calculator india", "cgst sgst calculator"],
    relatedTools: ["percentage-calculator", "salary-calculator", "hra-calculator"],
    content: {
      intro:
        "Goods and Services Tax (GST) in India is charged at standard slabs of 5%, 12%, 18% and 28%. This calculator lets you add GST to a base amount to find the final price, or remove GST from a total to find the original base amount — and splits the tax into CGST and SGST for intra-state supply.",
      howToUse: [
        "Enter the amount.",
        "Choose whether you want to add GST (exclusive to inclusive) or remove GST (inclusive to exclusive).",
        "Select the applicable GST rate.",
        "View the base amount, GST amount and CGST/SGST split.",
      ],
      formula: {
        title: "GST Formula",
        expression: "GST Amount = (Base Amount × GST Rate) / 100",
        description:
          "To remove GST from an inclusive amount: Base Amount = Inclusive Amount / (1 + GST Rate/100). CGST and SGST are each half of the total GST for intra-state transactions.",
      },
      example: {
        title: "Example Calculation",
        summary: "Adding 18% GST to a base amount of ₹1,000.",
        rows: [
          { label: "Base Amount", value: "₹1,000" },
          { label: "GST Rate", value: "18%" },
          { label: "GST Amount", value: "₹180" },
          { label: "CGST (9%)", value: "₹90" },
          { label: "SGST (9%)", value: "₹90" },
          { label: "Total Amount", value: "₹1,180" },
        ],
      },
      benefits: [
        "Quickly generate GST-inclusive prices for invoices and quotes.",
        "Reverse-calculate the base price from a GST-inclusive total.",
        "See the CGST/SGST split needed for intra-state billing.",
        "Compare vendor quotes on a like-for-like basis by converting them all to the same tax basis.",
      ],
      commonMistakes: [
        "Applying GST twice by adding it to an amount that already includes GST.",
        "Using the wrong slab — always confirm the correct GST rate for your specific goods or service.",
        "Forgetting that inter-state supply uses IGST instead of a CGST/SGST split.",
        "Removing GST by subtracting the rate from the inclusive total instead of dividing by (1 + rate/100).",
        "Comparing an exclusive quote against an inclusive one without adding tax to the exclusive figure first.",
      ],
      faq: [
        {
          question: "What GST rates does this calculator support?",
          answer: "The standard Indian GST slabs: 5%, 12%, 18% and 28%, plus a custom rate option.",
        },
        {
          question: "What's the difference between CGST, SGST and IGST?",
          answer:
            "For sales within the same state, GST is split equally between CGST (central) and SGST (state). For inter-state sales, IGST applies as a single combined tax instead.",
        },
        {
          question: "How do I remove GST from a total that already includes it?",
          answer:
            "Divide the inclusive amount by (1 + rate/100). For ₹1,180 at 18%, that is 1,180 ÷ 1.18 = ₹1,000 base, with ₹180 as GST. Subtracting 18% of ₹1,180 gives the wrong answer, because the tax was originally calculated on the smaller base amount.",
        },
        {
          question: "Does the buyer pay more under CGST/SGST than under IGST?",
          answer:
            "No. The total rate is the same either way. On an 18% intra-state supply the invoice shows 9% CGST plus 9% SGST; on an inter-state supply it shows a single 18% IGST line. Only the labelling and the distribution between governments differ.",
        },
        {
          question: "Which GST rate applies to my product or service?",
          answer:
            "The applicable slab is determined by the HSN code for goods or the SAC code for services, and it is set nationally rather than varying by state. Confirm the correct code with your accountant or from a supplier invoice before billing.",
        },
      ],
    },
  },
  {
    id: "tool-salary-calculator",
    name: "Salary Calculator",
    slug: "salary-calculator",
    category: "calculators",
    shortDescription: "Convert CTC to in-hand monthly salary with a full deductions breakdown.",
    description:
      "Estimate your monthly take-home pay from your annual CTC, accounting for PF, professional tax and standard deductions.",
    icon: "Wallet",
    componentKey: "salary-calculator",
    status: "live",
    featured: true,
    popular: true,
    runsInBrowser: true,
    seoTitle: "Salary Calculator – CTC to In-Hand Salary | Toolwise",
    seoDescription:
      "Convert your CTC to monthly in-hand salary with our free salary calculator, including PF, professional tax and deductions.",
    keywords: ["salary calculator", "ctc calculator", "in hand salary calculator", "take home salary"],
    relatedTools: ["hra-calculator", "gst-calculator", "pf-calculator", "gratuity-calculator"],
    content: {
      intro:
        "Your CTC (Cost to Company) is rarely the amount that lands in your bank account. This calculator breaks your annual CTC down into basic pay, HRA, employer PF contribution and standard deductions, to estimate your monthly in-hand salary. CTC is the employer's total spend on you, so it includes contributions and provisions that are never paid out as monthly cash — which is why in-hand pay is always lower than CTC divided by twelve. Seeing the breakdown makes it far easier to compare two offers with very different salary structures.",
      howToUse: [
        "Enter your annual CTC.",
        "Adjust the basic pay percentage if you know your employer's structure (defaults to 50% of CTC).",
        "Enter your monthly professional tax, if applicable in your state.",
        "View your estimated monthly and annual in-hand salary.",
      ],
      benefits: [
        "Get a realistic take-home estimate before accepting a job offer.",
        "Understand how much of your CTC is deducted toward PF and other components.",
        "Compare offers with different CTC structures on a like-for-like in-hand basis.",
        "See how the basic-pay percentage in your offer letter changes PF, HRA and take-home pay.",
      ],
      commonMistakes: [
        "Treating CTC as the amount you'll receive monthly — it includes employer contributions you never see in cash.",
        "Ignoring variable pay or bonuses that may be included in CTC but paid only annually or conditionally.",
        "Not accounting for income tax, which this calculator does not compute.",
        "Comparing two offers on CTC alone when their basic-pay percentages and variable components differ.",
        "Overlooking professional tax, which varies by state and is not levied at all in some states.",
      ],
      faq: [
        {
          question: "Does this calculator include income tax deduction?",
          answer:
            "No. Income tax depends on your tax regime, exemptions and other income, so it isn't included here. This calculator focuses on CTC-to-gross and standard deductions like PF.",
        },
        {
          question: "Why is my in-hand salary lower than CTC divided by 12?",
          answer:
            "CTC includes employer PF contribution, gratuity provision and other benefits that aren't paid out as monthly cash salary.",
        },
        {
          question: "How much PF is deducted from my salary?",
          answer:
            "Under EPF rules, the employee contributes 12% of basic salary plus dearness allowance, and the employer contributes a matching 12% (part of which goes to the pension scheme, EPS). Only the employee's 12% is deducted from your salary; the employer's share sits inside your CTC rather than your monthly cash pay.",
        },
        {
          question: "Does a higher basic pay percentage mean less take-home pay?",
          answer:
            "Usually yes in the short term, because PF and gratuity are both calculated on basic pay, so a higher basic raises those deductions and provisions. The trade-off is a larger retirement corpus and a bigger gratuity payout, plus a higher ceiling for HRA exemption if you claim it.",
        },
        {
          question: "What is professional tax and why is it deducted?",
          answer:
            "Professional tax is a state-level tax on salaried income. Rates and slabs are set by each state and some states do not levy it at all, so enter the monthly amount shown on your own payslip rather than assuming a standard figure.",
        },
      ],
    },
  },
  {
    id: "tool-percentage-calculator",
    name: "Percentage Calculator",
    slug: "percentage-calculator",
    category: "calculators",
    shortDescription: "Calculate percentages, percentage increase/decrease and ratios instantly.",
    description:
      "Solve any percentage problem — what is X% of Y, what percentage is X of Y, or the percentage change between two numbers.",
    icon: "Percent",
    componentKey: "percentage-calculator",
    status: "live",
    popular: true,
    runsInBrowser: true,
    seoTitle: "Percentage Calculator – Free Online Percentage Tool | Toolwise",
    seoDescription:
      "Calculate percentages, percentage increase, percentage decrease and ratios instantly with our free percentage calculator.",
    keywords: ["percentage calculator", "percentage increase calculator", "percentage change"],
    relatedTools: ["gst-calculator", "marks-percentage-calculator", "salary-calculator"],
    content: {
      intro:
        "This tool covers the three most common percentage problems: finding a percentage of a number, finding what percentage one number is of another, and finding the percentage increase or decrease between two values. Those three cover almost every everyday case — discounts, markups, tips, test scores, tax and growth rates. The mistakes people make are rarely in the arithmetic itself; they come from using the wrong base value, or from confusing a relative percentage change with a change measured in percentage points.",
      howToUse: [
        "Choose the type of percentage calculation you need.",
        "Enter the required values into the input fields.",
        "The result updates instantly as you type.",
      ],
      formula: {
        title: "Percentage Formulas",
        expression: "X% of Y = (X ÷ 100) × Y   |   Change % = ((New − Old) ÷ Old) × 100",
        description:
          "The first formula finds a percentage of a value. The second finds the percentage increase or decrease between an old and new value.",
      },
      benefits: [
        "Avoid manual calculation errors for everyday percentage problems.",
        "Quickly check discounts, markups, and grade or score percentages.",
        "See percentage increase or decrease with correct sign (positive for increase, negative for decrease).",
        "Switch between the three calculation types without having to remember which formula to use.",
      ],
      commonMistakes: [
        "Confusing percentage change with percentage points, which are not the same thing.",
        "Using the new value instead of the old value as the base when calculating percentage change.",
        "Assuming an increase and a decrease of the same percentage cancel out — a 20% rise followed by a 20% fall does not return you to the original value.",
        "Adding percentages that were calculated on different base values, such as stacking two separate discounts as one combined figure.",
      ],
      faq: [
        {
          question: "How do I calculate a percentage increase?",
          answer:
            "Subtract the old value from the new value, divide by the old value, then multiply by 100. This calculator does that automatically for you.",
        },
        {
          question: "What is the difference between a percentage and a percentage point?",
          answer:
            "If a rate moves from 10% to 15%, that is a 5 percentage point increase, but a 50% relative increase (5 ÷ 10 × 100). Percentage points describe the arithmetic gap between two percentages; percentage change describes the gap relative to the starting value.",
        },
        {
          question: "How do I find the original price before a discount?",
          answer:
            "Divide the discounted price by (1 − discount/100). An item selling for ₹800 after a 20% discount had an original price of 800 ÷ 0.8 = ₹1,000. Adding 20% back to ₹800 gives ₹960, which is wrong, because the discount was calculated on the higher original price.",
        },
        {
          question: "Why don't two successive discounts simply add up?",
          answer:
            "Each discount applies to whatever the price is at that moment. A 20% discount followed by a further 10% off leaves you paying 0.8 × 0.9 = 0.72 of the original, a 28% total discount rather than 30%, because the second cut is taken on the already-reduced price.",
        },
        {
          question: "How do I convert a score into a percentage?",
          answer:
            "Divide the marks obtained by the total marks and multiply by 100. For 68 out of 80, that is (68 ÷ 80) × 100 = 85%. Use the \"what percentage is X of Y\" mode for this.",
        },
      ],
    },
  },
  {
    id: "tool-age-calculator",
    name: "Age Calculator",
    slug: "age-calculator",
    category: "calculators",
    shortDescription: "Calculate exact age in years, months and days from a date of birth.",
    description:
      "Find your exact age, or the time between any two dates, down to the year, month and day.",
    icon: "Cake",
    componentKey: "age-calculator",
    status: "live",
    popular: false,
    runsInBrowser: true,
    seoTitle: "Age Calculator – Calculate Exact Age Free | Toolwise",
    seoDescription:
      "Calculate your exact age in years, months and days from your date of birth with our free online age calculator.",
    keywords: ["age calculator", "date of birth calculator", "calculate age"],
    relatedTools: ["study-time-calculator", "cgpa-calculator", "percentage-calculator"],
    content: {
      intro:
        "This calculator finds the exact time elapsed between a date of birth (or any start date) and today (or any end date), broken down into years, months and days — plus your age in total days.",
      howToUse: [
        "Enter the date of birth.",
        "Optionally change the 'as of' date if you want your age on a specific date rather than today.",
        "View your exact age in years, months and days.",
      ],
      benefits: [
        "Get an exact age breakdown for forms, eligibility checks or curiosity.",
        "Calculate age as of any future or past date, not just today.",
      ],
      commonMistakes: [
        "Forgetting leap years when calculating age manually — this calculator accounts for them automatically.",
      ],
      faq: [
        {
          question: "Can I calculate age as of a future date?",
          answer:
            "Yes, set the 'as of' date to any future date to see what your age will be on that day — useful for eligibility cut-offs.",
        },
      ],
    },
  },
  {
    id: "tool-compound-interest-calculator",
    name: "Compound Interest Calculator",
    shortName: "Compound Interest",
    slug: "compound-interest-calculator",
    category: "calculators",
    shortDescription: "Calculate compound interest and maturity value on any investment.",
    description:
      "See how your investment grows with compounding, at monthly, quarterly, half-yearly or annual compounding frequency.",
    icon: "LineChart",
    componentKey: "compound-interest-calculator",
    status: "live",
    popular: false,
    runsInBrowser: true,
    seoTitle: "Compound Interest Calculator – Free Online Tool | Toolwise",
    seoDescription:
      "Calculate compound interest and maturity value with our free calculator, supporting monthly, quarterly and annual compounding.",
    keywords: ["compound interest calculator", "ci calculator"],
    relatedTools: ["sip-calculator", "fd-calculator", "rd-calculator", "emi-calculator"],
    content: {
      intro:
        "Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. This calculator shows your maturity value and total interest earned based on your compounding frequency.",
      howToUse: [
        "Enter the principal amount.",
        "Enter the annual interest rate and investment duration.",
        "Choose the compounding frequency: annually, half-yearly, quarterly or monthly.",
        "View the maturity value and total interest earned.",
      ],
      formula: {
        title: "Compound Interest Formula",
        expression: "A = P × (1 + r/n)^(n×t)",
        description:
          "Where P is principal, r is the annual interest rate (decimal), n is the compounding frequency per year, and t is time in years.",
      },
      benefits: [
        "Compare how compounding frequency changes your final returns.",
        "Understand the difference between simple and compound growth over time.",
      ],
      commonMistakes: [
        "Assuming compounding frequency doesn't matter — more frequent compounding yields higher returns at the same nominal rate.",
      ],
      faq: [
        {
          question: "Does more frequent compounding always mean more returns?",
          answer:
            "Yes, at the same nominal annual rate, more frequent compounding (e.g. monthly vs annually) results in a slightly higher effective return.",
        },
      ],
    },
  },
  {
    id: "tool-loan-calculator",
    name: "Loan Calculator",
    slug: "loan-calculator",
    category: "calculators",
    shortDescription: "Calculate loan EMI and view the full amortisation schedule.",
    description:
      "A general-purpose loan calculator with a month-by-month amortisation schedule showing principal and interest for every instalment.",
    icon: "HandCoins",
    componentKey: "loan-calculator",
    status: "live",
    popular: false,
    runsInBrowser: true,
    seoTitle: "Loan Calculator – EMI & Amortisation Schedule | Toolwise",
    seoDescription:
      "Calculate loan EMI and view a full month-by-month amortisation schedule with our free loan calculator.",
    keywords: ["loan calculator", "amortisation schedule", "loan repayment calculator"],
    relatedTools: ["emi-calculator", "fd-calculator", "rd-calculator"],
    content: {
      intro:
        "This loan calculator computes your EMI the same way as our EMI calculator, but also generates a full amortisation schedule so you can see exactly how much of each instalment goes toward principal versus interest over the life of the loan.",
      howToUse: [
        "Enter the loan amount, interest rate and tenure.",
        "View your EMI along with the amortisation schedule below.",
        "Expand any year to see the month-by-month principal/interest split.",
      ],
      benefits: [
        "See exactly when you cross the halfway point between interest and principal repayment.",
        "Useful for understanding the impact of prepayments on total interest.",
      ],
      commonMistakes: [
        "Assuming equal amounts of each EMI go toward principal — early instalments are interest-heavy, later ones are principal-heavy.",
      ],
      faq: [
        {
          question: "Why does the interest portion of my EMI decrease over time?",
          answer:
            "As you repay principal, the outstanding balance shrinks, so the interest charged on it each month also shrinks, and a larger share of your fixed EMI goes toward principal.",
        },
      ],
    },
  },
  {
    id: "tool-fd-calculator",
    name: "FD Calculator",
    slug: "fd-calculator",
    category: "calculators",
    shortDescription: "Calculate fixed deposit maturity value and interest earned.",
    description:
      "Find the maturity amount and interest earned on a fixed deposit based on your principal, rate and tenure.",
    icon: "PiggyBank",
    componentKey: "fd-calculator",
    status: "live",
    popular: false,
    runsInBrowser: true,
    seoTitle: "FD Calculator – Fixed Deposit Maturity Calculator | Toolwise",
    seoDescription:
      "Calculate your fixed deposit maturity value and interest earned with our free FD calculator.",
    keywords: ["fd calculator", "fixed deposit calculator"],
    relatedTools: ["rd-calculator", "compound-interest-calculator", "sip-calculator"],
    content: {
      intro:
        "A Fixed Deposit (FD) pays a fixed interest rate over a chosen tenure, usually compounded quarterly. This calculator estimates your maturity value and total interest earned.",
      howToUse: [
        "Enter the deposit amount, annual interest rate and tenure.",
        "Choose the compounding frequency your bank uses (most banks compound FDs quarterly).",
        "View the maturity value and interest earned.",
      ],
      benefits: [
        "Compare FD returns across different banks and tenures before investing.",
        "Understand how compounding frequency affects your final maturity amount.",
      ],
      commonMistakes: [
        "Not accounting for TDS deducted on FD interest above the exemption threshold.",
      ],
      faq: [
        {
          question: "Is FD interest taxable?",
          answer:
            "Yes, FD interest is added to your taxable income and taxed at your slab rate. Banks deduct TDS if interest exceeds the prescribed threshold. This calculator does not account for tax.",
        },
      ],
    },
  },
  {
    id: "tool-rd-calculator",
    name: "RD Calculator",
    slug: "rd-calculator",
    category: "calculators",
    shortDescription: "Calculate recurring deposit maturity value from monthly deposits.",
    description:
      "Estimate the maturity value of a recurring deposit based on your monthly instalment, interest rate and tenure.",
    icon: "CalendarClock",
    componentKey: "rd-calculator",
    status: "live",
    popular: false,
    runsInBrowser: true,
    seoTitle: "RD Calculator – Recurring Deposit Calculator | Toolwise",
    seoDescription:
      "Calculate your recurring deposit maturity value and interest earned with our free RD calculator.",
    keywords: ["rd calculator", "recurring deposit calculator"],
    relatedTools: ["fd-calculator", "sip-calculator", "compound-interest-calculator"],
    content: {
      intro:
        "A Recurring Deposit (RD) lets you invest a fixed amount every month at a guaranteed interest rate. This calculator estimates the maturity value based on your monthly deposit, rate and tenure, using quarterly compounding as most banks apply.",
      howToUse: [
        "Enter your monthly deposit amount.",
        "Enter the annual interest rate and tenure in months.",
        "View the maturity value, total deposited and interest earned.",
      ],
      benefits: [
        "Plan disciplined monthly savings with a predictable, guaranteed return.",
        "Compare RD maturity value against SIP projections for a safer benchmark.",
      ],
      commonMistakes: [
        "Comparing RD returns directly with SIP/mutual fund returns without accounting for the very different risk profiles.",
      ],
      faq: [
        {
          question: "Is RD interest guaranteed like FD?",
          answer:
            "Yes, RDs offered by banks carry a fixed, guaranteed interest rate for the full tenure, similar to fixed deposits.",
        },
      ],
    },
  },
  {
    id: "tool-gratuity-calculator",
    name: "Gratuity Calculator",
    slug: "gratuity-calculator",
    category: "calculators",
    shortDescription: "Calculate gratuity payable based on salary and years of service.",
    description:
      "Estimate the gratuity amount you're entitled to under the Payment of Gratuity Act, based on your last drawn salary and years of service.",
    icon: "Award",
    componentKey: "gratuity-calculator",
    status: "live",
    popular: false,
    runsInBrowser: true,
    seoTitle: "Gratuity Calculator – Calculate Gratuity Amount | Toolwise",
    seoDescription:
      "Calculate your gratuity amount based on last drawn salary and years of service with our free gratuity calculator.",
    keywords: ["gratuity calculator", "gratuity calculation india"],
    relatedTools: ["pf-calculator", "salary-calculator", "hra-calculator"],
    content: {
      intro:
        "Gratuity is a lump-sum benefit paid by an employer to an employee who has completed at least 5 years of continuous service, under the Payment of Gratuity Act, 1972 (for organisations covered under the Act).",
      howToUse: [
        "Enter your last drawn basic salary plus dearness allowance.",
        "Enter your total years of service (completed years, rounded per the Act's rules).",
        "View your estimated gratuity amount.",
      ],
      formula: {
        title: "Gratuity Formula",
        expression: "Gratuity = (Last Drawn Salary × 15 × Years of Service) / 26",
        description:
          "This formula applies to employees covered under the Payment of Gratuity Act, using a 26-day working month and 15 days of wages per year of service.",
      },
      benefits: [
        "Estimate your gratuity payout before resigning or retiring.",
        "Understand how years of service directly scale your gratuity amount.",
      ],
      commonMistakes: [
        "Using gross salary instead of basic + DA, which is what the formula requires.",
        "Not rounding years of service correctly — service of 6 months or more in the final year typically rounds up to a full year.",
      ],
      faq: [
        {
          question: "Is gratuity taxable?",
          answer:
            "Gratuity received by government employees is fully tax-exempt. For private-sector employees covered under the Act, exemption is available up to a prescribed limit. This calculator does not compute tax.",
        },
      ],
    },
  },
  {
    id: "tool-pf-calculator",
    name: "PF Calculator",
    slug: "pf-calculator",
    category: "calculators",
    shortDescription: "Estimate your EPF balance at retirement from monthly contributions.",
    description:
      "Project your Employee Provident Fund (EPF) corpus at retirement based on your basic salary, contribution rate and years remaining.",
    icon: "Building2",
    componentKey: "pf-calculator",
    status: "live",
    popular: false,
    runsInBrowser: true,
    seoTitle: "PF Calculator – EPF Maturity Calculator | Toolwise",
    seoDescription:
      "Estimate your EPF maturity amount at retirement with our free PF calculator based on monthly contributions.",
    keywords: ["pf calculator", "epf calculator", "provident fund calculator"],
    relatedTools: ["gratuity-calculator", "salary-calculator", "sip-calculator"],
    content: {
      intro:
        "The Employee Provident Fund (EPF) is a retirement savings scheme where both you and your employer contribute 12% of your basic salary each month, earning a government-declared interest rate. This calculator projects your EPF corpus at retirement.",
      howToUse: [
        "Enter your current basic salary and your current age.",
        "Enter the expected annual increase in salary and the current EPF interest rate.",
        "View your projected EPF corpus at retirement (age 58).",
      ],
      benefits: [
        "Get a long-term view of your retirement corpus from EPF contributions alone.",
        "Understand the impact of annual salary increments on your final balance.",
      ],
      commonMistakes: [
        "Assuming only your 12% contribution counts — employer contribution (partly to EPF, partly to EPS) also adds to your retirement savings.",
      ],
      faq: [
        {
          question: "What interest rate should I use?",
          answer:
            "Use the EPFO's current declared annual interest rate. This rate is reviewed and announced by the government each financial year.",
        },
      ],
    },
  },
  {
    id: "tool-hra-calculator",
    name: "HRA Calculator",
    slug: "hra-calculator",
    category: "calculators",
    shortDescription: "Calculate your tax-exempt HRA amount based on salary and rent paid.",
    description:
      "Find out how much of your House Rent Allowance is exempt from income tax, based on your salary, HRA received, rent paid and city.",
    icon: "Home",
    componentKey: "hra-calculator",
    status: "live",
    popular: false,
    runsInBrowser: true,
    seoTitle: "HRA Calculator – Calculate HRA Tax Exemption | Toolwise",
    seoDescription:
      "Calculate your HRA tax exemption based on salary, rent paid and city with our free HRA calculator.",
    keywords: ["hra calculator", "hra exemption calculator"],
    relatedTools: ["salary-calculator", "gst-calculator", "gratuity-calculator"],
    content: {
      intro:
        "House Rent Allowance (HRA) exemption under Section 10(13A) of the Income Tax Act is the least of three amounts: actual HRA received, rent paid minus 10% of basic salary, or 50% of basic salary (metro cities) / 40% (non-metro cities).",
      howToUse: [
        "Enter your basic salary and HRA received (monthly or annual, consistently).",
        "Enter the actual rent you pay.",
        "Select whether you live in a metro city.",
        "View your exempt HRA amount and the taxable portion.",
      ],
      formula: {
        title: "HRA Exemption Formula",
        expression: "Exempt HRA = min(Actual HRA, Rent Paid − 10% of Basic, 50%/40% of Basic)",
        description:
          "The exemption is the smallest of the three values. The 50% rate applies to metro cities (Delhi, Mumbai, Kolkata, Chennai); 40% applies elsewhere.",
      },
      benefits: [
        "Estimate your HRA tax exemption before filing returns or submitting investment declarations.",
        "Understand which of the three conditions is limiting your exemption.",
      ],
      commonMistakes: [
        "Forgetting that HRA exemption applies only under the old tax regime.",
        "Not keeping rent receipts, which are typically required to claim this exemption.",
      ],
      faq: [
        {
          question: "Can I claim HRA exemption under the new tax regime?",
          answer:
            "No, HRA exemption is available only under the old tax regime. The new regime does not allow this deduction.",
        },
      ],
    },
  },
];
