# Amozeshyar Exporter — Chrome/Firefox Extension

A professional browser extension for extracting course data from the **Amozeshyar (IAU E-Services)** system and exporting it into different formats.

---

## Features

- **One-click course data extraction** from the course table
- **Multi-page course collection** without losing previously extracted data
- **Duplicate prevention** based on course code + offering code
- **Excel export (.xlsx)** — RTL format with styled headers and optimized column widths
- **PDF export** — Professional print layout with full Persian font support
- **Column selection** before exporting files
- **Automatic Jalali date-based filenames**
- **Temporary storage** — Data is cleared when the browser is closed
- Fully **RTL-compatible minimalist UI design**

---

## Supported Domains

| Domain                   |
| ------------------------ |
| `https://eserv.iau.ir/*` |
| `https://stdn.iau.ir/*`  |
| `https://stdn2.iau.ir/*` |

---

## Installation

### Download Pre-built Extension

You can download the pre-built version of the extension directly from GitHub Releases:

**[Download Amozeshyar Exporter v1.0.0](https://github.com/EhsanKey/amozeshyar-exporter/releases/download/v1.0.0/amozeshyar-exporter-v1.0.0.zip)**

After downloading:

1. Extract the downloaded ZIP file
2. Open Chrome and navigate to:

```text
chrome://extensions
```

3. Enable **Developer mode** from the top-right corner
4. Click **Load unpacked**
5. Select the extracted **`dist`** folder
6. The extension will be installed and activated ✅

---

## Usage

1. Log in to one of the supported Amozeshyar systems
2. Open a page containing the course table
3. The extension toolbar will automatically appear at the bottom-left corner
4. Click **Register Courses** — courses from the current page will be collected
5. Navigate to the next page and click **Register Courses** again — new courses will be added
6. After collecting all courses, click **Export File**
7. In the export modal:
   - Select the desired columns
   - Enter a custom filename (optional)
   - Choose **Export Excel** or **Export PDF**

---

## Project Structure

```text
amozeshyar-exporter/
├── manifest.json                 # Manifest V3 configuration
├── package.json
├── tsconfig.json
├── webpack.config.js
├── public/
│   └── icons/                    # Extension icons (PNG and SVG)
├── dist/                         # Generated build output
└── src/
    ├── types/
    │   └── course.ts             # Course interface and helper types
    ├── constants/
    │   └── columns.ts            # Column definitions and DOM selectors
    ├── utils/
    │   ├── jalaliDate.ts         # Gregorian to Jalali date conversion (without libraries)
    │   └── domUtils.ts           # DOM utilities: createElement, showToast, ...
    ├── services/
    │   ├── storageService.ts     # chrome.storage.session wrapper
    │   ├── extractionService.ts  # HTML table data extraction
    │   ├── excelExportService.ts # Excel export using SheetJS
    │   └── pdfExportService.ts   # PDF export through Print Window
    ├── content/
    │   ├── content.ts            # Content script entry point
    │   ├── buttonInjector.ts     # Injects toolbar into the page
    │   ├── modalManager.ts       # Extraction modal rendering and management
    │   └── styles.ts             # All UI CSS styles as strings
    └── background/
        └── background.ts         # MV3 Service Worker
```

---

## Development Setup

### Prerequisites

- **Node.js** >= 18
- **npm** >= 9
- **Chrome** or **Edge** browser (Chromium-based)
- **Firefox** browser (Gecko-based)

---

### Build from Source

```bash
# 1. Clone the repository
git clone https://github.com/EhsanKey/amozeshyar-exporter.git

# 2. Navigate to the project directory
cd amozeshyar-exporter

# 3. Install dependencies
npm install

# 4. Build for production
npm run build
```

After the build process, the `dist/` folder will be generated and contain all production-ready extension files.

To install the locally built extension on Chrome:

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the generated **`dist`** folder

---

## Contributing

Contributions are welcome! 🎉

### Contribution Steps

```bash
# 1. Fork and clone the repository
git clone https://github.com/EhsanKey/amozeshyar-exporter.git
cd amozeshyar-exporter

# 2. Install dependencies
npm install

# 3. Create a new branch
git checkout -b feature/your-feature

# 4. Make your changes and build the project
npm run build

# 5. Commit and push your changes
git commit -m "feat: your description"
git push origin feature/your-feature
```

---

## License

MIT License
