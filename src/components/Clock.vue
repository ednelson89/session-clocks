<template>
    <v-row justify="center">
        <v-card bg-variant="primary" text-variant="white" header="Primary" class="text-center clock-frame">
            <p class="clock">{{ rmin }}:{{ rsec }}</p>
        </v-card>
    </v-row>
</template>

<script setup>
import { ref } from 'vue'
import { useGeneralStore } from '@/stores/general';
import { useDisplay } from 'vuetify'
import gongSound from '@/assets/asian-gong.mp3'
import drumSound from '@/assets/Drums.mp3'

const gong = new Audio(gongSound)
const drum = new Audio(drumSound)

const { mobile } = useDisplay()
const store = useGeneralStore()

// Rollover clock
let startDate = new Date()
const rmin = ref(startDate.getMinutes())
const rsec = ref()

function rolloverTime() {
    let currDate = new Date()
    let rm = currDate.getMinutes()
    let rs = currDate.getSeconds()
    rsec.value = formatTime(rs)
    if (rm >= 15 && rm < 30) {
        rmin.value = rm - 15
    } else if (rm >= 30 && rm < 45) {
        rmin.value = rm - 30
    } else if (rm >= 45 && rm < 60) {
        rmin.value = rm - 45
    } else if (rm > 0 && rm < 15) {
        rmin.value = rm
    } else if (rm == 0) {
        rmin.value = 0
    }

    // console.info('RM: ' + rm + ', RS: ' + rs)
    // Play sounds at set times
    if (rmin.value == 0 && rsec.value == 1) {
        gong.play()
        store.room1List = JSON.parse(JSON.stringify(store.longTermList1))
        store.room2List = JSON.parse(JSON.stringify(store.longTermList2))
        store.room3List = JSON.parse(JSON.stringify(store.longTermList3))
    }
    if (rmin.value == 13 && rsec.value == 30) {
        drum.play()
    }

    store.rmin = rmin.value
    store.rsec = rsec.value
}

function formatTime(i) {
    if (i < 10) { i = "0" + i }  // add zero in front of numbers < 10
    return i
}

setInterval(() => {
    rolloverTime()
}, 1000)

</script>

<style scoped>
.clock-frame {
    width: 60vw;
}

.clock {
    font-size: 5em;
}
</style>