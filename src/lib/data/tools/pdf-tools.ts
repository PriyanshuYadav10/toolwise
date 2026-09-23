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
        "Combine two or more PDF files into a single document. Drag to reorder files before merging — everything happens locally in your browser, so your documents are never uploaded to a server. Each source file's pages are copied across in their existing order, one file after another, so the sequence you set on screen is exactly the sequence you get in the output. Pages are copied rather than re-encoded, so nothing is re-compressed and the visual quality of every page is preserved.",
      howToUse: [
        "Drag and drop or browse to select the PDF files you want to merge.",
        "Reorder them by dragging into the order you want in the final document.",
        "Click Merge PDFs and download the combined file.",
      ],
      benefits: [
        "Combine reports, invoices or scanned pages into one file without installing software.",
        "Files are processed locally, so nothing is uploaded to a server.",
        "Pages are copied as-is rather than re-encoded, so text stays sharp and images keep their original quality.",
        "Send one attachment instead of five, which is easier for recipients to open, print and file.",
      ],
      commonMistakes: [
        "Forgetting to reorder files before merging, resulting in pages in the wrong sequence.",
        "Merging password-protected PDFs, which this tool cannot open without the password.",
        "Assuming merging will shrink the result — the combined file is roughly the sum of its parts, so compress it afterwards if you need it smaller.",
        "Sharing the merged file without opening it first, and only later noticing a stray cover page or a document that was added twice.",
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
        {
          question: "Does merging reduce the quality of my PDFs?",
          answer:
            "No. Pages are copied from each source document into the new file rather than being re-rendered or re-compressed, so text, vector graphics and embedded images come through exactly as they were.",
        },
        {
          question: "How big will the merged file be?",
          answer:
            "Roughly the combined size of the originals. Merging is additive, not compressive, so if the result is too large to email, run it through a PDF compressor afterwards.",
        },
        {
          question: "What happens to bookmarks, form fields and links?",
          answer:
            "Page content is always preserved, but document-level features like bookmarks (the table-of-contents outline), interactive form fields and some annotations may not carry over into the merged file. If those matter, check the output before sharing it.",
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
        "This tool reduces PDF file size by re-encoding embedded images and removing redundant document data. Compression results vary — PDFs that are mostly text compress less than image-heavy scanned documents. That's because text in a PDF is stored as vector outlines and font references, which are already extremely compact, while photos and scanned pages are raster data with real redundancy to squeeze out. If your file is large, embedded images are almost always the reason.",
      howToUse: [
        "Upload the PDF you want to compress.",
        "Choose a compression level.",
        "Download the compressed file and compare the size reduction.",
      ],
      benefits: [
        "Make large PDFs easier to email or upload where size limits apply.",
        "Cut scanned documents down dramatically, since scans are usually captured at far higher resolution than screen reading needs.",
        "Compare the before and after sizes before you commit to the download.",
        "Runs locally, so confidential contracts and statements never leave your device.",
      ],
      commonMistakes: [
        "Expecting large size reductions on text-only PDFs, which are already fairly compact.",
        "Jumping straight to the most aggressive setting when a moderate level would have met the size limit with no visible quality loss.",
        "Overwriting the original file with the compressed copy — compression is one-directional, so the detail you discard cannot be restored.",
      ],
      faq: [
        {
          question: "Will compression reduce quality?",
          answer:
            "Higher compression levels reduce embedded image quality more aggressively. Text and vector content remain sharp regardless of the compression level.",
        },
        {
          question: "Why did my PDF barely shrink?",
          answer:
            "Usually because there was little to remove. A text-only document is already near its practical minimum size, and images that were heavily compressed before being embedded can't be squeezed much further without a visible quality hit.",
        },
        {
          question: "Which PDFs compress the most?",
          answer:
            "Scanned documents and photo-heavy files. A page scanned at 600 DPI holds around four times the pixel data of the same page at 300 DPI, with no difference you'd notice on screen — so there's a lot of headroom to reclaim.",
        },
        {
          question: "Can I still search or select the text afterwards?",
          answer:
            "Yes. Compression re-encodes images and cleans up the document structure; it doesn't rasterise your pages. Text that was selectable before stays selectable and searchable. The exception is a scanned PDF, where the 'text' was only ever part of an image to begin with.",
        },
        {
          question: "What file size should I aim for?",
          answer:
            "Most email providers cap attachments at around 25MB, but staying well under 10MB is a safer target for reliable delivery. Moderate compression is usually enough to get a typical scanned document comfortably below that.",
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
        "This tool renders each page of your PDF as a JPG image directly in your browser, so you can download individual pages or all of them at once. Rasterising a page turns everything on it — text, tables, charts and photos — into a flat grid of pixels, which is exactly what you want when a page needs to behave like a picture rather than a document.",
      howToUse: [
        "Upload your PDF file.",
        "Preview the rendered pages.",
        "Download individual pages or all pages as JPG images.",
      ],
      benefits: [
        "Extract pages as images for presentations, thumbnails or sharing.",
        "Drop a page straight into a slide, a document or a chat where PDFs aren't accepted.",
        "Share a page as a flat image when you'd rather the text wasn't copyable or editable.",
        "JPG's lossy compression keeps photo-like scanned pages small and quick to send.",
      ],
      commonMistakes: [
        "Converting very large PDFs, which can be slow since rendering happens on your device.",
        "Using JPG for pages that are mostly crisp text or line art — PNG output keeps those edges sharper.",
        "Expecting the resulting image to still be searchable or selectable, when rasterising flattens text into pixels.",
      ],
      faq: [
        {
          question: "Will I still be able to search or copy the text?",
          answer:
            "No. Converting a page to JPG flattens it into pixels, so the text becomes part of the picture. Keep the original PDF if you need searchable text, and treat the images as a visual copy.",
        },
        {
          question: "Should I choose JPG or PNG?",
          answer:
            "JPG suits photographic and scanned pages, where its lossy compression saves a lot of space with no obvious quality cost. PNG is lossless and better for pages with crisp text, logos, charts or line art, where JPG can leave fuzzy halos around sharp edges — at the cost of a larger file.",
        },
        {
          question: "What resolution are the exported images?",
          answer:
            "Pages are rendered at a resolution suitable for on-screen use and sharing. As a rule of thumb, around 150 DPI is plenty for viewing on a screen, while roughly 300 DPI is the usual target if the image will be printed — higher settings produce sharper but considerably larger files.",
        },
        {
          question: "Can I convert just one page instead of the whole document?",
          answer:
            "Yes. Every page is previewed after conversion, and you can download individual pages rather than the full set.",
        },
      ],
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
        "Combine one or more JPG or PNG images into a single PDF file. Reorder images before converting to control page order in the final document. Each image becomes one page, which makes this the quickest way to turn a stack of phone photos or scanner output into something you can email, print or file as a proper document.",
      howToUse: [
        "Upload one or more images.",
        "Reorder them into the order you want in the PDF.",
        "Click Convert to PDF and download the result.",
      ],
      benefits: [
        "Turn scanned pages or photos into a single, shareable PDF document.",
        "One attachment instead of a dozen loose image files, in a fixed, predictable page order.",
        "PDF opens the same way on every device, unlike image files that viewers may rotate or rescale.",
        "Runs in your browser, so photos of IDs, receipts and documents never leave your device.",
      ],
      commonMistakes: [
        "Uploading very high-resolution images, which increases the final PDF's file size.",
        "Forgetting to rotate or crop photos first — the PDF preserves whatever orientation and framing the image already had.",
        "Expecting the PDF to be searchable, when the pages are images and contain no real text layer.",
      ],
      faq: [
        {
          question: "Will the PDF's text be searchable?",
          answer:
            "No. Each page is a picture of your document, not a text layer, so nothing inside it can be searched or selected. Making a scan searchable requires OCR, which is a separate step.",
        },
        {
          question: "Why is my PDF so large?",
          answer:
            "Because the images are. A modern phone photo can easily be several megabytes, and the PDF carries that data over. Resize or compress the images before converting, or compress the finished PDF, if size matters.",
        },
        {
          question: "Can I mix JPG and PNG images in one PDF?",
          answer:
            "Yes. You can combine both formats in the same document — each image simply becomes its own page in the order you arrange them.",
        },
        {
          question: "How is the page order decided?",
          answer:
            "By the order of the images on screen. Drag them into position before converting, and check the first and last pages of the result before sending it on.",
        },
      ],
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
