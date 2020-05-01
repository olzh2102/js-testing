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

global.test = test
global.expect = expect

// to run: node --require ./setup-global.js <file_to_test>
