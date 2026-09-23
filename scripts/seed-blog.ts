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
