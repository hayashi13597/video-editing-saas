import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [
  ...compat.config({
    extends: [
      "next/core-web-vitals",
      "next/typescript",
      "prettier",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
      "plugin:@next/next/recommended"
    ],
    plugins: ["import", "react"],
    rules: {
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "warn",
      "no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_"
        }
      ],
      "no-console": "warn",
      "import/no-anonymous-default-export": "warn",
      "react/no-unknown-property": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off"
    },
    settings: {
      next: {
        rootDir: __dirname
      },
      react: {
        version: "detect"
      },
      "import/parsers": {
        [require.resolve("@typescript-eslint/parser")]: [
          ".ts",
          ".mts",
          ".cts",
          ".tsx",
          ".d.ts"
        ]
      },
      "import/resolver": {
        [require.resolve("eslint-import-resolver-node")]: {
          extensions: [".js", ".jsx", ".ts", ".tsx"]
        },
        [require.resolve("eslint-import-resolver-typescript")]: {
          alwaysTryTypes: true
        }
      }
    }
  })
];

export default eslintConfig;
