const assert = require('assert')
const thumbWar = require('../thumb-war')
const utils = require('../utils')

function fn(impl) {
	const mockFn = (...args) => {
		mockFn.mock.calls.push(args)
		return impl(...args)
	}
	mockFn.mock = { calls: [] }
	return mockFn
}

const originalGetWinner = utils.getWinner
utils.getWinner = fn((p1, p2) => p1)

const winner = thumbWar('Uncle Bob', 'Uncle Sam')
assert.strictEqual(winner, 'Uncle Bob')
assert.deepStrictEqual(
	utils.getWinner.mock.calls,
	[
		['Uncle Bob', 'Uncle Sam'],
		['Uncle Bob', 'Uncle Sam'],
	]
)

//cleanup
utils.getWinner = originalGetWinner
