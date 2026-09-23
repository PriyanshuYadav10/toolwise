import type { Tool } from "../types";

const IMAGE_PRIVACY_NOTE =
  "Your images are processed entirely in your browser using JavaScript. They are never uploaded to a server.";

export const imageTools: Tool[] = [
  {
    id: "tool-image-compressor",
    name: "Image Compressor",
    slug: "image-compressor",
    category: "image-tools",
    shortDescription: "Reduce image file size while preserving visual quality.",
    description: "Shrink JPG, PNG or WebP file sizes with an adjustable quality slider and before/after comparison.",
    icon: "Shrink",
    componentKey: "image-compressor",
    status: "live",
    featured: true,
    popular: true,
    runsInBrowser: true,
    privacyNote: IMAGE_PRIVACY_NOTE,
    seoTitle: "Image Compressor Online Free – Reduce File Size | Toolwise",
    seoDescription:
      "Compress JPG, PNG and WebP images online for free with a quality slider, processed entirely in your browser.",
    keywords: ["image compressor", "compress image online", "reduce image size"],
    relatedTools: ["image-resizer", "png-to-jpg", "jpg-to-webp", "compress-pdf"],
    content: {
      intro:
        "Large images slow down websites and fill up storage. This tool compresses JPG, PNG and WebP images directly in your browser, letting you control the quality-to-size trade-off with a live before/after comparison.",
      howToUse: [
        "Drag and drop or select an image.",
        "Adjust the quality slider to balance file size and visual quality.",
        "Compare the original and compressed size, then download.",
      ],
      benefits: [
        "Shrink images for faster website loading and smaller uploads.",
        "See the exact percentage reduction before downloading.",
        "Processed locally — no image is uploaded to a server.",
      ],
      commonMistakes: [
        "Compressing too aggressively for images with fine detail or text, which introduces visible artifacts.",
        "Re-compressing an already-compressed JPG repeatedly, since each pass discards more detail and the losses accumulate.",
        "Compressing a huge image instead of resizing it first — an image displayed at 800px wide gains nothing from being 4000px wide.",
      ],
      faq: [
        {
          question: "Which formats are supported?",
          answer: "JPG, PNG and WebP images are supported for both input and output.",
        },
        {
          question: "Is my image uploaded anywhere?",
          answer: IMAGE_PRIVACY_NOTE,
        },
        {
          question: "What quality setting should I use?",
          answer:
            "Around 75–85% is the usual sweet spot for photos: a large size reduction with no difference most people can see. Drop below 60% and compression artifacts start showing up as blotchy patches in skies and smooth gradients. Screenshots and images containing text need a higher setting, or a lossless format.",
        },
        {
          question: "Why didn't my PNG shrink much?",
          answer:
            "PNG uses lossless compression, so there's no quality dial to turn — it can only remove genuine redundancy. PNGs of photographs stay large by nature. If the image doesn't need transparency, converting it to JPG or WebP will shrink it far more than compressing the PNG will.",
        },
        {
          question: "Does compressing an image lose quality permanently?",
          answer:
            "With lossy formats like JPG and lossy WebP, yes — discarded detail can't be recovered from the compressed copy. Always compress a duplicate and keep your original, especially if the image may need further editing later.",
        },
      ],
    },
  },
  {
    id: "tool-image-resizer",
    name: "Image Resizer",
    slug: "image-resizer",
    category: "image-tools",
    shortDescription: "Resize images to exact pixel dimensions or a percentage scale.",
    description: "Resize an image by exact dimensions, percentage, or a common preset, while preserving aspect ratio.",
    icon: "Maximize2",
    componentKey: "image-resizer",
    status: "live",
    popular: true,
    runsInBrowser: true,
    privacyNote: IMAGE_PRIVACY_NOTE,
    seoTitle: "Image Resizer Online Free | Toolwise",
    seoDescription:
      "Resize images online for free to exact pixel dimensions or a percentage, processed entirely in your browser.",
    keywords: ["image resizer", "resize image online", "resize photo"],
    relatedTools: ["image-compressor", "image-cropper", "image-converter"],
    content: {
      intro:
        "Resize an image to a specific width and height, a percentage scale, or a common social-media preset — with an option to lock aspect ratio so your image never looks stretched. Resizing changes the pixel dimensions of the image, which is what almost every upload limit, profile picture requirement and page-speed budget actually measures.",
      howToUse: [
        "Upload the image you want to resize.",
        "Enter target dimensions or choose a percentage/preset.",
        "Download the resized image.",
      ],
      benefits: [
        "Fit images to exact size requirements for uploads, profiles or print.",
        "Scaling down cuts file size sharply, which speeds up page loads and email attachments.",
        "Lock the aspect ratio and the second dimension fills itself in, so nothing ends up squashed.",
        "Everything runs in your browser, with no upload and no watermark on the result.",
      ],
      commonMistakes: [
        "Unlocking aspect ratio and entering mismatched dimensions, which distorts the image.",
        "Upscaling a small image and expecting extra detail — enlarging only interpolates existing pixels, so the result looks soft.",
        "Changing the DPI value and expecting the image to look different on screen, when DPI only affects physical print size.",
      ],
      faq: [
        {
          question: "What is aspect ratio and why should I keep it locked?",
          answer:
            "Aspect ratio is the proportion between width and height — 1600x900 is a 16:9 ratio, for example. Keeping it locked means both dimensions scale together, so the image shrinks or grows without being stretched. Unlock it only when you deliberately want to squeeze the image into different proportions, and use cropping instead if you want to change the shape without distorting the subject.",
        },
        {
          question: "Can I make a small image bigger without losing quality?",
          answer:
            "Not really. Upscaling invents new pixels by interpolating between existing ones; it can't recover detail the camera never captured. Modest enlargements of 10–25% usually pass unnoticed, but pushing well beyond that gives a soft, plasticky look. Start from the highest-resolution original you have.",
        },
        {
          question: "Does resizing change the file size?",
          answer:
            "Yes, substantially. File size scales roughly with pixel count, so halving both width and height leaves about a quarter of the pixels and a much smaller file. Resizing to the dimensions you'll actually display is often more effective than compressing the full-size image.",
        },
        {
          question: "What dimensions should I use for a website image?",
          answer:
            "Match the size the image is displayed at, then roughly double it if you want it to stay sharp on high-density screens. A full-width hero image is commonly around 1920px wide, an in-article image 800–1200px, and a thumbnail 300–400px.",
        },
      ],
    },
  },
  {
    id: "tool-image-cropper",
    name: "Image Cropper",
    slug: "image-cropper",
    category: "image-tools",
    shortDescription: "Crop images to a custom area or a fixed aspect ratio.",
    description: "Crop any image with a draggable selection box, with optional fixed aspect ratios.",
    icon: "Crop",
    componentKey: "image-cropper",
    status: "live",
    popular: false,
    runsInBrowser: true,
    privacyNote: IMAGE_PRIVACY_NOTE,
    seoTitle: "Image Cropper Online Free | Toolwise",
    seoDescription: "Crop images online for free with a draggable selection box, processed in your browser.",
    keywords: ["image cropper", "crop image online"],
    relatedTools: ["image-resizer", "image-compressor"],
    content: {
      intro: "Drag to select the exact area you want to keep, with optional fixed aspect ratios for profile photos, covers or thumbnails.",
      howToUse: [
        "Upload an image.",
        "Drag the selection box to the area you want to keep, or choose a fixed ratio.",
        "Click Crop and download the result.",
      ],
      benefits: ["Quickly crop screenshots, photos or scans without installing editing software."],
      commonMistakes: [],
      faq: [],
    },
  },
  {
    id: "tool-png-to-jpg",
    name: "PNG to JPG",
    slug: "png-to-jpg",
    category: "image-tools",
    shortDescription: "Convert PNG images to JPG format instantly.",
    description: "Convert PNG images to the smaller, widely-supported JPG format.",
    icon: "FileImage",
    componentKey: "image-converter",
    status: "live",
    popular: true,
    runsInBrowser: true,
    privacyNote: IMAGE_PRIVACY_NOTE,
    seoTitle: "PNG to JPG Converter Online Free | Toolwise",
    seoDescription: "Convert PNG images to JPG format online for free, processed entirely in your browser.",
    keywords: ["png to jpg", "convert png to jpg online"],
    relatedTools: ["jpg-to-png", "jpg-to-webp", "image-compressor"],
    content: {
      intro:
        "PNG files preserve transparency but are often much larger than JPG. This tool converts PNG images to JPG, filling transparent areas with white by default. PNG is a lossless format, so it stores every pixel exactly — great for logos and screenshots, but wasteful for photographs, where JPG's lossy compression delivers a far smaller file at effectively the same visual quality.",
      howToUse: [
        "Upload a PNG image.",
        "Adjust output quality if needed.",
        "Download the converted JPG.",
      ],
      benefits: [
        "Reduce file size for images that don't need transparency.",
        "JPG is accepted virtually everywhere, including older software and upload forms that reject other formats.",
        "A quality slider lets you trade size against detail, which lossless PNG doesn't offer.",
        "Especially effective on photographs and screenshots of photo-like content.",
      ],
      commonMistakes: [
        "Converting images with important transparent areas, which will be filled with a solid background.",
        "Converting logos, icons, diagrams or text-heavy screenshots, where JPG leaves fuzzy halos around sharp edges.",
        "Deleting the PNG original — JPG is lossy, so you can't convert back and recover the discarded detail.",
      ],
      faq: [
        {
          question: "What happens to transparent areas?",
          answer:
            "JPG has no transparency channel at all, so transparent regions must be filled with a solid colour — white by default. If your image is a logo meant to sit on a coloured background, keep it as PNG or convert to WebP instead, since both support transparency.",
        },
        {
          question: "How much smaller will the JPG be?",
          answer:
            "For photographs, often 60–90% smaller, because lossless PNG has to store every pixel exactly. For flat-colour graphics the saving is much smaller, and a JPG can occasionally end up larger than the PNG it came from.",
        },
        {
          question: "Will I lose quality?",
          answer:
            "Some, by design — JPG is lossy. At a high quality setting the loss is imperceptible on photographic content. It's far more visible on crisp edges: text and line art can pick up soft, blotchy halos that PNG would never produce.",
        },
        {
          question: "Can I convert the JPG back to PNG later?",
          answer:
            "You can produce a PNG file from it, but the detail JPG discarded is gone for good — the PNG will simply store the compressed-looking result losslessly. Always keep the original PNG if you might need to edit it again.",
        },
      ],
    },
  },
  {
    id: "tool-jpg-to-png",
    name: "JPG to PNG",
    slug: "jpg-to-png",
    category: "image-tools",
    shortDescription: "Convert JPG images to lossless PNG format.",
    description: "Convert JPG images to PNG format for lossless quality or transparency support.",
    icon: "FileImage",
    componentKey: "image-converter",
    status: "live",
    popular: false,
    runsInBrowser: true,
    privacyNote: IMAGE_PRIVACY_NOTE,
    seoTitle: "JPG to PNG Converter Online Free | Toolwise",
    seoDescription: "Convert JPG images to PNG format online for free, processed entirely in your browser.",
    keywords: ["jpg to png", "convert jpg to png online"],
    relatedTools: ["png-to-jpg", "image-converter"],
    content: {
      intro: "Convert JPG images to PNG format for lossless quality, ready for further editing.",
      howToUse: ["Upload a JPG image.", "Download the converted PNG."],
      benefits: ["PNG avoids the compression artifacts JPG introduces, useful before further editing."],
      commonMistakes: [],
      faq: [],
    },
  },
  {
    id: "tool-jpg-to-webp",
    name: "JPG to WebP",
    slug: "jpg-to-webp",
    category: "image-tools",
    shortDescription: "Convert JPG images to the modern, smaller WebP format.",
    description: "Convert JPG images to WebP for significantly smaller file sizes at comparable quality.",
    icon: "FileImage",
    componentKey: "image-converter",
    status: "live",
    popular: true,
    runsInBrowser: true,
    privacyNote: IMAGE_PRIVACY_NOTE,
    seoTitle: "JPG to WebP Converter Online Free | Toolwise",
    seoDescription: "Convert JPG images to WebP format online for free, processed entirely in your browser.",
    keywords: ["jpg to webp", "convert jpg to webp"],
    relatedTools: ["webp-to-jpg", "image-compressor"],
    content: {
      intro:
        "WebP is a modern image format that typically produces 25–35% smaller files than JPG at similar visual quality, and is supported by all modern browsers. It offers both lossy and lossless modes and, unlike JPG, supports transparency and animation — which makes it a single format that can replace JPG, PNG and GIF on the web.",
      howToUse: ["Upload a JPG image.", "Adjust quality if needed.", "Download the converted WebP file."],
      benefits: [
        "Significantly reduce image file size for faster website loading.",
        "Smaller images improve Core Web Vitals and cut bandwidth costs on image-heavy pages.",
        "Supports transparency and animation, which JPG cannot do at all.",
        "Supported by every current major browser, so no fallback is needed for modern visitors.",
      ],
      commonMistakes: [
        "Using WebP images in contexts that require universal legacy format support.",
        "Converting an already heavily-compressed JPG at a low quality setting, which stacks one round of lossy compression on top of another.",
        "Expecting a dramatic saving on every image — the gain is largest on photographs and smallest on images that were already well optimised.",
      ],
      faq: [
        {
          question: "Is WebP supported everywhere?",
          answer:
            "In browsers, effectively yes — Chrome, Firefox, Safari and Edge have all supported it for years. Support is patchier outside the browser: some older desktop software, email clients, print workflows and social upload forms still expect JPG or PNG, so keep a JPG copy for those.",
        },
        {
          question: "How much smaller are WebP files really?",
          answer:
            "Typically 25–35% smaller than an equivalent-quality JPG, and often a great deal smaller than PNG for photographic content. The exact saving depends on the image: detailed, noisy photos gain less than smooth ones.",
        },
        {
          question: "Is converting JPG to WebP lossless?",
          answer:
            "Lossy WebP re-compresses the image, so a second round of quality loss is applied on top of the JPG's existing compression. Using a high quality setting keeps this invisible in practice. WebP also has a lossless mode, though it produces larger files and offers no benefit when the source is already a lossy JPG.",
        },
        {
          question: "Should I use WebP or AVIF?",
          answer:
            "AVIF usually compresses a little better still, but WebP has broader support across tools and older devices and encodes faster. WebP is the safer default today; AVIF is worth considering when you can serve a fallback format alongside it.",
        },
      ],
    },
  },
  {
    id: "tool-webp-to-jpg",
    name: "WebP to JPG",
    slug: "webp-to-jpg",
    category: "image-tools",
    shortDescription: "Convert WebP images to the universally-supported JPG format.",
    description: "Convert WebP images to JPG for compatibility with tools that don't support WebP.",
    icon: "FileImage",
    componentKey: "image-converter",
    status: "live",
    popular: false,
    runsInBrowser: true,
    privacyNote: IMAGE_PRIVACY_NOTE,
    seoTitle: "WebP to JPG Converter Online Free | Toolwise",
    seoDescription: "Convert WebP images to JPG format online for free, processed entirely in your browser.",
    keywords: ["webp to jpg", "convert webp to jpg"],
    relatedTools: ["jpg-to-webp", "image-converter"],
    content: {
      intro: "Convert WebP images to JPG for compatibility with older software or tools that don't support WebP.",
      howToUse: ["Upload a WebP image.", "Download the converted JPG."],
      benefits: ["Ensures compatibility with tools and platforms that don't yet support WebP."],
      commonMistakes: [],
      faq: [],
    },
  },
  {
    id: "tool-image-converter",
    name: "Image Converter",
    slug: "image-converter",
    category: "image-tools",
    shortDescription: "Convert between JPG, PNG and WebP formats in one place.",
    description: "A general-purpose converter between JPG, PNG and WebP formats.",
    icon: "RefreshCw",
    componentKey: "image-converter",
    status: "live",
    popular: false,
    runsInBrowser: true,
    privacyNote: IMAGE_PRIVACY_NOTE,
    seoTitle: "Image Format Converter Online Free | Toolwise",
    seoDescription:
      "Convert images between JPG, PNG and WebP formats online for free, processed entirely in your browser.",
    keywords: ["image converter", "convert image format online"],
    relatedTools: ["png-to-jpg", "jpg-to-webp", "webp-to-jpg"],
    content: {
      intro: "Upload any image and choose your target format — JPG, PNG or WebP — all converted locally in your browser.",
      howToUse: ["Upload an image.", "Choose the output format.", "Download the converted file."],
      benefits: ["One tool for any JPG/PNG/WebP conversion, instead of switching between separate converters."],
      commonMistakes: [],
      faq: [],
    },
  },
];
