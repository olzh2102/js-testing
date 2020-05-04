import React from 'react'
import ReactDOM from 'react-dom'
import {queries} from '@testing-library/dom'
import {FavoriteNumber} from '../favorite-number'

test('renders a number input with a label "Favoutire Number"', () => {
    const div = document.createElement('div')
    ReactDOM.render(<FavoriteNumber />, div)

    const input = queries.getByLabelText(div, 'Favorite Number') // will search inside div label with name of Favorite Number

    expect(input).toHaveAttribute('type', 'number')
})
