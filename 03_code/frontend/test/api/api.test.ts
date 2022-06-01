import {expect, test} from "vitest"
import {getLines} from "../../src/api/api";
import {features} from "../mockServer/response";


test('api', async () => {
    expect (await getLines() === features)
})
