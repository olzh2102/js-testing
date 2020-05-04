import React from 'react'
import ReactDOM from 'react-dom'
import {within} from '@testing-library/dom'
import {FavoriteNumber} from '../favorite-number'

test('renders a number input with a label "Favoutire Number"', () => {
    const div = document.createElement('div')
    ReactDOM.render(<FavoriteNumber />, div)
    const {getByLabelText} = within(div)

    const input = getByLabelText(/favorite Number/i) // will search inside div label with name of Favorite Number

    expect(input).toHaveAttribute('type', 'number')
})
