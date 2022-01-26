# 1. Create Next.js App

```
npx create-next-app@latest <app_name> --ts
```

# 2. Cleanup initial fies

# 3. Install Tailwind

## Install Tailwind

```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## tailwind.config.js

```js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## Add Tailwind to globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Check if it Works

# 4. Install Styled components

## Install SD & babel plugin

```
npm i styled-components
npm i @types/styled-components --save-dev

npm i -D babel-plugin-styled-components
```

## .babelrc

```json
{
  "presets": ["next/babel"],
  "plugins": [["styled-components", { "ssr": true, "displayName": true }]]
}
```

## Add \_document.tsx

### Links:

#### https://nextjs.org/docs/advanced-features/custom-document

#### https://dev.to/rffaguiar/nextjs-typescript-styled-components-1i3m

```tsx
import React, { ReactElement } from "react";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentInitialProps,
  DocumentContext,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render(): ReactElement {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Neonderthaw&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

# 5. Add twin.macro

### Links:

#### https://github.com/ben-rogerson/twin.examples/tree/master/next-styled-components

```
npm i twin.macro
npm i babel-plugin-macros
npm i @types/babel-plugin-macros --save-dev
```

### Add babel-plugin-macros.config.js

```js
module.exports = {
  twin: {
    preset: "styled-components",
    autoCssProp: false,
  },
};
```

### Update .babelrc

```json
{
  "presets": [["next/babel", { "preset-react": { "runtime": "automatic" } }]],
  "plugins": [
    "babel-plugin-macros",
    ["babel-plugin-styled-components", { "ssr": true }]
  ]
}
```

#### VSCODE extenstion: Tailwind Twin IntelliSense

### index.tsx

```tsx
import type { NextPage } from "next";
import styled from "styled-components";
import tw from "twin.macro";

const StyledTitle = styled.h1`
  color: red;
  background-color: blue;
  font-size: 3rem;
  padding: 0;
`;

const TailwindStylesTitle = tw.h1`
  bg-green-500 text-yellow-500 text-5xl
`;

const Home: NextPage = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col gap-4">
      <h1 className="text-5xl bg-black text-white">Hello Tailwind</h1>
      <StyledTitle>Hello Styled-component</StyledTitle>
      <TailwindStylesTitle>Hello Twin Macro</TailwindStylesTitle>
    </div>
  );
};

export default Home;
```

### twin.d.ts

```ts
import "twin.macro";
import styledImport, { CSSProp, css as cssImport } from "styled-components";

declare module "twin.macro" {
  // The styled and css imports
  const styled: typeof styledImport;
  const css: typeof cssImport;
}

declare module "react" {
  // The css prop
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: CSSProp;
    tw?: string;
  }
  // The inline svg css prop
  interface SVGProps<T> extends SVGProps<SVGSVGElement> {
    css?: CSSProp;
    tw?: string;
  }
}

// The 'as' prop on styled components
declare global {
  namespace JSX {
    interface IntrinsicAttributes<T> extends DOMAttributes<T> {
      as?: string | Element;
    }
  }
}
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", "twin.d.ts"],
  "exclude": ["node_modules"]
}
```

### index.tsx

```tsx
import type { NextPage } from "next";
import tw, { styled } from "twin.macro";

const StyledTitle = styled.h1`
  color: red;
  background-color: blue;
  font-size: 3rem;
  padding: 0;
`;

const TailwindStylesTitle = tw.h1`
  bg-green-500 text-yellow-500 text-5xl
`;

const ConditionalTW = styled.div<{ isRed: boolean }>`
  ${tw`text-white
    font-bold
    py-2
    px-4
    border
    border-black
    rounded`}
  ${({ isRed }) =>
    isRed
      ? tw`bg-red-500 hover:bg-red-700`
      : tw`bg-blue-500 hover:bg-blue-500`};
`;

const Home: NextPage = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col gap-4">
      <h1 className="text-5xl bg-black text-white">Hello Tailwind</h1>
      <StyledTitle>Hello Styled-component</StyledTitle>
      <TailwindStylesTitle>Hello Twin Macro</TailwindStylesTitle>
      <ConditionalTW isRed={true}>Conticional TW</ConditionalTW>
    </div>
  );
};

export default Home;
```

# 6.Update ESLint config

### Add eslint-plutin-tailwind

```
npm i -D eslint-plugin-tailwindcss
```

### Update .eslintrc.json

```json
{
  "extends": ["next/core-web-vitals", "plugin:tailwindcss/recommended"],
  "rules": {
    "no-unused-vars": "error",
    "tailwindcss/classnames-order": "error",
    "tailwindcss/no-custom-classname": "off",
    "tailwindcss/enforces-shorthand": "error",
    "tailwindcss/no-contradicting-classname": "error"
  }
}
```

# 7. Install Prettier

### Install Prettier

```
npm i -D prettier
```

### Install eslint-config-prettier

```
npm i -D eslint-config-prettier
```

### Add Prettier to .eslintrc.json

```
{
  "extends": [
    "next/core-web-vitals",
    "prettier",
    "plugin:tailwindcss/recommended"
  ],
  "rules": {
    "no-unused-vars": "error",
    "tailwindcss/classnames-order": "error",
    "tailwindcss/no-custom-classname": "off",
    "tailwindcss/enforces-shorthand": "error",
    "tailwindcss/no-contradicting-classname": "error"
  }
}
```

### Add .prettierrc

```json
{
  "endOfLine": "lf",
  "printWidth": 80,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

# 8. Add Ignore files

### Install VSCode extensions: ESLint, Prettier

### Add .prettierignore

```
.next
out
node_modules
yarn.lock
package-lock.json
public
```

### Add .eslintignore

```
.next
out
node_modules
yarn.lock
package-lock.json
public
```

# 9. Update editor config

### Add .vscode/settings.json

```json
{
  "editor.formatOnPaste": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.format": true
  }
}
```

# 10. Setup Husk

### Install & Init husky

```
npx husky-init
npm install
```

### Add testing scripts

```json
   "check-types": "tsc --pretty --noEmit",
    "check-format": "prettier --check .",
    "check-lint": "eslint . --ext ts --ext tsx --ext js",
    "format": "prettier --write .",
    "test-all": "npm run check-format && npm run check-lint && npm run check-types && npm run build",
```

### Update .husky/pre-commit

```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo '🏗️👷 Styling, testing and building your project before committing'

# Check Prettier standards
npm run check-format ||
(
    echo '🤢🤮🤢🤮 Its FOKING RAW - Your styling looks disgusting. 🤢🤮🤢🤮
            Prettier Check Failed. Run npm run format, add changes and try commit again.';
    false;
)

# Check ESLint Standards
npm run check-lint ||
(
        echo '😤🏀👋😤 Get that weak shit out of here! 😤🏀👋😤
                ESLint Check Failed. Make the required changes listed above, add changes and try to commit again.'
        false;
)

# Check tsconfig standards
npm run check-types ||
(
    echo '🤡😂❌🤡 Failed Type check. 🤡😂❌🤡
            Are you seriously trying to write that? Make the changes required above.'
    false;
)

# If everything passes... Now we can commit
echo '🤔🤔🤔🤔... Alright.... Code looks good to me... Trying to build now. 🤔🤔🤔🤔'

npm run build ||
(
    echo '❌👷🔨❌ Better call Bob... Because your build failed ❌👷🔨❌
            Next build failed: View the errors above to see why.
    '
    false;
)

# If everything passes... Now we can commit
echo '✅✅✅✅ You win this time... I am committing this now. ✅✅✅✅'
```
