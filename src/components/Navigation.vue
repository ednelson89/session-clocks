<template>
    <v-app-bar :elevation="2" scroll-behavior="hide" scroll-threshold="308" color="#fff">
        <template v-slot:prepend>
            <img :src="logo" alt="Chimera Banner Symbol" class="banner_image" />
        </template>

        <v-app-bar-title>Chimera Cross-Training Session Clock</v-app-bar-title>

        <v-menu open-on-hover v-if="$vuetify.display.smAndDown">
            <template v-slot:activator="{ props }">
                <v-btn v-bind="props" icon @click="showMenu = !showMenu">
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>
            <v-list>
                <v-list-item>
                    <SaveLoad></SaveLoad>
                </v-list-item>
            </v-list>
        </v-menu>

        <template v-if="$vuetify.display.mdAndUp">
            <v-btn @click="store.mute = !store.mute">
                {{store.mute ? 'Un-Mute Rooms' : 'Mute Rooms'}}
            </v-btn>
            <SaveLoad></SaveLoad>
        </template>
    </v-app-bar>
</template>

<script setup>
import { ref } from 'vue'
import SaveLoad from '@/components/SaveLoad.vue';
import logo from '@/assets/ChimeraLogoTransparent.png'
import { useGeneralStore } from '@/stores/general';

const store = useGeneralStore()

const showMenu = ref(false)

</script>

<style scoped>
.banner_image {
    max-width: 3rem;
}
</style>