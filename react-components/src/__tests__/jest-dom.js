import * as jestDOM from '@testing-library/jest-dom'
import React from 'react'
import ReactDOM from 'react-dom'
import {FavoriteNumber} from '../favorite-number'

expect.extend(jestDOM)

test('renders a number input with a label "Favoutire Number"', () => {
    const div = document.createElement('div')
    ReactDOM.render(<FavoriteNumber />, div)

    expect(div.querySelector('input')).toHaveAttribute('type', 'number')
    expect(div.querySelector('label')).toHaveTextContent('Favorite Number')
})