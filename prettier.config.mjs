/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
export default {
    trailingComma: 'es5',
    tabWidth: 4,
    semi: false,
    singleQuote: true,
    bracketSpacing: false,
    printWidth: 180,
    arrowParens: 'avoid',
    plugins: [
        //
        'prettier-plugin-tailwindcss',
        '@trivago/prettier-plugin-sort-imports',
    ],

    tailwindFunctions: ['tw'],
    tailwindStylesheet: './src/app/globals.css',

    importOrder: [
        //
        '^server-only$',
        '^[./]',
        '<THIRD_PARTY_MODULES>',
        '^@/app(/.*)?$',
        '^@/server(/.*)?$',
        '^@/model(/.*)?$',
        '^@/lib(/.*)?$',
        '^@/components(/.*)?$',
    ],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
}
