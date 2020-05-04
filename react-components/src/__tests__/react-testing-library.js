import React from 'react'
import ReactDOM from 'react-dom'
import {within} from '@testing-library/dom'
import {FavoriteNumber} from '../favorite-number'

function render(ui) {
    const container = document.createElement('div')
    ReactDOM.render(ui, container)
    const queries = within(container)

    return {
        container,
        ...queries,
    }
}

test('renders a number input with a label "Favoutire Number"', () => {
    const {getByLabelText} = render(<FavoriteNumber />)
    const input = getByLabelText(/favorite Number/i) // will search inside div label with name of Favorite Number

    expect(input).toHaveAttribute('type', 'number')
})
