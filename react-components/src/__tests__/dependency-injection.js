import React from 'react'
import {render, fireEvent, wait} from '@testing-library/react'
import {GreetingLoader} from '../greeting-loader-02-dependency-injection'

test('loads greetings on click', async () => {
    // arrange
    const mockLoadGreeting = jest.fn()
    const testGreeting = 'TEST_GREETING'
    mockLoadGreeting.mockResolvedValueOnce({data: {greeting: testGreeting}})

    const {getByLabelText, getByText} = render(
        <GreetingLoader loadGreeting={mockLoadGreeting} />,
    )
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
