import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },

    // ✅ [추가] rules 속성을 여기에 추가합니다.
    rules: {
      // ✅ [추가] 사용되지 않는 변수 규칙을 설정합니다.
      "@typescript-eslint/no-unused-vars": [
        "warn", // 오류(error) 대신 경고(warn)로 표시
        {
          // 💡 인자(argument) 이름이 '_'로 시작하면 무시합니다.
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
]);
