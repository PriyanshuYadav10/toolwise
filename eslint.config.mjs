import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // These React Compiler-oriented rules assume the compiler is enabled
      // (it isn't, in next.config.ts). They flag standard, correct patterns
      // this codebase relies on: setState inside an effect to store the
      // result of an async operation (crypto.subtle.digest, QRCode.toDataURL,
      // debounced recompute), and reading Date.now() during render for a
      // live clock/expiry check. Downgraded to warnings rather than build-
      // blocking errors.
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/purity": "warn",
      // Flags any component reference not statically declared at module
      // scope, including our componentKey -> component registry lookup
      // (src/lib/tool-components.tsx + tool-widget.tsx), even when memoized
      // with useMemo keyed on the stable componentKey. That registry pattern
      // is required for a tool catalog that can grow to hundreds of tools
      // without a giant static switch statement.
      "react-hooks/static-components": "warn",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
