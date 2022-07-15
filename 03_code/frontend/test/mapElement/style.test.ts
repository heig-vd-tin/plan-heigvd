import {Feature} from "ol";
import {randomFeature, randomFeature2, randomFeature3} from "../data/testData";
import {expect, test} from "vitest";
import {
    hoverStyleFunction,
    labelStyleFunction,
    ressourceStyleFunction,
    selectedStyleFunction
} from "../../src/mapElement/style";
import {Style, Text} from "ol/style";

const feature1 = randomFeature[0]
const feature2 = randomFeature2[0]
const feature3 = randomFeature3[0]

/* TODO change
test('testLabelStyleFunction', () => {
    const style = labelStyleFunction(feature1)
    expect(style.getText().getText() === 'test')
})*/

test('selectedStyleFunction', () => {
    const style1 = selectedStyleFunction(feature1)
    const style2 = selectedStyleFunction(feature2)
    const style3 = selectedStyleFunction(feature3)
    expect(style1.getText().getText() === 'test')
    expect(style2.getImage().getScale() === 0.25)
    expect(style3 === new Style())
})

test('hoverStyleFunction', () => {
    const style1 = hoverStyleFunction(feature1)
    const style2 = hoverStyleFunction(feature2)
    expect(style1.getText().getText() === 'test')
    expect(style2.getImage().getScale() === 0.25)
})

test('hoverStyleFunction', () => {
    const style = ressourceStyleFunction(feature2)
    expect(style.getImage().getScale() === 0.2)
})
