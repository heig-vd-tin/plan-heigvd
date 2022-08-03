// Store the current room selected

import {defineStore} from "pinia";
import {Info, RoomSuggestion} from "../interface/interface";

export const roomSelectedStore = defineStore('roomSelected', () => {
    const selected : Info[] = []
    let selectedBySearch = false

    return {
        selected,
        selectedBySearch
    }
})
