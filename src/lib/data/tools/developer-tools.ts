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
        "Minified or poorly-indented JSON is hard to read and debug. This formatter parses your JSON, checks it's valid, and re-prints it with consistent indentation and syntax highlighting so you can quickly scan the structure. It's especially useful for API responses, config files and log payloads that arrive as a single unbroken line, where a missing bracket or an unexpected nesting level is almost impossible to spot by eye. Because parsing happens in your browser, you get the same result you'd get from a strict JSON parser in your own code.",
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
        "Compare two API payloads more easily once both are formatted with identical indentation.",
      ],
      commonMistakes: [
        "Using trailing commas or single quotes, which are valid in JavaScript objects but not in strict JSON.",
        "Forgetting that JSON keys must always be double-quoted strings.",
        "Pasting a JavaScript object literal or a JSONP response (wrapped in a function call) instead of plain JSON.",
        "Leaving in comments — JSON has no comment syntax, so // and /* */ will always cause a parse error.",
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
        {
          question: "Does formatting change the order of my keys?",
          answer:
            "No. Object keys are re-printed in the same order they appear in your input. JSON itself doesn't guarantee key order as meaningful, but this tool preserves it so the formatted output stays easy to compare against the original.",
        },
        {
          question: "Why do my large numbers lose precision?",
          answer:
            "JSON numbers are parsed as standard double-precision floats in JavaScript, so integers beyond about 9 quadrillion (2^53 − 1) get rounded. If you're working with large IDs, send them as strings rather than numbers to avoid silent precision loss anywhere in the stack, not just in this tool.",
        },
        {
          question: "Can it handle JSON Lines or NDJSON?",
          answer:
            "Not directly — those formats contain one independent JSON document per line, which isn't valid as a single JSON value. Format one line at a time, or wrap the lines in an array separated by commas first.",
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
        "Base64 encoding converts binary or text data into an ASCII string, commonly used for embedding data in URLs, JSON, or email attachments. It works by taking three bytes of input at a time and re-expressing them as four printable characters drawn from a 64-character alphabet, which is why encoded output is always about 33% larger than the original. This tool encodes any text you enter directly in your browser.",
      howToUse: [
        "Type or paste the text you want to encode.",
        "The Base64-encoded result appears instantly.",
        "Copy the result to your clipboard.",
      ],
      benefits: [
        "Quickly generate Base64 strings for embedding in code, configs or data URIs.",
        "No upload required — encoding happens locally in your browser.",
        "Safely move binary-ish content through text-only channels like JSON, XML, YAML or email bodies.",
        "Produce data URIs for small images, fonts or SVGs you want to inline rather than request separately.",
      ],
      commonMistakes: [
        "Assuming Base64 is encryption — it's an encoding scheme, not a security measure, and is trivially reversible.",
        "Expecting Base64 to compress data — it does the opposite, inflating the payload by roughly 33% before any transport compression.",
        "Using standard Base64 output directly in a URL or filename, where + / and = characters need escaping — use base64url instead.",
      ],
      faq: [
        {
          question: "Is Base64 encoding secure?",
          answer:
            "No. Base64 is an encoding format, not encryption — anyone can decode it instantly. Never use it to protect sensitive data.",
        },
        {
          question: "Why does my encoded string end with = signs?",
          answer:
            "Base64 processes input in 3-byte groups that map to 4 output characters. When the final group has only one or two bytes left over, padding characters are appended so the output length stays a multiple of four: two = signs for one leftover byte, one = sign for two.",
        },
        {
          question: "What's the difference between Base64 and base64url?",
          answer:
            "base64url is a URL-safe variant defined in RFC 4648 that replaces the + and / characters with - and _, and usually drops the = padding. It's what JWTs and many URL parameters use, because the standard characters would otherwise need percent-encoding.",
        },
        {
          question: "How much larger does Base64 make my data?",
          answer:
            "About 33% larger, since every 3 bytes become 4 characters, plus up to 2 padding characters. That's the main reason inlining large images as data URIs is usually a worse trade than serving them as separate cacheable files.",
        },
        {
          question: "How is non-ASCII text like emoji handled?",
          answer:
            "Text is first converted to bytes using UTF-8, and those bytes are then Base64-encoded. This means a multi-byte character such as an emoji contributes several bytes to the input, so the encoded output is longer than the visible character count suggests.",
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
        "A UUID (Universally Unique Identifier) is a 128-bit value used to uniquely identify information without a central authority. It's written as 36 characters — 32 hexadecimal digits split into five hyphenated groups in the pattern 8-4-4-4-12. This tool generates version 4 (random) UUIDs using your browser's cryptographically secure random number generator, so every value is produced locally and never transmitted.",
      howToUse: [
        "Choose how many UUIDs you want to generate.",
        "Click Generate to create new UUIDs instantly.",
        "Copy a single UUID or all of them at once.",
      ],
      benefits: [
        "Generate unique identifiers for database records, API keys or test data.",
        "Uses the Web Crypto API for cryptographically strong randomness.",
        "Create IDs client-side or across distributed services without any central coordination or sequence server.",
        "Produce many UUIDs at once for seeding fixtures, load tests or sample datasets.",
      ],
      commonMistakes: [
        "Assuming UUIDs are sequential or predictable — v4 UUIDs are intentionally random.",
        "Using a UUID as a secret or auth token — uniqueness is not the same as unguessable authorisation, and v1 UUIDs in particular are partly derived from a timestamp.",
        "Storing UUIDs as 36-character text in a high-volume table when a native uuid or 16-byte binary column would be smaller and faster to index.",
      ],
      faq: [
        {
          question: "Can two generated UUIDs ever collide?",
          answer:
            "It's astronomically unlikely. UUID v4 has 122 random bits, giving a collision probability low enough to be considered practically impossible for normal use.",
        },
        {
          question: "What's the difference between UUID v1 and v4?",
          answer:
            "UUID v1 is generated from the current timestamp plus the machine's MAC address, so it's roughly ordered but can leak when and where it was created. UUID v4 is generated almost entirely from random bits, which is why it's the safe default for public identifiers and the version this tool produces.",
        },
        {
          question: "Is a UUID the same thing as a GUID?",
          answer:
            "Yes, in practice. GUID is Microsoft's name for the same 128-bit identifier described by RFC 4122 — the two terms are used interchangeably, though some Microsoft tooling displays them wrapped in braces.",
        },
        {
          question: "Why are some characters in a v4 UUID always the same?",
          answer:
            "The 13th hex digit is always 4 to mark the version, and the 17th is always 8, 9, a or b to mark the RFC 4122 variant. Those bits are reserved, which is why a v4 UUID carries 122 random bits rather than the full 128.",
        },
        {
          question: "Should I use a UUID instead of an auto-incrementing ID?",
          answer:
            "Use a UUID when IDs must be created without coordination — offline clients, multiple services, or merging data from several databases — or when you don't want row counts exposed in URLs. Auto-increment integers remain a good fit for a single database where compact, sequential primary keys give better index locality.",
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
        "This tool generates a QR code from any text, link, or contact detail you enter, rendering it directly in your browser so you can preview and download it instantly. A QR code is a two-dimensional barcode that stores your data as a grid of black and white modules, along with built-in error correction that lets scanners read it even when part of the code is dirty, damaged or partially covered.",
      howToUse: [
        "Enter the text or URL you want to encode.",
        "The QR code preview updates instantly.",
        "Adjust the size if needed, then download it as a PNG.",
      ],
      benefits: [
        "Create QR codes for links, Wi-Fi details or contact cards in seconds.",
        "No account or watermark — generated and downloaded directly in your browser.",
        "Static codes that keep working offline, since the data is inside the image rather than behind a redirect service.",
        "Download a PNG you can drop straight into print artwork, slides or packaging.",
      ],
      commonMistakes: [
        "Encoding very long text, which produces a dense QR code that's harder for cameras to scan reliably.",
        "Printing the code too small or without the surrounding quiet zone — the blank margin around the code is part of the spec and scanners need it.",
        "Inverting the colours or using low contrast between the modules and the background, which many scanners will refuse to read.",
        "Forgetting the URL scheme — a code containing example.com may be read as plain text, while https://example.com opens as a link.",
      ],
      faq: [
        {
          question: "Do these QR codes expire?",
          answer:
            "No. The QR code simply encodes the text you provide directly — it doesn't rely on a server, so it never expires or stops working.",
        },
        {
          question: "Can I change where the QR code points after printing it?",
          answer:
            "Not with a static code like this one — the destination is baked into the image. If you need to change it later, encode a URL you control and set up a redirect on your own server, so the printed code stays the same while the target changes.",
        },
        {
          question: "What is error correction and which level should I use?",
          answer:
            "QR codes add redundant data so they still scan when partly obscured. The four levels recover roughly 7% (L), 15% (M), 25% (Q) and 30% (H) of the code. Higher levels make the code denser for the same data, so L or M is fine for a clean screen or a sheet of paper, while Q or H suits stickers, packaging or codes with a logo placed over the centre.",
        },
        {
          question: "How much data can a QR code hold?",
          answer:
            "At the largest version and lowest error correction, the theoretical maximum is around 4,296 alphanumeric characters or 7,089 digits. In practice you want far less than that — long content creates tiny modules that phone cameras struggle with, so keep URLs short where you can.",
        },
        {
          question: "Can I put a logo in the middle of the code?",
          answer:
            "Usually yes, if you use a higher error correction level and keep the logo small — roughly under a fifth of the code area. Always rescan the final artwork with a couple of different phones before sending it to print.",
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
        "A JSON Web Token (JWT) encodes a header, payload and signature as three Base64URL-encoded segments joined by dots. This tool decodes the header and payload so you can inspect the claims inside — entirely in your browser, without sending your token anywhere. Because the payload is only encoded rather than encrypted, decoding needs no key at all: the signature exists to prove the token hasn't been altered, not to keep its contents private.",
      howToUse: [
        "Paste your JWT into the input.",
        "The decoded header and payload appear instantly as formatted JSON.",
        "Note: this tool does not verify the signature.",
      ],
      benefits: [
        "Quickly inspect claims like expiry, issuer or subject without a backend call.",
        "Runs entirely client-side — your token is never transmitted anywhere.",
        "Debug authentication issues by checking exp, iss and aud against what your API actually expects.",
        "See which algorithm a token was signed with by reading the alg value in the header.",
      ],
      commonMistakes: [
        "Assuming a decoded JWT is verified — decoding only reveals the contents, it doesn't confirm the token's signature is valid.",
        "Treating the payload as private — it's Base64URL-encoded, not encrypted, so anyone holding the token can read every claim inside it.",
        "Reading exp or iat as milliseconds — both are Unix timestamps in seconds, so a millisecond conversion puts the expiry thousands of years in the future.",
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
        {
          question: "What are the three parts of a JWT?",
          answer:
            "A JWT is header.payload.signature, joined by dots, with each part Base64URL-encoded. The header names the signing algorithm and token type, the payload holds the claims, and the signature is computed over the first two parts so a recipient can detect tampering.",
        },
        {
          question: "Is a JWT encrypted?",
          answer:
            "A standard signed JWT is not encrypted. Signing proves the token hasn't been altered and came from a holder of the key — it does nothing to hide the contents. If the payload genuinely must be confidential, you need JWE (encrypted tokens) or simply keep the sensitive data server-side and reference it by ID.",
        },
        {
          question: "What do the claims iat, exp and sub mean?",
          answer:
            "These are registered claims from the JWT spec: iat is the issued-at time, exp is the expiry time (both Unix timestamps in seconds), and sub identifies the subject the token is about, usually a user ID. You'll also often see iss (issuer), aud (intended audience) and nbf (not valid before).",
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
