import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { rest } from 'msw'

const features = {
    "type": "FeatureCollection",
    "name": "E01",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::3857" } },
    "features": [
        { "type": "Feature", "properties": { "id": 11 }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 741332.228082037414424, 5906150.825703243725002 ], [ 741336.620101196225733, 5906154.348356046713889 ], [ 741343.606650674366392, 5906145.838349445722997 ], [ 741340.147693012258969, 5906143.064065153710544 ], [ 741339.697950837085955, 5906142.702711613848805 ], [ 741339.586165209766477, 5906142.840493898838758 ], [ 741339.245608996134251, 5906142.559729997999966 ], [ 741338.972644092165865, 5906142.902885876595974 ], [ 741338.834861807292327, 5906142.783301251940429 ], [ 741332.228082037414424, 5906150.825703243725002 ] ] ] ] } }
    ]
}

const roomNames = [{name : "e01"}]


export const restHandlers = [
    rest.get('http://localhost:3001/line', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(features))
    }),
    rest.get('http://localhost:3001/polygon', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(features))
    }),
    rest.get('http://localhost:3001/rooms/name', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(features))
    }),
    rest.get('http://localhost:3001/rooms/gis', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(features))
    }),
    rest.get('http://localhost:3001/rooms/:name', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(features))
    })
]

const server = setupServer(...restHandlers)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())
