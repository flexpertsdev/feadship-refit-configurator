// ==================================================
// AI EXPLANATION: eslint.config.js
// ==================================================
// WHAT: ESLint configuration for TypeScript/React project with React hooks, refresh plugin, and TypeScript rules - disables unused vars warning
// WHY: Without this, no code quality checks - enforces coding standards, catches React hooks violations, ensures hot reload compatibility
// USED BY: ESLint CLI, VS Code ESLint extension, pre-commit hooks, CI/CD linting steps
// CRITICAL: NO - Development tooling only, app runs without it but loses code quality checks
// ==================================================

import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": "off",
    },
  }
);
