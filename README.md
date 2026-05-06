# mis-gastos-web

Landing page and APK distribution site for Mis Gastos — a personal finance app for Android, 100% offline.

## Stack

- **Next.js 16** (App Router, webpack)
- **Tailwind CSS v4** with shadcn primitives
- **next-intl v4** — bilingual ES / EN, `localePrefix: 'always'`
- **Framer Motion** for animations (M2+)
- **lucide-react** for icons

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
