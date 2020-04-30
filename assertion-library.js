const { sum, subtract } = require('./math')

test('sum adds numbers', () => {
	const result = sum(3, 7)
	const expected = 10
	expect(result).toBe(expected)
})

test('subtract subtracts numbers', () => {
	const result = subtract(7, 3)
	const expected = 4
	expect(result).toBe(expected)
})

function test(title, cb) {
	try {
		cb()
		console.log(`SUCCESS ${title}`)
	} catch (error) {
		console.error(`FAIL ${title}`)
		console.error(error)
	}
}

function expect(actual) {
	return {
		toBe(expected) {
			if (actual !== expected) {
				throw new Error(
					`${actual} is not equal to ${expected}`
				)
			}
		},
	}
}
