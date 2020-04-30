const { sum, subtract } = require('./math')

let result, expected

function sumTest() {
	result = sum(3, 7)
	expected = 10
	expect(result).toBe(expected)
}
test('sum adds numbers', sumTest)

function subtractTest() {
	result = subtract(7, 3)
	expected = 4
	expect(result).toBe(expected)
}
test('subtract subtracts numbers', subtractTest)

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
