# 🎮 Game Library App

A responsive web application for discovering and exploring video games using the RAWG API.

🚀 **Live Demo**:https://game-finder-qst5.vercel.app/

## 🚀 Features

### Game Discovery
- 🖼️ Interactive game cards with cover images
- 📝 Game details (title, release date, rating)
- 🏷️ Genres and tags display

### Filtering System
- 🔍 Filter by category/genre
- 📅 Filter by release year
- ⭐ Sort by popularity/rating

### Technical Features
- 🌐 Responsive design (mobile & desktop)
- ⚡ Fast API data fetching
- 🎨 Clean UI with Bootstrap styling
- 🔒 API key security

## 🛠️ Installation

### Prerequisites

- RAWG API key 

### Setup Steps
1. Clone repository:
   ```bash
   git clone https://github.com/DaminiTechie/GameFinder.git
   cd GameFinder


2.  Install dependencies:
    npm install

3. Create .env file:
    VITE_RAWG_API_KEY=dbb047ced4114becacf6ba4e979d120c


4. Start development server:
    npm run dev 

5. Open in browser:
    http://localhost:5173/



⚙️ Tech Stack
    Component	Technology
    Frontend	React
    Styling	    Bootstrap
    API	        RAWG
    Build Tool	Vite
    State Management	Context API


❗ Known Issues
    Some games show "No description available" (API data limitation)

     API rate limits may affect performance during heavy use

    Mobile filters need optimization for small screens


