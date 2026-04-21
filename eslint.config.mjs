import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { 
      globals: {
        ...globals.browser,
        ...globals.node
      }
    } 
  },
  js.configs.recommended,
    {
        rules: {
            // This tells ESLint to ignore variables starting with "_"
            "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
            
            // Or, if you want to completely hide the error for now:
            // "no-unused-vars": "off" 
        }
    }
]);
