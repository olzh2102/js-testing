import React from 'react'
import PropTypes from 'prop-types'
import {render} from '@testing-library/react'
import {ThemeProvider} from 'emotion-theming'
import {dark} from '../src/themes'

function renderWithProviders(ui, options) {
    return render(ui, {wrapper: Wrapper, ...options})
}

function Wrapper({children}) {
    return <ThemeProvider theme={dark}>{children}</ThemeProvider>
}

Wrapper.propTypes = {
    children: PropTypes.node,
}

export * from '@testing-library/react'
export {renderWithProviders}
