import React from 'react'
import {render, fireEvent, wait} from '@testing-library/react'
import {GreetingLoader} from '../greeting-loader-01-mocking'
import {loadGreeting as mockLoadGreeting} from '../api'

jest.mock('../api')

test('loads greetings on click', async () => {
    // arrange
    const testGreeting = 'TEST_GREETING'
    mockLoadGreeting.mockResolvedValueOnce({data: {greeting: testGreeting}})

    const {getByLabelText, getByText} = render(<GreetingLoader />)
    const nameInput = getByLabelText(/name/i)
    const loadButton = getByText(/load greeting/i)

    // act
    nameInput.value = 'Mary'
    fireEvent.click(loadButton)

    // assert
    expect(mockLoadGreeting).toHaveBeenCalledWith('Mary')
    expect(mockLoadGreeting).toHaveBeenCalledTimes(1)
    await wait(() =>
        expect(getByLabelText(/greeting/i)).toHaveTextContent(testGreeting),
    )
})
