<template>
    <input v-if="renderFileInput" type="file" ref='file' id="importInput" @input="importFile">
    <v-btn @click="$refs.file.click()">
        <!--         <label for="importInput" class="customLoadBtn">Load Session Plan</label>
 --> Load Session Plan
    </v-btn>

</template>

<script setup>
import { ref, computed, nextTick } from 'vue';
import { saveAs } from 'file-saver'
import { useGeneralStore } from '@/stores/general';

const store = useGeneralStore()
const renderFileInput = ref(true)

// Save
const saveToFile = () => {
    // console.info('Save File')
    let tempDate = new Date()
    let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    let fileName = `SessionPlan - ${tempDate.toLocaleDateString('en-US', options)}`
    fileName = fileName.replaceAll(',', ' -')
    let temp = {
        room1List: store.room1List,
        room2List: store.room2List,
        room3List: store.room3List,
    }
    let blob = new Blob([JSON.stringify(temp)], { type: 'application/json' })
    saveAs(blob, fileName)
}

// Load
const file = ref()
const inData = ref()

const fileName = computed(() => file.value?.name);
const fileExtension = computed(() => fileName.value?.substr(fileName.value?.lastIndexOf(".") + 1));
const fileMimeType = computed(() => file.value?.type);

const importFile = async (event) => {
    store.room1List = []
    store.room2List = []
    store.room3List = []

    // console.info('Load File', event)
    file.value = event.target.files[0]
    // console.info('File: ', file.value)

    const reader = new FileReader();
    reader.readAsText(file.value);
    reader.onload = async () => {
        const encodedFile = JSON.parse(reader.result);
        inData.value = {
            file: encodedFile,
            fileName: fileName.value,
            fileExtension: fileExtension.value,
            fileMimeType: fileMimeType.value,
        };
        // console.info('inData: ', inData.value.file)

        let temp1 = 0
        inData.value.file.room1List.forEach((item, ind) => {
            if (ind > 0) {
                item.expire = temp1 + item.eDur
                temp1 = temp1 + item.eDur
            } else {
                item.expire = item.eDur
                temp1 = item.eDur
            }
        })

        let temp2 = 0
        inData.value.file.room2List.forEach((item, ind) => {
            if (ind > 0) {
                item.expire = temp2 + item.eDur
                temp2 = temp2 + item.eDur

            } else {
                item.expire = item.eDur
                temp2 = item.eDur
            }
        })

        let temp3 = 0
        inData.value.file.room3List.forEach((item, ind) => {
            if (ind > 0) {
                item.expire = temp3 + item.eDur
                temp3 = temp3 + item.eDur
            } else {
                item.expire = item.eDur
                temp3 = item.eDur
            }
        })

        // Store copies to Pinia
        store.room1List =  JSON.parse(JSON.stringify(inData.value.file.room1List))
        store.room2List =  JSON.parse(JSON.stringify(inData.value.file.room2List))
        store.room3List =  JSON.parse(JSON.stringify(inData.value.file.room3List))
        
        store.longTermList1 =  JSON.parse(JSON.stringify(inData.value.file.room1List))
        store.longTermList2 =  JSON.parse(JSON.stringify(inData.value.file.room2List))
        store.longTermList3 =  JSON.parse(JSON.stringify(inData.value.file.room3List))

        inData.value = {}

        renderFileInput.value = false
        await nextTick();
        renderFileInput.value = true
    }

}
</script>

<style scoped>
input[type="file"] {
    display: none;
}

.customLoadBtn {
    display: inline-block;
    cursor: pointer;
    width: 100%;
    height: 100%;
}
</style>