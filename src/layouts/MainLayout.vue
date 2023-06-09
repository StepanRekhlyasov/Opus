<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title @click="router.push('/')" style="cursor:pointer;">
          	Opus Quasar App
        </q-toolbar-title>
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
		v-model="leftDrawerOpen"
		:show-if-above="false"
		bordered
    >
      <q-list>
        <q-item-label
          	header
        >
			Main menu
        </q-item-label>
		<EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
		<div class="flexCenter">
			<q-btn color="primary" label="Show Default links" @click="toggleDefaultLinks"/>
		</div>
        <transition
			appear
			enter-active-class="animated fadeIn"
  			leave-active-class="animated fadeOut"
		>
			<div v-if="showDefaultLinks">
				<EssentialLink
							v-for="link in defaultLinks"
							:key="link.title"
							v-bind="link"
				/>
			</div>
		</transition>
      </q-list>
    </q-drawer>

    <q-page-container>
      	<router-view />
    </q-page-container>
  </q-layout>
</template>
<style lang="scss">
.flexCenter {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import { useRouter } from 'vue-router';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from 'src/boot/firebase';
import { useAuthStore } from 'src/stores/authorization';
const linksList = [
	{
		title: 'Github',
		caption: 'Project repository',
		icon: 'code',
		link: 'https://github.com/StepanRekhlyasov/Opus'
	},
]
const defaultLinks = [
	{
		title: 'Docs',
		caption: 'quasar.dev',
		icon: 'school',
		link: 'https://quasar.dev'
	},
	{
		title: 'Discord Chat Channel',
		caption: 'chat.quasar.dev',
		icon: 'chat',
		link: 'https://chat.quasar.dev'
	},
	{
		title: 'Forum',
		caption: 'forum.quasar.dev',
		icon: 'record_voice_over',
		link: 'https://forum.quasar.dev'
	},
	{
		title: 'Twitter',
		caption: '@quasarframework',
		icon: 'rss_feed',
		link: 'https://twitter.quasar.dev'
	},
	{
		title: 'Facebook',
		caption: '@QuasarFramework',
		icon: 'public',
		link: 'https://facebook.quasar.dev'
	},
	{
		title: 'Quasar Awesome',
		caption: 'Community Quasar projects',
		icon: 'favorite',
		link: 'https://awesome.quasar.dev'
	}
];

export default defineComponent({
  	name: 'MainLayout',
	components: {
		EssentialLink
	},
	setup () {
		const leftDrawerOpen = ref(false)
		const showDefaultLinks = ref(false)
		const router = useRouter()
		const authStore = useAuthStore()
		return {
			authStore,
			essentialLinks: linksList,
			defaultLinks: defaultLinks,
			leftDrawerOpen,
			router,
			showDefaultLinks,
			toggleLeftDrawer () {
				leftDrawerOpen.value = !leftDrawerOpen.value
			},
			toggleDefaultLinks(){
				showDefaultLinks.value = !showDefaultLinks.value 
			}
		}
	},
	beforeCreate(){
		onAuthStateChanged(auth, (user)=>{
			if(user){
				this.authStore.logIn()
			} else {
				this.authStore.logOut()
			}
		})
	}
});
</script>
