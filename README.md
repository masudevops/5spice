# Five Spice SuperMarket & Restaurant

A modern, mobile-first website for "Five Spice", a Halal supermarket and restaurant in DFW. Built with Node.js, React, Vite, and TailwindCSS.

## Features
- **Modern UI/UX**: Clean design with "Five Spice" branding (Deep Red, Saffron, Gold, Green).
- **Mobile-First**: Fully responsive with sticky mobile navigation.
- **Dark Mode**: Built-in toggle for light/dark themes.
- **Dual Functionality**: Dedicated sections for Supermarket (products) and Restaurant (menu).
- **Data Driven**: Content loaded from JSON files via a Node.js API.

## Tech Stack
- **Frontend**: React, Vite, TailwindCSS, React Router, Lucide Icons.
- **Backend**: Node.js, Express.
- **Data**: JSON-based storage (no database required for initial version).

## Project Structure
```
five-spice/
├── client/           # React Frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Route pages
│   │   ├── hooks/       # Custom hooks (useTheme)
│   │   └── ...
│   └── ...
├── server/           # Express Backend
│   ├── data/         # JSON data files (products, menu, store)
│   └── index.js      # Server entry point
└── DEPLOYMENT.md     # Deployment instructions
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd five-spice
   ```

2. **Install Server Dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Install Client Dependencies:**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

You need to run both the backend and frontend servers.

1. **Start the Backend:**
   ```bash
   cd server
   node index.js
   ```
   *Server runs on http://localhost:5000*

2. **Start the Frontend:**
   (Open a new terminal)
   ```bash
   cd client
   npm run dev
   ```
   *Client runs on http://localhost:5173*

## Customization
- **Content**: Update JSON files in `server/data/` to change products or menu items.
- **Styling**: Modify `client/tailwind.config.js` to adjust brand colors.

## Deployment
See [DEPLOYMENT.md](./DEPLOYMENT.md) for instructions on deploying to Vercel, Azure, or AWS.
