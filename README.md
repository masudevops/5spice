# 5 Spice Market & Kitchen

A premium, community-focused website for **5 Spice**, a halal market and kitchen opening in Plano, Texas in early 2027, In Sha Allah.

Built with **Node.js**, **React**, **Vite**, and **TailwindCSS**.

> **Updating content?** (menu, menu photos, weekly deals, location details, page copy, and prompts for Claude Code) See [`docs/MAINTAINER-GUIDE.md`](docs/MAINTAINER-GUIDE.md).
>
> **What's next?** Upcoming website work and open questions are tracked in [`docs/NEXT-STEPS.md`](docs/NEXT-STEPS.md).

## 🎨 New Brand Identity
- **Primary Colors**: Charcoal (`#1C1C1C`), warm cream (`#F8F5EF`), gold (`#B88A3D`), green (`#2D6A3F`), and orange (`#D4500A`).
- **Aesthetic**: Spacious, cream backgrounds, elegant serif typography, and high-quality imagery.
- **Philosophy**: "Authentic Flavors. Quality You Trust. Community We Care About."

## 🚀 Key Features
- **SITE_MODE Configuration**: Controls the public facing state of the website via environment variables.
  - **`coming_soon`**: A strict, locked "Stealth Mode" landing page. Hides all navigation, footer, and links. Used for pre-launch anticipation.
  - **`live`**: The full site (the default).
- **Dual Functionality**: Dedicated, distinct sections for **The Market** (Grocery) and **The Kitchen** (Restaurant).
- **Mobile-First**: Fully responsive design with optimized mobile navigation.
- **Dark Mode**: Premium dark theme using Charcoal and Gold accents.

## 🛠 Tech Stack
- **Frontend**: React, Vite, TailwindCSS, React Router, Lucide Icons.
- **Backend**: Node.js, Express.
- **Data**: JSON-based storage (located in `server/data/`).

## 📂 Project Structure
```
five-spice/
├── client/           # React Frontend
│   ├── .env          # Environment config (SITE_MODE)
│   ├── src/
│   │   ├── components/  # Navbar, Footer, Heroes, etc.
│   │   ├── pages/       # Landing, Market, Kitchen, etc.
│   │   └── ...
│   └── ...
├── server/           # Express Backend
│   ├── data/         # JSON data (products, menu, store info)
│   └── index.js      # Server entry point
└── DEPLOYMENT.md     # Deployment instructions
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16+)
- npm

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd five-spice
   ```

2. **Setup and Run Backend:**
   ```bash
   cd server
   npm install
   node index.js
   ```
   *Server runs on http://localhost:5000*

3. **Setup and Run Frontend:**
   (In a new terminal)
   ```bash
   cd client
   npm install
   npm run dev
   ```
   *Client runs on http://localhost:5173 (or 5174)*

4. **Easy Start Script (Mac/Linux):**
   We've included a helper script to manage the app easily.
   ```bash
   ./manage_app.sh
   ```
   *Options: Start Dev Mode, Install Dependencies, Build, Stop All.*

## ⚙️ Configuration
**Setting the Site Mode:**
Edit `client/.env`:
```env
# Options: coming_soon | live
VITE_APP_SITE_MODE=coming_soon
```

## 📦 Deployment (Vercel)
When deploying to Vercel, you must set the **Environment Variables** in your project settings:
1.  Go to **Settings** > **Environment Variables**.
2.  Add `VITE_APP_SITE_MODE`.
3.  Value: `coming_soon` (to lock the site) or `live` (to launch).
4.  Redeploy if you change this value.

## 📝 Customization
- **Content**: Update JSON files in `server/data/` to change products or menu items.
- **Styling**: Modify `client/tailwind.config.js` to adjust brand colors.

## 📦 Deployment
See [DEPLOYMENT.md](./DEPLOYMENT.md) for instructions on deploying to Vercel, Azure, or AWS.
