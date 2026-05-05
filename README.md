# TypeHindi — हिंदी टाइपिंग

A modern Hindi typing tutor inspired by Monkeytype, built with React + Vite.  
Live site: **https://YOUR-USERNAME.github.io/hindi-typist/**

---

## Features

- 🎯 Remington keyboard layout practice
- 📊 Real-time stats — WPM, accuracy, timer
- ✅ Character-by-character feedback with colour highlights
- 🔡 Key mapping display (English → Hindi)
- 📱 Responsive design

## How to host on GitHub Pages (step-by-step)

### 1. Create a GitHub repository
1. Go to [github.com/new](https://github.com/new)
2. Name it **`hindi-typist`** (must match the `base` in `vite.config.js`)
3. Set it to **Public**
4. Click **Create repository**

### 2. Push this code
```bash
cd hindi-typist-main
git init
git add .
git commit -m "Initial commit – TypeHindi"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/hindi-typist.git
git push -u origin main
```

### 3. Enable GitHub Pages
1. Go to your repo → **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Save

The workflow in `.github/workflows/deploy.yml` will automatically build and deploy on every push to `main`.  
Your site will be live at: `https://YOUR-USERNAME.github.io/hindi-typist/`

---

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
```

Output goes to `dist/`.

---

## Tech stack
- React 18
- Vite 4
- Remington Hindi keyboard character map
- Google Fonts — Tiro Devanagari Hindi

## License
MIT
