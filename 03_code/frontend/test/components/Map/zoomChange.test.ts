import {mount} from "@vue/test-utils";
import {expect, test} from "vitest";
import ZoomChange from "../../../src/components/Map/ZoomChange.vue"
import Button from "../../../src/components/Utility/Button.vue"
import {nextTick} from "vue";

const wrapper = mount(ZoomChange,{})

test('isComponentVisible', () => {
    expect(wrapper.isVisible())
})

test('isZoomUpEventEmit', () => {
    wrapper.find('#zoomUp').trigger("click")
    nextTick()
    expect(wrapper.emitted()).toHaveProperty('zoomUp')
})

test('isZoomUpEventEmit', () => {
    wrapper.find('#zoomDown').trigger("click")
    nextTick()
    expect(wrapper.emitted()).toHaveProperty('zoomUp')
})
