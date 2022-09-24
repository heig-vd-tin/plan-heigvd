import {mount} from "@vue/test-utils";
import FloorChange from "../../../src/components/ToolPanel/FloorChange.vue"
import {createTestingPinia} from "@pinia/testing";
import {expect, test} from "vitest";

const wrapper = mount(FloorChange,{
    global: {
        plugins: [createTestingPinia()],
    },
})

test('componentIsVisible', () => {
    expect(wrapper.isVisible())
})
