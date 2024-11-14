Start backend and frontend servers before running the tests.

```bash
npm run backend
npm run frontend
```

Run the tests separately due to test timeout issues.

```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```