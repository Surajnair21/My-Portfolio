# Suraj Nair — Portfolio

Ultra-modern 3D interactive portfolio — React + Three.js + Node.js + MongoDB.
---

LIVE HOSTED ON: https://portfoliosurajnair.vercel.app

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 19, Vite, React Router v7 |
| 3D | Three.js, React Three Fiber, Drei |
| Animations | Framer Motion, GSAP + ScrollTrigger, Lenis |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Hosting | Vercel (frontend) · Render (backend) |

---

## Running Locally

### 1. Clone the repo
```bash
git clone https://github.com/Surajnair21/portfolio.git
cd portfolio
```

### 2. Frontend
```bash
cd client
npm install
npm run dev          # http://localhost:5173
```

### 3. Backend
```bash
cd server
cp .env.example .env  # then edit MONGO_URI
npm install
npm start            # http://localhost:5000
```

## Deployment

### Frontend → Vercel
1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repo
3. Set root directory to `client`
4. Build command: `npm run build`, Output: `dist`
5. Add env var: `VITE_API_URL=https://your-backend.onrender.com`

### Backend → Render
1. Go to [render.com](https://render.com) → New Web Service
2. Connect your GitHub repo
3. Set root directory to `server`
4. Start command: `npm start`
5. Add environment variables: `MONGO_URI`, `CLIENT_URL`, `PORT`

---

## Features

- ✅ React Router SPA
- ✅ 3D WebGL hero scene (Three.js, 3000 particles)
- ✅ Framer Motion + GSAP animations
- ✅ Dark / Light mode toggle
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Animated loading screen + custom cursor
- ✅ Contact form → MongoDB
- ✅ CV download (PDF + DOCX) from backend
- ✅ `.env` not pushed to GitHub

---

## Contact

**Suraj Nair** — nairsuraj2111@gmail.com · [GitHub](https://github.com/Surajnair21) · [LinkedIn](https://www.linkedin.com/in/suraj-nair-8a6ba0285)
