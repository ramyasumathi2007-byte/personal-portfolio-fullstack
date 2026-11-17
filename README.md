# Personal Portfolio Website — Full Stack

A responsive React portfolio with an Express REST API and MongoDB storage for projects and contact messages.

## Requirements
- Node.js 18+
- MongoDB local installation or MongoDB Atlas account

## 1. Backend setup
```bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev
```
Edit `backend/.env` and set `MONGODB_URI`. The API runs at `http://localhost:5000`.

## 2. Frontend setup
Open a second terminal:
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```
Open the Vite URL (usually `http://localhost:5173`).

## 3. Features
- Responsive Home, About, Skills, Projects and Contact sections
- Projects are loaded from `GET /api/projects` (MongoDB)
- Contact form sends data to `POST /api/contact` (MongoDB)
- Health endpoint: `GET /api/health`
- Seed script inserts sample projects

## 4. Personalize it
Edit `frontend/src/data/profile.js` to update your name, degree, summary, skills, social links and project details shown in the intro. Projects in the Projects section are loaded from the database; update `backend/scripts/seed.js` to change the sample database projects.

## 5. Deploy
- Deploy backend to Render (Root Directory: `backend`, Build: `npm install`, Start: `npm start`).
- Add environment variables on Render: `MONGODB_URI`, `CLIENT_URL` (your deployed frontend URL), `PORT` (Render usually supplies this).
- Deploy frontend to Vercel (Root Directory: `frontend`, Framework: Vite, Build: `npm run build`, Output: `dist`).
- Add `VITE_API_URL` in Vercel, set to your deployed backend URL, for example `https://your-api.onrender.com`.
- Redeploy frontend after setting the variable.

Never upload `.env` files or database credentials to GitHub. Use `.env.example` as a template.
