import {mount} from "@vue/test-utils";
import {createTestingPinia} from "@pinia/testing";
import CollapseHeader from "../../../src/components/Utility/CollapseHeader.vue"
import Button from "../../../src/components/Utility/Button.vue"
import {expect, test} from "vitest";
import {nextTick} from "vue";

const wrapper = mount(CollapseHeader,{
    props : {
        title : 'test'
    },
    global: {
        plugins: [createTestingPinia()],
    },
})

test('visible', () => {
    expect(wrapper.isVisible())
    expect(wrapper.get('.collapse-title').text() === 'test')
    expect(wrapper.find('#openedIcon').isVisible()).toBe(false)
    expect(wrapper.find('#closedIcon').isVisible())
})

test('emittedChange', async () => {
    wrapper.findComponent(Button).vm.$emit('click')
    await nextTick()
    expect(wrapper.emitted()).toHaveProperty('change')
    expect(wrapper.find('#openedIcon').isVisible())
    expect(wrapper.find('#closedIcon').isVisible()).toBe(false)
})
