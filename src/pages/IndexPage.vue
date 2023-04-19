<template>
	<q-page class="row items-center justify-evenly">
		{{ authStore.is_auth }}
		<example-component
			title="Example fetch from Firebase"
			:active="authStore.is_auth"
			:list="taskList"
			:meta="meta"
			v-if="authStore.is_auth"
		></example-component>
		<firebaseui-auth></firebaseui-auth>
	</q-page>
</template>

<script lang="ts">
import { TaskList, Meta } from 'components/models';
import ExampleComponent from 'components/ExampleComponent.vue';
import FirebaseuiAuth from 'components/FirebaseuiAuth.vue';
import { defineComponent, ref } from 'vue';
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from 'src/boot/firebase';
import { useAuthStore } from 'src/stores/authorization';

export default defineComponent({
	name: 'IndexPage',
	components: { ExampleComponent, FirebaseuiAuth },
	setup() {
		const getTest = async function getTest() {
			const testCol = collection(db, 'test');
			const testSnapshot = await getDocs(testCol);
			const testList = testSnapshot.docs.map(doc => doc.data());
			return testList;
		}
		const authStore = useAuthStore()
		const taskList = ref<TaskList[]>([])
		const meta = ref<Meta>({
			totalCount: 1200
		});
		return { meta, getTest, taskList, authStore };
	},
	mounted(){
		this.getTest().then((data)=>{
			this.taskList = data as TaskList[]
		})
	},
});
</script>
