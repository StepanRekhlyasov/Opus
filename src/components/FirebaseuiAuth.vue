<script lang="ts">
import { auth, provider } from '../boot/firebase'
import { signInWithPopup } from '@firebase/auth';
import { defineComponent, ref } from 'vue';
import { GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'vue-router';

export default defineComponent({
			setup(){
			const showAuthPopup = ref(false)
			const signInGoogle = () => {
				signInWithPopup(auth, provider).then((result) => {
					const credential = GoogleAuthProvider.credentialFromResult(result);
					const token = credential?.accessToken;
					const user = result.user;
					console.log('Успешная авторизация: ', token, user)
				}).catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					const email = error.customData.email;
					const credential = GoogleAuthProvider.credentialFromError(error);
					console.log('Ошибка аутентификации: ', errorCode, errorMessage, email, credential)
				});
			}
			const router = useRouter()
		return {
			router,
			showAuthPopup,
			toggleAuthPopup(){
				showAuthPopup.value = !showAuthPopup.value
			},
			signInGoogle
		}
	},
})
</script>
<template>
	<div class="faWrapper">
		<q-btn color="primary" icon="mail" label="Register" @click="router.push('/register')" />
		<q-btn color="secondary" icon="mail" label="Log in" @click="router.push('/login')" />
		<q-btn color="red" icon="mail" icon-right="send" label="Authorize with Google" @click="signInGoogle"/>
	</div>
	<div id="firebaseui-auth-container" v-show="showAuthPopup">
	</div>
</template>
<style lang="scss">
	.faWrapper{
		display: flex;
		flex-direction: column;
		gap: 25px;
	}
</style>