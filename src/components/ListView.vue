<template>
    <v-col :cols="mobile ? '12' : '4'">
        <h3>Room {{ roomNumber }} |
            <v-btn icon v-if="muteM == true" @click="toggleMute">
                <v-icon>mdi-volume-off</v-icon></v-btn>
            <v-btn icon v-if="muteM == false" @click="toggleMute">
                <v-icon>mdi-volume-high</v-icon></v-btn>
        </h3>
        <div class="drag-container">
            <div v-for="(item, index) in roomNumber == 1 ? store.room1List : roomNumber == 2 ? store.room2List : store.room3List"
                :key="item.id" class="drag-item">
                {{ index + 1 }}. {{ item.eName }} | x{{ item.eReps }} | {{ item.eDur }}sec
            </div>
        </div>
    </v-col>
</template>
<script setup>
import { ref, watch, computed } from 'vue';
import { useGeneralStore } from '@/stores/general';
import { useDisplay } from 'vuetify'

import chimeSound from '@/assets/level_change.mp3'
import beepSound from '@/assets/beep.mp3'
import hornSound from '@/assets/horn.mp3'

const chime = new Audio(chimeSound)
const beep = new Audio(beepSound)
const horn = new Audio(hornSound)

const muteM = ref(false)

function toggleMute() {
    muteM.value = !muteM.value
}

const { mobile } = useDisplay()

const store = useGeneralStore()

const props = defineProps({
    roomNumber: Number,
})

// 900s = 15m
// 3600s = 60m
const currSecs = ref(Number(0))

watch(
    () => store.rsec,
    () => {
        time()
        deleteItem()
    }
)

function time() {
    let temp1 = Number(store.rmin * 60)
    let temp2 = Number(store.rsec)
    currSecs.value = temp1 + temp2
    // console.info('Current Second of the block:', currSecs.value)
}

const deleteItem = () => {
    if (props.roomNumber == 1 && store.room1List[0] && store.room1List[0].expire <= currSecs.value) {
        store.room1List.splice(0, 1)
        if (!store.mute && muteM.value == false) {
            chime.play()
        }
    }
    if (props.roomNumber == 2 && store.room2List[0] && store.room2List[0].expire <= currSecs.value) {
        store.room2List.splice(0, 1)
        if (!store.mute && muteM.value == false) {
            beep.play()
        }
    }
    if (props.roomNumber == 3 && store.room3List[0] && store.room3List[0].expire <= currSecs.value) {
        store.room3List.splice(0, 1)
        if (!store.mute && muteM.value == false) {
            horn.play()
        }
    }

}

</script>

<style scoped>
.drag-container {
    min-height: 400px;
    padding: 20px;
    border: solid 1px #d8d7d7c7;
    border-radius: 5px;
    background-color: #4a48488d;
}

.drag-item {
    padding: 10px;
    margin: 5px 0;
    background: #f0f0f0;
    border-radius: 4px;
    cursor: move;
    transition: background 0.2s;
}

.drag-item:hover {
    background: #e0e0e0;
}

.delIcon {
    color: #151414 !important;
}

.material-symbols-outlined {
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24
}
</style>
