import {expect, test} from "vitest";
import {mount} from "@vue/test-utils";
import Research from "../../../src/components/Header/Research.vue"
import suggestion from "../../../src/components/Header/suggestionSection.vue"

const wrapper = mount(Research,{})

test('isComponentVisible', () => {
    expect(wrapper.isVisible())
})

test('isSuggestionSectionVisible', async () => {
    await wrapper.find('#research-input').setValue('au')
    expect(wrapper.findComponent(suggestion).isVisible())
    await wrapper.find('#research-input').setValue('')
    expect(wrapper.findComponent(suggestion).isVisible()).toBe(false)
})
