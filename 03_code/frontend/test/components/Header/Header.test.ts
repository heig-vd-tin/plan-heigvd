import {mount} from "@vue/test-utils";
import Header from "../../../src/components/Header/Header.vue"
import {expect, test} from "vitest";

const wrapper = mount(Header,{})

test('isComponentVisible', () => {
    expect(wrapper.isVisible())
})

test('barBtnIsVisible', () => {
    expect(wrapper.find('#bar-btn').isVisible())
    expect(wrapper.find('#cross-btn').isVisible()).toBe(false)
})

console.log( wrapper.find('#bar-btn'))

test('crossBtnIsVisible', async () => {
    await wrapper.find('#bar-btn').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('btnClick')
    expect(wrapper.find('#bar-btn').isVisible()).toBe(false)
    expect(wrapper.find('#cross-btn').isVisible())
})
