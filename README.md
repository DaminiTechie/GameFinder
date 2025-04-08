🎮 GameFinder
GameFinder is a modern web application designed to help users discover and track their favorite video games. Built with React and integrated with the RAWG API, it offers a seamless and interactive experience for gamers.


🌐 Live Application
Check out the live version of GameFinder: https://game-finder-rsq6.vercel.app/

🛠️ Tech Stack
Frontend: React, React Router, React Bootstrap, Framer Motion


API Integration: RAWG Video Games Database API

Authentication: Clerk for user management

State Management: React Hooks

⚙️ Features
🔍 Game Search: Search for games using the RAWG API.

📋 Game Details: View detailed information about each game, including release date, genres, and ratings.

🧾 User Authentication: Sign up and log in using Clerk authentication.

📚 Personal Library: Add games to your personal library for easy tracking.

🎨 Responsive Design: Optimized for both desktop and mobile devices.

🌟 Animated Interface: Smooth animations using Framer Motion for an enhanced user experience.


📡 API Usage
We're using RAWG.io to fetch game data. Sign up and get a free API key.

🛠️ Local Development Setup
1.  Clone the Repository

git clone https://github.com/yourusername/gamefinder.git
cd gamefinder

2.  Install Dependencies
   npm install

3. Setup Environment Variables

   Create a .env file in the root:

   VITE_RAWG_API_KEY=your_rawg_api_key
  VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key

4. Run the App
    npm run dev


⚙️ Project Structure

   GameFinder/
├── node_modules/
├── public/
│   └── index.html
├── src/
│   ├── assets/         # Images, icons, etc.
│   ├── components/     # Navbar, Search, GameCard, etc.
│   ├── pages/          # Home, GameDetail, etc.
│   ├── App.jsx
│   └── main.jsx
├── .env                # Environment variables (API keys)
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js


👤 Author
Made with ❤️ by Damini

📧 Email: your-email@example.com

🐙 GitHub: @your-github

💼 Portfolio: (Optional)


    

