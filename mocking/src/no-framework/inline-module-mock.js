function fn(impl = () => {}) {
	const mockFn = (...args) => {
		mockFn.mock.calls.push(args)
		return impl(...args)
	}

	mockFn.mock = { calls: [] }
	mockFn.mockImplementation = (newImpl) =>
		(impl = newImpl)

	return mockFn
}

// mocking entire utils modules ==
const utilsPath = require.resolve('../utils')
require.cache[utilsPath] = {
	id: utilsPath,
	filename: utilsPath,
	loaded: true,
	exports: {
		getWinner: fn((p1, p2) => p1),
	},
}
// ===

const assert = require('assert')
const thumbWar = require('../thumb-war')
const utils = require('../utils')

const winner = thumbWar('Uncle Bob', 'Uncle Sam')
assert.strictEqual(winner, 'Uncle Bob')
console.log(utils.getWinner.mock.calls)
assert.deepStrictEqual(
	utils.getWinner.mock.calls,
	[
		['Uncle Bob', 'Uncle Sam'],
		['Uncle Bob', 'Uncle Sam'],
	]
)

//cleanup
delete require.cache[utilsPath]
