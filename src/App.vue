<template>
  <v-app>
    <v-container>
      <Navigation></Navigation>
    </v-container>
    <v-main id="v-main-div">
      <v-container :fluid="true" class="content-container">
        <Clock></Clock>
        <v-row>
          <ListView :roomNumber="1"></ListView>
          <ListView :roomNumber="2"></ListView>
          <ListView :roomNumber="3"></ListView>
        </v-row>
      </v-container>
    </v-main>
    <button @click="gong.play()">Times Up: Gong</button>
    <button @click="drum.play()">90 Seconds: Drums</button>
    <button @click="chime.play()">Room 1: Chime</button>
    <button @click="beep.play()">Room 2: Beep</button>
    <button @click="horn.play()">Room 3: Horn</button>
  </v-app>
</template>

<script setup>
import Clock from './components/Clock.vue';
import Navigation from './components/Navigation.vue';
import ListView from './components/ListView.vue';

import chimeSound from '@/assets/level_change.mp3'
import beepSound from '@/assets/beep.mp3'
import hornSound from '@/assets/horn.mp3'

import gongSound from '@/assets/asian-gong.mp3'
import drumSound from '@/assets/Drums.mp3'

const gong = new Audio(gongSound)
const drum = new Audio(drumSound)
const chime = new Audio(chimeSound)
const beep = new Audio(beepSound)
const horn = new Audio(hornSound)
</script>


<style scoped></style>
