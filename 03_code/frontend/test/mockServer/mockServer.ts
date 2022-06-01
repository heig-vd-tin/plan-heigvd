import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import {features, roomNames} from "./response";




export const restHandlers = [
    rest.get(`${import.meta.env.VITE_API_URL}/line`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(features))
    }),
    rest.get(`${import.meta.env.VITE_API_URL}/polygon`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(features))
    }),
    rest.get(`${import.meta.env.VITE_API_URL}/rooms/name`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(roomNames))
    }),
    rest.get(`${import.meta.env.VITE_API_URL}/rooms/gis`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(features))
    }),
    rest.get(`${import.meta.env.VITE_API_URL}/rooms/:name`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(features))
    })
]

const server = setupServer(...restHandlers)

beforeAll(() => server.listen())

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())
