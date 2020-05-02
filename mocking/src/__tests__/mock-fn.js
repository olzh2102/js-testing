const thumbWar = require('../thumb-war')
const utils = require('../utils')

test('returns winner', () => {
	const originalGetWinner = utils.getWinner
	utils.getWinner = jest.fn((p1, p2) => p1)

	const winner = thumbWar(
		'Uncle Bob',
		'Uncle Sam'
	)
	expect(winner).toBe('Uncle Bob')
	expect(utils.getWinner).toHaveBeenCalledTimes(2)
	expect(utils.getWinner).toHaveBeenCalledWith(
		'Uncle Bob',
		'Uncle Sam'
	)
	expect(utils.getWinner).toHaveBeenNthCalledWith(
		1,
		'Uncle Bob',
		'Uncle Sam'
	)
	expect(utils.getWinner).toHaveBeenNthCalledWith(
		2,
		'Uncle Bob',
		'Uncle Sam'
	)

	// cleanup
	utils.getWinner = originalGetWinner
})
