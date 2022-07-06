import {expect, test} from "vitest"
import {mount} from "@vue/test-utils"
import Map from "../../../src/components/Map/Map.vue"
import {createTestingPinia} from "@pinia/testing";

const wrapper = mount(Map, {
    props: {
        loadingFinished : true
    },
    global: {
        plugins: [createTestingPinia()],
    },
})

test('isComponentVisible', () => {
    expect(wrapper.isVisible())
})
