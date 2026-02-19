# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Goswa Pangan is a Next.js static site for the Department of Food Security (Dinas Ketahanan Pangan) in Kota Palas, Indonesia. It displays real-time food commodity pricing data — prices, markets, historical charts, and statistical tables — fetched from an external REST API.

JavaScript only (no TypeScript). Uses `output: "export"` for fully static builds.

## Commands

```bash
npm run dev      # Dev server on localhost:3000
npm run build    # Static export to ./out/
npm run start    # Serve production build
npm run lint     # ESLint (eslint-config-next/core-web-vitals)
```

## Environment

Requires `.env.local` with:
```
NEXT_PUBLIC_API_URL=<backend base URL>
```
See `.env.example` for template. This is the only env variable — used as base URL for all API calls.

## Architecture

**Framework**: Next.js 16 App Router, React 19, Tailwind CSS v4, chart.js + react-chartjs-2

**Static export**: `next.config.js` sets `output: "export"` and `images: { unoptimized: true }`. All pages are client components (`"use client"`) that fetch data in `useEffect` — no SSR.

**Routing** (file-based under `src/app/`):
- `/` — Home: today's commodity prices
- `/komoditas` — Commodity search/filter
- `/pasar` — Market listings
- `/statistik` — Charts + tables by market or commodity

**API layer** (`src/lib/api.js`): All fetch functions are centralized here. Every call uses `cache: "no-store"`. Endpoints:
- `/api/pasar`, `/api/komoditas`, `/api/komoditas/nama`
- `/api/harga/grafik-komoditas/:k/:m/:y`, `/api/harga/grafik-pasar/:p/:m/:y`
- `/api/harga/tabel-pasar/:p/:m/:y`, `/api/harga/tabel-komoditas/:k/:m/:y`

**Components** (`src/app/components/`): Navbar (Headless UI Disclosure for mobile), Footer, CardComplex (commodity card with price badge), CardSimple (market card), CardKomoditas (per-market stats), Dropdown, Grafik (chart.js line chart), Tabel (statistics table).

**Path alias**: `@/*` maps to `./src/*` (jsconfig.json).

## Key Gotchas

- **Chart SSR**: `Grafik.js` uses `next/dynamic` with `ssr: false` because chart.js needs browser APIs.
- **Missing deps in package.json**: `@headlessui/react`, `@heroicons/react`, `chart.js`, `react-chartjs-2` are used in source but not listed. Run `npm install @headlessui/react @heroicons/react chart.js react-chartjs-2` if fresh install fails.
- **Indonesian locale**: Prices formatted with `toLocaleString("id-ID")`, currency is Rupiah (Rp).
- **Domain terms**: Komoditas = commodities, Pasar = markets, Harga = price, Statistik = statistics, Beranda = home, Satuan = unit, Selisih = price difference, Bulan/Tahun = month/year.
