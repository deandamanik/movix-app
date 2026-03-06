# Movix-App

Movix-app is a movie discovery application I built to experiment with third-party API integration and real-time data fetching using React. Basically, this is my playground for learning how to handle dynamic data and build a smooth user interface in a modern frontend environment.

### Goal
The main purpose of this project is for me to practice and get comfortable with the React ecosystem. I wanted to see how to fetch movie data efficiently, manage different UI states (like loading spinners and error messages), and just overall build a fast, responsive search experience using clean code.

### Tech Stack:
- Framework: React (Vite)
- Styling: Tailwind CSS & Framer Motion (for animations)
- State Management: Zustand (Global Store)
- Data Fetching: Axios & TMDB API
- Icons: Lucide React

### What's Inside?
1. **Real-time Movie Discovery**: Fetches and displays trending, popular, and searched movies dynamically.
2. **Global Watchlist**: Manage your favorite movies across the app using Zustand for persistent state.
3. **Advanced Image Fallback**: A robust system that handles missing posters, backdrops, or broken API links using local assets to ensure a consistent UI.
4. **Global Notification System**: Real-time feedback for user actions (e.g., watchlist limits or trailer availability) using a custom Toast store.
5. **Interactive UI**: Smooth transitions and stagger animations powered by Framer Motion, including a custom-built Trailer Modal.
6. **Responsive & Accessible**: Optimized for various screen sizes with clean, reusable component architecture.

### How to Run:

1. **Clone the repository and install dependencies**
    ```bash
    git clone https://github.com/deandamanik/movix-app.git
    cd movix-app
    npm install
    ``` 

2. **Environment Setup**

    Copy the example environment file to create your own .env file and add your API Key:

    ```bash 
    VITE_MOVIE_API_KEY=your_api_key_here
    ```

3. **Start Server**

    ```bash
    npm run dev
    ```