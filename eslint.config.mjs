import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss'
import {defineConfig, globalIgnores} from 'eslint/config'

export default defineConfig([
    globalIgnores(['src/convex/_generated/**', 'postcss.config.js']),

    ...nextVitals,
    ...nextTs,

    {
        files: ['**/*.ts', '**/*.tsx'],
        extends: [eslintPluginBetterTailwindcss.configs.recommended],
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        settings: {
            tailwindcss: {
                cssConfigPath: `${import.meta.dirname}/src/app/globals.css`,
            },
        },
        rules: {
            '@typescript-eslint/no-deprecated': 'warn',
            'no-unused-vars': 'off',
            'no-duplicate-imports': 'error',
            eqeqeq: ['error', 'always'],
            '@typescript-eslint/restrict-template-expressions': [
                'error',
                {
                    allowAny: false,
                    allowBoolean: false,
                    allowNever: false,
                    allowNullish: false,
                },
            ],
            '@typescript-eslint/switch-exhaustiveness-check': [
                'error',
                {
                    considerDefaultExhaustiveForUnions: true,
                },
            ],
            '@typescript-eslint/no-unused-vars': 'error',
            '@typescript-eslint/array-type': [
                'error',
                {
                    default: 'array',
                },
            ],
            '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
            '@typescript-eslint/consistent-type-exports': 'error',
            '@typescript-eslint/consistent-type-imports': [
                'error',
                {
                    fixStyle: 'inline-type-imports',
                    prefer: 'type-imports',
                },
            ],
            'react-hooks/static-components': 'off',
            'react-hooks/set-state-in-effect': 'off',
        },
    },
])
