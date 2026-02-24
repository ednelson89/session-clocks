import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGeneralStore = defineStore('general', () => {
  const room1List = ref([])
  const room2List = ref([])
  const room3List = ref([])
  const rmin = ref()
  const rsec = ref()
  const mute = ref(false)
  const longTermList1 = ref()
  const longTermList2 = ref()
  const longTermList3 = ref()

  return {
    room1List,
    room2List,
    room3List,
    rmin,
    rsec,
    mute,
    longTermList1,
    longTermList2,
    longTermList3,
  }
})
