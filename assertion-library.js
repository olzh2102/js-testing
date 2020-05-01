const {
	sum,
	subtract,
	sumAsync,
	subtractAsync,
} = require('./math')

test('sumAsync adds numbers', async () => {
	const result = await sumAsync(3, 7)
	const expected = 10
	expect(result).toBe(expected)
})

test('subtractAsync subtracts numbers', async () => {
	const result = await subtractAsync(7, 3)
	const expected = 4
	expect(result).toBe(expected)
})

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

async function test(title, cb) {
	try {
		await cb()
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
