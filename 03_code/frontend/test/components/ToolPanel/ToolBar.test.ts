import {mount} from "@vue/test-utils";
import ToolBar from '../../../src/components/ToolPanel/ToolBar.vue'
import {expect, test} from "vitest";
import {createTestingPinia} from "@pinia/testing";

const wrapper = mount(ToolBar,{
    global: {
        plugins: [createTestingPinia()],
    },
})

test('isComponentVisible', () => {
    expect(wrapper.isVisible())
})
