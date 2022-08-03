import {mount} from "@vue/test-utils";
import FilterPanelSection from '../../../src/components/FilterPanel/FilterPanelSection.vue'
import {expect, test} from "vitest";

const wrapper = mount(FilterPanelSection, {
    props : {
        title : 'test',
        type : 'checkbox',
        filters : ['as', 'wc']
    }
})

test('isComponentVisible', () => {
    expect(wrapper.isVisible())
    expect(wrapper.find('.section-list').isVisible()).toBe(false)
})

test('isComponentChanged', async () => {
    await wrapper.find('#collapse-header').trigger('change')
    expect(wrapper.find('.section-list').isVisible())
    const list = wrapper.findAll('.container')
    expect(list[0].text() === 'As')
    expect(list[1].text() === 'WC')
})

test('isInputChanged', async () => {
    await wrapper.findAll('input')[0].trigger('change')
    expect(wrapper.emitted()).toHaveProperty('change')
})
