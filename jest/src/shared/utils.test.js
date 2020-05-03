import {getFormattedValue} from './utils'

test('format the value', () => {
  expect(getFormattedValue('1234.0')).toBe('1,234.0')
})
