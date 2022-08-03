import {mount} from "@vue/test-utils";
import {expect, test} from "vitest";
import ResourceList from "../../../src/components/InfoPanel/ResourceList.vue"
import {nextTick} from "vue";

const wrapper = mount(ResourceList,{
    props : {
        resources : [{name : 'a', type : 'b'}]
    }
})

test('isComponentVisible', () => {
    expect(wrapper.isVisible())
})

test('isListInvisible', () => {
    expect(wrapper.find('.resource-item').isVisible()).toBe(false)
})

test('isListVisible', () => {
    wrapper.find('#collapse-header').trigger('change')
    nextTick()
    expect(wrapper.find('.resource-item').isVisible())
})
