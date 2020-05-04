import React from 'react'
import {render} from '@testing-library/react'
import {FavoriteNumber} from '../favorite-number'

test('renders a number input with a label "Favoutire Number"', () => {
    const {getByLabelText} = render(<FavoriteNumber />)
    const input = getByLabelText(/favorite Number/i) // will search inside div label with name of Favorite Number

    expect(input).toHaveAttribute('type', 'number')
})
