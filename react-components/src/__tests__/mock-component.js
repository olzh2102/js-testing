import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {HiddenMessage} from '../hidden-message'

// mocking react-transtion-group, because it has timeout, and
// you don't want to wait
jest.mock('react-transition-group', () => {
    return {
        CSSTransition: props => (props.in ? props.children : null),
    }
})

test('shows hidden message when  toggle is clicked', () => {
    const myMessage = 'yoyo'
    const {getByText, queryByText} = render(
        <HiddenMessage>{myMessage}</HiddenMessage>,
    )
    const toggleButton = getByText(/toggle/i)

    // on initial text should not be there
    expect(queryByText(myMessage)).not.toBeInTheDocument()

    // toogled to show the message
    fireEvent.click(toggleButton)
    expect(getByText(myMessage)).toBeInTheDocument()

    // on next toggle to hide the message there is transition with 1s,
    // so it is mocked above with jest.mock
    fireEvent.click(toggleButton)
    expect(queryByText(myMessage)).not.toBeInTheDocument()
})
