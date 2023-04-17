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

        <q-toolbar-title>
          	Opus Quasar App
        </q-toolbar-title>
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
		v-model="leftDrawerOpen"
		show-if-above
		bordered
    >
      <q-list>
        <q-item-label
          	header
        >
			Useless links
        </q-item-label>
		<EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
		<div class="flexCenter">
			<q-btn color="primary" label="Show Default links" @click="toggleDefaultLinks"/>
		</div>
        <template v-if="showDefaultLinks">
			<EssentialLink
						v-for="link in defaultLinks"
						:key="link.title"
						v-bind="link"
			/>
		</template>
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
const linksList = [
	{
		title: 'Github',
		caption: 'Project repository ',
		icon: 'code',
		link: 'https://github.com/StepanRekhlyasov'
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
		return {
			essentialLinks: linksList,
			defaultLinks: defaultLinks,
			leftDrawerOpen,
			showDefaultLinks,
			toggleLeftDrawer () {
				leftDrawerOpen.value = !leftDrawerOpen.value
			},
			toggleDefaultLinks(){
				showDefaultLinks.value = !showDefaultLinks.value 
			}
		}
	}
});
</script>
