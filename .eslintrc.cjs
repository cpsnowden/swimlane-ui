module.exports = {
  env: { browser: true, es2020: true, "vitest-globals/env": true },
  globals: {
    vi: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:vitest-globals/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["react-refresh", "import", "prettier"],
  rules: {
    "react-refresh/only-export-components": "warn",
    "sort-imports": [
      "error",
      {
        ignoreCase: false,
        ignoreDeclarationSort: true, // don"t want to sort import lines, use eslint-plugin-import instead
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        allowSeparatedGroups: true,
      },
    ],
    "import/no-unresolved": "error",
    "import/order": [
      "error",
      {
        groups: [
          "builtin", // Built-in imports (come from NodeJS native) go first
          "external", // <- External imports
          "internal", // <- Absolute imports
          ["sibling", "parent"], // <- Relative imports, the sibling and parent types they can be mingled together
          "index", // <- index imports
          "unknown", // <- unknown
        ],
        "newlines-between": "always",
        alphabetize: {
          /* sort in ascending order. Options: ["ignore", "asc", "desc"] */
          order: "asc",
          /* ignore case. Options: [true, false] */
          caseInsensitive: true,
        },
      },
    ],
  },
  settings: {
    "import/resolver": {
      typescript: {
        project: "./tsconfig.json",
      },
    },
  },
};
