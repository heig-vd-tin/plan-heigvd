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
    wrapper.findAllComponents(Button)[0].vm.$emit("click")
    nextTick()
    expect(wrapper.emitted()).toHaveProperty('zoomUp')
})

test('isZoomUpEventEmit', () => {
    wrapper.findAllComponents(Button)[1].vm.$emit("click")
    nextTick()
    expect(wrapper.emitted()).toHaveProperty('zoomDown')
})
