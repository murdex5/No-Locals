import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser, // Useful for the client side
      },
    },
    rules: {
      // The rule to ignore variables/args starting with _
      "no-unused-vars": ["error", { 
        "argsIgnorePattern": "^_", 
        "varsIgnorePattern": "^_" 
      }],
    },
  },
];