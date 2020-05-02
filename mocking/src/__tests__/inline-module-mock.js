const thumbWar = require('../thumb-war')
const utils = require('../utils')

jest.mock('../utils', () => {
	return {
		getWinner: jest.fn((p1, p2) => p1),
	}
})

test('returns winner', () => {
	const winner = thumbWar(
		'Uncle Bob',
		'Uncle Sam'
	)
	expect(winner).toBe('Uncle Bob')
	expect(utils.getWinner.mock.calls).toEqual([
		['Uncle Bob', 'Uncle Sam'],
		['Uncle Bob', 'Uncle Sam'],
	])
	expect(utils.getWinner).toHaveBeenCalledTimes(2)
	expect(utils.getWinner).toHaveBeenCalledWith(
		'Uncle Bob',
		'Uncle Sam'
	)

	// cleanup
	utils.getWinner.mockReset()
})
