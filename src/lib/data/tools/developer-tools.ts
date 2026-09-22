import type { Tool } from "../types";

export const developerTools: Tool[] = [
  {
    id: "tool-json-formatter",
    name: "JSON Formatter",
    slug: "json-formatter",
    category: "developer-tools",
    shortDescription: "Format, validate and beautify JSON with syntax highlighting.",
    description:
      "Paste any JSON and instantly get a clean, indented, syntax-highlighted version — with clear error messages if it's invalid.",
    icon: "Braces",
    componentKey: "json-tool",
    status: "live",
    featured: true,
    popular: true,
    runsInBrowser: true,
    seoTitle: "JSON Formatter & Validator Online – Free | Toolwise",
    seoDescription:
      "Format, validate and beautify JSON online for free. Instant syntax highlighting and line-accurate error messages.",
    keywords: ["json formatter", "json beautifier", "format json online"],
    relatedTools: ["json-validator", "json-minifier", "base64-encoder", "regex-tester"],
    content: {
      intro:
        "Minified or poorly-indented JSON is hard to read and debug. This formatter parses your JSON, checks it's valid, and re-prints it with consistent indentation and syntax highlighting so you can quickly scan the structure.",
      howToUse: [
        "Paste or type your JSON into the editor.",
        "Click Format to beautify it, or Minify to compress it to a single line.",
        "If the JSON is invalid, the error message shows the line and reason.",
        "Copy the result or download it as a .json file.",
      ],
      benefits: [
        "Instantly spot syntax errors with precise line numbers instead of guessing.",
        "Turn minified API responses into a readable structure for debugging.",
        "Works entirely in your browser — nothing you paste is sent to a server.",
      ],
      commonMistakes: [
        "Using trailing commas or single quotes, which are valid in JavaScript objects but not in strict JSON.",
        "Forgetting that JSON keys must always be double-quoted strings.",
      ],
      faq: [
        {
          question: "Is my JSON data sent to a server?",
          answer:
            "No. Formatting and validation happen entirely in your browser using JavaScript — your data never leaves your device.",
        },
        {
          question: "What's the difference between formatting and minifying?",
          answer:
            "Formatting adds indentation and line breaks for readability. Minifying strips all unnecessary whitespace to produce the smallest possible file size.",
        },
      ],
    },
  },
  {
    id: "tool-json-validator",
    name: "JSON Validator",
    slug: "json-validator",
    category: "developer-tools",
    shortDescription: "Validate JSON syntax and get precise, line-accurate error messages.",
    description: "Check whether your JSON is syntactically valid, with clear error reporting for quick fixes.",
    icon: "CheckCircle2",
    componentKey: "json-tool",
    status: "live",
    popular: false,
    runsInBrowser: true,
    seoTitle: "JSON Validator Online – Free & Instant | Toolwise",
    seoDescription:
      "Validate JSON online for free. Get instant, line-accurate error messages when your JSON is malformed.",
    keywords: ["json validator", "validate json online", "json syntax checker"],
    relatedTools: ["json-formatter", "json-minifier", "regex-tester"],
    content: {
      intro:
        "Before using JSON in an API, config file or database, it's worth confirming it actually parses. This validator checks your JSON and reports exactly where a syntax error occurs.",
      howToUse: [
        "Paste your JSON into the editor.",
        "Click Validate to check for syntax errors.",
        "Fix any reported issues and re-validate.",
      ],
      benefits: [
        "Catch malformed JSON before it breaks a build or API call.",
        "Get the specific error location instead of a generic parse failure.",
      ],
      commonMistakes: [
        "Leaving a trailing comma after the last item in an array or object.",
        "Mixing up brackets — using [] for an object or {} for an array.",
      ],
      faq: [
        {
          question: "Does this validate against a JSON Schema?",
          answer:
            "No, this checks JSON syntax only (that it parses correctly), not conformance to a specific schema.",
        },
      ],
    },
  },
  {
    id: "tool-json-minifier",
    name: "JSON Minifier",
    slug: "json-minifier",
    category: "developer-tools",
    shortDescription: "Compress JSON by removing whitespace to reduce file size.",
    description: "Strip all unnecessary whitespace from your JSON to produce the smallest possible payload.",
    icon: "Minimize2",
    componentKey: "json-tool",
    status: "live",
    popular: false,
    runsInBrowser: true,
    seoTitle: "JSON Minifier – Compress JSON Online Free | Toolwise",
    seoDescription:
      "Minify JSON online for free. Remove whitespace and reduce file size instantly in your browser.",
    keywords: ["json minifier", "minify json", "compress json"],
    relatedTools: ["json-formatter", "json-validator", "base64-encoder"],
    content: {
      intro:
        "Minifying JSON removes all whitespace, line breaks and indentation, producing a smaller payload that's faster to transmit over a network — ideal for production API responses or config files.",
      howToUse: [
        "Paste your JSON into the editor.",
        "Click Minify to compress it to a single line.",
        "Copy or download the minified result.",
      ],
      benefits: [
        "Reduce payload size for faster network transfer.",
        "Quickly reverse the process by formatting it back when you need to read it again.",
      ],
      commonMistakes: [
        "Minifying JSON that will be manually edited afterward — keep a formatted copy for editing.",
      ],
      faq: [
        {
          question: "Does minifying change the data itself?",
          answer:
            "No, minifying only removes whitespace and formatting. The underlying data and structure remain identical.",
        },
      ],
    },
  },
  {
    id: "tool-base64-encoder",
    name: "Base64 Encoder",
    slug: "base64-encoder",
    category: "developer-tools",
    shortDescription: "Encode text or files to Base64 format instantly.",
    description: "Convert plain text or file content into Base64-encoded strings, entirely in your browser.",
    icon: "Binary",
    componentKey: "base64-tool",
    status: "live",
    popular: true,
    runsInBrowser: true,
    seoTitle: "Base64 Encoder Online – Free & Instant | Toolwise",
    seoDescription:
      "Encode text to Base64 online for free, instantly and entirely in your browser with no upload required.",
    keywords: ["base64 encoder", "encode base64 online", "text to base64"],
    relatedTools: ["base64-decoder", "url-encoder", "jwt-decoder", "hash-generator"],
    content: {
      intro:
        "Base64 encoding converts binary or text data into an ASCII string, commonly used for embedding data in URLs, JSON, or email attachments. This tool encodes any text you enter directly in your browser.",
      howToUse: [
        "Type or paste the text you want to encode.",
        "The Base64-encoded result appears instantly.",
        "Copy the result to your clipboard.",
      ],
      benefits: [
        "Quickly generate Base64 strings for embedding in code, configs or data URIs.",
        "No upload required — encoding happens locally in your browser.",
      ],
      commonMistakes: [
        "Assuming Base64 is encryption — it's an encoding scheme, not a security measure, and is trivially reversible.",
      ],
      faq: [
        {
          question: "Is Base64 encoding secure?",
          answer:
            "No. Base64 is an encoding format, not encryption — anyone can decode it instantly. Never use it to protect sensitive data.",
        },
      ],
    },
  },
  {
    id: "tool-base64-decoder",
    name: "Base64 Decoder",
    slug: "base64-decoder",
    category: "developer-tools",
    shortDescription: "Decode Base64 strings back to readable text instantly.",
    description: "Paste a Base64-encoded string to instantly decode it back to its original text.",
    icon: "Binary",
    componentKey: "base64-tool",
    status: "live",
    popular: false,
    runsInBrowser: true,
    seoTitle: "Base64 Decoder Online – Free & Instant | Toolwise",
    seoDescription:
      "Decode Base64 strings to plain text online for free, instantly and entirely in your browser.",
    keywords: ["base64 decoder", "decode base64 online"],
    relatedTools: ["base64-encoder", "url-decoder", "jwt-decoder"],
    content: {
      intro:
        "This tool decodes Base64-encoded strings back into their original text, entirely client-side.",
      howToUse: [
        "Paste the Base64 string into the input.",
        "The decoded text appears instantly.",
        "If the input isn't valid Base64, an error is shown.",
      ],
      benefits: [
        "Quickly inspect what's inside a Base64-encoded token, config value or data URI.",
      ],
      commonMistakes: [
        "Pasting a string with extra whitespace or line breaks, which can cause decoding errors.",
      ],
      faq: [
        {
          question: "Can this decode Base64 files, not just text?",
          answer:
            "This tool is optimised for decoding Base64 back to readable text. For binary files, the decoded output may not display correctly as text.",
        },
      ],
    },
  },
  {
    id: "tool-uuid-generator",
    name: "UUID Generator",
    slug: "uuid-generator",
    category: "developer-tools",
    shortDescription: "Generate random UUID v4 identifiers in bulk, instantly.",
    description: "Generate cryptographically random, RFC-4122-compliant UUID v4 values, one at a time or in bulk.",
    icon: "Fingerprint",
    componentKey: "uuid-generator",
    status: "live",
    popular: true,
    runsInBrowser: true,
    seoTitle: "UUID Generator – Free Online UUID v4 Tool | Toolwise",
    seoDescription:
      "Generate random UUID v4 identifiers online for free, in bulk, using your browser's cryptographic random number generator.",
    keywords: ["uuid generator", "guid generator", "uuid v4 generator"],
    relatedTools: ["hash-generator", "json-formatter", "jwt-decoder"],
    content: {
      intro:
        "A UUID (Universally Unique Identifier) is a 128-bit value used to uniquely identify information without a central authority. This tool generates version 4 (random) UUIDs using your browser's cryptographically secure random number generator.",
      howToUse: [
        "Choose how many UUIDs you want to generate.",
        "Click Generate to create new UUIDs instantly.",
        "Copy a single UUID or all of them at once.",
      ],
      benefits: [
        "Generate unique identifiers for database records, API keys or test data.",
        "Uses the Web Crypto API for cryptographically strong randomness.",
      ],
      commonMistakes: [
        "Assuming UUIDs are sequential or predictable — v4 UUIDs are intentionally random.",
      ],
      faq: [
        {
          question: "Can two generated UUIDs ever collide?",
          answer:
            "It's astronomically unlikely. UUID v4 has 122 random bits, giving a collision probability low enough to be considered practically impossible for normal use.",
        },
      ],
    },
  },
  {
    id: "tool-qr-generator",
    name: "QR Code Generator",
    shortName: "QR Generator",
    slug: "qr-generator",
    category: "developer-tools",
    shortDescription: "Generate a downloadable QR code from any text, URL or contact info.",
    description: "Turn any text or URL into a scannable QR code, and download it as a PNG image.",
    icon: "QrCode",
    componentKey: "qr-generator",
    status: "live",
    featured: true,
    popular: true,
    runsInBrowser: true,
    seoTitle: "QR Code Generator – Free Online Tool | Toolwise",
    seoDescription:
      "Generate a free QR code from any text or URL instantly and download it as a PNG image, all in your browser.",
    keywords: ["qr code generator", "generate qr code free", "url to qr code"],
    relatedTools: ["uuid-generator", "url-encoder", "image-converter"],
    content: {
      intro:
        "This tool generates a QR code from any text, link, or contact detail you enter, rendering it directly in your browser so you can preview and download it instantly.",
      howToUse: [
        "Enter the text or URL you want to encode.",
        "The QR code preview updates instantly.",
        "Adjust the size if needed, then download it as a PNG.",
      ],
      benefits: [
        "Create QR codes for links, Wi-Fi details or contact cards in seconds.",
        "No account or watermark — generated and downloaded directly in your browser.",
      ],
      commonMistakes: [
        "Encoding very long text, which produces a dense QR code that's harder for cameras to scan reliably.",
      ],
      faq: [
        {
          question: "Do these QR codes expire?",
          answer:
            "No. The QR code simply encodes the text you provide directly — it doesn't rely on a server, so it never expires or stops working.",
        },
      ],
    },
  },
  {
    id: "tool-regex-tester",
    name: "Regex Tester",
    slug: "regex-tester",
    category: "developer-tools",
    shortDescription: "Test regular expressions against sample text with live match highlighting.",
    description: "Write and test regular expressions with real-time match highlighting and capture group details.",
    icon: "Regex",
    componentKey: "regex-tester",
    status: "live",
    popular: false,
    runsInBrowser: true,
    seoTitle: "Regex Tester Online – Free JavaScript Regex Tool | Toolwise",
    seoDescription:
      "Test JavaScript regular expressions online for free with live match highlighting and capture group inspection.",
    keywords: ["regex tester", "regex online", "javascript regex tester"],
    relatedTools: ["json-formatter", "url-encoder", "html-formatter"],
    content: {
      intro:
        "This tool lets you write a JavaScript-flavoured regular expression and test it against sample text in real time, highlighting every match and listing capture groups.",
      howToUse: [
        "Type your regular expression pattern and select flags (g, i, m, etc.).",
        "Paste your test text below.",
        "Matches are highlighted instantly, with capture groups listed underneath.",
      ],
      benefits: [
        "Debug complex regular expressions visually instead of guessing.",
        "See exactly which parts of your text match, and what each capture group contains.",
      ],
      commonMistakes: [
        "Forgetting the global flag (g), which means only the first match is found instead of all matches.",
        "Not escaping special characters like `.` or `(` when they're meant to be literal.",
      ],
      faq: [
        {
          question: "Which regex flavour does this use?",
          answer:
            "This tool uses standard JavaScript regular expression syntax, the same engine used in browsers and Node.js.",
        },
      ],
    },
  },
  {
    id: "tool-url-encoder",
    name: "URL Encoder",
    slug: "url-encoder",
    category: "developer-tools",
    shortDescription: "Encode text into a URL-safe format.",
    description: "Percent-encode text so it can be safely used inside a URL.",
    icon: "Link2",
    componentKey: "url-tool",
    status: "live",
    popular: false,
    runsInBrowser: true,
    seoTitle: "URL Encoder Online – Free Percent Encoding Tool | Toolwise",
    seoDescription: "Encode text to a URL-safe, percent-encoded format online for free, instantly in your browser.",
    keywords: ["url encoder", "percent encoding", "encodeuricomponent online"],
    relatedTools: ["url-decoder", "base64-encoder", "regex-tester"],
    content: {
      intro:
        "URL encoding (percent-encoding) replaces unsafe characters in a string with a % followed by two hexadecimal digits, so the text can be safely included in a URL.",
      howToUse: [
        "Paste the text you want to encode.",
        "The URL-encoded result appears instantly.",
        "Copy the encoded string for use in a URL or query parameter.",
      ],
      benefits: ["Safely embed special characters like spaces, &, or ? inside query strings."],
      commonMistakes: ["Double-encoding a string that's already URL-encoded, which produces incorrect output."],
      faq: [
        {
          question: "What's the difference between this and encodeURI?",
          answer:
            "This tool uses encodeURIComponent-style encoding, suitable for individual query parameter values rather than a full URL.",
        },
      ],
    },
  },
  {
    id: "tool-url-decoder",
    name: "URL Decoder",
    slug: "url-decoder",
    category: "developer-tools",
    shortDescription: "Decode percent-encoded URL text back to readable form.",
    description: "Convert a percent-encoded URL string back into its original, readable text.",
    icon: "Link2",
    componentKey: "url-tool",
    status: "live",
    popular: false,
    runsInBrowser: true,
    seoTitle: "URL Decoder Online – Free Percent Decoding Tool | Toolwise",
    seoDescription: "Decode percent-encoded URL strings back to readable text online for free, instantly.",
    keywords: ["url decoder", "decode url online"],
    relatedTools: ["url-encoder", "base64-decoder"],
    content: {
      intro: "This tool decodes percent-encoded URL strings back into their original, readable text.",
      howToUse: [
        "Paste the encoded URL or query string.",
        "The decoded result appears instantly.",
      ],
      benefits: ["Quickly read what's actually inside an encoded URL or query parameter."],
      commonMistakes: ["Pasting malformed percent-encoding, which will produce a decoding error."],
      faq: [],
    },
  },
  {
    id: "tool-jwt-decoder",
    name: "JWT Decoder",
    slug: "jwt-decoder",
    category: "developer-tools",
    shortDescription: "Decode a JSON Web Token to inspect its header and payload.",
    description: "Paste a JWT to instantly decode and inspect its header and payload claims.",
    icon: "KeyRound",
    componentKey: "jwt-decoder",
    status: "live",
    popular: true,
    runsInBrowser: true,
    seoTitle: "JWT Decoder Online – Free & Secure | Toolwise",
    seoDescription:
      "Decode a JSON Web Token (JWT) online for free. Inspect header and payload claims entirely in your browser.",
    keywords: ["jwt decoder", "decode jwt online", "json web token decoder"],
    relatedTools: ["base64-decoder", "json-formatter", "hash-generator"],
    content: {
      intro:
        "A JSON Web Token (JWT) encodes a header, payload and signature as three Base64URL-encoded segments. This tool decodes the header and payload so you can inspect the claims inside — entirely in your browser, without sending your token anywhere.",
      howToUse: [
        "Paste your JWT into the input.",
        "The decoded header and payload appear instantly as formatted JSON.",
        "Note: this tool does not verify the signature.",
      ],
      benefits: [
        "Quickly inspect claims like expiry, issuer or subject without a backend call.",
        "Runs entirely client-side — your token is never transmitted anywhere.",
      ],
      commonMistakes: [
        "Assuming a decoded JWT is verified — decoding only reveals the contents, it doesn't confirm the token's signature is valid.",
      ],
      faq: [
        {
          question: "Does this tool verify the JWT signature?",
          answer:
            "No, this tool only decodes and displays the header and payload. Signature verification requires the secret or public key and isn't performed here.",
        },
        {
          question: "Is my token sent to a server?",
          answer: "No, decoding happens entirely in your browser using JavaScript.",
        },
      ],
    },
  },
  {
    id: "tool-hash-generator",
    name: "Hash Generator",
    slug: "hash-generator",
    category: "developer-tools",
    shortDescription: "Generate MD5, SHA-1, SHA-256 and SHA-512 hashes from text.",
    description: "Compute common cryptographic hashes of any text instantly in your browser.",
    icon: "Hash",
    componentKey: "hash-generator",
    status: "live",
    popular: false,
    runsInBrowser: true,
    seoTitle: "Hash Generator Online – MD5, SHA-1, SHA-256 | Toolwise",
    seoDescription:
      "Generate MD5, SHA-1, SHA-256 and SHA-512 hashes from text online for free, entirely in your browser.",
    keywords: ["hash generator", "sha256 generator", "md5 generator online"],
    relatedTools: ["uuid-generator", "base64-encoder", "jwt-decoder"],
    content: {
      intro:
        "This tool computes common hash digests — MD5, SHA-1, SHA-256 and SHA-512 — from any text you enter, using your browser's built-in cryptographic functions where available.",
      howToUse: [
        "Enter the text you want to hash.",
        "View the MD5, SHA-1, SHA-256 and SHA-512 digests instantly.",
        "Copy any of the generated hashes.",
      ],
      benefits: ["Quickly verify file or text integrity by comparing hash values."],
      commonMistakes: [
        "Using MD5 or SHA-1 for password storage — both are considered cryptographically weak for that purpose.",
      ],
      faq: [
        {
          question: "Is MD5 safe to use?",
          answer:
            "MD5 is fine for checksums but is not considered cryptographically secure. Avoid it for passwords or security-sensitive hashing — prefer SHA-256 or stronger.",
        },
      ],
    },
  },
  {
    id: "tool-timestamp-converter",
    name: "Timestamp Converter",
    slug: "timestamp-converter",
    category: "developer-tools",
    shortDescription: "Convert between Unix timestamps and human-readable dates.",
    description: "Convert Unix timestamps to readable dates and back, across time zones.",
    icon: "Clock",
    componentKey: "timestamp-converter",
    status: "live",
    popular: false,
    runsInBrowser: true,
    seoTitle: "Unix Timestamp Converter – Free Online Tool | Toolwise",
    seoDescription:
      "Convert Unix timestamps to human-readable dates and back online for free, instantly in your browser.",
    keywords: ["timestamp converter", "unix timestamp to date", "epoch converter"],
    relatedTools: ["age-calculator", "json-formatter"],
    content: {
      intro:
        "A Unix timestamp counts seconds (or milliseconds) since January 1, 1970 UTC. This tool converts a timestamp to a readable date, and a readable date back to a timestamp.",
      howToUse: [
        "Enter a Unix timestamp to convert it to a readable date, or pick a date to get its timestamp.",
        "Toggle between seconds and milliseconds.",
        "The current timestamp is also shown live for reference.",
      ],
      benefits: ["Debug API responses and logs that use Unix time instead of readable dates."],
      commonMistakes: ["Mixing up seconds and milliseconds, which produces a date far in the past or future."],
      faq: [],
    },
  },
  {
    id: "tool-html-formatter",
    name: "HTML Formatter",
    slug: "html-formatter",
    category: "developer-tools",
    shortDescription: "Format and beautify messy HTML markup.",
    description: "Clean up and indent HTML markup for readability.",
    icon: "Code",
    componentKey: "coming-soon",
    status: "coming-soon",
    runsInBrowser: true,
    seoTitle: "HTML Formatter Online | Toolwise",
    seoDescription: "Format and beautify HTML markup online for free.",
    keywords: ["html formatter", "beautify html"],
    relatedTools: ["css-formatter", "json-formatter"],
  },
  {
    id: "tool-css-formatter",
    name: "CSS Formatter",
    slug: "css-formatter",
    category: "developer-tools",
    shortDescription: "Format and beautify minified CSS.",
    description: "Clean up and indent CSS stylesheets for readability.",
    icon: "Palette",
    componentKey: "coming-soon",
    status: "coming-soon",
    runsInBrowser: true,
    seoTitle: "CSS Formatter Online | Toolwise",
    seoDescription: "Format and beautify CSS online for free.",
    keywords: ["css formatter", "beautify css"],
    relatedTools: ["html-formatter", "json-formatter"],
  },
  {
    id: "tool-sql-formatter",
    name: "SQL Formatter",
    slug: "sql-formatter",
    category: "developer-tools",
    shortDescription: "Format and beautify SQL queries.",
    description: "Clean up messy SQL queries with consistent indentation and casing.",
    icon: "Database",
    componentKey: "coming-soon",
    status: "coming-soon",
    runsInBrowser: true,
    seoTitle: "SQL Formatter Online | Toolwise",
    seoDescription: "Format and beautify SQL queries online for free.",
    keywords: ["sql formatter", "beautify sql"],
    relatedTools: ["json-formatter", "regex-tester"],
  },
  {
    id: "tool-markdown-preview",
    name: "Markdown Preview",
    slug: "markdown-preview",
    category: "developer-tools",
    shortDescription: "Write Markdown and preview the rendered output live.",
    description: "Live side-by-side Markdown editor and preview.",
    icon: "FileCode",
    componentKey: "coming-soon",
    status: "coming-soon",
    runsInBrowser: true,
    seoTitle: "Markdown Preview Online | Toolwise",
    seoDescription: "Write and preview Markdown online for free, live.",
    keywords: ["markdown preview", "markdown editor online"],
    relatedTools: ["html-formatter", "json-formatter"],
  },
];
