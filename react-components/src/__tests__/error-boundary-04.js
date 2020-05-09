import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {reportError as mockReportError} from '../api'
import {ErrorBoundary} from '../error-boundary'

jest.mock('../api')

// this is here to make the error output not appear in the project's output
beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterAll(() => {
    console.error.mockRestore()
})

afterEach(() => {
    jest.clearAllMocks()
})

function Bomb({shouldThrow}) {
    if (shouldThrow) throw new Error('bomb')
    return null
}

test('calls reportError and renders that there was a problem', () => {
    mockReportError.mockResolvedValueOnce({success: true})

    const {
        rerender,
        getByText,
        queryByText,
        getByRole,
        queryByRole,
    } = render(<Bomb />, {wrapper: ErrorBoundary})

    rerender(<Bomb shouldThrow />)

    const error = expect.any(Error)
    const info = {componentStack: expect.stringContaining('Bomb')}

    expect(mockReportError).toHaveBeenCalledWith(error, info)
    expect(mockReportError).toHaveBeenCalledTimes(1)

    // one time for react app and one time in the test
    expect(console.error).toHaveBeenCalledTimes(2)

    expect(getByRole('alert').textContent).toMatchInlineSnapshot(
        `"There was a problem."`,
    )

    console.error.mockClear()
    mockReportError.mockClear()

    rerender(<Bomb />)

    fireEvent.click(getByText(/try again/i))

    expect(mockReportError).not.toHaveBeenCalled()
    expect(console.error).not.toHaveBeenCalled()
    expect(queryByRole('alert')).not.toBeInTheDocument()
    expect(queryByText(/try again/i)).not.toBeInTheDocument()
})
