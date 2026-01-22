import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWatchlistStore = create(
  persist(
    (set, get) => ({
      watchlist: [],
      
      toggleWatchlist: (movie) => {
        const { watchlist } = get();
        const isExist = watchlist.some((item) => item.id === movie.id);

        if (isExist) {
          set({ watchlist: watchlist.filter((item) => item.id !== movie.id) });
        } else {
          set({ watchlist: [...watchlist, movie] });
        }
      },

      isInWatchlist: (movieId) => {
        return get().watchlist.some((item) => item.id === movieId);
      },
    }),
    {
      name: 'movie-watchlist', 
    }
  )
);