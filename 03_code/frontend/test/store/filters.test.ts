import {createPinia, setActivePinia} from "pinia";
import {filtersStore} from "../../src/stores/Filters";
import {expect, test} from "vitest";
import {getResourcesList} from "../../src/mapElement/Feature";

setActivePinia(createPinia())

const store = filtersStore()

const list = ['b', 'a', 'c']

store.initStore(list)

test('isFilterStoreInitialized', () => {
    expect(store.list === list.sort())
    expect(store.checked === list.sort())
})

store.remove('a')

test('isFilterUnchecked', () => {
    expect(store.list === list.sort())
    expect(store.checked === ['b', 'c'])
})

store.push('a')

test('isFilterChecked', () => {
    expect(store.list === list.sort())
    expect(store.checked === ['a', 'b', 'c'])
})
