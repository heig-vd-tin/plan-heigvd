import {mount} from "@vue/test-utils";
import Header from "../../../src/components/Header/Header.vue"
import Button from "../../../src/components/Utility/Button.vue"
import {expect, test} from "vitest";

const wrapper = mount(Header,{})

test('isComponentVisible', () => {
    expect(wrapper.isVisible())
})

test('barBtnIsVisible', () => {
    expect(wrapper.find('#bar-btn').isVisible())
    expect(wrapper.find('#cross-btn').isVisible()).toBe(false)
})

test('crossBtnIsVisible', async () => {
    await wrapper.findComponent(Button).vm.$emit('click')
    expect(wrapper.emitted()).toHaveProperty('btnClick')
    expect(wrapper.find('#bar-btn').isVisible()).toBe(false)
    expect(wrapper.find('#cross-btn').isVisible())
})
