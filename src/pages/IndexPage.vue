<template>
	<q-page class="row items-center justify-evenly">
		<example-component
			title="Example fetch from Firebase"
			active
			:todos="testResult"
			:meta="meta"
		></example-component>
	</q-page>
</template>

<script lang="ts">
import { TestResult, Meta } from 'components/models';
import ExampleComponent from 'components/ExampleComponent.vue';
import { defineComponent, ref } from 'vue';
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from 'src/boot/firebase';

export default defineComponent({
	name: 'IndexPage',
	components: { ExampleComponent },
	setup() {
		const getTest = async function getTest() {
			const testCol = collection(db, 'test');
			const testSnapshot = await getDocs(testCol);
			const testList = testSnapshot.docs.map(doc => doc.data());
			return testList;
		}
		const testResult = ref<TestResult[]>([])
		const meta = ref<Meta>({
		totalCount: 1200
		});
		return { meta, getTest, testResult };
	},
	mounted(){
		this.getTest().then((data)=>{
			this.testResult = data as TestResult[]
		})
	},
});
</script>
