<<<<<<< HEAD
# Vaibhav Portfolio

A personal portfolio built with React, Vite, Tailwind CSS, Framer Motion, AOS, Material UI, Lucide icons, and optional Supabase support.

## Features

- Animated hero, about, project, certificate, tech stack, and contact sections
- Responsive dark portfolio design inspired by the reference project
- Local fallback project/comment data, so the site works without Supabase
- Optional Supabase-backed projects, certificates, comments, and admin dashboard

## Customize

Edit your main details in:

```txt
src/data/profile.js
```

Update these values first:

- `name`
- `email`
- `website`
- `resumeUrl`
- `socials`
- `projects`
- `certificates`

Replace the images in `public/` with your own photo, project screenshots, and certificate images when ready.

## Run Locally

```bash
npm install --legacy-peer-deps
npm run dev
```

Open `http://127.0.0.1:5173`.

## Build

```bash
npm run build
```

## Optional Supabase Setup

Create a `.env` file if you want live project/admin/comment data:

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Without those values, the public site uses local fallback content.
=======
# Portfolio
AI &amp; ML developer turning complex models into scalable, real-world web applications and intuitive user experiences
>>>>>>> bde008afd6d77824b0d63de6de081b71eed8d99a
