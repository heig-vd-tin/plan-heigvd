// Store the current state of the type of display

import {defineStore} from "pinia";
import _default from "ol/render/canvas/BuilderType";
import DEFAULT = _default.DEFAULT;

export const displayStore = defineStore('display', () => {
    const mode = {
        default : 'DEFAULT',
        byType : 'BY_TYPE'
    }
    const currentMode = mode.default

    return {
        mode,
        currentMode
    }
})
