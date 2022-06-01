import {expect, test} from "vitest"
import {mount} from "@vue/test-utils"
import Map from "../../src/components/Map.vue"

test('mount map', async () => {
    const wrapper = mount(Map, {
        props: {
            center : [0, 0],
            zoom : 0
        },
    })
    expect(wrapper.isVisible())
})
