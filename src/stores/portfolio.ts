import { defineStore } from 'pinia';
import { PortfolioDetails } from '@/models/portfolio.model';

export const usePortfolioStore = defineStore('portfolio', {
  state: (): { data: PortfolioDetails | null; isLoading: boolean } => ({
    data: null,
    isLoading: false,
  }),
  actions: {
    setPortfolio(details: PortfolioDetails) {
      this.data = details;
    },
    setLoading(value: boolean) {
      this.isLoading = value;
    },
  },
});
