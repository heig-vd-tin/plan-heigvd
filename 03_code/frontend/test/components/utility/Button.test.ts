import {mount} from "@vue/test-utils";
import {createTestingPinia} from "@pinia/testing";
import {expect, test} from "vitest";
import Button from '../../../src/components/Utility/Button.vue'




const wrapper = mount(Button,{
    props : {
      selected : false
    },
    global: {
        plugins: [createTestingPinia()],
    },
})

test('isButtonVisible', () => {
    expect(wrapper.isVisible())
    expect(wrapper.find('a').exists()).toBe(true)
    expect(wrapper.find('div').exists()).toBe(false)
})

test('emittedClick ', () => {
    wrapper.find('a').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
})

test('isSelectedButtonVisible', async () => {
    await wrapper.setProps({selected : true})
    expect(wrapper.isVisible())
    expect(wrapper.find('a').exists()).toBe(false)
    expect(wrapper.find('div').exists()).toBe(true)
})


