# mis-gastos-web

Landing page and APK distribution site for Mis Gastos — a personal finance app for Android, 100% offline.

## Stack

- **Next.js 16** (App Router, webpack)
- **Tailwind CSS v4** with shadcn primitives
- **next-intl v4** — bilingual ES / EN, `localePrefix: 'always'`
- **lucide-react** for icons
- CSS keyframe animations (replaced Framer Motion in M5 for performance)

## Development

```bash
npm install
npm run dev -- --webpack      # start dev server (webpack mode required on low-inotify systems)
npm run build                 # production build
npm run start                 # start production server
npm run lint                  # ESLint
```

> Note: Next.js 16 uses Turbopack by default. If your system has a low inotify watch limit (< 100k), pass `--webpack` to the dev command or run `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`.

## Folder structure

```
src/
  app/
    layout.tsx              # root layout (html/body, dark-mode script, fonts)
    page.tsx                # root page (proxy redirects to /es or /en)
    globals.css             # Tailwind v4 + teal palette + dark mode vars
    [locale]/
      layout.tsx            # locale layout (NextIntlClientProvider, Header, Footer)
      page.tsx              # home page (hero + CTAs)
      descargas/page.tsx    # downloads page (APK card + changelog)
      features/page.tsx     # features placeholder
      docs/page.tsx         # docs placeholder
  components/
    Header.tsx              # sticky header, nav links, locale switch, dark toggle
    Footer.tsx              # copyright, version, links
    ui/                     # shadcn primitives (badge, button, card, separator)
  i18n/
    routing.ts              # locales: ['es', 'en'], defaultLocale: 'es'
    request.ts              # next-intl server config
    navigation.ts           # createNavigation() exports (Link, useRouter, usePathname)
  proxy.ts                  # next-intl proxy (locale redirect + routing)
  lib/utils.ts              # cn() utility

messages/
  es.json                   # Spanish strings
  en.json                   # English strings

public/
  downloads/
    mis_gastos-1.1.1+3-release.apk   # Android APK (~24.9 MB)
  update.json               # OTA update manifest
```

## i18n

Routes: `/es/*` and `/en/*`. The proxy redirects `/` to the user's preferred locale via `Accept-Language`. Switch locale using the language button in the header.

## Deploy to Vercel

```bash
npm i -g vercel
vercel login
vercel --prod
```

Or push to GitHub and connect the repo from the [Vercel dashboard](https://vercel.com/new).

**Environment variables:** none required for M1.

## APK and OTA updates

- APK lives at `/downloads/mis_gastos-1.1.1+3-release.apk`
- Update manifest at `/update.json` — consumed by the Flutter app's OTA updater
- To release a new version: replace the APK in `public/downloads/`, update `public/update.json`, redeploy

## Generating documentation PDFs

The documentation PDFs are pre-generated and committed to the repo under `public/downloads/`:

- `mis-gastos-docs-es.pdf` — Spanish compendium (11 chapters)
- `mis-gastos-docs-en.pdf` — English compendium (11 chapters)

### Requirements

- Node.js 18+ with Puppeteer (installed as a devDependency — includes headless Chromium)
- A built or running Next.js server

### How to regenerate

```bash
# 1. Build the project (required before each regeneration)
npm run build

# 2. Generate both PDFs
npm run docs:pdf
```

The script will:
1. Detect if a Next.js server is already running on port 3002; if not, start `next start` on that port.
2. Launch Puppeteer, capture each of the 11 doc pages per locale.
3. Assemble a compendium HTML with cover page and TOC.
4. Render to A4 PDF with header/footer.
5. Save to `public/downloads/` and shut down any server it started.

### Using a system Chrome/Chromium

If Puppeteer can't download its bundled Chromium (e.g., restricted network), point to the system browser:

```bash
PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser npm run docs:pdf
```

### When to regenerate

- Before each new release (after updating doc content or app version)
- After adding a new documentation section
- Regeneration is manual and local — commit the updated PDFs to the repo

> **Note:** Vercel builds can run Puppeteer with `@sparticuz/chromium`, but this requires additional setup. For now, regeneration is done locally before each deploy.

## TODO — M6

- **ADB screenshots:** Replace SVG mockups (`public/mockups/home.svg`, `transactions.svg`, `reports.svg`) with real screenshots from the Android app captured via `adb exec-out screencap -p`. Requires an Android emulator or device connected via ADB. No emulator was available during M5.
- **CI PDF generation:** Set up `@sparticuz/chromium` in Vercel build hook to auto-regenerate PDFs on each deploy instead of committing them manually.
