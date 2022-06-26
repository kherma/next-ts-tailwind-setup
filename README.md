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

# 4.Update ESLint config

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

# 5. Install Prettier

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

# 6. Add Ignore files

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

# 7. Update editor config

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

# 8. Setup Husk

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
        Next build failed: View the errors above to see why.'
  false;
)

# If everything passes... Now we can commit
echo '✅✅✅✅ You win this time... I am committing this now. ✅✅✅✅'
```
