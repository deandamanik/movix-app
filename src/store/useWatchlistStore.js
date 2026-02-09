import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useToastStore } from './useToastStore';

export const useWatchlistStore = create(
  persist(
    (set, get) => ({
      watchlist: [],
      errorMessage: null, 

      toggleWatchlist: (movie) => {
        const { watchlist } = get();
        const isExist = watchlist.some((item) => item.id === movie.id);

        if (isExist) {
          set({ 
            watchlist: watchlist.filter((item) => item.id !== movie.id),
            errorMessage: null 
          });
        } else {
          if (watchlist.length >= 5) {
            useToastStore.getState().showToast('Watchlist is full! Maximum 5 movies allowed.');
            
            setTimeout(() => set({ errorMessage: null }), 3000);
          } else {
            set({ 
              watchlist: [...watchlist, movie],
              errorMessage: null 
            });
          }
        }
      },

      isInWatchlist: (movieId) => {
        return get().watchlist.some((item) => item.id === movieId);
      },
      clearError: () => set({ errorMessage: null })
    }),
    {
      name: 'movie-watchlist', 
    }
  )
);