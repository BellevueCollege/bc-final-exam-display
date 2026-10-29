# BC Final Exam Display

A WordPress block that shows the Bellevue College final exam schedule. Editors pick the quarter, the year, and the three exam days. The block fills in two tables: one for classes that meet on Monday and Wednesday patterns, and one for classes that meet on Tuesday and Thursday patterns.

## Add it to a page

1. In the block editor, add **BC Final Exam Display**.
2. Open the block settings.
3. Choose the quarter and year.
4. Set the three exam days.
5. Update the page.

The headings above each table can be edited in place. **Reset Table Labels** in the block settings restores the default wording.

## For developers

The block source is in `src/`. WordPress loads the compiled files from `build/`. That folder is listed in `.gitignore`, so it is created on your machine and again in the pipeline before deploy.

```bash
npm install
npm run build
```

`npm start` rebuilds while you edit.
