/** @type { import("lint-staged").Config } */
const config = {
  "*.{tsx,ts,js}": [
    "bash -c 'pnpm typecheck'",
    "prettier --write",
    "eslint --cache --fix",
  ],
  "*.json": ["prettier --write"],
  "*.md": ["prettier --write"],
};

export default config;
