import React from 'react'
import {render} from '@testing-library/react'
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

    const {rerender} = render(
        <ErrorBoundary>
            <Bomb />
        </ErrorBoundary>,
    )

    rerender(
        <ErrorBoundary>
            <Bomb shouldThrow />
        </ErrorBoundary>,
    )

    const error = expect.any(Error)
    const info = {componentStack: expect.stringContaining('Bomb')}

    expect(mockReportError).toHaveBeenCalledWith(error, info)
    expect(mockReportError).toHaveBeenCalledTimes(1)

    // one time for react app and one time in the test
    expect(console.error).toHaveBeenCalledTimes(2)
})
