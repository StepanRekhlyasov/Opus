<template>
  <router-view />
</template>

<script lang="ts">
import { onAuthStateChanged } from '@firebase/auth';
import { defineComponent } from 'vue';
import { auth } from './boot/firebase';
import { useAuthStore } from './stores/authorization';

export default defineComponent({
  	name: 'App',
	setup(){
		const authStore = useAuthStore()
		return {
			authStore
		}
	},
	onMounted(){
		onAuthStateChanged(auth, (user)=>{
			if(user){
				this.authStore.logIn()
			} else {
				this.authStore.logOut()
			}
		})
	}
})
</script>
