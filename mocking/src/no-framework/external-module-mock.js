require('../__no-framework-mocks__/utils')

// mocking entire utils modules ==
const utilsPath = require.resolve('../utils')
const mockUtilsPath = require.resolve(
	'../__no-framework-mocks__/utils'
)
require.cache[utilsPath] =
	require.cache[mockUtilsPath]
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
