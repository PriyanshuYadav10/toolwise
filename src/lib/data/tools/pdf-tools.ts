import type { Tool } from "../types";

const PDF_PRIVACY_NOTE =
  "Your files are processed entirely in your browser using JavaScript. They are never uploaded to a server, so nothing leaves your device.";

export const pdfTools: Tool[] = [
  {
    id: "tool-merge-pdf",
    name: "Merge PDF",
    slug: "merge-pdf",
    category: "pdf-tools",
    shortDescription: "Combine multiple PDF files into a single document, in your browser.",
    description: "Reorder and merge multiple PDF files into one document without uploading them anywhere.",
    icon: "Files",
    componentKey: "pdf-merge",
    status: "live",
    featured: true,
    popular: true,
    runsInBrowser: true,
    privacyNote: PDF_PRIVACY_NOTE,
    seoTitle: "Merge PDF Files Online Free – No Upload | Toolwise",
    seoDescription:
      "Merge multiple PDF files into one document for free, processed entirely in your browser with no file upload.",
    keywords: ["merge pdf", "combine pdf files", "pdf merger online"],
    relatedTools: ["split-pdf", "compress-pdf", "jpg-to-pdf", "rotate-pdf"],
    content: {
      intro:
        "Combine two or more PDF files into a single document. Drag to reorder files before merging — everything happens locally in your browser, so your documents are never uploaded to a server.",
      howToUse: [
        "Drag and drop or browse to select the PDF files you want to merge.",
        "Reorder them by dragging into the order you want in the final document.",
        "Click Merge PDFs and download the combined file.",
      ],
      benefits: [
        "Combine reports, invoices or scanned pages into one file without installing software.",
        "Files are processed locally, so nothing is uploaded to a server.",
      ],
      commonMistakes: [
        "Forgetting to reorder files before merging, resulting in pages in the wrong sequence.",
        "Merging password-protected PDFs, which this tool cannot open without the password.",
      ],
      faq: [
        {
          question: "Is there a limit to how many PDFs I can merge?",
          answer:
            "There's no hard limit, but very large files or a large number of files may be slower since processing happens in your browser using your device's memory.",
        },
        {
          question: "Are my files uploaded to a server?",
          answer: PDF_PRIVACY_NOTE,
        },
      ],
    },
  },
  {
    id: "tool-split-pdf",
    name: "Split PDF",
    slug: "split-pdf",
    category: "pdf-tools",
    shortDescription: "Extract specific pages or split a PDF into multiple files.",
    description: "Split a PDF by page range, or extract individual pages into separate files.",
    icon: "Scissors",
    componentKey: "pdf-split",
    status: "live",
    popular: false,
    runsInBrowser: true,
    privacyNote: PDF_PRIVACY_NOTE,
    seoTitle: "Split PDF Online Free – Extract Pages | Toolwise",
    seoDescription:
      "Split a PDF into multiple files or extract specific pages for free, processed entirely in your browser.",
    keywords: ["split pdf", "extract pdf pages", "pdf splitter online"],
    relatedTools: ["merge-pdf", "compress-pdf", "rotate-pdf"],
    content: {
      intro:
        "Split a multi-page PDF into separate files by specifying a page range, or extract individual pages you need — all processed locally in your browser.",
      howToUse: [
        "Upload the PDF you want to split.",
        "Enter the page range or select individual pages to extract.",
        "Click Split and download the resulting file(s).",
      ],
      benefits: ["Pull out just the pages you need without editing the original document."],
      commonMistakes: ["Entering a page range outside the document's actual page count."],
      faq: [
        {
          question: "Can I extract non-consecutive pages?",
          answer: "Yes, you can select individual pages or specify a comma-separated list alongside ranges.",
        },
      ],
    },
  },
  {
    id: "tool-compress-pdf",
    name: "Compress PDF",
    slug: "compress-pdf",
    category: "pdf-tools",
    shortDescription: "Reduce PDF file size while keeping content readable.",
    description: "Shrink large PDF files by optimising embedded images and removing redundant data.",
    icon: "FileArchive",
    componentKey: "pdf-compress",
    status: "live",
    featured: true,
    popular: true,
    runsInBrowser: true,
    privacyNote: PDF_PRIVACY_NOTE,
    seoTitle: "Compress PDF Online Free – Reduce File Size | Toolwise",
    seoDescription:
      "Compress PDF files online for free to reduce file size, processed entirely in your browser with no upload.",
    keywords: ["compress pdf", "reduce pdf size", "pdf compressor online"],
    relatedTools: ["merge-pdf", "split-pdf", "image-compressor"],
    content: {
      intro:
        "This tool reduces PDF file size by re-encoding embedded images and removing redundant document data. Compression results vary — PDFs that are mostly text compress less than image-heavy scanned documents.",
      howToUse: [
        "Upload the PDF you want to compress.",
        "Choose a compression level.",
        "Download the compressed file and compare the size reduction.",
      ],
      benefits: ["Make large PDFs easier to email or upload where size limits apply."],
      commonMistakes: [
        "Expecting large size reductions on text-only PDFs, which are already fairly compact.",
      ],
      faq: [
        {
          question: "Will compression reduce quality?",
          answer:
            "Higher compression levels reduce embedded image quality more aggressively. Text and vector content remain sharp regardless of the compression level.",
        },
      ],
    },
  },
  {
    id: "tool-pdf-to-jpg",
    name: "PDF to JPG",
    slug: "pdf-to-jpg",
    category: "pdf-tools",
    shortDescription: "Convert each page of a PDF into a downloadable JPG image.",
    description: "Turn every page of a PDF into a high-quality JPG image, ready to download individually or as a batch.",
    icon: "FileImage",
    componentKey: "pdf-to-image",
    status: "live",
    popular: true,
    runsInBrowser: true,
    privacyNote: PDF_PRIVACY_NOTE,
    seoTitle: "PDF to JPG Converter Online Free | Toolwise",
    seoDescription:
      "Convert PDF pages to JPG images online for free, processed entirely in your browser with no upload.",
    keywords: ["pdf to jpg", "convert pdf to image", "pdf to jpg converter"],
    relatedTools: ["jpg-to-pdf", "pdf-to-png", "image-compressor"],
    content: {
      intro:
        "This tool renders each page of your PDF as a JPG image directly in your browser, so you can download individual pages or all of them at once.",
      howToUse: [
        "Upload your PDF file.",
        "Preview the rendered pages.",
        "Download individual pages or all pages as JPG images.",
      ],
      benefits: ["Extract pages as images for presentations, thumbnails or sharing."],
      commonMistakes: ["Converting very large PDFs, which can be slow since rendering happens on your device."],
      faq: [],
    },
  },
  {
    id: "tool-jpg-to-pdf",
    name: "JPG to PDF",
    slug: "jpg-to-pdf",
    category: "pdf-tools",
    shortDescription: "Combine one or more JPG images into a single PDF document.",
    description: "Turn one or more images into a single, downloadable PDF document.",
    icon: "FileUp",
    componentKey: "images-to-pdf",
    status: "live",
    popular: true,
    runsInBrowser: true,
    privacyNote: PDF_PRIVACY_NOTE,
    seoTitle: "JPG to PDF Converter Online Free | Toolwise",
    seoDescription:
      "Convert JPG images to a single PDF document online for free, processed entirely in your browser.",
    keywords: ["jpg to pdf", "image to pdf converter", "convert jpg to pdf free"],
    relatedTools: ["pdf-to-jpg", "merge-pdf", "image-compressor"],
    content: {
      intro:
        "Combine one or more JPG or PNG images into a single PDF file. Reorder images before converting to control page order in the final document.",
      howToUse: [
        "Upload one or more images.",
        "Reorder them into the order you want in the PDF.",
        "Click Convert to PDF and download the result.",
      ],
      benefits: ["Turn scanned pages or photos into a single, shareable PDF document."],
      commonMistakes: ["Uploading very high-resolution images, which increases the final PDF's file size."],
      faq: [],
    },
  },
  {
    id: "tool-pdf-to-png",
    name: "PDF to PNG",
    slug: "pdf-to-png",
    category: "pdf-tools",
    shortDescription: "Convert each page of a PDF into a downloadable PNG image.",
    description: "Turn every page of a PDF into a lossless PNG image.",
    icon: "FileImage",
    componentKey: "pdf-to-image",
    status: "live",
    popular: false,
    runsInBrowser: true,
    privacyNote: PDF_PRIVACY_NOTE,
    seoTitle: "PDF to PNG Converter Online Free | Toolwise",
    seoDescription:
      "Convert PDF pages to PNG images online for free, processed entirely in your browser with no upload.",
    keywords: ["pdf to png", "convert pdf to png"],
    relatedTools: ["pdf-to-jpg", "jpg-to-pdf", "image-converter"],
    content: {
      intro:
        "This tool renders each page of your PDF as a lossless PNG image directly in your browser — useful when you need higher image fidelity than JPG.",
      howToUse: [
        "Upload your PDF file.",
        "Preview the rendered pages.",
        "Download individual pages or all pages as PNG images.",
      ],
      benefits: ["PNG output preserves sharp edges and text better than JPG, at a larger file size."],
      commonMistakes: [],
      faq: [],
    },
  },
  {
    id: "tool-rotate-pdf",
    name: "Rotate PDF",
    slug: "rotate-pdf",
    category: "pdf-tools",
    shortDescription: "Rotate one or all pages of a PDF document.",
    description: "Fix sideways or upside-down pages by rotating them 90, 180 or 270 degrees.",
    icon: "RotateCw",
    componentKey: "pdf-rotate",
    status: "live",
    popular: false,
    runsInBrowser: true,
    privacyNote: PDF_PRIVACY_NOTE,
    seoTitle: "Rotate PDF Online Free | Toolwise",
    seoDescription:
      "Rotate PDF pages online for free, processed entirely in your browser with no file upload.",
    keywords: ["rotate pdf", "rotate pdf pages online"],
    relatedTools: ["merge-pdf", "split-pdf", "compress-pdf"],
    content: {
      intro: "Rotate individual pages or the entire document by 90, 180 or 270 degrees to fix incorrectly scanned pages.",
      howToUse: [
        "Upload your PDF file.",
        "Select the pages to rotate and choose a rotation angle.",
        "Download the corrected PDF.",
      ],
      benefits: ["Fix scanned documents where pages were photographed sideways or upside down."],
      commonMistakes: [],
      faq: [],
    },
  },
];
