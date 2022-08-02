import {mount} from "@vue/test-utils";
import {createTestingPinia} from "@pinia/testing";
import BuildingChange from '../../../src/components/ToolPanel/BuildingChange.vue'
import Button from '../../../src/components/Utility/Button.vue'
import {currentBuildingStore} from "../../../src/stores/currentBuilding";
import {expect, test} from "vitest";

const wrapper = mount(BuildingChange,{
    global: {
        plugins: [createTestingPinia()],
    },
})

test('changeBuilding', () => {
    expect(wrapper.isVisible())
})

test('formatName', () => {
    expect(wrapper.vm.formatName('Cheseaux') === 'CH' )
    expect(wrapper.vm.formatName('St-Roch') === 'SR' )
})
