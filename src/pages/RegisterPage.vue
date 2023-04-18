<template>
	<q-page class="row items-center justify-center column">
		<div class="wrapper">
			<h1>Register</h1>
			<q-input outlined v-model="email" label="Email" hint="With placeholder" :dense="dense" />
			<q-input outlined v-model="password" label="Password" hint="With placeholder" :dense="dense" />
			<q-btn label="register" @click="register"></q-btn>
		</div>
	</q-page>
</template>
<script setup>
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { auth } from 'src/boot/firebase';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter()
const register = () => {
	createUserWithEmailAndPassword(auth, email.value, password.value).then(()=>{
		alert('Successfully registered!')
		router.push('/')
	}).catch((error)=>{
		alert(error.message)
	})
}
</script>
<style scoped>
.wrapper{
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	gap: 20px;
}
</style>