import { db } from "../src/lib/db/client";
import { blogPosts, type NewBlogPostRow } from "../src/lib/db/schema";

const seedPosts: NewBlogPostRow[] = [
  {
    slug: "how-to-calculate-emi",
    title: "How to Calculate EMI (With Formula and Examples)",
    excerpt:
      "A plain-English walkthrough of how loan EMIs are actually calculated, what drives your interest cost, and how tenure changes the total you repay.",
    publishedAt: new Date("2026-08-12"),
    readingTime: "8 min read",
    status: "published",
    category: "calculators",
    tags: ["emi", "home loan", "loan calculator", "interest rate", "personal finance"],
    relatedTool: { name: "EMI Calculator", href: "/calculators/emi-calculator", cta: "Calculate Your EMI Free" },
    content: [
      {
        type: "p",
        text: "Every home, car or personal loan comes with an EMI — a fixed monthly payment that combines both principal and interest. On paper it looks simple: borrow a lump sum, pay it back in equal instalments. In practice, the same loan amount can produce wildly different total costs depending on the interest rate and, more importantly, the tenure you choose. Understanding exactly how EMI is calculated helps you see what you're really paying for, spot a bad loan offer before you sign it, and make an informed choice between a shorter, more expensive-per-month loan and a longer, cheaper-per-month one.",
      },
      { type: "h2", text: "What is an EMI, exactly?" },
      {
        type: "p",
        text: "EMI stands for Equated Monthly Instalment — a fixed amount you pay every month until the loan is fully repaid. Each EMI is split internally into two parts: a portion that goes toward interest, and a portion that goes toward reducing the principal (the amount you actually borrowed). What makes EMI calculations non-obvious is that this split isn't constant — it changes every single month.",
      },
      {
        type: "p",
        text: "In the early months of a loan, most of your EMI goes toward interest, with only a small slice chipping away at the principal. As the loan matures, that balance flips: more of each EMI goes toward principal, and less toward interest. This is why paying off a loan early saves disproportionately more interest than the remaining tenure alone would suggest — you're skipping the months where the interest portion was still large.",
      },
      { type: "h2", text: "The EMI formula, explained step by step" },
      {
        type: "p",
        text: "EMI = P × r × (1 + r)ⁿ / ((1 + r)ⁿ − 1), where P is the loan principal, r is the monthly interest rate, and n is the total number of monthly instalments.",
      },
      { type: "h3", text: "What each variable means" },
      {
        type: "ul",
        items: [
          "P (Principal): the total amount you're borrowing, before any interest.",
          "r (Monthly rate): your annual interest rate divided by 12, then divided by 100 to convert it to a decimal. An 9% annual rate becomes a monthly rate of 0.0075 (9 ÷ 12 ÷ 100).",
          "n (Tenure in months): the total number of EMIs you'll pay — a 20-year loan means n = 240.",
        ],
      },
      { type: "h3", text: "Why it's called a \"reducing balance\" formula" },
      {
        type: "p",
        text: "This formula is reducing-balance, not flat-rate: interest for any given month is calculated only on the principal that's still outstanding at the start of that month, not on the original loan amount. That's a meaningfully different (and fairer) method than a flat-rate loan, where interest is calculated on the full original principal for the entire tenure regardless of how much you've already repaid — flat-rate loans always cost more in effective interest for the same quoted rate, which is worth checking for if a lender advertises an unusually low headline rate.",
      },
      { type: "h2", text: "A worked example, start to finish" },
      {
        type: "p",
        text: "Let's plug real numbers into the formula so the mechanics are concrete rather than abstract.",
      },
      {
        type: "ul",
        items: [
          "Loan amount (P): ₹20,00,000",
          "Interest rate: 8.5% per year → monthly rate r = 8.5 ÷ 12 ÷ 100 = 0.007083",
          "Tenure: 20 years (240 months)",
          "Monthly EMI: ≈ ₹17,357",
          "Total amount repaid over 20 years: ≈ ₹41,65,680",
          "Total interest paid: ≈ ₹21,65,680 — more than the principal itself",
        ],
      },
      {
        type: "p",
        text: "Notice that the total interest here is actually larger than the amount borrowed. That's not a calculation error — it's the compounding effect of a long tenure at a real-world interest rate, and it's exactly why comparing total interest, not just the monthly EMI figure, matters as much as comparing headline interest rates between lenders.",
      },
      {
        type: "callout",
        variant: "tip",
        text: "Before signing any loan, calculate the total interest for at least two tenure options (e.g. 15 years vs 20 years) at the same rate. The shorter tenure will have a higher EMI, but the total interest saved is often large enough to be worth the tighter monthly budget.",
      },
      { type: "h2", text: "How tenure changes what you actually pay" },
      {
        type: "p",
        text: "It's tempting to shop for a loan purely on the monthly EMI number, since that's what has to fit your budget. But tenure has an outsized effect on total cost because interest compounds over time. Using the same ₹20,00,000 loan at 8.5%, here's how three common tenures compare:",
      },
      {
        type: "ul",
        items: [
          "10 years (120 months): EMI ≈ ₹24,776/month, total interest ≈ ₹9,73,120",
          "20 years (240 months): EMI ≈ ₹17,357/month, total interest ≈ ₹21,65,680",
          "30 years (360 months): EMI ≈ ₹15,375/month, total interest ≈ ₹35,35,000",
        ],
      },
      {
        type: "p",
        text: "Going from 20 to 30 years lowers the monthly EMI by roughly ₹2,000 — but adds nearly ₹13,70,000 in extra interest over the life of the loan. A longer tenure can be the right call if it's the only way to afford the EMI at all, but it should be a deliberate trade-off, not a default choice made just because the bank offered the longest option first.",
      },
      { type: "h2", text: "Fixed vs floating interest rates" },
      {
        type: "p",
        text: "The EMI formula above assumes a constant interest rate for the entire tenure, which is only true for fixed-rate loans. Most long-tenure loans (especially home loans) are floating-rate instead, meaning the interest rate is periodically reset based on an external benchmark (like the repo rate or a lender's internal cost of funds). When the rate resets, lenders typically keep your EMI the same and instead adjust the tenure — extending it if rates rise, shortening it if they fall — unless you explicitly ask them to adjust the EMI amount instead.",
      },
      {
        type: "p",
        text: "This matters for planning: a floating-rate EMI calculation is only a snapshot based on today's rate. If you're budgeting tightly, it's worth stress-testing your EMI calculation at a rate 1-2% higher than the current one to see whether you'd still be comfortable if rates rise during your loan's lifetime.",
      },
      { type: "h2", text: "What EMI calculators don't include" },
      {
        type: "p",
        text: "Most EMI calculators, including ours, compute principal and interest only — the two variables in the mathematical formula. In practice, the actual cost of borrowing includes several charges that never appear in the EMI figure itself:",
      },
      {
        type: "ul",
        items: [
          "Processing fees, typically 0.5-2% of the loan amount, charged upfront and not spread across EMIs.",
          "Loan insurance or credit life cover, sometimes bundled into the loan and quietly added to the principal.",
          "Prepayment or foreclosure charges, which can apply if you pay off the loan faster than scheduled (though these are capped or waived by regulation for most floating-rate retail loans in many jurisdictions).",
          "Late payment penalties and bounce charges, which don't affect the EMI calculation but do affect your total cost if you miss a due date.",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        text: "Always ask for the loan's APR (annual percentage rate) or effective interest rate, not just the headline rate — APR is designed to fold in fees like processing charges, giving you a more honest comparison between lenders.",
      },
      { type: "h2", text: "Common mistakes when estimating EMI" },
      {
        type: "ul",
        items: [
          "Comparing EMIs across lenders without checking whether the tenure is the same — a lower EMI on a longer tenure isn't automatically the better deal.",
          "Forgetting to convert the annual interest rate to a monthly rate correctly (dividing by 12 twice, or forgetting the ÷100, is a common arithmetic slip).",
          "Ignoring processing fees and insurance add-ons when comparing the \"true\" cost of two loan offers.",
          "Assuming a floating rate will stay at today's level for the entire tenure when budgeting.",
        ],
      },
      { type: "h2", text: "Frequently asked questions" },
      { type: "h3", text: "Does my EMI change during the loan tenure?" },
      {
        type: "p",
        text: "For a fixed-rate loan, no — the EMI stays constant for the entire tenure, only the interest/principal split within it changes. For a floating-rate loan, the EMI itself can change whenever the lender resets the applicable interest rate, unless the lender chooses to keep the EMI fixed and adjust the tenure instead.",
      },
      { type: "h3", text: "Can I reduce my EMI after taking the loan?" },
      {
        type: "p",
        text: "Yes, in a few ways: making a lump-sum prepayment toward the principal (which most lenders let you apply either to reduce future EMIs or shorten the tenure — ask which by default), refinancing to a lower interest rate with the same or a different lender, or extending the tenure if your lender allows restructuring.",
      },
      { type: "h3", text: "What's considered a healthy EMI-to-income ratio?" },
      {
        type: "p",
        text: "Most lenders and financial planners suggest keeping total EMI obligations (across all loans combined) under 40-50% of your monthly take-home income, though this varies by lender policy and your other financial commitments. Going meaningfully above that range leaves little room for savings or unexpected expenses.",
      },
      {
        type: "p",
        text: "The EMI formula itself is just arithmetic — the real skill is in reading past the monthly number to the total cost, the fee structure, and how the loan behaves if rates move. Run a few tenure and rate scenarios before committing, since a five-minute comparison can save far more than five minutes of interest over the life of a loan.",
      },
    ],
  },
  {
    slug: "how-gst-is-calculated",
    title: "How GST Is Calculated in India",
    excerpt:
      "Understand how India's Goods and Services Tax slabs work, the difference between CGST, SGST and IGST, and how to move between GST-inclusive and exclusive prices.",
    publishedAt: new Date("2026-07-28"),
    readingTime: "7 min read",
    status: "published",
    category: "calculators",
    tags: ["gst", "tax", "india", "cgst", "sgst", "business"],
    relatedTool: { name: "GST Calculator", href: "/calculators/gst-calculator", cta: "Calculate GST Free" },
    content: [
      {
        type: "p",
        text: "Goods and Services Tax (GST) replaced a patchwork of indirect taxes in India — VAT, service tax, excise duty and more — with a single, unified tax system. For anyone running a business, freelancing, or simply trying to understand a bill, GST calculations come up constantly: adding tax to a quote, extracting the base price from an inclusive total, or figuring out why an invoice splits tax into two or three separate lines. This guide walks through exactly how those calculations work.",
      },
      { type: "h2", text: "The GST slab structure" },
      {
        type: "p",
        text: "Most goods and services in India fall into one of four standard GST slabs: 5%, 12%, 18% or 28%. A small set of essential items are taxed at 0% (exempt), and certain luxury or \"sin\" goods (like tobacco and aerated drinks) attract an additional cess on top of the 28% slab. Which slab applies to a given product or service is determined by its HSN (Harmonized System of Nomenclature) code for goods, or SAC (Services Accounting Code) for services — both are standardized classification systems, so the same category of item is taxed consistently nationwide.",
      },
      {
        type: "p",
        text: "For everyday calculation purposes, though, you usually don't need to look up the HSN/SAC code yourself — you just need to know the applicable rate for your specific product or service (often printed on the invoice, or specified by your industry association or accountant), and apply the formula correctly.",
      },
      { type: "h2", text: "Adding GST to a base price" },
      {
        type: "p",
        text: "To add GST to a base (tax-exclusive) price, multiply the base price by the rate and divide by 100:",
      },
      {
        type: "p",
        text: "GST amount = Base price × Rate ÷ 100. The GST-inclusive total is then simply Base price + GST amount.",
      },
      {
        type: "p",
        text: "For example, on a ₹1,000 base price at 18% GST: GST amount = 1,000 × 18 ÷ 100 = ₹180. The GST-inclusive total is ₹1,180.",
      },
      { type: "h2", text: "Removing GST from an inclusive price" },
      {
        type: "p",
        text: "Going the other way — finding the base price hidden inside a GST-inclusive total — is where most people make a mistake. You cannot simply subtract the percentage from the inclusive amount, because the percentage was originally calculated on the smaller base price, not on the larger inclusive total.",
      },
      {
        type: "callout",
        variant: "warning",
        text: "A common error: taking an inclusive price of ₹1,180 and subtracting 18% of ₹1,180 (₹212.40) to \"remove\" GST. That gives ₹967.60 — which is wrong. The correct base price is ₹1,000, as shown below.",
      },
      {
        type: "p",
        text: "The correct formula divides instead of subtracting: Base price = Inclusive amount ÷ (1 + Rate ÷ 100). For our ₹1,180 example at 18%: Base price = 1,180 ÷ (1 + 0.18) = 1,180 ÷ 1.18 = ₹1,000 exactly — and the GST portion is the difference, ₹180.",
      },
      { type: "h2", text: "CGST, SGST and IGST — why GST sometimes splits into two lines" },
      {
        type: "p",
        text: "If you've looked closely at an invoice, you may have noticed GST split into two separate line items — CGST and SGST — rather than one combined figure. This isn't a different tax; it's the same total GST amount divided between the central government and the state government, and which split applies depends on where the buyer and seller are located relative to each other.",
      },
      { type: "h3", text: "Intra-state sales: CGST + SGST" },
      {
        type: "p",
        text: "When both the buyer and seller are in the same state, GST is split equally into CGST (Central GST) and SGST (State GST), each at half the total rate. On our 18% example, that's 9% CGST + 9% SGST, still totalling 18% — the buyer doesn't pay more, the tax is just divided between two levels of government.",
      },
      { type: "h3", text: "Inter-state sales: IGST" },
      {
        type: "p",
        text: "When the buyer and seller are in different states, the same total rate is instead charged as a single line item called IGST (Integrated GST) — again, at the same overall rate, just not split into two components. IGST revenue is later apportioned between the central and destination-state governments behind the scenes; from the buyer's perspective, they simply pay one combined tax line instead of two.",
      },
      {
        type: "ul",
        items: [
          "CGST + SGST: applied together, in equal halves, on sales within the same state.",
          "IGST: applied as a single combined tax on sales between different states, at the same total rate.",
          "The total tax burden on the buyer is identical either way — only how it's itemized and distributed between governments changes.",
        ],
      },
      { type: "h2", text: "A complete worked example" },
      {
        type: "p",
        text: "Suppose a supplier in Maharashtra sells goods worth ₹10,000 (base price) at 18% GST to a buyer, first within Maharashtra and then to a buyer in Gujarat, to see how the invoice differs.",
      },
      {
        type: "ul",
        items: [
          "Within Maharashtra (intra-state): CGST 9% = ₹900, SGST 9% = ₹900, total tax = ₹1,800, invoice total = ₹11,800.",
          "To Gujarat (inter-state): IGST 18% = ₹1,800, invoice total = ₹11,800.",
        ],
      },
      {
        type: "p",
        text: "The buyer pays exactly the same total either way — ₹11,800 — the only difference is how the ₹1,800 tax is labelled and distributed on the backend.",
      },
      { type: "h2", text: "Input Tax Credit, briefly" },
      {
        type: "p",
        text: "One reason GST replaced the older tax system is Input Tax Credit (ITC) — a mechanism that lets a GST-registered business claim credit for the GST it already paid on its own purchases (inputs), offsetting it against the GST it collects on sales (output). This avoids the \"tax on tax\" problem that existed under the older system, where tax paid at one stage of a supply chain wasn't creditable at the next. ITC calculations are more involved than the base add/remove formulas above and usually require proper GST-compliant invoices and filing — worth knowing about even if the detailed mechanics are outside the scope of a quick calculator.",
      },
      {
        type: "callout",
        variant: "tip",
        text: "When comparing a quoted price between two vendors, always confirm whether the quote is GST-inclusive or exclusive before comparing — a lower \"exclusive\" quote can end up costing more than a higher \"inclusive\" one once tax is added.",
      },
      { type: "h2", text: "Frequently asked questions" },
      { type: "h3", text: "Is GST the same rate everywhere in India?" },
      {
        type: "p",
        text: "Yes — the GST rate for a given category of goods or service is set nationally and doesn't vary by state (this is one of GST's core design goals, replacing the old system where different states charged different VAT rates on the same goods).",
      },
      { type: "h3", text: "Why do some invoices show 0% GST?" },
      {
        type: "p",
        text: "Certain essential goods and services (like fresh produce, specific healthcare and education services) are exempt from GST entirely and show a 0% rate, while others may be \"zero-rated\" for exports, which is a related but distinct concept involving refundable input credits.",
      },
      {
        type: "p",
        text: "Once you know the base formula — multiply to add, divide to remove — the rest of GST math is really just correctly identifying which rate applies and whether the sale is intra-state or inter-state. Getting the add/remove direction right is the single most common source of calculation errors, so it's worth double-checking any manual GST math against a calculator before it goes on an invoice.",
      },
    ],
  },
  {
    slug: "how-to-reduce-pdf-size",
    title: "How to Reduce PDF File Size Without Losing Quality",
    excerpt:
      "Practical, realistic ways to shrink a PDF — what actually reduces size, what doesn't, and why image-heavy PDFs compress very differently from text documents.",
    publishedAt: new Date("2026-09-02"),
    readingTime: "7 min read",
    status: "published",
    category: "pdf-tools",
    tags: ["pdf", "compression", "file size", "documents"],
    relatedTool: { name: "Compress PDF", href: "/pdf-tools/compress-pdf", cta: "Compress a PDF Free" },
    content: [
      {
        type: "p",
        text: "A large PDF is almost always large because of embedded images, not text. That single fact changes how you should think about compressing one — and explains why the same \"compress PDF\" button can shrink one file by 90% and barely touch another. Understanding what's actually taking up the space lets you set realistic expectations and pick the right approach instead of guessing.",
      },
      { type: "h2", text: "What actually drives PDF file size" },
      {
        type: "p",
        text: "A PDF is a container format — it can hold vector text, raster images, embedded fonts, forms, layers, and metadata, all bundled together. Of these, raster images are by far the biggest contributor to file size in most real-world documents, because an image at print resolution can easily be 5-20x larger than the same page's worth of text.",
      },
      {
        type: "ul",
        items: [
          "High-resolution scanned pages or photos embedded at full camera/scanner quality (often 300 DPI or higher — far more than needed for on-screen reading).",
          "Uncompressed or lightly-compressed embedded images, especially PNGs used where a JPEG would suffice.",
          "Redundant fonts, metadata or duplicate objects left over from repeated edits in tools like Word or PowerPoint.",
          "Unused or hidden layers, form fields, or embedded attachments left over from the original authoring document.",
        ],
      },
      {
        type: "p",
        text: "A text-only PDF — a contract, an invoice, a report with no images — is already fairly compact, often just a few hundred kilobytes even at dozens of pages, because vector text and font outlines are extremely space-efficient compared to raster images.",
      },
      {
        type: "h2", text: "Why compression helps some PDFs so much more than others",
      },
      {
        type: "p",
        text: "Running a compressor on a text-only PDF usually yields only a small reduction, because there isn't much redundant data to remove — the file is already close to its practical minimum size. Running the same compressor on a scanned, image-heavy PDF can shrink it by 50% or more, because there's genuine redundancy to squeeze out of the embedded images.",
      },
      {
        type: "callout",
        variant: "note",
        text: "If a compressor barely shrinks your file, that's often a sign the PDF is already efficient — not that the tool failed. Check whether the file is mostly text before assuming compression should have done more.",
      },
      { type: "h3", text: "Scanned documents are the biggest opportunity" },
      {
        type: "p",
        text: "Scanned pages are typically saved as one full-page image per page, often at resolutions far higher than needed for legibility on a screen. A page scanned at 600 DPI contains roughly four times the pixel data of the same page at 300 DPI, with no visible quality difference for reading on a monitor or printing at normal sizes — this is exactly the kind of redundancy a compressor can remove with minimal visible impact.",
      },
      { type: "h2", text: "What actually helps: the two real levers" },
      {
        type: "p",
        text: "Effective PDF compression comes down to two techniques, usually applied together:",
      },
      { type: "h3", text: "1. Re-encoding embedded images at lower quality or resolution" },
      {
        type: "p",
        text: "Downsampling reduces the pixel dimensions of embedded images (e.g. from 300 DPI to 150 DPI), while re-encoding at a lower JPEG quality setting reduces file size by allowing more (usually imperceptible) compression artifacts. Together, these two adjustments are where the vast majority of size savings come from in an image-heavy PDF.",
      },
      { type: "h3", text: "2. Re-serializing the document structure" },
      {
        type: "p",
        text: "Beyond images, a compressor can also strip unused objects, deduplicate repeated resources (like a logo embedded on every page), remove editing history metadata, and rebuild the internal PDF structure more efficiently — cleaning up accumulated cruft from a document that's been edited or exported multiple times.",
      },
      { type: "h2", text: "A sensible compression workflow" },
      {
        type: "ul",
        items: [
          "Start with a moderate compression level rather than the most aggressive setting available.",
          "Check that text is still sharp (not blurry) and that images are still legible for your actual use case — a compressed contract that's illegible on inspection defeats the purpose.",
          "If you need to email a large file or fit an upload size limit, moderate compression is usually enough — you rarely need to sacrifice quality just to hit an arbitrary attachment size cap.",
          "For scanned documents specifically, try a more aggressive setting first, since there's usually more room to compress without visible quality loss.",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        text: "Keep your original, uncompressed file. Compression is generally one-directional — you can't restore lost detail from a compressed copy, so always compress a duplicate and keep the source.",
      },
      { type: "h2", text: "Other ways to reduce PDF size beyond compression" },
      {
        type: "p",
        text: "If compression alone doesn't get you where you need to be, a few complementary techniques can help:",
      },
      {
        type: "ul",
        items: [
          "Remove pages you don't need to share, rather than compressing the whole document including irrelevant pages.",
          "Flatten forms and annotations if they're no longer needed as editable fields — flattened content is often more compact than live interactive form data.",
          "Convert color images to grayscale where color isn't meaningful (e.g. a scanned text document), which can meaningfully shrink image data.",
          "Split a very large multi-part PDF into smaller documents if the recipient only needs specific sections.",
        ],
      },
      { type: "h2", text: "When compression won't help much" },
      {
        type: "p",
        text: "It's worth setting realistic expectations for a few common cases where compression has limited effect:",
      },
      {
        type: "ul",
        items: [
          "Already-compressed images: a PDF built from images that were already heavily JPEG-compressed before being embedded won't shrink much further — you can't meaningfully re-compress an already-compressed lossy image without a real quality hit.",
          "Vector-heavy technical drawings: CAD exports and complex vector graphics can be large due to path complexity, not raster image data, so image-focused compression won't help.",
          "Encrypted or password-protected PDFs: some compressors need to fully decode a file to re-encode it, which can complicate or block compression on protected documents until they're unlocked.",
        ],
      },
      { type: "h2", text: "Frequently asked questions" },
      { type: "h3", text: "Will compressing a PDF make the text blurry?" },
      {
        type: "p",
        text: "No — text in a PDF is normally stored as vector outlines or font references, not as pixels, so image compression settings don't affect text sharpness. Text can only become blurry if the entire page was scanned as a single image (common for old scanned documents), in which case the \"text\" is actually part of the image being compressed.",
      },
      { type: "h3", text: "What's a reasonable file size for a document to email?" },
      {
        type: "p",
        text: "Most email providers cap attachments around 25MB, but for practical delivery and to avoid recipient inbox issues, aiming for well under 10MB for a typical multi-page document is a safe target — moderate compression usually gets a scanned document there comfortably.",
      },
      {
        type: "p",
        text: "The short version: know whether your PDF's size comes from images or text before compressing, expect big wins on scanned/image-heavy files and modest ones on text documents, and always keep an uncompressed original in case you need it later.",
      },
    ],
  },
  {
    slug: "how-to-calculate-cgpa",
    title: "How to Calculate Your CGPA (Formula Explained)",
    excerpt:
      "A step-by-step explanation of how CGPA is calculated from your subject grade points and credit hours, and how it differs from a simple average.",
    publishedAt: new Date("2026-08-20"),
    readingTime: "6 min read",
    status: "published",
    category: "student-tools",
    tags: ["cgpa", "gpa", "grades", "college", "students"],
    relatedTool: { name: "CGPA Calculator", href: "/student-tools/cgpa-calculator", cta: "Calculate Your CGPA Free" },
    content: [
      {
        type: "p",
        text: "CGPA (Cumulative Grade Point Average) looks like a simple average of your grades across subjects, but it isn't — it's a credit-weighted average, which means subjects with more credit hours count for more toward your final number. This single distinction is the source of most confusion when students try to estimate their CGPA by hand, and getting it wrong can lead to unpleasant surprises at result time.",
      },
      { type: "h2", text: "The CGPA formula" },
      {
        type: "p",
        text: "CGPA = Σ(Grade Point × Credit Hours) ÷ Σ(Credit Hours). In plain words: multiply each subject's grade point by its credit hours, add all of those products together, then divide by the total credit hours across every subject.",
      },
      {
        type: "p",
        text: "This is fundamentally different from a simple average, which would just add up the grade points and divide by the number of subjects — completely ignoring the fact that a 4-credit core subject and a 1-credit elective don't contribute equally to your degree, and shouldn't contribute equally to your CGPA either.",
      },
      { type: "h2", text: "Why credit-weighting matters" },
      {
        type: "p",
        text: "A high grade in a low-credit elective won't move your CGPA nearly as much as the same grade in a high-credit core subject, because the elective's grade point gets multiplied by a smaller credit-hour number in the formula. This is the single most common source of confusion when students try to estimate CGPA by simply averaging their grade points across subjects without accounting for credits.",
      },
      {
        type: "callout",
        variant: "note",
        text: "If two subjects have the same grade but different credit hours, they are NOT contributing equally to your CGPA — the higher-credit subject has proportionally more influence on the final number.",
      },
      { type: "h2", text: "A worked example" },
      {
        type: "p",
        text: "Let's calculate CGPA for a semester with three subjects, showing every step:",
      },
      {
        type: "ul",
        items: [
          "Subject A: grade point 8, 4 credits → 8 × 4 = 32",
          "Subject B: grade point 7.5, 3 credits → 7.5 × 3 = 22.5",
          "Subject C: grade point 9, 4 credits → 9 × 4 = 36",
          "Total grade points: 32 + 22.5 + 36 = 90.5",
          "Total credits: 4 + 3 + 4 = 11",
          "CGPA = 90.5 ÷ 11 = 8.23",
        ],
      },
      {
        type: "p",
        text: "Compare this to a naive simple average of the three grade points (8 + 7.5 + 9) ÷ 3 = 8.17 — close, but not identical, to the correct credit-weighted 8.23. The gap between the two numbers grows larger the more the credit hours differ across subjects, so in semesters with very uneven credit distribution, using a simple average instead of the correct formula can meaningfully misstate your actual CGPA.",
      },
      { type: "h2", text: "CGPA across multiple semesters" },
      {
        type: "p",
        text: "The same formula extends naturally across semesters: your overall CGPA is the credit-weighted average across every subject you've ever taken, not an average of each semester's individual CGPA. This distinction matters because averaging semester CGPAs (rather than recomputing from all underlying subject grades and credits) implicitly assumes every semester carried the same total credit load — which usually isn't quite true, especially in years with a different number of electives or a thesis/project credit block.",
      },
      { type: "h3", text: "How to combine two semesters correctly" },
      {
        type: "p",
        text: "To get an accurate combined CGPA across two semesters, add up the (grade point × credit hours) totals from both semesters, add up the total credits from both, and divide — the same single formula applied across the full set of subjects, rather than averaging two separately-computed CGPA numbers.",
      },
      {
        type: "ul",
        items: [
          "Semester 1: total grade points 90.5, total credits 11",
          "Semester 2: total grade points 96, total credits 12",
          "Combined CGPA = (90.5 + 96) ÷ (11 + 12) = 186.5 ÷ 23 = 8.11",
        ],
      },
      { type: "h2", text: "Common mistakes students make" },
      {
        type: "ul",
        items: [
          "Averaging grade points directly without multiplying by credit hours first.",
          "Averaging semester-level CGPA numbers instead of recombining the underlying grade-point and credit totals.",
          "Mixing grading scales — some institutions use a 10-point scale, others a 4-point scale, and transfer or exchange credits can arrive on a different scale than your home institution's.",
          "Forgetting to include a subject with a failing or backlog grade, if the institution's policy counts it toward CGPA even after a re-attempt.",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        text: "Don't mix grading scales in one calculation. If your institution uses a 10-point scale for some subjects and a 4-point scale for others (this happens with transfer credits or study-abroad semesters), convert everything to a single consistent scale before averaging — mixing scales silently produces a meaningless number.",
      },
      { type: "h2", text: "CGPA vs SGPA vs percentage" },
      {
        type: "p",
        text: "It helps to be precise about related terms that are often used loosely:",
      },
      {
        type: "ul",
        items: [
          "SGPA (Semester Grade Point Average): the credit-weighted average for a single semester only, using the same formula as CGPA but restricted to that semester's subjects.",
          "CGPA (Cumulative Grade Point Average): the credit-weighted average across all semesters completed so far.",
          "Percentage equivalent: many institutions publish a conversion formula (commonly something like CGPA × 9.5, though this varies by institution and country) to translate CGPA into an approximate percentage for contexts that expect one — always use your specific institution's official formula rather than a generic multiplier, since these vary.",
        ],
      },
      { type: "h2", text: "Frequently asked questions" },
      { type: "h3", text: "Does a failed or repeated subject affect CGPA differently?" },
      {
        type: "p",
        text: "This varies by institution — some replace the original failing grade with the re-attempt grade in the CGPA calculation, others average both attempts, and some count only the better of the two. Check your institution's specific academic policy, since this can meaningfully change your calculated CGPA if you've repeated any subject.",
      },
      { type: "h3", text: "Can CGPA go down even with good grades this semester?" },
      {
        type: "p",
        text: "Yes, if your grade points this semester are lower than your existing cumulative average, even a \"good\" grade can pull your CGPA down slightly — CGPA is a cumulative measure, so a strong semester needs to beat your running average to raise it, not just be objectively good in isolation.",
      },
      {
        type: "p",
        text: "The core idea to remember is simple: always multiply by credit hours before averaging, and always recompute from raw grade-point and credit totals when combining multiple semesters rather than averaging pre-computed CGPA figures. Get that one step right and the rest of the calculation is straightforward arithmetic.",
      },
    ],
  },

  {
    slug: "how-sip-returns-are-calculated",
    title: "How SIP Returns Are Calculated (With Formula and Examples)",
    excerpt:
      "A plain-English walkthrough of how SIP maturity value is actually calculated, why starting early beats investing more, and what a projected return figure really means.",
    publishedAt: new Date("2026-09-08"),
    readingTime: "8 min read",
    status: "published",
    category: "calculators",
    tags: ["sip", "mutual funds", "investing", "compounding"],
    relatedTool: { name: "SIP Calculator", href: "/calculators/sip-calculator", cta: "Calculate Your SIP Returns Free" },
    content: [
      {
        type: "p",
        text: "A Systematic Investment Plan (SIP) is simply an instruction to invest a fixed amount into a mutual fund at a fixed interval, usually monthly. The mechanics are boring by design — the same amount leaves your account on the same date every month, and that's the whole product. What isn't obvious is how that steady trickle turns into a maturity figure, why two people investing the same total amount can end up with wildly different corpuses, and why every SIP projection you see is an estimate rather than a promise.",
      },
      { type: "h2", text: "The SIP future value formula" },
      {
        type: "p",
        text: "FV = P × [((1 + i)ⁿ − 1) / i] × (1 + i), where P is the monthly instalment, i is the monthly rate of return, and n is the total number of instalments.",
      },
      {
        type: "p",
        text: "This is the standard future value of an annuity-due formula. Each instalment is treated as its own small investment that compounds for however many months remain until maturity — so your very first instalment compounds for the full tenure, while your last one compounds for barely a month. The formula just adds all of those individual growth paths together in one step instead of making you compute 180 separate lines.",
      },
      { type: "h3", text: "Converting the annual return into a monthly rate" },
      {
        type: "p",
        text: "The single most common arithmetic slip is getting i wrong. An expected annual return of 12% becomes a monthly rate of 12 ÷ 12 ÷ 100 = 0.01 — divide by 12 to move from annual to monthly, and by 100 to turn the percentage into a decimal, exactly once each.",
      },
      { type: "h3", text: "Why the formula ends with × (1 + i)" },
      {
        type: "p",
        text: "SIP instalments are paid at the beginning of each period, not the end, so every rupee gets one extra month of growth compared with a standard end-of-period annuity. It's a small adjustment — roughly 1% of the final figure at a 12% assumption — but it's what separates a SIP calculator from a generic annuity calculator.",
      },
      { type: "h2", text: "A worked example, step by step" },
      {
        type: "p",
        text: "Take a SIP of ₹10,000 per month for 15 years, assuming a 12% annual return:",
      },
      {
        type: "ul",
        items: [
          "Monthly instalment (P): ₹10,000",
          "Monthly rate (i): 12 ÷ 12 ÷ 100 = 0.01",
          "Number of instalments (n): 15 × 12 = 180",
          "Total invested: ₹10,000 × 180 = ₹18,00,000",
          "Estimated maturity value: ≈ ₹50,45,000",
          "Estimated gains: ≈ ₹32,45,000 — roughly 1.8x what you put in",
        ],
      },
      {
        type: "p",
        text: "Notice that the gains are larger than the contributions. That isn't unusual for a long SIP at a double-digit assumed return; it's simply what happens when the earliest instalments have fifteen years to compound. It also means the projection is highly sensitive to the return rate you type in — the same SIP at 10% instead of 12% lands closer to ₹41 lakh, a difference of nearly ₹10 lakh from a two-point change in an assumption you can't control.",
      },
      { type: "h2", text: "Why starting early beats investing more" },
      {
        type: "p",
        text: "The most useful thing the formula tells you is that n matters more than P. Compare two investors who each put in exactly ₹18,00,000 of their own money, both assuming a 12% annual return:",
      },
      {
        type: "ul",
        items: [
          "Investor A: ₹10,000/month for 15 years → total invested ₹18,00,000 → maturity ≈ ₹50,45,000",
          "Investor B: ₹5,000/month for 30 years → total invested ₹18,00,000 → maturity ≈ ₹1,76,50,000",
          "Same money contributed. Roughly 3.5x the outcome, purely from doubling the time horizon.",
        ],
      },
      {
        type: "p",
        text: "Investor B's earliest instalments get thirty years of compounding, and the final decade of any long SIP is where the largest absolute growth happens, because it compounds on the biggest balance. Delaying a SIP by five years in your twenties costs far more than under-investing by a few thousand rupees a month.",
      },
      {
        type: "callout",
        variant: "tip",
        text: "If you can't afford the SIP amount you think you should be investing, start with a smaller one now rather than waiting until you can afford the ideal figure. The years you'd spend waiting are the most valuable years in the entire calculation, and you can always increase the instalment later.",
      },
      { type: "h2", text: "Step-up SIPs: increasing the instalment over time" },
      {
        type: "p",
        text: "A step-up (or top-up) SIP raises your monthly contribution by a fixed percentage every year, typically in line with expected salary growth. It's a reasonable default for anyone early in their career, because a flat instalment quietly shrinks in real terms as your income rises.",
      },
      {
        type: "p",
        text: "The effect over a long horizon is substantial. A flat ₹10,000/month SIP for 20 years at 12% contributes ₹24,00,000 and lands at roughly ₹1 crore. The same SIP stepped up 10% a year contributes about ₹68,70,000 over the same 20 years — with the monthly instalment reaching around ₹61,000 in the final year — and lands near ₹2 crore. You invest considerably more, so a larger corpus is expected, but the extra contributions also arrive early enough to compound meaningfully rather than sitting idle.",
      },
      { type: "h2", text: "SIP versus lump-sum investing" },
      {
        type: "p",
        text: "These are often framed as rivals, but they answer different questions. A lump sum puts the entire amount to work immediately, so every rupee gets the maximum possible compounding period — mathematically the best outcome if markets rise from that point. A SIP spreads purchases across many different market levels, which means you automatically buy more units when prices are low and fewer when they're high.",
      },
      {
        type: "ul",
        items: [
          "Lump sum: better when you already have the capital and markets rise after you invest; worse if they fall shortly after, since the full amount is exposed from day one.",
          "SIP: smooths out entry price across market cycles, and matches how most people actually earn money — monthly, not in one windfall.",
          "In practice the choice is usually made for you: if you're investing out of salary, a SIP is the only option; if you've received a bonus or maturity proceeds, a lump sum is on the table.",
        ],
      },
      { type: "h2", text: "What the projected return figure actually means" },
      {
        type: "p",
        text: "A SIP calculator projects a value from the return rate you type in. It does not predict the market, and mutual fund returns are not guaranteed. A fund averaging 12% over fifteen years will have had individual years well above and well below that figure.",
      },
      {
        type: "callout",
        variant: "warning",
        text: "Don't enter a fund's recent one-year or three-year return as your long-term assumption. Short-run numbers are often inflated by a favourable market phase, and projecting them across fifteen years produces a figure that looks great and means nothing. Model a range instead — run the same SIP at two or three different rates and treat the lower one as your planning number.",
      },
      {
        type: "p",
        text: "Two other things the maturity figure leaves out: the fund's expense ratio, which is deducted from returns before they reach you, and tax on capital gains when you redeem. Neither is included in a standard SIP projection, so the number on screen is a gross, nominal, pre-tax estimate. It's also not inflation-adjusted — ₹50 lakh in fifteen years buys considerably less than ₹50 lakh today.",
      },
      { type: "h2", text: "Frequently asked questions" },
      { type: "h3", text: "What happens if I miss a SIP instalment?" },
      {
        type: "p",
        text: "Missing a single instalment doesn't cancel the plan — the fund house simply doesn't receive that month's investment, and your bank may levy a charge for the failed mandate. Repeated failures can cause the SIP to be cancelled. The bigger cost is the one the formula shows: a missed instalment loses its entire compounding runway, not just its face value.",
      },
      { type: "h3", text: "Should I stop my SIP when markets fall?" },
      {
        type: "p",
        text: "Stopping during a downturn works directly against the mechanism that makes SIPs useful. A falling market is precisely when your fixed instalment buys the most units. Investors who pause during dips tend to resume after prices have recovered, which means they systematically skip the cheapest purchases in the entire plan.",
      },
      { type: "h3", text: "How do I work out the SIP amount needed for a target corpus?" },
      {
        type: "p",
        text: "Rearrange the formula, or more practically, use the calculator in reverse by trying instalment amounts until the maturity value matches your goal. Remember to inflate the target first — a goal that costs ₹25 lakh today will cost considerably more by the time you reach it, so plan against the future cost rather than today's price.",
      },
      {
        type: "p",
        text: "The arithmetic behind a SIP is fixed and knowable; the return rate never is. Treat the maturity figure as a scenario rather than a forecast, give the plan as many years as you can, and increase the instalment as your income grows — those three habits do more for the final number than any amount of fine-tuning the assumed rate.",
      },
    ],
  },
  {
    slug: "ctc-vs-in-hand-salary-explained",
    title: "CTC vs In-Hand Salary: Where the Rest of Your Package Goes",
    excerpt:
      "What your CTC actually includes, why your monthly bank credit is always lower than CTC divided by twelve, and how to compare two offers that look identical on paper.",
    publishedAt: new Date("2026-09-12"),
    readingTime: "8 min read",
    status: "published",
    category: "calculators",
    tags: ["salary", "ctc", "in-hand salary", "payroll"],
    relatedTool: { name: "Salary Calculator", href: "/calculators/salary-calculator", cta: "Calculate Your In-Hand Salary" },
    content: [
      {
        type: "p",
        text: "Almost everyone's first reaction to a job offer is to divide the CTC by twelve. Almost everyone is then surprised by the first payslip. The gap isn't a deduction error or a hidden fee — it's the definition of CTC itself. Cost to Company means exactly what it says: the employer's total annual spend on employing you, including money that is set aside on your behalf, contributed to statutory funds, or paid only if certain conditions are met. Very little of that difference ever appears as cash in your account.",
      },
      {
        type: "p",
        text: "Understanding the structure matters for two practical reasons. First, it lets you budget against a realistic number before you accept an offer. Second, it lets you compare two offers properly — because two packages with identical CTC can produce meaningfully different monthly take-home pay depending on how they're structured.",
      },
      { type: "h2", text: "What CTC actually contains" },
      {
        type: "p",
        text: "A typical Indian CTC breaks into three layers: components paid to you as monthly cash, components the employer contributes or provisions on your behalf, and components that are conditional or paid annually.",
      },
      { type: "h3", text: "Paid to you monthly" },
      {
        type: "ul",
        items: [
          "Basic salary: the anchor of the whole structure, commonly set around 40–50% of CTC. Most other components are calculated as a percentage of it.",
          "House Rent Allowance (HRA): typically 40–50% of basic, depending on employer policy and whether you're in a metro city.",
          "Special allowance: usually the balancing figure — whatever is left after the other components are fixed.",
          "Other allowances: conveyance, medical, LTA and similar heads, depending on the employer.",
        ],
      },
      { type: "h3", text: "Contributed or provisioned, not paid in cash" },
      {
        type: "ul",
        items: [
          "Employer's EPF contribution: 12% of basic plus dearness allowance. It goes into your provident fund account, not your bank account.",
          "Gratuity provision: an amount the employer sets aside each year against a future gratuity liability, commonly around 4.81% of basic.",
          "Insurance premiums and other benefits the employer pays on your behalf.",
        ],
      },
      { type: "h3", text: "Conditional or annual" },
      {
        type: "ul",
        items: [
          "Variable pay or performance bonus: included in CTC at 100% of target, but paid only if the targets are met, and usually annually or quarterly.",
          "Joining or retention bonuses, which may be one-time and sometimes clawed back if you leave early.",
        ],
      },
      {
        type: "p",
        text: "That third layer is where offers most often diverge from expectations. A package advertised at ₹18 lakh with ₹3 lakh of variable pay is really a ₹15 lakh fixed package plus a target. Both offers can be honestly described as ₹18 lakh CTC.",
      },
      { type: "h2", text: "A worked example, rupee by rupee" },
      {
        type: "p",
        text: "Take a CTC of ₹12,00,000 per year with basic set at 50% of CTC — ₹6,00,000 a year, or ₹50,000 a month. Here's how it unwinds:",
      },
      {
        type: "ul",
        items: [
          "CTC ÷ 12, the number most people expect: ₹1,00,000 per month",
          "Less employer EPF contribution (12% of ₹6,00,000 = ₹72,000/year, ₹6,000/month) — goes to your PF account, not your bank",
          "Less gratuity provision (≈4.81% of basic = ₹28,860/year, ≈₹2,405/month) — a future liability, not current cash",
          "Gross monthly salary (the figure on your payslip before deductions): ≈ ₹91,595",
          "Less employee EPF contribution (12% of basic = ₹6,000/month) — deducted from your salary into your PF account",
          "Less professional tax (varies by state; assume ₹200/month): ₹200",
          "Monthly in-hand, before income tax: ≈ ₹85,395",
        ],
      },
      {
        type: "p",
        text: "So a ₹12 lakh CTC produces roughly ₹85,400 a month rather than ₹1,00,000 — about 15% lower — and that's before income tax. None of that ₹14,600 gap has vanished: ₹12,000 of it is sitting in your EPF account (your own 12% plus the employer's 12%), ₹2,405 is provisioned toward gratuity, and ₹200 went to your state government.",
      },
      {
        type: "callout",
        variant: "note",
        text: "The PF portion isn't lost money — it's deferred money. Both your contribution and your employer's go into an account in your name and earn the EPFO's declared interest rate. It just doesn't help with this month's rent.",
      },
      { type: "h2", text: "Why the basic-pay percentage changes your take-home" },
      {
        type: "p",
        text: "Because EPF and gratuity are both calculated on basic salary, the percentage your employer sets for basic has a direct effect on your monthly cash. At the same CTC, a higher basic means larger PF deductions and a larger gratuity provision — so less monthly in-hand pay. A lower basic means more cash now.",
      },
      {
        type: "p",
        text: "Neither is straightforwardly better. A higher basic builds a bigger retirement corpus, produces a larger gratuity payout when you eventually leave, and raises the ceiling on your HRA exemption if you claim it. A lower basic maximises immediate liquidity. What matters is knowing which structure you've been offered, so that a lower in-hand figure doesn't come as a surprise on your first payslip.",
      },
      {
        type: "callout",
        variant: "tip",
        text: "When you get an offer, ask HR for the detailed salary structure — the component-wise breakup, not just the CTC headline. Two offers at the same CTC can differ by several thousand rupees a month in take-home once you see the basic percentage and the variable-pay share.",
      },
      { type: "h2", text: "Professional tax and other state-level deductions" },
      {
        type: "p",
        text: "Professional tax is a state-level levy on salaried income. Both the rate and the slab structure are set by individual states, and several states don't levy it at all. It's a small amount in absolute terms, but it's worth entering your actual payslip figure rather than a generic assumption, since it varies meaningfully between states.",
      },
      { type: "h2", text: "What a CTC calculator does not tell you" },
      {
        type: "p",
        text: "This is the important caveat, and it's worth being blunt about: our salary calculator does not compute income tax. It takes you from CTC to gross to in-hand by handling the structural components — employer contributions, PF, gratuity provision and professional tax — and stops there.",
      },
      {
        type: "p",
        text: "Income tax is deliberately excluded because it genuinely can't be estimated well from CTC alone. Your actual TDS depends on which tax regime you've opted for, the exemptions and deductions you claim, income from other sources, and declarations you submit to your employer mid-year. Any calculator that promises a precise post-tax figure from a single CTC input is making assumptions on your behalf that may not hold.",
      },
      {
        type: "ul",
        items: [
          "The figure the calculator gives you is pre-income-tax in-hand pay.",
          "Your employer will deduct TDS on top of that, spread across the financial year.",
          "HRA exemption, if you claim it, is available only under the old tax regime — it doesn't apply under the new regime.",
          "For an actual post-tax number, work from your Form 16, your payroll portal's tax projection, or a dedicated income tax calculator.",
        ],
      },
      { type: "h2", text: "Comparing two offers properly" },
      {
        type: "p",
        text: "Once you know the structure, comparing offers becomes a mechanical exercise rather than a guess. Strip out variable pay to find the fixed component of each package, note the basic-pay percentage, and run both through the same calculation.",
      },
      {
        type: "ul",
        items: [
          "Compare fixed CTC against fixed CTC first — variable pay is a target, not a guarantee.",
          "Check the basic percentage in each offer, since it drives PF, gratuity and HRA exemption headroom.",
          "Find out whether benefits like insurance premiums or meal cards are loaded into the CTC figure.",
          "Ask when variable pay is actually paid out, and what proportion employees typically receive.",
        ],
      },
      { type: "h2", text: "Frequently asked questions" },
      { type: "h3", text: "Why is my in-hand salary lower than CTC divided by twelve?" },
      {
        type: "p",
        text: "Because CTC includes money the employer spends on you that never reaches your bank account as monthly cash — chiefly the employer's 12% EPF contribution and the annual gratuity provision — plus any variable pay that is only released annually or on performance. Your own EPF contribution and professional tax are then deducted from the remaining gross salary.",
      },
      { type: "h3", text: "Can I reduce my PF contribution to increase take-home pay?" },
      {
        type: "p",
        text: "In most cases no, because EPF contribution is statutory for covered employees. Some employers offer limited flexibility for employees whose basic exceeds the prescribed wage ceiling, but this varies by employer policy. Treat any increase in cash this way as a reduction in retirement savings rather than a gain.",
      },
      { type: "h3", text: "Does a higher CTC always mean higher take-home pay?" },
      {
        type: "p",
        text: "Not necessarily. A higher CTC with a large variable component, a high basic percentage, or a lot of benefits loaded into the package can produce lower monthly cash than a smaller, mostly-fixed CTC with a leaner structure. That's exactly why it's worth running both offers through the same breakdown before deciding.",
      },
      {
        type: "p",
        text: "CTC is a recruiting number; in-hand is a budgeting number. Get the component-wise breakup, separate the fixed part from the conditional part, and work out your monthly figure before you sign — then remember that income tax still comes off the top of whatever the calculator shows you.",
      },
    ],
  },
  {
    slug: "compound-interest-explained",
    title: "Compound Interest Explained (Formula, Frequency and the Rule of 72)",
    excerpt:
      "How the compound interest formula works, why compounding frequency changes your returns at the same nominal rate, and how to estimate doubling time in your head.",
    publishedAt: new Date("2026-09-16"),
    readingTime: "8 min read",
    status: "published",
    category: "calculators",
    tags: ["compound interest", "investing", "finance basics"],
    relatedTool: {
      name: "Compound Interest Calculator",
      href: "/calculators/compound-interest-calculator",
      cta: "Calculate Compound Interest Free",
    },
    content: [
      {
        type: "p",
        text: "Compound interest is interest earned on interest. That one-line definition is accurate but does a poor job of conveying why it matters, because the effect is invisible over short periods and dramatic over long ones. Over a single year, compound and simple interest are nearly indistinguishable. Over forty years, at the same rate, compound interest produces roughly nine times the return of simple interest. The entire practical value of the concept lives in that gap.",
      },
      {
        type: "p",
        text: "This guide covers the formula and what each variable does, how compounding frequency changes the outcome, a side-by-side comparison against simple interest, and the rule of 72 — a mental shortcut worth knowing.",
      },
      { type: "h2", text: "The compound interest formula" },
      {
        type: "p",
        text: "A = P(1 + r/n)^(nt), where A is the final amount, P is the principal, r is the annual interest rate as a decimal, n is the number of compounding periods per year, and t is the time in years. The interest earned is simply A − P.",
      },
      { type: "h3", text: "What each variable does" },
      {
        type: "ul",
        items: [
          "P (principal): your starting amount. It scales the result linearly — double the principal, double the final amount.",
          "r (annual rate as a decimal): 8% becomes 0.08. This is the nominal annual rate, which is what banks and funds quote.",
          "n (compounding frequency): 1 for annual, 2 for half-yearly, 4 for quarterly, 12 for monthly. It divides the rate and multiplies the exponent.",
          "t (time in years): this sits in the exponent, which is why time affects the outcome far more powerfully than any other input.",
        ],
      },
      {
        type: "p",
        text: "The structure of the formula tells you where the leverage is. P is a multiplier, so it has a proportional effect. But t sits in the exponent, so adding years compounds on itself. This is the mathematical reason every piece of investing advice starts with \"start early\" rather than \"start big\".",
      },
      { type: "h2", text: "Simple versus compound interest, side by side" },
      {
        type: "p",
        text: "Simple interest is calculated only on the original principal: Interest = P × r × t. The principal never grows, so each year earns exactly the same amount. Compound interest adds each period's interest back to the balance, so the base keeps growing.",
      },
      {
        type: "p",
        text: "Take ₹1,00,000 invested at 10% per year, compounded annually, and compare it to the same amount earning simple interest:",
      },
      {
        type: "ul",
        items: [
          "After 10 years — simple: ₹2,00,000. Compound: ≈ ₹2,59,374. Difference: ≈ ₹59,374.",
          "After 20 years — simple: ₹3,00,000. Compound: ≈ ₹6,72,750. Difference: ≈ ₹3,72,750.",
          "After 30 years — simple: ₹4,00,000. Compound: ≈ ₹17,44,940. Difference: ≈ ₹13,44,940.",
          "After 40 years — simple: ₹5,00,000. Compound: ≈ ₹45,25,930. Difference: ≈ ₹40,25,930.",
        ],
      },
      {
        type: "p",
        text: "The pattern is worth sitting with. After ten years, compound interest is about 30% ahead. After forty years, it's roughly nine times ahead. The gap isn't growing steadily — it's accelerating, because each year's interest joins the principal and starts earning on its own.",
      },
      {
        type: "callout",
        variant: "note",
        text: "This acceleration is why the last decade of a long investment horizon typically produces more absolute growth than the first two decades combined. It's also why cutting a thirty-year horizon down to twenty costs you far more than a third of the outcome.",
      },
      { type: "h2", text: "How compounding frequency changes the result" },
      {
        type: "p",
        text: "At the same nominal annual rate, compounding more often produces a higher final amount, because interest starts earning interest sooner. Here's ₹1,00,000 at a nominal 10% over 10 years at different frequencies:",
      },
      {
        type: "ul",
        items: [
          "Annually (n = 1): ≈ ₹2,59,374",
          "Half-yearly (n = 2): ≈ ₹2,65,330",
          "Quarterly (n = 4): ≈ ₹2,68,506",
          "Monthly (n = 12): ≈ ₹2,70,704",
        ],
      },
      {
        type: "p",
        text: "The difference between annual and monthly compounding here is about ₹11,330 on a ₹1,00,000 investment — real, but modest compared to the effect of time or rate. Note also that the gains taper off: moving from annual to half-yearly adds more than moving from quarterly to monthly. There's a mathematical ceiling (continuous compounding), and frequent compounding gets you close to it fairly quickly.",
      },
      { type: "h3", text: "Nominal rate versus effective annual rate" },
      {
        type: "p",
        text: "The cleanest way to compare products with different compounding frequencies is the effective annual rate — what the nominal rate actually works out to once compounding is accounted for. At a nominal 10%:",
      },
      {
        type: "ul",
        items: [
          "Compounded annually: effective rate 10.00%",
          "Compounded half-yearly: effective rate 10.25%",
          "Compounded quarterly: effective rate ≈ 10.38%",
          "Compounded monthly: effective rate ≈ 10.47%",
        ],
      },
      {
        type: "p",
        text: "This matters when comparing deposits or loans. A product quoting 10% compounded monthly is a better deal for a saver than one quoting 10.2% compounded annually, even though the headline number looks lower — and the reverse logic applies if you're the borrower.",
      },
      {
        type: "callout",
        variant: "tip",
        text: "When comparing two fixed deposits or savings products, always ask for the compounding frequency alongside the rate. Most Indian banks compound fixed deposits quarterly, but savings accounts and other instruments vary, and the headline rate alone doesn't tell you what you'll actually earn.",
      },
      { type: "h2", text: "The rule of 72" },
      {
        type: "p",
        text: "The rule of 72 is a mental shortcut for estimating how long an investment takes to double: divide 72 by the annual interest rate, and the answer is roughly the number of years required.",
      },
      {
        type: "ul",
        items: [
          "At 6%: 72 ÷ 6 = 12 years to double.",
          "At 8%: 72 ÷ 8 = 9 years. The precise answer is 9.01 years — essentially exact.",
          "At 12%: 72 ÷ 12 = 6 years. The precise answer is 6.12 years.",
          "At 2%: 72 ÷ 2 = 36 years. The precise answer is 35.0 years — the rule overestimates slightly at low rates.",
          "At 20%: 72 ÷ 20 = 3.6 years. The precise answer is 3.8 years — the rule underestimates at high rates.",
        ],
      },
      {
        type: "p",
        text: "The approximation is most accurate around 8%, which happens to be squarely in the range of real-world return assumptions, and it stays serviceable roughly between 4% and 15%. Outside that band, use the actual formula. The reason 72 works is that it's a convenient integer close to the true constant (ln 2 × 100 ≈ 69.3) and it divides cleanly by 2, 3, 4, 6, 8, 9 and 12 — useful for mental arithmetic.",
      },
      {
        type: "p",
        text: "The rule runs both ways. If you want your money to double in 10 years, you need roughly 72 ÷ 10 = 7.2% annually. That's a quick sanity check on whether a savings goal is realistic before you commit to it.",
      },
      { type: "h2", text: "Where compound interest works against you" },
      {
        type: "p",
        text: "The same mathematics applies to money you owe. Credit card balances typically compound monthly at rates that make the doubling time alarmingly short — at a 36% annual rate, the rule of 72 puts it at roughly two years. Unsecured borrowing that rolls over month to month is compound interest running in reverse, and it compounds against you at rates no investment reliably matches.",
      },
      {
        type: "p",
        text: "Inflation is the other quiet compounding force. At 6% annual inflation, prices roughly double in twelve years, which means a nominal return of 6% leaves your purchasing power flat. Comparing nominal returns without accounting for inflation is one of the most common errors in long-horizon planning.",
      },
      { type: "h2", text: "Frequently asked questions" },
      { type: "h3", text: "Does a compound interest calculator account for tax?" },
      {
        type: "p",
        text: "No. Our calculator, like most, shows gross pre-tax returns. Interest income from deposits is generally added to your taxable income and taxed at your slab rate, and banks deduct TDS above prescribed thresholds. Real post-tax compounding is therefore slower than the figure on screen.",
      },
      { type: "h3", text: "What's the difference between CAGR and compound interest?" },
      {
        type: "p",
        text: "They're two sides of the same equation. Compound interest projects forward from a known rate to find a future value; CAGR (compound annual growth rate) works backwards from a known starting and ending value to find the implied annual rate. CAGR is a useful way to compare investments that grew over different time periods.",
      },
      { type: "h3", text: "Does compounding frequency matter more than the interest rate?" },
      {
        type: "p",
        text: "No — rate and time both matter far more. In the example above, moving from annual to monthly compounding at 10% added about 4% to the ten-year result, while moving from 10% to 12% would add considerably more. Treat frequency as a tiebreaker between similar products, not a primary decision factor.",
      },
      {
        type: "p",
        text: "Compound interest isn't complicated arithmetic; it's arithmetic whose consequences are hard to intuit. The formula is worth knowing, the rule of 72 is worth memorising, and the practical takeaway is the same one the exponent in the formula implies: time in the market does more work than anything else you control.",
      },
    ],
  },
  {
    slug: "percentage-calculation-formulas-explained",
    title: "Percentage Formulas Explained (And the Percentage Points Trap)",
    excerpt:
      "The three core percentage calculations, worked examples for discounts and markups, and the difference between a percentage change and a percentage point that trips up almost everyone.",
    publishedAt: new Date("2026-09-19"),
    readingTime: "7 min read",
    status: "published",
    category: "calculators",
    tags: ["percentage", "math basics", "formulas"],
    relatedTool: {
      name: "Percentage Calculator",
      href: "/calculators/percentage-calculator",
      cta: "Calculate Percentage Free",
    },
    content: [
      {
        type: "p",
        text: "Percentages are the most-used piece of mathematics in ordinary life and the most reliably misapplied. The arithmetic itself is trivial — multiply, divide, multiply by 100 — but the errors people make almost never come from the arithmetic. They come from using the wrong number as the base, from assuming percentages add up when they don't, and from confusing a change measured in percent with a change measured in percentage points.",
      },
      {
        type: "p",
        text: "This guide covers the three calculations that account for nearly every real percentage problem, works through discounts and markups where the base question really bites, and then deals with the percentage points confusion properly, because it's the one that leads to genuinely wrong conclusions rather than just wrong numbers.",
      },
      { type: "h2", text: "The three core percentage problems" },
      {
        type: "p",
        text: "Nearly every percentage question you'll encounter is one of three forms. Identifying which one you're facing is most of the work.",
      },
      { type: "h3", text: "1. What is X% of Y?" },
      {
        type: "p",
        text: "Formula: (X ÷ 100) × Y. This is the one people are most comfortable with. 18% of ₹1,000 is (18 ÷ 100) × 1,000 = ₹180. Use it for tax amounts, tips, commission and discount amounts.",
      },
      { type: "h3", text: "2. What percentage is X of Y?" },
      {
        type: "p",
        text: "Formula: (X ÷ Y) × 100. Use it when you have two absolute numbers and want the ratio expressed as a percentage. Scoring 68 out of 80 is (68 ÷ 80) × 100 = 85%. The order matters: the part goes on top, the whole on the bottom.",
      },
      { type: "h3", text: "3. What is the percentage change from old to new?" },
      {
        type: "p",
        text: "Formula: ((New − Old) ÷ Old) × 100. The result is positive for an increase and negative for a decrease. A price moving from ₹250 to ₹300 is ((300 − 250) ÷ 250) × 100 = 20%. The denominator is always the old value — this is the single most common source of wrong answers.",
      },
      {
        type: "callout",
        variant: "warning",
        text: "Percentage change is not symmetric. Going from 250 to 300 is a 20% increase, but going from 300 back to 250 is a 16.67% decrease — because the base changed. If a number rises 20% and then falls 20%, you don't end up where you started; you end up 4% below it (1.20 × 0.80 = 0.96).",
      },
      { type: "h2", text: "Percentage change versus percentage points" },
      {
        type: "p",
        text: "This is the distinction that causes real confusion, and it only arises when the quantity you're measuring is itself a percentage — an interest rate, a market share, a conversion rate, a tax rate.",
      },
      {
        type: "p",
        text: "Suppose a conversion rate rises from 10% to 15%. There are two entirely correct but very different ways to describe that:",
      },
      {
        type: "ul",
        items: [
          "Percentage points: 15% − 10% = 5 percentage points. This is the simple arithmetic gap between two percentages.",
          "Percentage change: ((15 − 10) ÷ 10) × 100 = 50%. This is the relative change, measured against the starting value.",
          "Both describe the same movement. Saying \"conversions rose 5%\" describes neither — it's ambiguous at best and wrong at worst.",
        ],
      },
      {
        type: "p",
        text: "The stakes get higher as the starting value gets smaller. A conversion rate improving from 0.5% to 1% is a 0.5 percentage point gain but a 100% improvement — the rate doubled. Reported one way it sounds negligible, reported the other way it sounds spectacular, and both are honest. This is precisely why the distinction is worth insisting on: the same fact can be made to sound trivial or transformative depending on which measure someone chooses.",
      },
      {
        type: "callout",
        variant: "tip",
        text: "The convention is simple: use \"percentage points\" when subtracting two percentages, and \"percent\" when describing a relative change. If a rate moves from 4% to 6%, say \"2 percentage points\" or \"a 50% increase\" — never \"a 2% increase\", which would technically mean moving from 4% to 4.08%.",
      },
      { type: "h2", text: "Discounts, and finding the original price" },
      {
        type: "p",
        text: "Discount arithmetic in one direction is easy and in the other direction catches people out constantly. Applying a discount is straightforward: a 20% discount on ₹1,000 means you pay 80% of it, or ₹800.",
      },
      {
        type: "p",
        text: "Reversing it is where the base question matters. If an item sells for ₹800 after a 20% discount, the original price is not ₹800 + 20% = ₹960. It's ₹800 ÷ 0.8 = ₹1,000. The discount was calculated on the larger original price, so you have to divide by (1 − discount/100) rather than adding the percentage back.",
      },
      { type: "h3", text: "Why successive discounts don't add up" },
      {
        type: "p",
        text: "A \"20% off, plus a further 10% off\" offer is not 30% off. Each discount applies to whatever the price is at that moment, so the second one is taken on the already-reduced amount:",
      },
      {
        type: "ul",
        items: [
          "Original price: ₹1,000",
          "After 20% off: ₹1,000 × 0.8 = ₹800",
          "After a further 10% off: ₹800 × 0.9 = ₹720",
          "Total paid: ₹720, which is a 28% total discount — not 30%",
          "Shortcut: multiply the retained fractions. 0.8 × 0.9 = 0.72, so you pay 72% of the original.",
        ],
      },
      {
        type: "p",
        text: "The same logic applies in reverse to successive increases. Two consecutive 10% price rises produce a 21% total increase (1.1 × 1.1 = 1.21), not 20%.",
      },
      { type: "h2", text: "Markup versus margin" },
      {
        type: "p",
        text: "These two are frequently used interchangeably and mean different things, because they use different denominators. Suppose an item costs ₹100 to buy and sells for ₹125:",
      },
      {
        type: "ul",
        items: [
          "Markup = (Profit ÷ Cost) × 100 = (25 ÷ 100) × 100 = 25%",
          "Margin = (Profit ÷ Selling price) × 100 = (25 ÷ 125) × 100 = 20%",
          "Same ₹25 profit, two different percentages, because markup is measured against cost and margin against revenue.",
        ],
      },
      {
        type: "p",
        text: "Margin is always the smaller number for a profitable sale, and the gap widens as profitability rises. A 100% markup is a 50% margin. Confusing the two consistently overstates profitability, which is why it's worth being explicit about which one a figure refers to.",
      },
      { type: "h2", text: "Common percentage mistakes" },
      {
        type: "ul",
        items: [
          "Using the new value as the denominator in a percentage change calculation. The base is always the starting value.",
          "Adding percentages that were calculated on different bases — stacked discounts, sequential price changes, or growth rates across periods.",
          "Reporting a change in a rate as a percentage when percentage points were meant, or vice versa, without saying which.",
          "Averaging percentages that represent different-sized groups. A 90% pass rate in a class of 10 and a 50% pass rate in a class of 100 don't average to 70%; the combined rate is (9 + 50) ÷ 110 = 53.6%.",
          "Assuming an X% increase followed by an X% decrease returns you to the starting value.",
        ],
      },
      { type: "h2", text: "Frequently asked questions" },
      { type: "h3", text: "How do I add a percentage to a number quickly?" },
      {
        type: "p",
        text: "Multiply by (1 + percentage/100). To add 18%, multiply by 1.18. To subtract 18%, multiply by 0.82. Working with multipliers instead of separate add-and-subtract steps also makes chained calculations — successive discounts, compounded growth — far less error-prone.",
      },
      { type: "h3", text: "Why can a percentage increase exceed 100% but a decrease can't?" },
      {
        type: "p",
        text: "An increase has no upper limit — a value going from 10 to 40 is a 300% increase. A decrease is capped at 100%, because that represents falling to zero, and you cannot remove more than all of something. Any reported decrease above 100% is either an error or a sign the quantity has gone negative.",
      },
      { type: "h3", text: "Is a percentage the same as a percentile?" },
      {
        type: "p",
        text: "No, and the difference matters in exam results. A percentage is your score as a proportion of the total marks. A percentile is your rank relative to everyone else — a 90th percentile means you scored higher than 90% of candidates, regardless of what your actual marks were. A low percentage can be a high percentile on a difficult paper.",
      },
      {
        type: "p",
        text: "If you take one habit from this: always ask what the base is. Percentage of what, change from what, margin on what. Almost every wrong percentage in a report, an invoice or a headline is a correct calculation performed against the wrong denominator.",
      },
    ],
  },

  {
    slug: "what-is-a-jwt-json-web-token",
    title: "What Is a JWT (JSON Web Token)?",
    excerpt:
      "A plain-English explanation of how JSON Web Tokens are structured, what signing actually proves, and why the payload is readable by anyone holding the token.",
    publishedAt: new Date("2026-09-08"),
    readingTime: "8 min read",
    status: "published",
    category: "developer-tools",
    tags: ["jwt", "authentication", "web development", "tokens", "security"],
    relatedTool: { name: "JWT Decoder", href: "/developer-tools/jwt-decoder", cta: "Decode a JWT Free" },
    content: [
      {
        type: "p",
        text: "If you've built or consumed an API in the last decade, you've almost certainly handled a JSON Web Token — a long, opaque-looking string with two dots in it, usually arriving in an Authorization header. JWTs are the default way most modern applications carry proof of who a user is between a server that issued that proof and a server that needs to trust it. They look cryptic, which leads a lot of developers to treat them as magic strings that either work or don't.",
      },
      {
        type: "p",
        text: "They aren't magic, and they aren't even particularly secret. A JWT is a structured, self-describing container that anyone can read — the security comes from a signature on the end, not from the contents being hidden. That one distinction clears up most of the confusion around JWTs, including the most common security mistake developers make with them.",
      },
      { type: "h2", text: "The three parts of a JWT" },
      {
        type: "p",
        text: "Every JWT is made of exactly three segments joined by dots: header.payload.signature. Each of those three segments is independently Base64URL-encoded — a URL-safe variant of Base64 that swaps the + and / characters for - and _ and drops the trailing = padding, so the whole token can be dropped into a URL, a cookie or a header without needing further escaping.",
      },
      { type: "h3", text: "The header" },
      {
        type: "p",
        text: "The header is a small JSON object describing the token itself. It almost always contains alg (the signing algorithm, such as HS256 or RS256) and typ (the token type, normally \"JWT\"). Tokens signed with a rotating key set often also carry a kid, a key ID that tells the verifying server which public key to look up. Decode the first segment of any JWT and you'll see this JSON in full.",
      },
      { type: "h3", text: "The payload" },
      {
        type: "p",
        text: "The payload — also called the claims set — is another JSON object, and it's the part people actually care about. It carries statements about the user and the token: who they are, when the token was issued, when it stops being valid, and whatever application-specific data the issuer chose to include, such as a role or a tenant ID.",
      },
      { type: "h3", text: "The signature" },
      {
        type: "p",
        text: "The signature is computed over the encoded header and payload joined with a dot, using the algorithm named in the header and a key held by the issuer. It isn't reversible, and its only job is to let a recipient answer one question: has anything in this token changed since it was issued by someone holding the key?",
      },
      { type: "h2", text: "Signing is not encryption" },
      {
        type: "p",
        text: "This is the point that trips up more developers than anything else about JWTs. A standard signed JWT (a JWS, in spec terminology) is not encrypted at all. The payload is merely Base64URL-encoded, which is an encoding scheme with no key and no secret — anyone who intercepts, copies or is handed the token can decode it and read every claim inside it in about two seconds.",
      },
      {
        type: "p",
        text: "What the signature gives you is integrity and authenticity, not confidentiality. If an attacker changes the user ID in the payload from 41 to 1 and re-encodes it, the signature no longer matches, and any server that verifies properly will reject the token. But the attacker could still read that the original user ID was 41 — and everything else you put in there.",
      },
      {
        type: "callout",
        variant: "warning",
        text: "Never put anything in a JWT payload that you wouldn't be comfortable printing on the user's screen: no passwords, no API keys, no full card numbers, no internal notes about an account. Assume the payload is public, because to anyone holding the token, it is.",
      },
      { type: "h2", text: "The claims you'll actually see" },
      {
        type: "p",
        text: "The JWT specification defines a set of registered claims with agreed-upon meanings, so different libraries and services interoperate. You don't have to use them, but almost everyone does:",
      },
      {
        type: "ul",
        items: [
          "iss (issuer): who created and signed the token — typically your auth service or identity provider.",
          "sub (subject): who the token is about, usually a stable user ID. It should be unique and not something that changes, like an email address.",
          "aud (audience): who the token is intended for. An API should reject tokens whose audience isn't itself, even if the signature is valid.",
          "exp (expiration): a Unix timestamp in seconds after which the token must be rejected.",
          "nbf (not before): a timestamp before which the token isn't yet valid.",
          "iat (issued at): when the token was created, often used to enforce a maximum token age separately from exp.",
          "jti (JWT ID): a unique identifier for the token, which lets you track or revoke individual tokens.",
        ],
      },
      {
        type: "p",
        text: "Note that exp, nbf and iat are all in seconds, not milliseconds. A surprising number of bugs come from generating these with a JavaScript Date.now() call and forgetting to divide by 1000, which produces an expiry roughly fifty thousand years in the future — a token that never expires, which is exactly what you didn't want.",
      },
      { type: "h2", text: "How JWTs enable stateless authentication" },
      {
        type: "p",
        text: "The traditional alternative is a session: the server generates a random session ID, stores the user data in a database or cache, and hands the ID to the browser in a cookie. Every subsequent request means a lookup to find out who that session belongs to.",
      },
      {
        type: "p",
        text: "A JWT inverts this. Instead of an ID pointing at server-side state, the token carries the state itself, signed so it can't be forged. A server verifies the signature with a key it already has, reads the claims, and serves the request — no database lookup, no shared session store. That's what makes JWTs attractive for APIs split across services or regions: any service holding the verification key can authenticate independently.",
      },
      {
        type: "p",
        text: "The trade-off is revocation. Because nothing is looked up, nothing can easily be invalidated: if a user logs out or you disable an account, any already-issued token stays cryptographically valid until its exp passes. The usual mitigation is short-lived access tokens — minutes, not days — paired with a longer-lived refresh token stored server-side, where it can be revoked.",
      },
      { type: "h2", text: "Verifying a signature" },
      {
        type: "p",
        text: "How verification works depends on which family of algorithm the token uses, and the difference matters for how you architect things:",
      },
      {
        type: "ul",
        items: [
          "HMAC algorithms (HS256, HS384, HS512) use a single shared secret for both signing and verifying. Simple, fast, and fine when the same party does both — but every service that can verify a token can also mint one.",
          "RSA and ECDSA algorithms (RS256, ES256 and friends) use a private key to sign and the matching public key to verify. The issuer keeps the private key; every consuming service only needs the public key, which can be published openly via a JWKS endpoint.",
        ],
      },
      {
        type: "p",
        text: "If you have more than one service verifying tokens, prefer asymmetric signing. It means a compromised API server leaks only a public key, not the ability to issue valid tokens for any user in your system.",
      },
      {
        type: "callout",
        variant: "tip",
        text: "Always pin the expected algorithm when verifying, rather than trusting the alg value in the token's own header. Historic vulnerabilities in JWT libraries involved attackers setting alg to \"none\" or swapping RS256 for HS256 and signing with the public key as the HMAC secret. Good libraries now require you to declare which algorithms you accept — declare them.",
      },
      { type: "h2", text: "Frequently asked questions" },
      { type: "h3", text: "Can I decode a JWT without the secret key?" },
      {
        type: "p",
        text: "Yes, completely. Decoding requires nothing but a Base64URL decoder, which is why a browser-based decoder can show you a token's header and payload instantly. The secret or public key is only needed to verify the signature — to confirm the token is genuine — not to read what's inside it.",
      },
      { type: "h3", text: "Where should I store a JWT in a browser?" },
      {
        type: "p",
        text: "There's no universally correct answer, only trade-offs. localStorage is easy but readable by any JavaScript on the page, so a single XSS bug hands over the token. An httpOnly cookie is invisible to JavaScript, but introduces CSRF concerns that SameSite attributes or anti-CSRF tokens need to address. Most teams land on httpOnly, Secure, SameSite cookies plus short token lifetimes.",
      },
      { type: "h3", text: "Are JWTs better than sessions?" },
      {
        type: "p",
        text: "Not inherently — they solve a different problem. For a single application with one database, server-side sessions are simpler, instantly revocable and perfectly adequate. JWTs earn their complexity when multiple independent services, or a third party, must validate identity without calling back to a central authority on every request.",
      },
      {
        type: "p",
        text: "Boiled down: a JWT is three Base64URL-encoded segments, the middle one is readable by anyone, and the last one only proves the first two haven't been tampered with. Keep secrets out of the payload, keep expiry times short, pin your algorithms on verification, and JWTs become a genuinely useful tool rather than a mysterious string you hope keeps working.",
      },
    ],
  },
  {
    slug: "regex-basics-a-practical-guide",
    title: "Regex Basics: A Practical Guide",
    excerpt:
      "The core regular expression syntax worth actually memorising, three worked examples, and the pitfalls that turn a working pattern into a subtle bug.",
    publishedAt: new Date("2026-09-12"),
    readingTime: "8 min read",
    status: "published",
    category: "developer-tools",
    tags: ["regex", "regular expressions", "developer tools", "validation"],
    relatedTool: { name: "Regex Tester", href: "/developer-tools/regex-tester", cta: "Test Your Regex Free" },
    content: [
      {
        type: "p",
        text: "A regular expression is a compact language for describing patterns in text. Instead of writing a loop that inspects each character, you write a short string meaning \"one or more digits, then a dash, then exactly four letters\" and hand it to an engine that does the scanning. Every mainstream language ships one, and the syntax is close enough between them that what you learn in JavaScript carries over to Python, Go or grep.",
      },
      {
        type: "p",
        text: "Regex has a reputation for being write-only: easy to produce, painful to read back six months later. Most of that pain comes from a handful of specific misunderstandings rather than the syntax being hard. This guide covers the pieces you'll use constantly, three worked examples, and the mistakes that produce patterns which look right and silently aren't.",
      },
      { type: "h2", text: "The building blocks" },
      {
        type: "p",
        text: "Almost every useful pattern is assembled from four kinds of piece: what to match, how many times, where, and how to group the result.",
      },
      { type: "h3", text: "Character classes: what to match" },
      {
        type: "p",
        text: "Square brackets define a set of characters, any one of which matches at that position. [abc] matches a single a, b or c. A hyphen denotes a range, so [a-z] is any lowercase letter. A caret at the start negates the set: [^0-9] matches any character that isn't a digit.",
      },
      {
        type: "ul",
        items: [
          "\\d — any digit, equivalent to [0-9].",
          "\\w — any word character: letters, digits and underscore ([A-Za-z0-9_]).",
          "\\s — any whitespace: space, tab, newline.",
          "\\D, \\W, \\S — the negated versions of the three above.",
          ". — any character at all, except a newline by default.",
        ],
      },
      { type: "h3", text: "Quantifiers: how many" },
      {
        type: "p",
        text: "A quantifier applies to whatever came immediately before it — a character, a class, or a group. The four you'll use constantly are * (zero or more), + (one or more), ? (optional), and {n,m} (between n and m times). {3} means exactly three; {2,} means two or more.",
      },
      { type: "h3", text: "Anchors: where" },
      {
        type: "p",
        text: "^ matches the start of the string and $ the end. These match positions, not characters — they consume nothing. Without them a pattern is free to match anywhere inside a longer string, which is what you want when searching and definitely not what you want when validating. \\b marks a word boundary, so \\bcat\\b matches \"cat\" in \"the cat sat\" but not inside \"concatenate\".",
      },
      { type: "h3", text: "Groups and alternation" },
      {
        type: "p",
        text: "Parentheses group part of a pattern so a quantifier applies to the whole thing, and they capture whatever matched so you can extract it. (ab)+ matches \"ababab\"; without them, ab+ matches \"abbb\". The pipe | means alternation, and it has very low precedence, so wrap it in a group: ^(cat|dog)$ rather than ^cat|dog$, which actually means \"starts with cat, or ends with dog\". For grouping without capturing, use (?:...).",
      },
      { type: "h2", text: "Three worked examples" },
      {
        type: "p",
        text: "Here are three patterns you'd plausibly write in real work, broken down.",
      },
      { type: "h3", text: "1. Digits only" },
      {
        type: "p",
        text: "You want to confirm a field contains nothing but digits — an OTP, a PIN, a numeric ID. The pattern is ^\\d+$, and the anchors do the real work:",
      },
      {
        type: "ul",
        items: [
          "^ — anchor to the start of the string.",
          "\\d+ — one or more digits.",
          "$ — anchor to the end of the string.",
          "Without the anchors, \\d+ alone would match the \"42\" inside \"abc42def\" and pass a check it should fail.",
          "For a fixed-length code, swap + for an exact count: ^\\d{6}$ for a six-digit OTP.",
        ],
      },
      { type: "h3", text: "2. An email-shaped pattern" },
      {
        type: "p",
        text: "A pragmatic pattern for catching obvious typos is ^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$ — \"characters that aren't spaces or at-signs, an at-sign, more of the same, a literal dot, more of the same\". Note the \\. in the middle: an unescaped dot matches any character, so \"user@examplecom\" would wrongly pass.",
      },
      {
        type: "p",
        text: "This deliberately isn't a full RFC 5322 validator. The complete grammar permits quoted strings and comments, and the canonical regex for it runs to thousands of characters. A loose pattern to catch typos, followed by an actual confirmation email, is both simpler and more correct than any regex claiming to prove an address exists.",
      },
      { type: "h3", text: "3. Extracting a substring with a capture group" },
      {
        type: "p",
        text: "Say you're pulling version numbers out of log lines like \"build v2.14.3 completed\". The pattern v(\\d+\\.\\d+\\.\\d+) matches the literal v, then captures three dot-separated number groups. The full match is \"v2.14.3\", but capture group 1 holds just \"2.14.3\" — the part you actually want.",
      },
      {
        type: "ul",
        items: [
          "v — a literal character to anchor the match somewhere meaningful.",
          "\\d+\\.\\d+\\.\\d+ — three groups of digits separated by escaped literal dots.",
          "( ... ) — the parentheses capture that span as group 1 in the match result.",
          "Add the g flag to find every version in a multi-line log rather than only the first.",
        ],
      },
      { type: "h2", text: "The pitfalls that cause real bugs" },
      { type: "h3", text: "Greedy versus lazy matching" },
      {
        type: "p",
        text: "Quantifiers are greedy by default: they consume as much as they can while still letting the rest of the pattern match. Run <.+> against \"<a><b>\" and you get one match spanning the whole string, not two — because .+ grabs everything and backtracks only enough to let the final > match.",
      },
      {
        type: "p",
        text: "Appending a ? makes a quantifier lazy, so it consumes as little as possible: <.+?> on the same input yields two matches, \"<a>\" and \"<b>\". The same applies to *? and {n,m}?. When a pattern matches far more text than expected, greediness is the first thing to check.",
      },
      { type: "h3", text: "Forgetting to escape" },
      {
        type: "p",
        text: "A dozen or so characters have special meaning in regex — . * + ? ^ $ ( ) [ ] { } | \\ — and matching one literally means prefixing it with a backslash. The unescaped dot is the classic offender, because a bare dot usually still appears to work: it matches the dot you intended and also every other character, so the bug only surfaces on input you didn't test.",
      },
      {
        type: "callout",
        variant: "warning",
        text: "If any part of your pattern comes from user input, escape it before interpolating. An unescaped string can silently change the pattern's meaning, or cause catastrophic backtracking — nested quantifiers like (a+)+$ take exponential time on a crafted input and hang the process. That's a real denial-of-service class known as ReDoS.",
      },
      { type: "h2", text: "When not to use regex" },
      {
        type: "p",
        text: "A regex checks shape, not truth: ^\\d{2}/\\d{2}/\\d{4}$ confirms something looks like a date but accepts 99/99/9999. More fundamentally, regular expressions describe regular languages — a mathematical limitation, not a style preference. Anything with arbitrarily nested structure is beyond what regex can correctly express, and the near-misses are worse than outright failure because they work on your test data.",
      },
      {
        type: "ul",
        items: [
          "HTML and XML: nesting is unbounded, and attributes, comments and self-closing tags break naive patterns. Use a parser.",
          "JSON: same reason — objects and arrays nest arbitrarily deep. Every language ships a JSON parser.",
          "Source code: matching balanced brackets or quotes is a known dead end. Use an AST tool.",
          "CSV with quoted fields: a field can contain commas and escaped quotes, so splitting by pattern corrupts rows.",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        text: "Build patterns incrementally in a tester rather than writing the whole thing and debugging the result. Start with the simplest piece that matches, confirm it against real sample data including cases that should fail, then add one element at a time. Most regex bugs come from writing forty characters before testing any of them.",
      },
      { type: "h2", text: "Frequently asked questions" },
      { type: "h3", text: "What do the g, i and m flags do?" },
      {
        type: "p",
        text: "The g (global) flag finds every match rather than stopping at the first, which matters for replace operations and match loops. The i flag makes matching case-insensitive. The m (multiline) flag makes ^ and $ match at the start and end of each line rather than the whole string — useful for log files, and a common surprise for anyone expecting that by default.",
      },
      { type: "h3", text: "Is regex syntax the same in every language?" },
      {
        type: "p",
        text: "The core — classes, quantifiers, anchors, groups, alternation — is effectively universal. Differences appear in the advanced corners: lookbehind support, named group syntax, Unicode property escapes and how the multiline flag is spelled. A pattern using only the basics ports unchanged; one using lookbehind may not.",
      },
      { type: "h3", text: "Why does my pattern work in a tester but not in my code?" },
      {
        type: "p",
        text: "Usually escaping. When a pattern is written as a string rather than a literal, the language's string parser eats one level of backslashes first, so \\d must be written \\\\d. The other frequent cause is a stateful global regex in JavaScript: a /g pattern held in a variable carries a lastIndex between test() calls, so repeated calls seem to alternate between matching and not.",
      },
      {
        type: "p",
        text: "Regex rewards a small vocabulary used carefully far more than cleverness. Learn the classes, the four quantifiers, the anchors and grouping; anchor your validation patterns; escape your literals; reach for a parser when structure nests. That covers most real work and leaves patterns you can still read months later.",
      },
    ],
  },
  {
    slug: "base64-encoding-explained",
    title: "Base64 Encoding Explained (And Why It Isn't Encryption)",
    excerpt:
      "How Base64 turns binary data into safe printable text, where it's genuinely useful, and why it makes your data bigger rather than smaller or more secure.",
    publishedAt: new Date("2026-09-16"),
    readingTime: "8 min read",
    status: "published",
    category: "developer-tools",
    tags: ["base64", "encoding", "developer tools", "data uri"],
    relatedTool: { name: "Base64 Encoder", href: "/developer-tools/base64-encoder", cta: "Encode Base64 Free" },
    content: [
      {
        type: "p",
        text: "Base64 shows up everywhere in software: in email attachments, in data URIs embedded in CSS, in JWTs, in API payloads carrying file uploads, in Kubernetes secrets. It's so common that many developers use it daily without ever being told what it actually does — which is how it ends up misused as a security measure, or blamed for making payloads mysteriously larger.",
      },
      {
        type: "p",
        text: "The concept itself is simple. Base64 is a way of representing arbitrary binary data using only 64 printable characters that survive text-only transmission unharmed. It's a translation, not a transformation: nothing is hidden, nothing is compressed, and the original bytes come back exactly as they went in.",
      },
      { type: "h2", text: "What Base64 actually does" },
      {
        type: "p",
        text: "Computers store everything as bytes, and a byte can hold any of 256 values. Many of those values aren't printable text — some are control characters, some are interpreted as line endings, some get mangled by systems that assume 7-bit ASCII. If you try to paste raw binary into a JSON string or an email body, something in the chain will corrupt it.",
      },
      {
        type: "p",
        text: "Base64 solves this by re-grouping the bits. It takes three bytes — 24 bits — and splits them into four groups of 6 bits each. Six bits can represent 64 values, and each of those maps to one character from a fixed alphabet: A–Z, a–z, 0–9, plus + and /. So three arbitrary bytes become four characters that every text system handles without complaint.",
      },
      {
        type: "ul",
        items: [
          "Input: 3 bytes (24 bits) of any value at all, including bytes that aren't valid text.",
          "Regrouping: those 24 bits are re-split into 4 chunks of 6 bits.",
          "Lookup: each 6-bit chunk (a value from 0 to 63) indexes into the 64-character alphabet.",
          "Output: 4 printable ASCII characters, safe to put in JSON, XML, email or a URL query.",
          "Reversing it needs nothing but the same alphabet — no key, no password, no configuration.",
        ],
      },
      { type: "h2", text: "Padding, and why strings end with =" },
      {
        type: "p",
        text: "The 3-bytes-to-4-characters mapping is clean only when your input length is a multiple of three, which real data rarely is. When there's a leftover group of one or two bytes, Base64 pads the final block with = characters so the output length stays a multiple of four.",
      },
      {
        type: "ul",
        items: [
          "Input length divisible by 3 → no padding, output ends with a normal character.",
          "One leftover byte (8 bits) → encodes to 2 characters plus two = signs.",
          "Two leftover bytes (16 bits) → encodes to 3 characters plus one = sign.",
          "\"Ma\" encodes to \"TWE=\", while \"Man\" encodes to \"TWFu\" with no padding at all.",
        ],
      },
      {
        type: "p",
        text: "The = characters carry no data. They exist so a decoder reading a stream in fixed 4-character blocks knows where the real data ended. Some decoders accept unpadded input and some reject it, which is why padding occasionally causes an interoperability bug between two systems that both claim to \"support Base64\".",
      },
      { type: "h2", text: "Where Base64 genuinely earns its place" },
      {
        type: "p",
        text: "Base64 isn't used because it's clever — it's used because a lot of infrastructure is text-only, and binary data has to get through it somehow.",
      },
      { type: "h3", text: "Text-only data formats" },
      {
        type: "p",
        text: "JSON and XML are text formats. A JSON string can't legally contain arbitrary bytes, so an API that accepts a file upload inside a JSON body has to encode that file as text first, and Base64 is the standard choice. The same applies to storing a binary blob in a YAML config or an environment variable.",
      },
      { type: "h3", text: "Email and MIME" },
      {
        type: "p",
        text: "Email was designed around 7-bit ASCII, long before anyone attached a photo to a message. MIME added Content-Transfer-Encoding: base64, which is how every image, PDF and spreadsheet you've ever emailed actually travels — encoded into printable characters, then decoded by the recipient's client.",
      },
      { type: "h3", text: "Data URIs in CSS and HTML" },
      {
        type: "p",
        text: "A data URI embeds a file directly in a document instead of referencing a separate URL, using a form like data:image/png;base64,iVBORw0KGgo... This eliminates an HTTP request, which can be worth it for a tiny icon or an SVG used once. It's a genuine trade-off though: embedded assets can't be cached independently, they inflate the parent file, and they bloat every page load rather than being fetched once. Reserve it for assets small enough that the saved request outweighs the extra bytes.",
      },
      { type: "h2", text: "What Base64 is not" },
      {
        type: "p",
        text: "Two persistent misconceptions cause real problems in production systems, and both are worth being blunt about.",
      },
      { type: "h3", text: "It is not encryption" },
      {
        type: "p",
        text: "There is no key involved anywhere in Base64. Anyone holding an encoded string can decode it instantly with a browser tool, a one-line shell command, or thirty seconds of mental effort if they recognise the alphabet. Encoding a password, an API key or a customer record in Base64 provides exactly zero protection — it only makes the value slightly less obvious to a human scanning a file.",
      },
      {
        type: "callout",
        variant: "warning",
        text: "Kubernetes secrets are stored Base64-encoded by default, and a lot of teams read that as \"encrypted\". It isn't — it's encoding, applied so binary values can live in YAML. Anything genuinely sensitive needs encryption at rest, a secrets manager, or both.",
      },
      { type: "h3", text: "It is not compression" },
      {
        type: "p",
        text: "Base64 makes data bigger, not smaller. Every 3 bytes become 4 characters, an increase of about 33%, plus padding and any line breaks the format inserts. A 1 MB image becomes roughly 1.37 MB of Base64 text. That overhead is the price of text-safety, and it's the main argument against inlining large assets as data URIs.",
      },
      { type: "h2", text: "Base64 versus base64url" },
      {
        type: "p",
        text: "Standard Base64's alphabet includes + and /, and its padding uses =. All three characters have special meaning in URLs: / is a path separator, + is sometimes read as a space in query strings, and = separates keys from values. Putting standard Base64 in a URL means percent-encoding it, which makes the string longer and harder to read.",
      },
      {
        type: "p",
        text: "RFC 4648 therefore defines a URL-safe variant, base64url, with two substitutions and one convention:",
      },
      {
        type: "ul",
        items: [
          "+ becomes - (hyphen).",
          "/ becomes _ (underscore).",
          "= padding is usually omitted entirely, since the length can be inferred.",
          "Everything else — the alphabet's first 62 characters and the 3-to-4 byte mapping — is identical.",
        ],
      },
      {
        type: "p",
        text: "This is the variant JWTs use for all three of their segments, which is why you can drop a token into a URL or header without escaping it. It's also why pasting a JWT segment into a strict standard-Base64 decoder sometimes fails: the decoder chokes on - and _, or refuses the missing padding.",
      },
      {
        type: "callout",
        variant: "tip",
        text: "If a Base64 string won't decode, check three things in order: whether it's actually base64url (look for - or _), whether padding was stripped, and whether copying it introduced line breaks or spaces. Those three account for nearly every \"invalid Base64\" error in practice.",
      },
      { type: "h2", text: "Frequently asked questions" },
      { type: "h3", text: "Should I Base64-encode data before compressing it?" },
      {
        type: "p",
        text: "No — compress first, then encode if you need to. Base64 output has less redundancy relative to its size than the original binary, so compressing afterwards is less effective and you've already paid the 33% expansion. The correct order is compress, then encode; on the way back, decode, then decompress.",
      },
      { type: "h3", text: "How do I Base64-encode text with emoji or accented characters?" },
      {
        type: "p",
        text: "Base64 operates on bytes, not characters, so the text has to be converted to bytes first — normally with UTF-8. A single emoji is four UTF-8 bytes, so it produces noticeably more Base64 output than a single ASCII letter. In JavaScript, this is why btoa() throws on non-Latin-1 strings and you need to run the text through a TextEncoder first.",
      },
      { type: "h3", text: "Is there a difference between Base64 and hex encoding?" },
      {
        type: "p",
        text: "Both make binary data printable, but hex uses 16 characters and produces exactly two characters per byte — a 100% size increase, versus Base64's 33%. Hex is easier to read and align by eye, which is why hashes and memory dumps use it, while Base64 is preferred where size matters more than human readability.",
      },
      {
        type: "p",
        text: "The short version: Base64 is a byte-to-text translation with a fixed public alphabet, it grows your data by a third, and it keeps no secrets. Use it to move binary through text-only channels, prefer base64url anywhere a URL is involved, and never let it stand in for encryption.",
      },
    ],
  },
  {
    slug: "what-is-a-uuid-versions-explained",
    title: "What Is a UUID? Versions and Trade-offs Explained",
    excerpt:
      "What a UUID actually is, how v1, v4 and v5 differ, and when a 128-bit random identifier beats a simple auto-incrementing integer.",
    publishedAt: new Date("2026-09-19"),
    readingTime: "8 min read",
    status: "published",
    category: "developer-tools",
    tags: ["uuid", "unique identifiers", "developer tools", "databases"],
    relatedTool: { name: "UUID Generator", href: "/developer-tools/uuid-generator", cta: "Generate a UUID Free" },
    content: [
      {
        type: "p",
        text: "A UUID is a 128-bit number used as an identifier, written as 32 hexadecimal digits split by hyphens into five groups in an 8-4-4-4-12 pattern — 36 characters in total, like 3f2504e0-4f89-41d3-9a0c-0305e82c3301. The name stands for Universally Unique Identifier, and Microsoft's equivalent term GUID refers to exactly the same thing.",
      },
      {
        type: "p",
        text: "What makes UUIDs interesting isn't the format, it's the guarantee. A UUID is designed to be generated independently, by any machine, at any time, without asking permission from anything — and still be unique. That property is why they turn up in databases, message queues, offline mobile apps and distributed systems everywhere, and it's also the source of the trade-offs that make them a poor default for every table in your schema.",
      },
      { type: "h2", text: "Why not just use an auto-incrementing ID?" },
      {
        type: "p",
        text: "Auto-incrementing integers are excellent when one authority hands out every ID. The database assigns 1, then 2, then 3; the values are small, sortable and perfectly ordered. The trouble starts the moment more than one thing needs to create records.",
      },
      {
        type: "ul",
        items: [
          "Client-side creation: a mobile app working offline can't ask the server for the next ID, but it still needs to identify the record it just created and sync it later.",
          "Multiple services or shards: two independent databases both issuing ID 5001 makes merging their data a manual reconciliation job.",
          "Pre-assigned relationships: with UUIDs you can build a parent and its children in memory, wiring up foreign keys before anything is written, then insert the whole graph in one transaction.",
          "Information leakage: an order at /orders/1043 tells any visitor roughly how many orders you've ever processed, and invites them to try 1042.",
          "Idempotent writes: a client-generated UUID doubles as a natural deduplication key when a request is retried after a timeout.",
        ],
      },
      {
        type: "p",
        text: "Each of these is solvable other ways, but UUIDs solve all of them at once by making the ID space large enough that independent generators never need to coordinate.",
      },
      { type: "h2", text: "Why collisions aren't a practical concern" },
      {
        type: "p",
        text: "A random UUID doesn't actually use all 128 bits for randomness. Four bits encode the version and two encode the variant, leaving 122 random bits — roughly 5.3 undecillion possible values. The probability of generating a duplicate is small enough that the usual illustration is that you'd need to produce billions of UUIDs per second for around a century before a collision became likely.",
      },
      {
        type: "p",
        text: "The important caveat is that this holds only when the randomness is good. A UUID from a weak or badly-seeded source — Math.random(), or an embedded device with no entropy at startup — can and does collide in practice. Use a generator backed by a cryptographically secure random source; in browsers that's the Web Crypto API, and every server platform has an equivalent.",
      },
      { type: "h2", text: "The versions that matter" },
      {
        type: "p",
        text: "The version is encoded in the UUID itself — it's the first hex digit of the third group, so a v4 UUID always has a 4 in that position. Several versions exist; three account for nearly all real usage.",
      },
      { type: "h3", text: "Version 1: timestamp and MAC address" },
      {
        type: "p",
        text: "A v1 UUID is built from the current time (in 100-nanosecond intervals since 1582, an artefact of the original spec) combined with the generating machine's MAC address and a clock sequence. Because time forms most of the value, v1 UUIDs generated on the same machine are roughly ordered, which is friendlier to database indexes than pure randomness.",
      },
      {
        type: "p",
        text: "The cost is disclosure. A v1 UUID reveals when it was created and, via the embedded MAC address, which network interface created it. That was famously used to trace the author of the Melissa virus. Treat v1 as unsuitable for anything user-facing unless you're using a variant that randomises the node field.",
      },
      { type: "h3", text: "Version 4: random" },
      {
        type: "p",
        text: "A v4 UUID is 122 random bits plus the version and variant markers. It carries no timestamp, no machine identity and no ordering — which is precisely why it's the default that virtually every library and online generator produces, and the right choice when the identifier will ever be visible outside your system.",
      },
      {
        type: "p",
        text: "The trade-off is that randomness is hostile to B-tree indexes. Each new value lands in an arbitrary position in the index rather than appending at the end, so pages are split and rewritten across the whole structure instead of staying hot at the tail. On a small table this is invisible; on a high-write table with hundreds of millions of rows it is very much not.",
      },
      { type: "h3", text: "Version 5: name-based and deterministic" },
      {
        type: "p",
        text: "A v5 UUID is derived by hashing a namespace UUID together with a name string using SHA-1, then formatting the result as a UUID. Its defining property is determinism: the same namespace and name always yield the same UUID, on any machine, forever. (Version 3 does the same thing with MD5 and exists mainly for backwards compatibility — prefer v5.)",
      },
      {
        type: "p",
        text: "That makes v5 ideal when an identifier should be reproducible rather than novel — deriving a stable internal ID from an external system's key, or generating consistent IDs for the same logical entity across independent services without any shared state. Note that it is a hash, not encryption: someone who knows the namespace can compute the UUID for any name, so a v5 UUID is not a secret.",
      },
      {
        type: "callout",
        variant: "note",
        text: "Newer time-ordered versions, v7 in particular, combine a millisecond Unix timestamp with random bits. They aim to give the index-friendliness of v1 without leaking a MAC address, and are worth knowing about if UUID write performance is a real concern in your database. Library support is now broad, but check your specific stack before relying on it.",
      },
      { type: "h2", text: "Choosing between UUIDs and integers" },
      {
        type: "p",
        text: "The honest answer is that this is a storage and indexing trade-off, and it only becomes significant at scale. A UUID is 16 bytes as a native type versus 4 or 8 for an integer — and 36 bytes if you store it as text, which is the mistake that turns a modest overhead into a serious one.",
      },
      {
        type: "ul",
        items: [
          "Lean towards UUIDs when IDs are created outside a single database, when identifiers appear in public URLs, or when you need to merge datasets from separate systems.",
          "Lean towards auto-increment integers for a single-database application where compact keys and sequential inserts matter and IDs stay internal.",
          "A common middle ground: keep an internal integer primary key for joins and indexing, plus a UUID column as the public-facing identifier.",
          "Whatever you choose, store UUIDs in a native uuid or 16-byte binary column, never as a 36-character string — the text form roughly doubles storage and slows every index comparison.",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        text: "Before switching a large table's primary key to random UUIDs, benchmark it with a realistic row count. Index fragmentation from random inserts doesn't show up on ten thousand test rows, but it can dominate write performance at a hundred million. If the benchmark hurts and you still need coordination-free IDs, a time-ordered version is the usual answer.",
      },
      { type: "h2", text: "Frequently asked questions" },
      { type: "h3", text: "Is a UUID safe to use as a security token?" },
      {
        type: "p",
        text: "Not as a general rule. A v4 UUID from a cryptographically secure source has 122 bits of entropy, which is genuinely unguessable, but v1 and v5 UUIDs are largely predictable if you know the inputs — and nothing about a UUID tells a reader which version generated it unless they check. Uniqueness and unguessability are separate properties; for session tokens, password resets and API keys, use a purpose-built secure random token instead.",
      },
      { type: "h3", text: "Are UUIDs case-sensitive?" },
      {
        type: "p",
        text: "The specification says UUIDs should be generated in lowercase but compared case-insensitively, since the hex digits are the same value either way. In practice, string comparisons in your code are case-sensitive, so normalise to lowercase on the way into storage rather than relying on every consumer to compare correctly.",
      },
      { type: "h3", text: "Can I shorten a UUID for use in a URL?" },
      {
        type: "p",
        text: "Yes — the 36-character form is only a display convention. Encoding the underlying 16 bytes in base64url gives 22 characters, and Base32 or Base58 encodings are also common where readability matters. The identifier is unchanged; you're just writing the same number in a denser alphabet, and you'll need to decode it back before comparing against stored values.",
      },
      {
        type: "p",
        text: "In summary: a UUID is 128 bits formatted as 36 characters, v4 is random and the sensible default, v1 encodes a timestamp and MAC address you probably don't want to publish, and v5 is deterministic by design. Pick UUIDs when independent generation genuinely buys you something, store them as a native 16-byte type, and don't mistake uniqueness for secrecy.",
      },
    ],
  },

  {
    slug: "how-to-merge-pdf-files",
    title: "How to Merge PDF Files (Without Wrecking the Page Order)",
    excerpt:
      "Why you'd combine PDFs, how page order is actually determined, what merging does to file size and quality, and a checklist for verifying the result before you send it.",
    publishedAt: new Date("2026-09-08"),
    readingTime: "7 min read",
    status: "published",
    category: "pdf-tools",
    tags: ["pdf", "merge pdf", "documents", "file management"],
    relatedTool: { name: "Merge PDF", href: "/pdf-tools/merge-pdf", cta: "Merge PDFs Free" },
    content: [
      {
        type: "p",
        text: "Merging PDFs is one of those tasks that sounds trivial until you've sent a client a 40-page proposal with the appendix stapled in front of the cover letter. The mechanics are genuinely simple — pick your files, set an order, combine — but almost every mistake people make with merged PDFs comes from not being clear about how the order is decided, or from assuming the merge tool will do something clever it doesn't actually do.",
      },
      { type: "h2", text: "When merging is the right tool" },
      {
        type: "p",
        text: "Merging is worth doing whenever a set of separate files is really one logical document. A few situations come up constantly:",
      },
      {
        type: "ul",
        items: [
          "Scanned pages that arrived as individual files — most document scanners and phone scanning apps produce one PDF per page or per batch, leaving you with a folder of fragments rather than a document.",
          "A report assembled from multiple sources — a cover page from your word processor, a financial section exported from a spreadsheet, charts exported from an analytics tool, each arriving as its own PDF.",
          "A batch of invoices, receipts or statements that need to be submitted or archived as a single file, for an expense claim or an audit.",
          "Application packs — a CV, a cover letter, certificates and references — where the recipient's upload form accepts exactly one file.",
        ],
      },
      { type: "h2", text: "How page order is actually determined" },
      {
        type: "p",
        text: "A merge tool concatenates documents: it takes every page of the first file in your list, then every page of the second, and so on. Within each source file, the existing page order is preserved exactly — merging never shuffles pages inside a document. The only thing you control at merge time is the order of the files themselves.",
      },
      { type: "h3", text: "Why the order on screen matters more than the filenames" },
      {
        type: "p",
        text: "This trips people up regularly. A file called \"Section 2\" will not automatically land after \"Section 1\" unless it's positioned that way in the list. Selection order, drag order and alphabetical order are not the same thing, and a folder that looks correctly sorted in your file manager may be handed to the tool in a different sequence entirely.",
      },
      {
        type: "p",
        text: "Alphabetical sorting is itself a trap: a folder containing scan1.pdf through scan12.pdf sorts as scan1, scan10, scan11, scan12, scan2 — because the comparison is character by character, not numeric. Rename numbered batches with leading zeros (scan01, scan02) before you start.",
      },
      {
        type: "callout",
        variant: "tip",
        text: "Sort the file list in the merge tool before you click merge, not after you've downloaded the result. Reordering takes one drag; re-merging a 12-file batch because the appendix ended up first takes several minutes and it's easy to lose track of which files you've already handled.",
      },
      { type: "h2", text: "Does merging change file size or quality?" },
      {
        type: "p",
        text: "Merging is additive, not compressive. The combined document is roughly the sum of the originals — sometimes a little less, since duplicate resources such as a font embedded in several source files can be stored once, but plan around \"sum of the parts\" rather than expecting a saving.",
      },
      {
        type: "p",
        text: "Quality is unaffected, and it's worth understanding why. A merge copies page objects from each source document into a new container. It doesn't re-render the pages or re-encode the images inside them. Text stays as vector outlines, vector graphics stay vector, and embedded photographs keep exactly the compression they arrived with. There is no quality setting in a merge tool because there is no quality decision to make.",
      },
      {
        type: "p",
        text: "The practical consequence: if your merged file is too big to email, merging isn't what made it big — the source files were already that size. Run the combined document through a PDF compressor afterwards, which reduces size by re-encoding the embedded images. That step does involve a quality trade-off, but it's a separate operation with its own controls.",
      },
      { type: "h2", text: "What survives the merge, and what doesn't" },
      {
        type: "p",
        text: "Page content always comes through intact. Document-level features are less predictable, and this is where merged files most often surprise people.",
      },
      { type: "h3", text: "Bookmarks and the table of contents" },
      {
        type: "p",
        text: "PDF bookmarks — the collapsible outline in the sidebar of most readers — are a document-level structure that points at specific pages. When several documents are combined, each one brings its own outline, and how those are reconciled depends entirely on the tool. Some nest each source document's bookmarks under a heading; some keep them all at the top level; many browser-based tools drop them altogether. If bookmarks matter for a long document, check the sidebar after merging and be prepared to rebuild the outline in a full PDF editor.",
      },
      {
        type: "p",
        text: "A printed table of contents has a related problem: its page numbers refer to the original document's pagination. Merge that document into position three of a combined report and every number on its contents page is wrong, even though the page itself came through perfectly — and nothing will flag it for you.",
      },
      { type: "h3", text: "Form fields, links and annotations" },
      {
        type: "p",
        text: "Interactive form fields may survive, may be flattened into static content, or may collide: two source documents each containing a field named \"signature\" can end up sharing a value after merging, so typing in one fills the other. Internal links that point to a page within their own document usually still resolve; external web links normally survive. Comments and highlights are generally preserved but are worth a spot check if they carry meaning. Digital signatures are the clear-cut case — they're invalidated by merging, because a signature certifies a specific document and the merged file is a different document.",
      },
      {
        type: "callout",
        variant: "warning",
        text: "Never merge a digitally signed PDF and expect the signature to remain valid. The signature attests to the exact bytes of the original file, so any modification — including combining it with other documents — breaks it. Send signed documents separately, or get the combined version re-signed.",
      },
      { type: "h2", text: "A practical merge workflow" },
      {
        type: "p",
        text: "This is the routine worth following whenever the result is going to someone else:",
      },
      {
        type: "ul",
        items: [
          "Gather the files into one folder and rename them with a numeric prefix — 01-cover.pdf, 02-report.pdf, 03-appendix.pdf — so the intended order is unambiguous before you even open a tool.",
          "Confirm each source file opens and isn't password-protected. Encrypted PDFs can't be read by a merge tool until they're unlocked, and a file that fails silently is easy to miss.",
          "Remove pages you don't want to share before merging rather than after — it's easier to drop a page from a 4-page file than to locate and remove it from a 60-page merged one.",
          "Arrange the files in the tool, then read the list top to bottom once and confirm it matches your intended reading order.",
          "Merge and download, then open the result and check the very first page, the very last page, and each boundary where one source document ends and the next begins.",
          "Verify the total page count equals the sum of the individual files' page counts — a mismatch means a file was skipped or added twice.",
          "If the file needs to be under a size limit, compress the merged document as a separate final step.",
        ],
      },
      {
        type: "p",
        text: "The boundary check is worth the fifteen seconds: almost every merge error shows up at a transition between source documents.",
      },
      { type: "h2", text: "Frequently asked questions" },
      { type: "h3", text: "Can I merge PDFs with different page sizes?" },
      {
        type: "p",
        text: "Yes. PDF stores a page size per page, so A4 pages, US Letter pages and landscape slides can all coexist in one document, each keeping its own dimensions. The result looks slightly uneven on screen and can be awkward to print, so if consistency matters, normalise the page sizes in the source documents before merging.",
      },
      { type: "h3", text: "How many files can I merge at once?" },
      {
        type: "p",
        text: "There's generally no fixed limit, but with browser-based tools the practical ceiling is your device's available memory, since every file has to be held in memory at once. Dozens of ordinary documents are fine; a handful of very large scanned files is more demanding. If a big merge struggles, combine the documents in two or three batches and then merge the batches.",
      },
      { type: "h3", text: "Can I undo a merge?" },
      {
        type: "p",
        text: "Not directly, but you can split the merged file back into its parts if you know the page ranges — which is another good reason to note each source file's page count before combining. The simpler safeguard is to keep the originals until the merged version has been sent and accepted.",
      },
      {
        type: "p",
        text: "Merging is genuinely one of the safest PDF operations there is: nothing is re-encoded, no quality is lost, and the page content arrives exactly as it left. The care belongs entirely in the ordering and in the thirty-second check afterwards — get those right and the merge itself will never let you down.",
      },
    ],
  },
  {
    slug: "how-to-split-a-pdf-into-multiple-files",
    title: "How to Split a PDF Into Multiple Files",
    excerpt:
      "The three ways to split a PDF, when to use each, what happens to bookmarks and metadata, and how to check you haven't cut a document in half mid-sentence.",
    publishedAt: new Date("2026-09-11"),
    readingTime: "7 min read",
    status: "published",
    category: "pdf-tools",
    tags: ["pdf", "split pdf", "documents", "extract pages"],
    relatedTool: { name: "Split PDF", href: "/pdf-tools/split-pdf", cta: "Split a PDF Free" },
    content: [
      {
        type: "p",
        text: "Splitting a PDF is the opposite of merging, and it's the more common need in practice. Documents arrive bundled — a 200-page handbook when you need one chapter, a single export containing forty separate invoices, a contract with an internal cost breakdown you'd rather the other side didn't see. Splitting lets you hand over exactly the pages that matter and nothing else.",
      },
      { type: "h2", text: "Why you'd split a PDF" },
      {
        type: "p",
        text: "Three motivations account for most real-world splitting, and each suggests a different approach.",
      },
      {
        type: "ul",
        items: [
          "Extracting a section — pulling one chapter from a textbook, one policy from a handbook, or one report from an annual compilation, so the reader isn't handed 200 pages when 12 will do.",
          "Breaking up a batch — an accounting system exports fifty invoices as one PDF, and each needs to become its own file named after its customer so it can be filed or emailed individually.",
          "Removing pages you don't want to share — an internal cost sheet inside a client proposal, personal details on a bank statement submitted as proof of address, or draft notes left at the end of a document.",
        ],
      },
      {
        type: "p",
        text: "That third case deserves emphasis. Splitting out the pages you want to share is meaningfully safer than covering up the parts you don't. A black rectangle drawn over text in many PDF tools is just a shape sitting on top of the text — the text is still in the file and can be selected, copied or extracted by anyone who thinks to try. Removing the whole page removes the content. If you need to redact part of a page rather than all of it, use a purpose-built redaction feature that actually deletes the underlying content.",
      },
      {
        type: "callout",
        variant: "warning",
        text: "Drawing a black box over sensitive text does not remove it from the PDF. The text stays in the file and can be recovered by selecting and copying it. To genuinely remove information, split the page out entirely or use a tool with true redaction that deletes the underlying content.",
      },
      { type: "h2", text: "The three ways to split" },
      {
        type: "p",
        text: "Most splitting tools offer some combination of three modes. Picking the right one saves a lot of manual cleanup.",
      },
      { type: "h3", text: "Splitting by page range" },
      {
        type: "p",
        text: "You specify a start and end page — pages 45 to 62 — and get a single new document containing exactly those pages in their original order. This is the mode for extracting a chapter, a section or an appendix, and it's the one you'll use most.",
      },
      {
        type: "p",
        text: "The one thing to be careful about is what \"page 45\" means. Tools count physical pages, starting at 1 with the cover. A book whose printed page numbers start after a cover, a title page and a contents page will have printed numbers that sit several behind the physical count. Always read the page number off your PDF reader's page indicator rather than off the printed page itself.",
      },
      { type: "h3", text: "Splitting every N pages" },
      {
        type: "p",
        text: "This chops the document into equal chunks — every page becomes its own file, or every two pages, or every ten. It's the right choice when your document has a genuinely regular structure: a batch of single-page invoices, a stack of scanned two-sided forms, a set of certificates.",
      },
      {
        type: "p",
        text: "It's the wrong choice the moment that regularity breaks. If most invoices are one page but three of them ran to two pages, splitting every page silently produces orphaned continuation pages with no header and no context. Scan the document for irregular items before trusting a fixed-interval split.",
      },
      { type: "h3", text: "Extracting specific pages" },
      {
        type: "p",
        text: "Here you list the pages you want — something like 1, 4, 7-9, 15 — and get a document containing just those, in the order listed. This suits cherry-picking: pulling the signature pages out of a contract, collecting the charts from a report, or assembling the handful of pages a colleague actually asked for. It's also the cleanest way to remove pages: rather than deleting the ones you don't want, list the ones you do.",
      },
      { type: "h2", text: "What happens to bookmarks and metadata" },
      {
        type: "p",
        text: "As with merging, page content survives splitting reliably. Document-level structures are where things get lost, and it's better to expect that than to discover it.",
      },
      {
        type: "p",
        text: "Bookmarks are the usual casualty. They're a document-level outline pointing at specific pages, and when you extract pages 45-62 into a new file, entries pointing outside that range are meaningless. Most tools resolve this by dropping the outline entirely, so a chapter extracted from a well-organised handbook typically arrives with an empty bookmark sidebar. Rebuilding it requires a full PDF editor.",
      },
      {
        type: "p",
        text: "Metadata — title, author, subject, keywords — behaves inconsistently. Some tools copy the original document's metadata to every output file, which means twelve split invoices all claiming to be titled \"Consolidated Export January\". Others write nothing. Neither is wrong exactly, but if these files are going into a document management system that indexes on metadata, check and correct it after splitting.",
      },
      {
        type: "p",
        text: "Two other details worth knowing: internal links that pointed to pages now outside the extracted range will break, though external web links are unaffected; and any digital signature on the original is invalidated, for the same reason it's invalidated by merging — it certifies a specific document, and the extract is a different one.",
      },
      {
        type: "callout",
        variant: "note",
        text: "File size doesn't always shrink proportionally. Extracting 10 pages from a 100-page PDF rarely gives you a file a tenth the size, because embedded fonts and shared resources may be carried over in full. Run the extract through a compressor if the size still matters.",
      },
      { type: "h2", text: "Checking you haven't split mid-content" },
      {
        type: "p",
        text: "The failure mode that actually causes problems isn't a crash or a corrupt file — it's a split that lands one page off, cutting a table in half or leaving a paragraph dangling. Nothing about the output looks broken; it just quietly isn't right. A short verification pass catches it:",
      },
      {
        type: "ul",
        items: [
          "Open each output file and read the first page — it should begin at a natural starting point, not partway through a sentence, a table or a numbered list.",
          "Read the last page of each file and confirm the section it contains actually concludes there rather than trailing off.",
          "Check that page counts add up: the total across all output files should equal the original, unless you deliberately excluded pages.",
          "Look specifically for split tables and figures. A table continuing across a boundary is the single most common casualty, because the continuation rows carry no header and are unreadable on their own.",
          "For a batch split, spot-check the first, last and one middle file rather than assuming the pattern held throughout.",
          "Confirm nothing you meant to remove survived — search the extracted document for a distinctive word from the sensitive section.",
        ],
      },
      {
        type: "p",
        text: "For batch splitting specifically, the fastest sanity check is arithmetic: if fifty invoices produced fifty-three files, three of them ran to more than one page and your split broke them apart. The count tells you there's a problem before you've opened a single file.",
      },
      { type: "h2", text: "Frequently asked questions" },
      { type: "h3", text: "Can I extract non-consecutive pages into one file?" },
      {
        type: "p",
        text: "Yes. Most tools accept a comma-separated list combining individual pages and ranges, such as 1, 4, 7-9, 15. The pages appear in the output in the order you list them, and they arrive as a single document rather than as separate files.",
      },
      { type: "h3", text: "Does splitting reduce quality?" },
      {
        type: "p",
        text: "No. Splitting copies page objects into new documents without re-rendering or re-encoding anything, so text stays vector-sharp and images keep their original compression. It's a lossless operation in the same way merging is — the only thing that changes is which pages are in which file.",
      },
      { type: "h3", text: "Can I split a password-protected PDF?" },
      {
        type: "p",
        text: "Not without the password. A split tool has to read the document's structure to copy pages out of it, and encryption prevents that. Remove the protection first using the password you're entitled to use, then split the unlocked copy.",
      },
      {
        type: "p",
        text: "Splitting is low-risk on the technical side and entirely about precision on the human side. Choose the mode that matches your document's structure, count physical pages rather than printed ones, expect bookmarks not to survive, and read the first and last page of every output file before sending anything on.",
      },
    ],
  },
  {
    slug: "how-to-convert-pdf-to-images",
    title: "How to Convert PDF Pages to Images (and When You Shouldn't)",
    excerpt:
      "When turning PDF pages into JPG or PNG makes sense, how DPI affects sharpness and file size, which output format to pick, and what you permanently give up by rasterising.",
    publishedAt: new Date("2026-09-15"),
    readingTime: "7 min read",
    status: "published",
    category: "pdf-tools",
    tags: ["pdf", "pdf to jpg", "image conversion", "dpi"],
    relatedTool: { name: "PDF to JPG", href: "/pdf-tools/pdf-to-jpg", cta: "Convert PDF to JPG Free" },
    content: [
      {
        type: "p",
        text: "Converting a PDF page to an image is called rasterising: the page is rendered and flattened into a grid of coloured pixels. Text that was stored as scalable vector outlines becomes a picture of text. Everything on the page — headings, tables, charts, photos — becomes one indivisible image.",
      },
      {
        type: "p",
        text: "That flattening is the whole point when you need a page to behave like a picture, and it's a genuine loss when you don't.",
      },
      { type: "h2", text: "Why convert a PDF page to an image" },
      {
        type: "p",
        text: "The recurring reasons are practical rather than technical:",
      },
      {
        type: "ul",
        items: [
          "Embedding a page in a presentation or document — slide software handles images natively but treats PDFs awkwardly, so exporting the page as an image and dropping it into the slide is far more reliable.",
          "Sharing a preview without handing over the source — an image of a page can't have its text selected, copied or edited, which is useful for sending a sample, a proof or a draft you don't want reused.",
          "Compatibility with tools that won't take PDFs — many web upload forms, chat apps, CMS media libraries and older systems accept images only.",
          "Posting a page where images render inline — social platforms, forums and messaging apps display an image directly in the feed, while a PDF becomes a link nobody clicks.",
          "Producing thumbnails — a small image of the first page makes a useful visual index.",
        ],
      },
      { type: "h2", text: "Choosing a resolution" },
      {
        type: "p",
        text: "A PDF page has no inherent pixel dimensions. It's described in physical units — an A4 page is 210mm wide regardless of any screen — so converting it to pixels means deciding how many pixels each inch of the page should become. That number is the DPI, and it's the single most consequential setting in the conversion.",
      },
      { type: "h3", text: "What DPI actually controls" },
      {
        type: "p",
        text: "DPI determines the output image's pixel dimensions. An A4 page is roughly 8.27 by 11.7 inches, so at 150 DPI it renders to about 1240 by 1754 pixels; at 300 DPI, about 2480 by 3508. Doubling the DPI doubles both dimensions, which means roughly four times the pixels and, broadly, four times the file size. This is why resolution choices escalate quickly on multi-page documents.",
      },
      { type: "h3", text: "Practical targets" },
      {
        type: "p",
        text: "Two figures cover almost everything. Around 150 DPI is comfortable for on-screen use — viewing, sharing, embedding in a slide, posting online — because it produces an image with more pixels than most screens will use to display it. Around 300 DPI is the conventional target for print, where the eye is held much closer to the page and finer detail genuinely shows.",
      },
      {
        type: "p",
        text: "Going below roughly 100 DPI makes body text noticeably ragged. Going above 300 is rarely worth it: the file size climbs steeply while the visible improvement on screen is nil, and even in print the gains above 300 DPI are marginal for ordinary document content. Start at 150, check the result at full size, and step up only if something specific looks soft.",
      },
      {
        type: "callout",
        variant: "tip",
        text: "Zoom the output image to 100% before deciding the resolution was adequate. Viewing a page scaled down to fit your screen hides exactly the softness you're trying to judge — small text and thin table rules are where insufficient DPI shows up first.",
      },
      { type: "h2", text: "JPG or PNG?" },
      {
        type: "p",
        text: "The two formats fail in opposite ways, and the right choice depends on what's actually on the page.",
      },
      {
        type: "p",
        text: "JPG uses lossy compression tuned for photographic content — smooth gradients and gradual tonal variation. It handles scanned pages, photographs and image-heavy brochures very efficiently, producing small files with no quality loss you'd notice. Its weakness is sharp, high-contrast edges: around black text on a white background, JPG leaves faint blotchy halos known as ringing artifacts. On body text at a reasonable DPI these are subtle; on small text at a low quality setting they're ugly and obvious. JPG also can't store transparency, which is irrelevant here since PDF pages have a solid background anyway.",
      },
      {
        type: "p",
        text: "PNG is lossless: it reproduces every rendered pixel exactly, so text edges stay perfectly crisp and no artifacts are introduced at any setting. It compresses flat areas of uniform colour extremely well, which describes most text documents, but it's inefficient for photographic content — a scanned photo page as PNG can easily be several times the size of the equivalent JPG.",
      },
      {
        type: "ul",
        items: [
          "Scanned document pages and photo-heavy layouts → JPG, for a much smaller file at effectively identical quality.",
          "Pages of crisp text, tables, diagrams, logos or line art → PNG, to keep every edge sharp.",
          "Anything going into print, or being read at high zoom → PNG, so no compression artifacts are baked in.",
          "A quick preview, a thumbnail or a social post → JPG, where small and fast matters more than pixel-exactness.",
          "Mixed pages with both photos and fine text → PNG if the file size is acceptable; otherwise JPG at a high quality setting.",
        ],
      },
      { type: "h2", text: "What you lose by rasterising" },
      {
        type: "p",
        text: "Everything that made the file a document rather than a picture goes away, and none of it comes back.",
      },
      {
        type: "p",
        text: "The text layer is the big one. In a normal PDF, text is stored as characters with font references, which is why you can search it, select it, copy it and have a screen reader read it aloud. Rasterising replaces all of that with pixels arranged in the shape of letters. The result is unsearchable, unselectable and effectively invisible to assistive technology and to search engines. For accessibility in particular this is a real cost, not a technicality — an image of text is inaccessible to anyone using a screen reader unless you supply the text separately as alternative text.",
      },
      {
        type: "p",
        text: "Alongside that, hyperlinks stop working, form fields become static images of empty boxes, bookmarks and document structure are gone, and the page can no longer be scaled up indefinitely — zoom past the resolution you chose and it simply looks soft.",
      },
      {
        type: "callout",
        variant: "warning",
        text: "Rasterising is not a security measure. Text in an image can be recovered by anyone running OCR, which is built into most phones and many document tools. It makes casual copying inconvenient, nothing more. If information genuinely must not be shared, remove it from the document rather than converting the page to an image.",
      },
      { type: "h2", text: "A worked conversion" },
      {
        type: "p",
        text: "Say you need page 4 of a 30-page report — a page with a chart and a short paragraph — to drop into a slide deck. The sequence that gets a good result:",
      },
      {
        type: "ul",
        items: [
          "Convert the PDF and pick out page 4 from the preview rather than exporting all 30 pages and hunting through the download folder.",
          "Choose 150 DPI, since this is going on a screen in a presentation, giving roughly 1240 by 1754 pixels for an A4 page — comfortably more than a projector will use.",
          "Choose PNG, because the page is a chart plus text: crisp lines and lettering, which is where JPG artifacts are most visible.",
          "Open the exported image at 100% zoom and check the axis labels and the smallest text on the chart are clean.",
          "Insert it into the slide and resize it down rather than up — scaling below its native size always looks good, scaling above it never does.",
          "Keep the original PDF, since the image can't be edited or re-exported at a higher resolution later.",
        ],
      },
      { type: "h2", text: "Frequently asked questions" },
      { type: "h3", text: "Can I convert images back into a real PDF with selectable text?" },
      {
        type: "p",
        text: "You can rebuild a PDF from the images, but the text won't be selectable — the pages will just be pictures inside a PDF container. Recovering an actual text layer requires OCR, which recognises the letter shapes and adds a text layer behind the image. OCR is good but not perfect, particularly with unusual fonts, tables or poor-quality scans, so it's always better to keep the original PDF.",
      },
      { type: "h3", text: "Why is my exported image so large?" },
      {
        type: "p",
        text: "Almost always the DPI. File size scales with pixel count, so 600 DPI produces four times the pixels of 300 DPI and roughly four times the bytes. Drop to 150 DPI for screen use, and choose JPG rather than PNG if the page is photographic — those two changes together usually cut the size by an order of magnitude.",
      },
      {
        type: "p",
        text: "Rasterising is a deliberate trade: universal compatibility and a flat, uneditable page, in exchange for searchable text, working links and infinite scalability. When you need a picture of a page, it's exactly the right tool. Pick 150 DPI for screens and 300 for print, choose JPG for photographic pages and PNG for text and line art, and always keep the original PDF.",
      },
    ],
  },
  {
    slug: "image-resizing-explained-pixels-dpi-aspect-ratio",
    title: "Image Resizing Explained: Pixels, DPI and Aspect Ratio",
    excerpt:
      "What actually changes when you resize an image, why DPI is a print-only concept, how aspect ratio prevents distortion, and why upscaling can't recover detail that was never captured.",
    publishedAt: new Date("2026-09-05"),
    readingTime: "8 min read",
    status: "published",
    category: "image-tools",
    tags: ["image resizing", "pixels", "dpi", "aspect ratio"],
    relatedTool: { name: "Image Resizer", href: "/image-tools/image-resizer", cta: "Resize an Image Free" },
    content: [
      {
        type: "p",
        text: "Resizing an image sounds like it should be the simplest thing in digital imaging, and then someone tells you the photo needs to be 300 DPI, or an upload form rejects your file, or a resized logo comes out subtly squashed. Most of that confusion traces back to three concepts that are routinely muddled together: pixel dimensions, DPI and aspect ratio.",
      },
      { type: "h2", text: "Pixels are the only real measurement" },
      {
        type: "p",
        text: "A digital image is a grid of coloured squares. An image described as 1920x1080 has 1920 columns and 1080 rows — about 2.07 million pixels in total. That grid is the image. There is no physical size stored anywhere in it, because a pixel has no inherent physical width; it becomes a certain size only when a specific device displays or prints it.",
      },
      {
        type: "p",
        text: "Resizing means changing that grid. Making an image smaller discards pixels, combining neighbouring values to decide each new one. Making it larger invents pixels, calculating plausible values from the surrounding ones. Both are done by an interpolation algorithm, and the direction matters enormously: discarding information is reliable, while inventing it is guesswork.",
      },
      {
        type: "p",
        text: "File size follows pixel count closely, which is why resizing is such an effective way to shrink an image. Halving both the width and the height leaves a quarter of the pixels. A 4000x3000 photo reduced to 1000x750 keeps a sixteenth of the original pixel count, and the file typically shrinks by a comparable order of magnitude — a far bigger win than any compression setting would give you on the full-size original.",
      },
      { type: "h2", text: "DPI is about printing, and nothing else" },
      {
        type: "p",
        text: "DPI — dots per inch, often used interchangeably with PPI, pixels per inch — describes pixel density: how many pixels get packed into each inch of printed output. It's a number stored in the file's metadata as a printing instruction, and changing it does not add, remove or alter a single pixel.",
      },
      { type: "h3", text: "Why DPI is irrelevant on screen" },
      {
        type: "p",
        text: "When a browser, phone or image viewer displays an image, it maps the image's pixels to the display's pixels and ignores the DPI tag entirely. A 1000x1000 image tagged 72 DPI and the identical image tagged 300 DPI look exactly the same on screen and have the same file size, because they contain the same pixels. The old rule that web images should be 72 DPI is a leftover from early Macintosh displays and has been meaningless for decades.",
      },
      { type: "h3", text: "Why DPI matters for print" },
      {
        type: "p",
        text: "Print is a different world, because ink lands on paper at a fixed physical size and your eye is much closer to it. Here DPI is the conversion factor between pixels and inches: printed size equals pixel dimension divided by DPI. A 3000x2400 image printed at 300 DPI covers 10 by 8 inches. The same file printed at 150 DPI covers 20 by 16 inches — twice the size, half the density, visibly softer up close.",
      },
      {
        type: "p",
        text: "This gives you a genuinely useful piece of arithmetic. To find the pixels you need for a print, multiply the intended physical size by the target DPI. A 6x4 inch photo print at 300 DPI needs 1800x1200 pixels. An A4 page at 300 DPI needs about 2480x3508. If your image has fewer pixels than that, no DPI setting will fix it — you need more pixels, which means a higher-resolution original.",
      },
      {
        type: "callout",
        variant: "note",
        text: "If a printer asks for a 300 DPI image, what they need is enough pixels for the physical size they're printing. Changing the DPI field in metadata without changing the pixel dimensions satisfies the label and not the requirement — the print will look exactly as soft as it would have before.",
      },
      { type: "h2", text: "Aspect ratio and why locking it matters" },
      {
        type: "p",
        text: "Aspect ratio is the proportion between width and height, usually written as two numbers: 1600x900 is 16:9, 1080x1080 is 1:1, 1200x1600 is 3:4. It's what determines the shape of the image, independent of its size.",
      },
      {
        type: "p",
        text: "When you resize with the aspect ratio locked, both dimensions scale by the same factor and everything in the image keeps its proportions. Unlock it and set dimensions that don't match the original ratio, and the image is stretched or squashed: faces widen, circles become ovals, and logos take on that unmistakable distorted look that readers notice even when they can't say why.",
      },
      {
        type: "p",
        text: "The important insight is that resizing can't change an image's shape without distorting it. If you need a 16:9 banner from a 4:3 photo, resizing is the wrong operation — you want to crop to 16:9 first, discarding the parts of the frame that don't fit, and then resize the correctly-shaped result to the exact pixel dimensions you need. Crop changes shape; resize changes size. Using each for its own job avoids nearly every distortion problem.",
      },
      { type: "h2", text: "Why upscaling disappoints" },
      {
        type: "p",
        text: "You cannot add detail that was never captured. When an image is enlarged, the algorithm has to produce new pixels from existing ones, and it does this by interpolating — averaging neighbours, smoothing between known values. It's a plausible guess, not new information.",
      },
      {
        type: "p",
        text: "The visible result is softness. Edges that were crisp become gradual, fine texture flattens into smooth mush, and small text turns into illegible smudges. Any compression artifacts or noise in the original get enlarged too, so flaws become more obvious rather than less. Modern AI upscalers do better by hallucinating plausible detail based on what they've learned images look like, which often looks impressive — but it's invented detail, which makes it unsuitable for anything where accuracy matters, like documents or evidence.",
      },
      {
        type: "ul",
        items: [
          "Up to about 125% of the original — generally invisible, safe for almost anything.",
          "Around 150-200% — soft under scrutiny, acceptable for a background image or something viewed at a distance.",
          "Beyond 200% — obviously soft, with mushy texture and unreadable small text.",
          "Small images blown up several times over — unusable for anything but a deliberate low-fidelity effect.",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        text: "Always resize from the largest original you have, not from a copy you already shrank. Each resize discards information permanently, so going 4000px → 800px → 1600px gives a far worse result than 4000px → 1600px directly. Keep originals and treat every resized version as disposable output.",
      },
      { type: "h2", text: "Choosing dimensions for common uses" },
      {
        type: "p",
        text: "The general rule for screens is to match the size the image will actually be displayed at, then roughly double it if it needs to stay sharp on high-density displays, which most phones and modern laptops have. Beyond that doubling there's no benefit — just a bigger file and a slower page.",
      },
      {
        type: "ul",
        items: [
          "Full-width website hero image: around 1920px wide is ample for most layouts; going to 2560px only helps on very large monitors.",
          "In-article or blog image: 800-1200px wide, matching a typical content column at double density.",
          "Thumbnail or card image: 300-400px wide is plenty.",
          "Profile picture: 400-800px square — most platforms display these far smaller, but a bigger source survives their own re-processing better.",
          "Email attachment: keep the longest edge around 1200-1600px unless the recipient needs to edit or print it, which keeps the file comfortably small.",
          "Photo print at 6x4 inches: 1800x1200 pixels, following the size-times-DPI arithmetic at 300 DPI.",
        ],
      },
      { type: "h2", text: "Frequently asked questions" },
      { type: "h3", text: "Does resizing reduce image quality?" },
      {
        type: "p",
        text: "Downscaling is essentially lossless in appearance — the result has fewer pixels but looks just as sharp at its new size, because the detail was reduced along with the dimensions. Upscaling always costs apparent quality, since the added pixels are interpolated rather than real. The information itself is lost either way, though, which is why you keep the original.",
      },
      { type: "h3", text: "Should I resize or compress to get a smaller file?" },
      {
        type: "p",
        text: "Resize first, then compress. Resizing removes pixels the viewer was never going to see and costs nothing visually if the image was oversized; compression trades away actual visual quality. An image that will display at 800px wide should be resized to roughly 1600px and then compressed, rather than left at 4000px and compressed hard.",
      },
      {
        type: "p",
        text: "The whole subject compresses to three sentences. Pixels are the only measurement that exists in the file; DPI is a printing instruction that screens ignore entirely; and aspect ratio must be preserved when resizing, with cropping as the tool for changing an image's shape. Size for the job at hand, resize from the original rather than from a copy, and never expect an enlargement to reveal detail the camera never recorded.",
      },
    ],
  },
  {
    slug: "jpg-vs-png-vs-webp-which-format-to-use",
    title: "JPG vs PNG vs WebP: Which Image Format Should You Use?",
    excerpt:
      "How the three main web image formats actually differ, which one suits photos, logos and screenshots, and a straightforward decision guide for picking the right one every time.",
    publishedAt: new Date("2026-09-12"),
    readingTime: "8 min read",
    status: "published",
    category: "image-tools",
    tags: ["jpg", "png", "webp", "image formats", "compression"],
    relatedTool: { name: "Image Converter", href: "/image-tools/image-converter", cta: "Convert an Image Free" },
    content: [
      {
        type: "p",
        text: "Most image format advice collapses into slogans — JPG for photos, PNG for logos, WebP for everything — that are broadly right and completely unhelpful the moment you hit an edge case. Why does a screenshot look fine as PNG and terrible as JPG? Why did converting a graphic to JPG make it bigger? Why does a logo lose its transparent background?",
      },
      { type: "h2", text: "Lossy and lossless, the underlying split" },
      {
        type: "p",
        text: "Lossless compression stores the image so every original pixel can be reconstructed exactly. It works by finding genuine redundancy — a run of identical pixels described once instead of repeatedly — so it excels on flat colour and struggles on complex content. PNG is lossless.",
      },
      {
        type: "p",
        text: "Lossy compression permanently discards information the human eye is unlikely to miss, typically fine variations in areas where the eye is insensitive. The reconstructed image is an approximation. That's an excellent bargain for photographs, where nobody can identify the exact original shade of a particular leaf, and a poor one for a screenshot, where a slightly-wrong pixel next to a letter is immediately visible. JPG is lossy. WebP can be either.",
      },
      {
        type: "p",
        text: "This also explains why lossy compression is one-directional: once detail is discarded it cannot be recovered, and each further round discards more — an effect known as generation loss.",
      },
      { type: "h2", text: "JPG: the photographic workhorse" },
      {
        type: "p",
        text: "JPG has been the default photographic format for three decades, and its compression is tuned specifically for photographic content — smooth gradients, gradual tonal shifts, natural texture. On that kind of image it's remarkably effective, routinely producing files a tenth the size of a lossless equivalent with no difference most people can see.",
      },
      {
        type: "p",
        text: "It gives you a quality dial, typically 0-100, which trades size against fidelity. Somewhere around 75-85 is the practical sweet spot for photos; below about 60, compression artifacts start appearing as blotchy patches in skies and gradients, and as visible blocking in flat areas.",
      },
      {
        type: "p",
        text: "Its two real weaknesses are sharp edges and transparency. JPG works on blocks of pixels, and a hard black-to-white transition — exactly what text and line art are made of — produces faint ringing artifacts around the edge, visible as a soft halo. And JPG has no alpha channel at all, so transparency is impossible: a transparent area has to be filled with a solid colour, usually white.",
      },
      {
        type: "ul",
        items: [
          "Best for: photographs, camera output, photo-like scanned pages, any image with smooth tonal variation.",
          "Avoid for: logos, icons, screenshots, diagrams, text-heavy images, anything needing transparency.",
          "Typical saving: very large on photos; sometimes negative on flat graphics, where a JPG can be bigger than the PNG it came from.",
          "Support: universal — every browser, device, printer and application made in the last thirty years.",
        ],
      },
      { type: "h2", text: "PNG: lossless and transparent" },
      {
        type: "p",
        text: "PNG was designed for exactly the content JPG handles badly. Being lossless, it reproduces every pixel precisely, so text stays crisp, lines stay clean and no artifacts are introduced no matter how many times you save it. Its compression works well on large areas of uniform colour, which describes most interface screenshots, logos, charts and diagrams.",
      },
      {
        type: "p",
        text: "It also supports a full alpha channel — 256 levels of transparency per pixel — which means genuinely soft, anti-aliased edges over any background. That's why a logo saved as PNG sits cleanly on a coloured page while the JPG version arrives in a white box.",
      },
      {
        type: "p",
        text: "The cost is size on photographic content. A photograph has almost no exact redundancy to exploit — adjacent pixels are similar but rarely identical — so lossless compression achieves very little. The same photo can easily be five to ten times larger as a PNG than as a good-quality JPG, with no visible benefit whatsoever. Screenshots that are mostly photograph rather than interface fall into the same trap.",
      },
      {
        type: "callout",
        variant: "tip",
        text: "A PNG screenshot that's unexpectedly huge usually contains a photo or a complex gradient. Check what's actually in the frame: if the content is photographic rather than flat interface elements, JPG or WebP will be dramatically smaller with no visible difference.",
      },
      { type: "h2", text: "WebP: both modes in one format" },
      {
        type: "p",
        text: "WebP is the modern option, and its main advantage is that it doesn't force the lossy/lossless choice at the format level — it supports both modes. You pick lossy WebP for photographs and lossless WebP for graphics, and either way you get transparency support, which JPG lacks, and better compression than the older format you'd otherwise have used.",
      },
      { type: "h3", text: "How much smaller, in practice" },
      {
        type: "p",
        text: "Lossy WebP typically produces files around 25-35% smaller than a JPG of comparable visual quality. Lossless WebP is usually around 20-30% smaller than an equivalent PNG. The exact figures vary with content — detailed, noisy images gain less than smooth ones — but the direction is consistent, and on an image-heavy page the cumulative saving is substantial for load time and bandwidth.",
      },
      {
        type: "p",
        text: "Crucially, WebP supports transparency in both modes. Lossy-with-transparency is something JPG simply cannot do, and it's genuinely useful: a photographic image with a soft transparent edge can be compressed lossily instead of being forced into a large PNG.",
      },
      { type: "h3", text: "The compatibility question" },
      {
        type: "p",
        text: "In browsers, WebP is a solved problem — Chrome, Firefox, Safari and Edge have all supported it for years, so any current visitor can display it. Outside the browser, support is less uniform. Some older desktop applications, certain email clients, various print workflows and a number of upload forms still expect JPG or PNG and will either reject a WebP or fail to preview it.",
      },
      {
        type: "p",
        text: "The practical approach is to use WebP wherever you control the display — your own website, your own app — and keep a JPG or PNG copy for anything being handed to someone else's system. Converting back is easy, so this costs little.",
      },
      { type: "h2", text: "A decision guide" },
      {
        type: "p",
        text: "Working through these in order gets you to the right format for almost any image:",
      },
      {
        type: "ul",
        items: [
          "Does it need transparency? If yes, JPG is out — use PNG, or WebP if you control the display.",
          "Is it a photograph? Use JPG for maximum compatibility, or WebP for a smaller file at the same quality.",
          "Is it a logo, icon, diagram, chart or screenshot of an interface? Use PNG for guaranteed crisp edges, or lossless WebP for the same result in a smaller file.",
          "Does it contain readable text? Avoid JPG — lossy compression puts visible halos around lettering, and small text suffers most.",
          "Is it going on your own website and file size matters? WebP, with a JPG or PNG fallback if you support older clients.",
          "Is it being emailed, printed, or uploaded to a system you don't control? JPG for photos, PNG for graphics — compatibility beats a marginal size saving.",
          "Is it a master copy you'll edit again later? Keep a lossless version — PNG or your editor's native format — and export lossy copies for distribution.",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        text: "Never edit and re-save a lossy image repeatedly. Every save applies compression again to an already-compressed image, and the degradation accumulates. Keep a lossless master, edit that, and export a fresh lossy copy each time you need one.",
      },
      { type: "h2", text: "Frequently asked questions" },
      { type: "h3", text: "Does converting PNG to JPG lose quality?" },
      {
        type: "p",
        text: "Yes, though whether you notice depends entirely on the content. For a photograph at a high quality setting the loss is imperceptible and the size saving is large. For a screenshot, a logo or anything with text, the loss is visible as soft halos around sharp edges, and the size saving is often small — so the trade rarely makes sense.",
      },
      { type: "h3", text: "Can I convert JPG to PNG to recover quality?" },
      {
        type: "p",
        text: "No. The detail JPG discarded is gone permanently; a PNG made from it simply stores the already-degraded result losslessly, usually in a much larger file. Converting to PNG is only useful when you're about to edit the image and want to avoid adding further generation loss.",
      },
      { type: "h3", text: "Which format is best for a website?" },
      {
        type: "p",
        text: "WebP for most images, since it's smaller than both alternatives at comparable quality and is supported by every current browser. Use SVG for logos and icons where vector artwork exists. Keep JPG or PNG copies for anything users might download, or for systems outside your control that may not accept WebP.",
      },
      {
        type: "p",
        text: "Reduced to a sentence: photographs want lossy compression, graphics and text want lossless, transparency rules JPG out entirely, and WebP does either job in a smaller file wherever you can rely on the display supporting it. Match the format to what's actually in the image rather than to habit, and keep a lossless master of anything you'll edit again.",
      },
    ],
  },
  {
    slug: "how-to-crop-images-for-social-media",
    title: "How to Crop Images for Social Media (Sizes and Composition)",
    excerpt:
      "Why cropping to the right aspect ratio before you upload beats letting the platform do it, a reference list of current sizes, and composition rules that keep your subject safe.",
    publishedAt: new Date("2026-09-18"),
    readingTime: "7 min read",
    status: "published",
    category: "image-tools",
    tags: ["image cropping", "social media", "aspect ratio", "instagram"],
    relatedTool: { name: "Image Cropper", href: "/image-tools/image-cropper", cta: "Crop an Image Free" },
    content: [
      {
        type: "p",
        text: "Every social platform crops your image to fit its layout. The only question is whether you decide where the crop falls or the platform does — and the platform's decision is made by an algorithm that has no idea which part of the picture actually mattered to you.",
      },
      {
        type: "p",
        text: "Cropping before you upload takes about a minute and removes that uncertainty entirely.",
      },
      { type: "h2", text: "Why exact dimensions matter" },
      {
        type: "p",
        text: "When you upload an image whose proportions don't match the slot it's going into, the platform resolves the mismatch for you. It might centre-crop, cutting equally from opposite edges. It might crop from the top. It might apply subject detection and guess at what to keep. It might letterbox the image with bars, or scale it in a way that softens the detail.",
      },
      {
        type: "p",
        text: "None of these are catastrophic, and all of them are decisions you'd rather make yourself. The recurring casualties are predictable: heads cropped off at the top of a portrait shot, text near an edge cut mid-word, a product pushed out of frame in a wide photo squeezed into a square, and a carefully composed image recentred on empty background.",
      },
      { type: "h2", text: "Aspect ratio is the part that matters" },
      {
        type: "p",
        text: "Aspect ratio — the proportion between width and height — is what determines whether a crop happens at all. A 1:1 square image fits a square slot regardless of whether it's 1080 or 2000 pixels wide; a 16:9 image never will, whatever its resolution.",
      },
      {
        type: "p",
        text: "So the workflow is always two steps in the same order: crop to the correct aspect ratio first, then resize to the recommended pixel dimensions. Doing it the other way round, or trying to change the shape by resizing, stretches the image and distorts everything in it. Crop changes shape. Resize changes size. They aren't interchangeable.",
      },
      {
        type: "p",
        text: "Pixel dimensions still matter, but as a minimum rather than an exact target. Upload something notably smaller than recommended and the platform scales it up, which looks soft. Upload something much larger and it gets scaled down, which is harmless but wasteful. Matching the recommendation gives the most predictable result.",
      },
      { type: "h2", text: "Current sizes worth knowing" },
      {
        type: "p",
        text: "These are the dimensions in general use at the time of writing. Treat them as a working reference rather than fixed facts — platforms revise their layouts periodically, and it's always worth confirming against the platform's own current help documentation for anything important:",
      },
      {
        type: "ul",
        items: [
          "Instagram square post — around 1080x1080 pixels (1:1), the safest default when you're unsure.",
          "Instagram portrait post — around 1080x1350 (4:5), the tallest format the feed allows and the one that occupies most screen space.",
          "Instagram Story and Reels — around 1080x1920 (9:16), full-screen vertical.",
          "Twitter/X in-feed post image — around 1600x900 (16:9), which displays without being cropped in the timeline.",
          "LinkedIn feed post image — around 1200x627 (roughly 1.91:1), the same wide ratio used for link previews.",
          "Facebook page cover photo — around 820x312 on desktop, though it is cropped differently on mobile, so keep the essentials centred.",
          "YouTube thumbnail — around 1280x720 (16:9).",
          "Profile pictures — supply a square image, typically 400x400 or larger, and expect it to be displayed as a circle.",
        ],
      },
      {
        type: "callout",
        variant: "note",
        text: "Platform dimensions change. These figures reflect current general guidance, not permanent specifications — layouts get revised, new formats appear and old ones are retired. Check the platform's own help pages before a campaign or anything else where a wrong crop would be costly.",
      },
      { type: "h2", text: "Composing the crop" },
      {
        type: "p",
        text: "Once the ratio is decided, where you place the crop within the frame is a judgement call. A few principles hold up reliably.",
      },
      { type: "h3", text: "Leave breathing room at the edges" },
      {
        type: "p",
        text: "Keep the important content — faces, products, text, logos — away from the edges of the crop. A subject tight against the boundary looks cramped even when nothing is cut, and it leaves no margin if the platform trims a few pixels more than expected or displays the image differently in a different context.",
      },
      {
        type: "p",
        text: "This matters most for anything that gets shown at more than one ratio. A Facebook cover is cropped one way on desktop and another on mobile; a feed image may appear square in a grid and wide in the timeline. Composing so the essentials sit within the central area means every version works.",
      },
      { type: "h3", text: "Work around the interface" },
      {
        type: "p",
        text: "Your image doesn't appear on a blank screen. The platform layers its own interface on top of it, and on full-screen formats that coverage is considerable.",
      },
      {
        type: "ul",
        items: [
          "Stories and Reels — the top strip carries the profile picture, username and progress bars; the bottom carries reply fields, action buttons and captions. Keep content out of roughly the top and bottom 250 pixels of a 1920-pixel-tall frame.",
          "Reels and short-form video — a vertical column of action buttons sits along the right edge, so avoid placing key subjects there.",
          "Profile pictures — the image is masked to a circle, so anything in the corners of your square is invisible. Centre the face and leave generous margin.",
          "Cover photos — a profile picture often overlaps the lower-left corner on desktop, and mobile crops the sides. Keep text and faces central.",
          "Link preview images — platforms may overlay a title bar across the bottom, which can obscure text placed there.",
        ],
      },
      { type: "h3", text: "Crop to strengthen the image" },
      {
        type: "p",
        text: "Cropping isn't only damage limitation. Tightening the frame removes distracting background and gives the subject more presence, which matters on a phone screen where your image is a few centimetres tall. Off-centre placement, roughly a third of the way across the frame, usually reads as more dynamic than dead-centre. And straightening a horizon or a vertical line during the crop fixes the kind of slight tilt that makes an otherwise good photo look careless.",
      },
      {
        type: "callout",
        variant: "tip",
        text: "Always crop from the highest-resolution original you have, not from a copy already downsized for another platform. Cropping discards pixels, so a 1080x1080 image cropped to 9:16 no longer has enough width — start from the full-size original and produce each platform's version from it separately.",
      },
      { type: "h2", text: "A practical workflow" },
      {
        type: "p",
        text: "For an image going out across several platforms, this order avoids most rework:",
      },
      {
        type: "ul",
        items: [
          "Start from the original full-resolution file, and keep it untouched throughout.",
          "List the formats you need — square post, vertical Story, wide link preview — before cropping anything.",
          "Shoot or choose an image with room to spare around the subject, so the same source can survive several different crops.",
          "Crop to each target aspect ratio separately, checking the subject stays well inside the frame each time.",
          "Resize each crop to the recommended pixel dimensions for its platform.",
          "Check each version against the interface elements that will sit on top of it — particularly for Stories and profile pictures.",
          "Compress before uploading if file size matters, keeping quality high since the platform will compress it again.",
          "Post one, look at it on a phone, and adjust if anything reads badly at actual size.",
        ],
      },
      {
        type: "p",
        text: "That last step catches more problems than any amount of desktop checking. An image that looks balanced on a large monitor can be unreadable at phone size, and it's the phone that nearly all of your audience will use.",
      },
      { type: "h2", text: "Frequently asked questions" },
      { type: "h3", text: "Can I use one image for every platform?" },
      {
        type: "p",
        text: "Only if you accept each platform cropping it its own way. A square 1:1 image is the most forgiving compromise because it sits between the wide and tall extremes, but it will still be cropped in a 16:9 slot and will not fill a vertical Story. If the post matters, crop a separate version per format — from the same original, which takes only a couple of minutes.",
      },
      { type: "h3", text: "Why does my image look worse after uploading?" },
      {
        type: "p",
        text: "Every platform re-compresses uploads to save bandwidth, and that pass is outside your control. You can improve the input: upload at the recommended dimensions rather than much larger, use a high quality setting so the platform's compression starts from a clean source, and avoid uploading an image that has already been heavily compressed, since the losses compound.",
      },
      {
        type: "p",
        text: "The rule underneath all of this is simple: decide the crop yourself rather than leaving it to an algorithm. Match the aspect ratio first and the pixel dimensions second, keep the important content clear of the edges and of the platform's own interface, and always work from the full-resolution original so each format gets a proper crop rather than a crop of a crop.",
      },
    ],
  },

  {
    slug: "how-to-write-a-resume-that-passes-ats-screening",
    title: "How to Write a Resume That Passes ATS Screening",
    excerpt:
      "What an applicant tracking system actually does with your resume, how to format one so it parses cleanly, and how to use job description keywords without stuffing them.",
    publishedAt: new Date("2026-09-10"),
    readingTime: "8 min read",
    status: "published",
    category: "ai-tools",
    tags: ["resume", "job search", "ats", "career"],
    relatedTool: {
      name: "AI Resume Builder",
      href: "/ai-tools/ai-resume-builder",
      cta: "Build Your Resume Free",
    },
    content: [
      {
        type: "p",
        text: "Most mid-size and large employers run applications through an applicant tracking system before a recruiter opens a single file. That has produced a lot of anxious folklore — that ATS software \"rejects\" resumes automatically, that certain fonts get you binned, that you need invisible white text crammed with keywords. Almost none of it is accurate, and acting on it usually makes a resume worse. What is true is narrower: an ATS reads your resume as text, and if it reads that text badly, your application is harder to find and ranks lower than it should.",
      },
      {
        type: "p",
        text: "What follows is what an ATS actually does, how to format a resume so it parses cleanly, and how to match a job description honestly — none of which requires a special template or a paid service.",
      },
      { type: "h2", text: "What an ATS actually does" },
      {
        type: "p",
        text: "An applicant tracking system is, at its core, a database for job applications. When you upload a resume, it parses the file into structured text and works out which chunk is your name, which is your work history, which is your education. That text is then stored and made searchable, so a recruiter can filter the pool by keywords, job titles, skills or years of experience — and many systems also rank candidates by how closely their parsed text matches the job description.",
      },
      {
        type: "p",
        text: "The important nuance is that the system is not usually making a hire/no-hire decision on its own. It is deciding how visible you are. A resume that parses badly doesn't get flagged as bad — it gets stored as a jumble, which means it surfaces for fewer searches and ranks lower in the list a human eventually scrolls through. Nobody tells you this happened. You just don't hear back.",
      },
      {
        type: "callout",
        variant: "note",
        text: "An ATS doesn't judge your design taste. It judges whether the text it extracted is coherent and relevant. Those are two different problems, and only the first one is about formatting.",
      },
      { type: "h2", text: "Formatting that parses cleanly" },
      {
        type: "p",
        text: "Parsing problems come from layout elements that look fine to a human eye but have no reliable reading order in the underlying file. Here's what tends to cause trouble, and what to do instead.",
      },
      { type: "h3", text: "Avoid tables, columns and text boxes" },
      {
        type: "p",
        text: "Multi-column layouts and tables are the single most common cause of scrambled parsing. A two-column resume with skills down the left and experience down the right may be extracted left-to-right across the page, interleaving your skills list into the middle of your job descriptions. Text boxes and shapes are worse — their contents may come out in the wrong order or, occasionally, not at all. A single-column layout flowing straight down the page removes the ambiguity entirely.",
      },
      { type: "h3", text: "Keep content out of headers and footers" },
      {
        type: "p",
        text: "Contact details placed in a document header or footer are a classic silent failure. Some parsers skip header and footer regions, so a resume with your phone number and email tucked into the header can end up in the database with no way to contact you. Put your name and contact details in the normal body of the document, at the top.",
      },
      { type: "h3", text: "Use standard section headings" },
      {
        type: "p",
        text: "Parsers look for recognisable section labels to decide where each block of content belongs. Plain headings like \"Experience\", \"Work Experience\", \"Education\", \"Skills\" and \"Certifications\" are matched reliably. Creative alternatives — \"Where I've Made an Impact\", \"My Journey\", \"Arsenal\" — are not, and content under them may be filed as uncategorised text. Save the personality for the bullet points themselves.",
      },
      {
        type: "ul",
        items: [
          "One column, top to bottom. No side panels, no tables, no text boxes.",
          "Contact details in the document body, not in a header or footer.",
          "Standard section headings: Experience, Education, Skills, Certifications, Projects.",
          "A common, readable font at 10-12pt, and simple round bullets — decorative glyphs and icons can be dropped or garbled in extraction.",
          "Dates in a consistent, unambiguous format — \"Mar 2022 – Aug 2024\" throughout, not a mix of styles.",
          "No photo, skill rating bars or logos. They carry no extractable text and eat space you could use for achievements.",
        ],
      },
      { type: "h3", text: "Which file format to send" },
      {
        type: "p",
        text: "Follow the instruction on the application form — if it asks for a specific format, that's a signal about what their system handles best. Given a choice, a text-based PDF exported straight from your word processor is a safe default: it preserves layout and modern parsers handle it well. Send .docx when the employer or recruiter asks for it, which agencies often do because they edit files before forwarding. The format to genuinely avoid is a PDF built from a scan or an image, since there's no text to extract at all unless the system runs OCR.",
      },
      {
        type: "callout",
        variant: "warning",
        text: "Be careful with heavily designed templates from generic resume sites and graphic marketplaces. Many are built with text boxes, tables and sidebars precisely because that's how you get a striking layout — and that's exactly what parses badly. A template being sold as \"ATS-friendly\" is a marketing claim, not a technical guarantee. If you want to check one, export it to plain text and read the result: if it's out of order or missing sections, a parser will see the same mess.",
      },
      { type: "h2", text: "Matching the job description without keyword stuffing" },
      {
        type: "p",
        text: "Ranking and search both work on the words in your resume, so a resume that describes the same work in different vocabulary than the posting will underperform. If the job says \"stakeholder management\" and your resume says \"client handling\", a search for the former won't surface you. The fix is not to invent experience — it's to describe the experience you genuinely have using the terminology the employer is actually using.",
      },
      {
        type: "p",
        text: "A practical method: read the posting and pull out the repeated nouns — tools, technologies, methodologies, certifications, the exact job title. Check each against your real history, use their word where it applies to you, and leave it out where it doesn't. Spell out acronyms at least once with the expansion alongside, as in \"Search Engine Optimisation (SEO)\", so you match whichever form the recruiter searches for.",
      },
      {
        type: "p",
        text: "Keyword stuffing — a wall of terms at the bottom, or white text hidden on a white background — is a bad idea on every axis. Hidden text shows up in the parsed output recruiters read, so it hides nothing from the people who matter; it just looks like an attempt to game the process.",
      },
      { type: "h2", text: "Quantify what you did" },
      {
        type: "p",
        text: "Once your resume parses cleanly and surfaces in the right searches, a human still has to want to read it. This is where most resumes fall down, and it has nothing to do with software: they list duties instead of results. \"Responsible for managing social media accounts\" is a job description. \"Grew Instagram following from 4k to 19k in 11 months, lifting referral traffic 30%\" describes a person who did something.",
      },
      {
        type: "p",
        text: "Numbers don't have to be dramatic to be useful. Team size, budget handled, number of clients, percentage reduction in processing time — any of these give a reader a sense of scale. Where you genuinely don't have a metric, describe the outcome instead of the activity. Just don't invent figures: anything on the page is fair game in an interview, and a number you can't explain is far more damaging than no number at all.",
      },
      { type: "h2", text: "Where AI drafting fits" },
      {
        type: "p",
        text: "AI tools are good at the part most people find hardest: turning a rough list of responsibilities into tight, achievement-oriented phrasing, in the plain structure an ATS parses well. What a tool can't do is know which of your accomplishments matters for this role, or verify that a figure it wrote is real. Treat the output as a draft, check every fact against your own records, and make sure the final version sounds like something you'd defend out loud.",
      },
      { type: "h2", text: "Frequently asked questions" },
      { type: "h3", text: "Do ATS systems automatically reject resumes?" },
      {
        type: "p",
        text: "Rarely in the way people imagine. Some systems apply hard knockout filters on explicit questions in the application form — work authorisation, a required licence, a minimum years-of-experience answer — but those are questions you answered, not judgements about your resume's design. The more common outcome is ranking: a poorly parsed or poorly matched resume sits far enough down the list that a human never reaches it.",
      },
      { type: "h3", text: "Should I use a different resume for every application?" },
      {
        type: "p",
        text: "You don't need to rewrite it from scratch, but you should tailor it. Keep one master version with everything, then for each application reorder the bullets so the most relevant experience is at the top, adjust the summary to name the role, and align your terminology with the posting. Fifteen minutes of tailoring generally beats an hour of redesigning.",
      },
      { type: "h3", text: "How long should my resume be?" },
      {
        type: "p",
        text: "One page is a reasonable target for early-career applicants, two pages once you have several relevant roles to describe. Length conventions vary by country and by field — academic CVs and some technical roles run longer as standard — so check what's normal where you're applying. An ATS doesn't care about page count, but a recruiter skimming does.",
      },
      {
        type: "p",
        text: "The short version: write a plain, single-column resume with standard headings, use the employer's own vocabulary where it honestly describes your work, and put a number next to your achievements wherever you can. That combination parses cleanly, ranks well, and — more importantly — reads well when a person finally opens it.",
      },
    ],
  },
  {
    slug: "how-to-write-a-cover-letter-that-gets-read",
    title: "How to Write a Cover Letter That Gets Read",
    excerpt:
      "What a cover letter is actually for, how to structure one in about 350 words, and the mistakes that get letters skimmed and discarded.",
    publishedAt: new Date("2026-09-16"),
    readingTime: "7 min read",
    status: "published",
    category: "ai-tools",
    tags: ["cover letter", "job search", "career", "hiring"],
    relatedTool: {
      name: "Cover Letter Generator",
      href: "/ai-tools/cover-letter-generator",
      cta: "Generate a Cover Letter Free",
    },
    content: [
      {
        type: "p",
        text: "Cover letters have a reputation problem. Plenty of applicants treat them as a formality — a paragraph of throat-clearing, a restatement of the resume, a closing line about looking forward to hearing back. Written that way, they genuinely are a waste of everyone's time, which is why so many people conclude that cover letters don't matter.",
      },
      {
        type: "p",
        text: "But a letter written properly does something a resume structurally cannot. A resume is a record: roles, dates, skills, outcomes. It answers \"what has this person done?\" It has no room for judgement, motivation or context. A cover letter answers the questions a hiring manager is actually holding in their head while they read your resume — why this role, why this company, and why the gap, the career change or the unusual background makes sense. That's the job. Everything below follows from it.",
      },
      { type: "h2", text: "What a cover letter is for" },
      {
        type: "p",
        text: "Think of the letter as the argument and the resume as the evidence. The resume proves you have done certain things; the letter explains why those specific things make you a sensible fit for this specific opening. If you strip out everything that simply repeats the resume, what's left should be the three things a bullet point can't carry:",
      },
      {
        type: "ul",
        items: [
          "Motivation — why you want this role at this organisation, specifically enough that it couldn't be said about a competitor.",
          "Connection — which two or three pieces of your experience map onto what they said they need, and how.",
          "Context — anything in your history that benefits from a sentence of explanation: a career change, a relocation, a gap, a non-obvious transferable background.",
        ],
      },
      {
        type: "p",
        text: "If a paragraph of your draft serves none of those three purposes, it's probably filler. Cut it and the letter gets stronger.",
      },
      { type: "h2", text: "The structure that works" },
      {
        type: "p",
        text: "Almost every effective cover letter follows the same three-part shape. It's not a creative constraint so much as a reflection of how people read them: fast, in order, looking for a reason to keep going.",
      },
      { type: "h3", text: "The opening: be specific immediately" },
      {
        type: "p",
        text: "Name the role and the organisation in the first sentence, and give one concrete reason you're applying. \"I'm applying for the Customer Success Manager role at Northgate because I've spent three years supporting onboarding for exactly the kind of mid-market SaaS accounts your careers page describes\" does more work than three paragraphs of enthusiasm. Address a named person if the posting gives you one; \"Dear Hiring Team\" is a fine fallback. \"To Whom It May Concern\" reads as a form letter before the reader has finished the first line.",
      },
      { type: "h3", text: "The middle: connect experience to their requirements" },
      {
        type: "p",
        text: "One or two paragraphs, covering two or three experiences — not a walk through your whole history. Pick the requirements the posting emphasises most, and for each one show the corresponding thing you've actually done, with enough detail to be credible. This is the section where you're allowed to expand on a resume bullet: the resume says you cut onboarding time by 40%, the letter has room to say how, and why that approach would transfer to their situation.",
      },
      { type: "h3", text: "The closing: say what happens next" },
      {
        type: "p",
        text: "Two or three sentences. Restate your interest briefly, note your availability or notice period if it's relevant, and close with a clear, low-pressure call to action — that you'd welcome the chance to discuss how you'd approach the role. Skip the over-eager sign-offs and the presumptuous \"I'll follow up on Tuesday\" unless you actually intend to.",
      },
      { type: "h2", text: "How long it should be" },
      {
        type: "p",
        text: "Roughly 250 to 400 words. One page, three or four short paragraphs, comfortable white space. That isn't an arbitrary rule — it reflects how the letter is read. A recruiter working through a stack of applications gives each one a fast first pass, and a dense full page invites skimming, which means the good paragraph in the middle gets skipped along with everything else.",
      },
      {
        type: "callout",
        variant: "tip",
        text: "Test your draft by deleting the company name and role title. If the letter still makes complete sense and could be sent to any employer in the industry, it's too generic to be worth reading. Every letter should have at least two or three sentences that would be nonsense in any other application.",
      },
      { type: "h2", text: "The mistakes that get letters discarded" },
      {
        type: "p",
        text: "Most weak cover letters fail in one of a handful of predictable ways. They're easy to fix once you can spot them in your own draft.",
      },
      {
        type: "ul",
        items: [
          "The interchangeable letter — praise generic enough to apply to any company (\"your reputation for innovation\"), with no evidence you looked at what they actually do.",
          "The resume in prose — a paragraph-form retelling of the job history the reader already has in front of them, adding nothing.",
          "The letter about you — focused on what the role would do for your growth, learning and career, rather than what you'd bring to their problem.",
          "The wrong company name — the single most avoidable and most fatal error, and a direct symptom of reusing a previous letter without reading it.",
          "The essay — 700 words on a page the reader intends to spend thirty seconds with.",
          "The apology — hedging about what you lack. Address a genuine gap in one confident sentence, or not at all.",
        ],
      },
      { type: "h2", text: "Doing the research that makes it specific" },
      {
        type: "p",
        text: "Specificity is what separates a letter that gets read from one that doesn't, and it costs about ten minutes. Read the job posting twice and note which requirements appear first and which are repeated — that ordering usually reflects real priority. Look at the company's product, recent announcements or engineering blog, and find one concrete thing you can reference accurately. Check who the role reports to if that's public, and what the team is responsible for.",
      },
      {
        type: "p",
        text: "One honest, accurate observation about their work beats a paragraph of generic flattery. It also protects you: vague praise is indistinguishable from a template, while a specific reference proves you spent time on the application.",
      },
      { type: "h2", text: "Where AI drafting helps — and where it doesn't" },
      {
        type: "p",
        text: "The blank page is the real obstacle for most people, and that's exactly the problem AI is good at. A tool like our Cover Letter Generator will take the role, the company and your background and produce a properly structured draft in seconds — opening, middle, close, correct register, no staring at a cursor.",
      },
      {
        type: "p",
        text: "What it can't do is the specificity. It doesn't know what their product launch last quarter was, which of your projects genuinely maps to their stack, or why you actually want this job rather than the four others you're applying to. A draft you send unedited will read like a competent letter about nobody in particular — which is precisely the failure mode described above. Use the draft for structure and momentum, then spend your ten minutes replacing the generic sentences with real ones. Read the final version out loud before you send it; anything that doesn't sound like you should be rewritten until it does.",
      },
      { type: "h2", text: "Frequently asked questions" },
      { type: "h3", text: "Should I write one if the application says it's optional?" },
      {
        type: "p",
        text: "Usually yes. When a letter is optional, a good share of applicants skip it, so a short specific one is a cheap way to stand out — and it's your only chance to explain a career change, a gap or a relocation before anyone decides whether to call you. The exception is when the application genuinely has nowhere to put one; in that case, move that context into your resume summary.",
      },
      { type: "h3", text: "Do hiring managers actually read cover letters?" },
      {
        type: "p",
        text: "It varies a lot by company, role and how many applicants they're processing. Some read every one, some read them only for shortlisted candidates, some never open them. Because you can't tell which you're dealing with, the sensible approach is a letter short enough that writing it costs you little, and specific enough to help significantly when someone does read it.",
      },
      { type: "h3", text: "Should the letter repeat what's on my resume?" },
      {
        type: "p",
        text: "Reference it, don't repeat it. Pointing at two or three specific accomplishments is fine and necessary — that's how you connect your experience to their needs. What wastes the reader's time is retelling your full history in paragraph form. If a sentence in the letter adds no context, judgement or explanation to what the resume already says, it isn't earning its place.",
      },
      {
        type: "p",
        text: "A good cover letter is short, specific and about them as much as about you. Get the opening concrete, the middle connected to their actual requirements, and the closing brief — and you'll have written something a hiring manager finishes rather than skims.",
      },
    ],
  },
  {
    slug: "how-to-calculate-attendance-percentage",
    title: "How to Calculate Attendance Percentage (And How Many Classes You Can Miss)",
    excerpt:
      "The attendance formula, plus the calculation students actually want — exactly how many more classes you can skip and still clear your institution's minimum.",
    publishedAt: new Date("2026-09-05"),
    readingTime: "7 min read",
    status: "published",
    category: "student-tools",
    tags: ["attendance", "college", "students", "exams"],
    relatedTool: {
      name: "Attendance Calculator",
      href: "/student-tools/attendance-calculator",
      cta: "Calculate Your Attendance Free",
    },
    content: [
      {
        type: "p",
        text: "Attendance percentage is one of the simplest calculations in academic life, and one of the most commonly worked out too late. The formula itself takes a second. The question students actually care about — how many more classes can I miss before I'm in trouble? — takes one extra step, and it's the step most people skip until a warning notice arrives.",
      },
      {
        type: "p",
        text: "This guide covers both: the basic percentage, the maximum-absences calculation with a full worked example, and why the same number of absences hurts far more in week two than in week ten.",
      },
      { type: "h2", text: "The attendance formula" },
      {
        type: "p",
        text: "Attendance % = (Classes Attended ÷ Total Classes Held) × 100.",
      },
      {
        type: "p",
        text: "If 48 classes have been held and you've attended 39, your attendance is (39 ÷ 48) × 100 = 81.25%. The only thing to be careful about is the denominator: it's classes held so far, not classes scheduled for the whole term. Those are different numbers, and mixing them up is the most common error in a hand calculation — using the full-term figure while you're only halfway through will make your attendance look roughly half of what it actually is.",
      },
      { type: "h2", text: "Why the number matters" },
      {
        type: "p",
        text: "Most colleges and universities set a minimum attendance requirement for exam eligibility. Fall below it and you may be barred from sitting the end-of-term exam, required to repeat the subject, or made to apply for condonation — regardless of how well you're doing academically.",
      },
      {
        type: "p",
        text: "75% is a widely used threshold, but it is genuinely not universal. Different institutions, and sometimes different faculties or programmes within the same institution, use 70%, 80% or their own figure. Some apply the rule per subject, others on an overall aggregate, and many treat labs and practicals under a separate, stricter rule. Find the actual number in your own academic regulations or student handbook before you plan anything around it — the rest of this article uses 75% purely as an example.",
      },
      { type: "h3", text: "Count what your institution counts" },
      {
        type: "p",
        text: "Before calculating anything, check what goes into the denominator. Do tutorials count? Are labs tracked separately with their own minimum? Do cancelled or rescheduled classes get removed from the total? Is attendance recorded per session or per day? Institutions differ, and an otherwise perfect calculation against the wrong class list tells you nothing useful.",
      },
      { type: "h2", text: "The calculation you actually want: how many can I miss?" },
      {
        type: "p",
        text: "This is the practical question, and it needs one piece of information beyond your current attendance: how many classes are expected in total for the term. Your department's timetable or course plan usually gives this. With that, the logic is straightforward.",
      },
      {
        type: "p",
        text: "First, work out the minimum number of classes you must attend across the whole term: Minimum attendance = Required % ÷ 100 × Total expected classes. Round up to a whole class, since you can't attend a fraction of one. Then subtract what you've already banked: Classes you still must attend = Minimum attendance − Classes already attended. Finally, compare that against what's left: Classes you can miss = Classes remaining − Classes you still must attend.",
      },
      { type: "h3", text: "A worked example" },
      {
        type: "p",
        text: "Say your course has 120 classes scheduled for the term, your institution requires 75%, and 60 classes have been held so far, of which you've attended 48.",
      },
      {
        type: "ul",
        items: [
          "Current attendance: (48 ÷ 60) × 100 = 80% — comfortably above the line right now.",
          "Minimum classes needed across the term: 0.75 × 120 = 90 classes.",
          "Classes you still must attend: 90 − 48 = 42.",
          "Classes remaining in the term: 120 − 60 = 60.",
          "Classes you can afford to miss: 60 − 42 = 18.",
        ],
      },
      {
        type: "p",
        text: "So you can skip up to 18 of the remaining 60 classes and still finish the term at exactly 90 out of 120, which is 75%. Miss a 19th and you land at 89 out of 120 = 74.17%, below the line. Note how different that is from the reassuring 80% on your current record — being above the threshold today says nothing about where you'll end up, because the denominator is still growing.",
      },
      {
        type: "p",
        text: "The same arithmetic works in reverse if you're already short. Suppose you've attended only 36 of those 60 classes (60%). You still need 90 − 36 = 54 classes, and only 60 remain — so recovery is possible, but you'd have to attend all but six of the rest of the term. If the number you still need exceeds the number remaining, the maths says you can't recover through attendance alone, and that's the moment to talk to your department rather than hope.",
      },
      {
        type: "callout",
        variant: "warning",
        text: "Absences early in a term are far more expensive than absences later. With 10 classes held and 8 attended you're at 80%; miss the next one and you drop to 8 of 11 = 72.7%, straight through a 75% threshold. With 100 held and 80 attended — the same 80% — missing one takes you to 80 of 101 = 79.2%, barely a scratch. The denominator is small early on, so each absence swings the percentage hard. Skipping the first two weeks because \"nothing important happens yet\" digs a hole that takes months of perfect attendance to climb out of.",
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "ul",
        items: [
          "Using total scheduled classes as the denominator for current attendance instead of classes actually held so far.",
          "Assuming 75% applies to you without checking your own regulations.",
          "Calculating an overall figure when your institution applies the rule per subject — an 82% average can easily hide a single subject sitting at 68%.",
          "Forgetting labs, tutorials and practicals that are tracked separately, often with a stricter requirement.",
          "Assuming a medical absence is automatically excused. Condonation is usually a formal process with documentation and a cap, not an automatic exemption.",
          "Rounding in your favour. If the rule is 75%, then 74.6% is below it — most institutions don't round up.",
        ],
      },
      { type: "h2", text: "Planning ahead instead of reacting" },
      {
        type: "p",
        text: "The useful habit is checking the number monthly rather than at the end of term. Attendance problems are almost entirely recoverable when you spot them in week five and almost entirely unrecoverable when you spot them in week fourteen, purely because of how many classes are left to fix them with.",
      },
      {
        type: "p",
        text: "It's also worth keeping a small personal buffer. Planning to land exactly on 75% leaves no room for illness, a family emergency, a travel disruption or a class you thought you attended but was marked absent. Aiming five percentage points above the requirement costs you a handful of classes and removes the risk entirely. Our Attendance Calculator does the arithmetic above for you and shows both figures — how many you can miss, and how many you'd need to attend to recover — so you can see where you stand in a few seconds.",
      },
      { type: "h2", text: "Frequently asked questions" },
      { type: "h3", text: "Is the minimum attendance requirement always 75%?" },
      {
        type: "p",
        text: "No. 75% is common in many Indian universities and appears in various regulatory guidelines, but requirements vary by institution, country, programme and sometimes by individual subject. Some professional and accredited courses set higher bars. Always check your own academic regulations rather than relying on a figure you heard from a classmate.",
      },
      { type: "h3", text: "Do medical absences count against me?" },
      {
        type: "p",
        text: "That depends entirely on your institution's condonation policy. Many allow documented medical or official-duty absences to be excused up to a capped percentage, typically on formal application with supporting documents. It is a policy question rather than a calculation one, and the safest approach is to submit documentation at the time of the absence rather than trying to have it applied retroactively at the end of term.",
      },
      { type: "h3", text: "What if I'm already below the minimum?" },
      {
        type: "p",
        text: "Work out whether the number of classes you still need is less than the number remaining. If it is, recovery is mathematically possible and you should plan for near-perfect attendance from here. If it isn't, attendance alone can't fix it, and you need to speak to your course coordinator or department office as early as possible — options like condonation applications, make-up sessions or a formal appeal generally have deadlines well before exams.",
      },
      {
        type: "p",
        text: "The formula is trivial; the discipline is in checking it early. Know your institution's actual requirement, count the classes that actually count, and run the maximum-absences calculation once a month. That's enough to make sure attendance is never the reason you can't sit an exam.",
      },
    ],
  },
  {
    slug: "how-to-calculate-marks-percentage",
    title: "How to Calculate Marks Percentage (Single and Multiple Subjects)",
    excerpt:
      "The percentage formula, the right way to combine subjects with different maximum marks, and why averaging individual subject percentages gives you the wrong answer.",
    publishedAt: new Date("2026-09-19"),
    readingTime: "7 min read",
    status: "published",
    category: "student-tools",
    tags: ["marks percentage", "grading", "students", "exams"],
    relatedTool: {
      name: "Marks Percentage Calculator",
      href: "/student-tools/marks-percentage-calculator",
      cta: "Calculate Marks Percentage Free",
    },
    content: [
      {
        type: "p",
        text: "Calculating a percentage from marks is about as simple as arithmetic gets — until you have five subjects marked out of different totals, and two reasonable-looking methods give you two different answers. One of them is right and one of them is wrong, and the wrong one is the one most people reach for first.",
      },
      {
        type: "p",
        text: "This guide covers the basic formula, the correct way to combine subjects with unequal maximum marks, a full worked example showing how far the wrong method drifts, and how percentage relates to CGPA and letter grades.",
      },
      { type: "h2", text: "The basic formula" },
      {
        type: "p",
        text: "Percentage = (Marks Obtained ÷ Maximum Marks) × 100.",
      },
      {
        type: "p",
        text: "If you scored 68 out of 80 in a test, that's (68 ÷ 80) × 100 = 85%. That's the whole thing for a single subject. The percentage simply re-expresses your score on a 0-100 scale so results from different tests can be compared — which is exactly where the complications start.",
      },
      { type: "h2", text: "Multiple subjects: the method that works" },
      {
        type: "p",
        text: "When you have several subjects, the correct approach is to add up all the marks you obtained, add up all the maximum marks, and divide one total by the other:",
      },
      {
        type: "p",
        text: "Overall Percentage = (Sum of all Marks Obtained ÷ Sum of all Maximum Marks) × 100.",
      },
      {
        type: "p",
        text: "What you must not do is calculate each subject's percentage separately and then average those percentages. That method silently treats every subject as equally important regardless of how many marks it carries — so a 25-mark internal assessment gets exactly as much influence on your final number as a 100-mark board paper. If all your subjects happen to be out of the same maximum, the two methods coincide and you'll never notice. The moment the maximums differ, they diverge.",
      },
      {
        type: "callout",
        variant: "warning",
        text: "This is the same trap as the credit-weighting mistake in CGPA. In CGPA you must multiply by credit hours before averaging; in percentage you must sum raw marks before dividing. Both errors come from the same instinct — averaging pre-computed averages — and both quietly overweight your smallest subjects.",
      },
      { type: "h2", text: "A worked example" },
      {
        type: "p",
        text: "Here's a five-subject result where the maximum marks aren't uniform — a completely ordinary situation once practicals or internals are in the mix.",
      },
      {
        type: "ul",
        items: [
          "Mathematics: 78 out of 100",
          "Physics: 65 out of 100",
          "Chemistry: 71 out of 100",
          "Computer Science (practical): 43 out of 50",
          "English: 82 out of 100",
          "Total marks obtained: 78 + 65 + 71 + 43 + 82 = 339",
          "Total maximum marks: 100 + 100 + 100 + 50 + 100 = 450",
          "Overall percentage: (339 ÷ 450) × 100 = 75.33%",
        ],
      },
      {
        type: "p",
        text: "Now try it the wrong way. The individual subject percentages are 78%, 65%, 71%, 86% and 82%. Averaging those five figures gives (78 + 65 + 71 + 86 + 82) ÷ 5 = 76.4%.",
      },
      {
        type: "p",
        text: "A gap of just over one percentage point — small enough to look like a rounding difference, large enough to move you across a grade boundary or a cut-off. And it's entirely explained by the 50-mark practical: it happens to be your best score, and the averaging method gives it the same weight as a 100-mark paper, inflating the result. Had you scored poorly in that practical instead, the same error would have understated your percentage. The more unequal your maximums, the wider the gap grows.",
      },
      { type: "h3", text: "When weightings are specified instead" },
      {
        type: "p",
        text: "Some courses don't give you raw totals but assign explicit weightings — internals worth 30% of the final grade, the end-term exam worth 70%. In that case, convert each component to a percentage first, multiply by its weighting as a decimal, and add: (Internal % × 0.30) + (Exam % × 0.70). Scoring 80% internally and 68% in the exam gives (80 × 0.30) + (68 × 0.70) = 24 + 47.6 = 71.6%. Use this method only when the weightings are actually published by your institution — don't invent them to substitute for the raw-marks method above.",
      },
      { type: "h2", text: "Percentage and CGPA are not the same thing" },
      {
        type: "p",
        text: "These two numbers get used interchangeably in conversation, but they're computed from entirely different inputs. Percentage comes from raw marks: what you scored, divided by what was available. CGPA comes from grade points: your marks are first mapped into a grade band (say, 70-79 becomes a grade point of 8), and those grade points are then averaged with each subject weighted by its credit hours.",
      },
      {
        type: "p",
        text: "That banding step is why the two can't be reliably converted into each other. Once a 71 and a 79 have both become a grade point of 8, the difference between them is gone permanently — the CGPA no longer contains the information needed to reconstruct the original marks. Two students with noticeably different percentages can finish with an identical CGPA.",
      },
      {
        type: "p",
        text: "Institutions do publish conversion formulas anyway, because employers and other universities often demand a percentage. A multiplier like CGPA × 9.5 is common in some Indian boards, but it varies by institution and country, and it's an approximation by design. Always use your own institution's official formula, and where a document asks for a percentage, use the figure your institution would certify rather than one you derived yourself.",
      },
      { type: "h2", text: "Converting percentage to letter grades" },
      {
        type: "p",
        text: "Many systems map percentage bands onto letter grades or divisions — an A, a first class, a distinction. These scales are set by the institution or board and vary more than people expect. A 78% might be a solid A on one scale, a B+ on another, and a first division on a third. Some institutions also grade on a curve, meaning your letter grade depends partly on how the rest of your cohort performed, so the same percentage can produce different grades in different years.",
      },
      {
        type: "p",
        text: "The practical rule is the same as everywhere else in this article: use the conversion table published in your own academic regulations. A generic band table found online will be right sometimes and misleading the rest of the time, and it's not worth the risk on anything that matters.",
      },
      {
        type: "callout",
        variant: "tip",
        text: "Before calculating, confirm exactly which subjects your institution counts towards the aggregate. Many boards exclude an additional or optional sixth subject, or count only your best five. Including a subject that should be excluded — or leaving out one that counts — changes the result far more than any rounding decision.",
      },
      { type: "h2", text: "Common mistakes to avoid" },
      {
        type: "ul",
        items: [
          "Averaging individual subject percentages instead of summing marks and maximums.",
          "Adding a subject's marks to the total but forgetting to add its maximum marks to the denominator.",
          "Including optional or additional subjects that your board excludes from the aggregate.",
          "Mixing internal assessment marks into the total when they're reported separately and not counted.",
          "Rounding intermediate steps, then rounding again at the end, which can shift the final figure by enough to matter at a cut-off.",
          "Comparing percentages across different boards or universities as if they were equivalent — grading strictness varies substantially.",
        ],
      },
      { type: "h2", text: "Frequently asked questions" },
      { type: "h3", text: "Can I average my subject percentages if all subjects are out of 100?" },
      {
        type: "p",
        text: "Yes — if every subject has the identical maximum, averaging the individual percentages and dividing total marks by total maximums produce exactly the same number. It's still worth using the sum method as a habit, because the moment one practical or internal with a different maximum enters the calculation, the averaging approach starts producing a wrong answer without any warning.",
      },
      { type: "h3", text: "How do I calculate the percentage I need in a final exam?" },
      {
        type: "p",
        text: "Work backwards from the target. Multiply your target percentage by the total maximum marks across everything to get the marks you need overall, subtract the marks you've already secured, and the remainder is what you need from the final. If that figure exceeds the final's maximum marks, the target isn't reachable — better to know that while there's still time to adjust than after results are published.",
      },
      { type: "h3", text: "Why does my calculated percentage differ slightly from my marksheet?" },
      {
        type: "p",
        text: "Usually because of which subjects are included or how rounding is applied. Check whether your institution counts a different set of subjects, applies grace marks, weights internals separately, or truncates rather than rounds the final figure. If the difference is more than a fraction of a percent after checking those, it's worth raising with the examination office.",
      },
      {
        type: "p",
        text: "The one thing to carry away: sum first, divide once. Add every mark you obtained, add every mark that was available, and divide. That single habit protects you from the most common percentage error there is, and it works regardless of how uneven your subject totals happen to be.",
      },
    ],
  },
];

async function main() {
  for (const post of seedPosts) {
    await db
      .insert(blogPosts)
      .values(post)
      .onConflictDoUpdate({
        target: blogPosts.slug,
        set: {
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          relatedTool: post.relatedTool,
          category: post.category,
          tags: post.tags,
          readingTime: post.readingTime,
          updatedAt: new Date(),
        },
      });
  }
  console.log(`Seeded/updated ${seedPosts.length} posts.`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
