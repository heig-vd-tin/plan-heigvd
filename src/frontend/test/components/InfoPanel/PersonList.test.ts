import {mount} from "@vue/test-utils";
import {expect, test} from "vitest";
import PersonList from "../../../src/components/InfoPanel/PersonsList.vue"
import {nextTick} from "vue";

const wrapper = mount(PersonList,{
    props : {
        people : ['a', 'b']
    }
})

test('isComponentVisible', () => {
    expect(wrapper.isVisible())
})

test('isListInvisible', () => {
    expect(wrapper.find('#list').isVisible()).toBe(false)
})

test('isListVisible', () => {
    wrapper.find('#collapse-header').trigger('change')
    nextTick()
    expect(wrapper.find('#list').isVisible())
})
