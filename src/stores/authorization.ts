import { defineStore } from 'pinia';

export const useAuthStore = defineStore('authorization', {
	state: () => {
		return {
			is_auth: 0,
		}
	},
	actions: {
		logIn() {
			this.is_auth = 1;
		},
		logOut() {
			this.is_auth = 0;
		},
	},
});
