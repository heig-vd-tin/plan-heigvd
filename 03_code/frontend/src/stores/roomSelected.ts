import {defineStore} from "pinia";
import {RoomSuggestion} from "../interface/interface";

export const roomSelectedStore = defineStore('roomSelected', () => {
    let selected : RoomSuggestion | undefined

    return {
        selected
    }
})
