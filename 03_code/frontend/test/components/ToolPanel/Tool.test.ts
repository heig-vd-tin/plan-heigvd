import {mount} from "@vue/test-utils";
import Tool from "../../../src/components/ToolPanel/Tool.vue"
import {expect, test} from "vitest";

const text = 'test'

const wrapper = mount(Tool,{
    props : {
        toolName : text
    },
})

test('isCorrectlyMounted', () => {
    expect(wrapper.isVisible())
    expect(wrapper.get('.tool-name').text() === text)
})

