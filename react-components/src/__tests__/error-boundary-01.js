import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {reportError as mockReportError} from '../api'
import {ErrorBoundary} from '../error-boundary'

jest.mock('../api')

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
    if (shouldThrow) {
        throw new Error('bomb')
    } else {
        return null
    }
}

test('calls reportError and renders that there was a problem', () => {
    mockReportError.mockResolvedValueOnce({success: true})

    // == NO ERROR CASE ==
    const {rerender, getByText, getByRole, queryByRole, queryByText} = render(
        <ErrorBoundary>
            <Bomb />
        </ErrorBoundary>,
    )

    // == ERROR CASE ==
    rerender(
        <ErrorBoundary>
            <Bomb shouldThrow />
        </ErrorBoundary>,
    )

    const error = expect.any(Error)
    const info = {componentStack: expect.stringContaining('Bomb')}
    expect(mockReportError).toHaveBeenCalledWith(error, info)
    expect(mockReportError).toHaveBeenCalledTimes(1)

    // 2 times - once by jsdom and once by react
    expect(console.error).toHaveBeenCalledTimes(2)

    expect(getByRole('alert').textContent).toMatchInlineSnapshot(
        `"There was a problem."`,
    )

    console.error.mockClear()
    mockReportError.mockClear()

    // == ERROR + TRY AGAIN BUTTON CASE ==
    rerender(
        <ErrorBoundary>
            <Bomb />
        </ErrorBoundary>,
    )

    fireEvent.click(getByText(/try again/i))

    expect(mockReportError).not.toHaveBeenCalled()
    expect(console.error).not.toHaveBeenCalled()
    expect(queryByRole('alert')).not.toBeInTheDocument()
    expect(queryByText(/try again/i)).not.toBeInTheDocument()
})
