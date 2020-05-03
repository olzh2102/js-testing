import React from 'react'
import PropTypes from 'prop-types'
import {render} from '@testing-library/react'
import {ThemeProvider} from 'emotion-theming'
import * as themes from '../src/themes'

function renderWithProviders(ui, {theme = themes.dark, ...options}) {
    function Wrapper({children}) {
        return <ThemeProvider theme={theme}>{children}</ThemeProvider>
    }

    Wrapper.propTypes = {
        children: PropTypes.node,
    }

    return render(ui, {wrapper: Wrapper, ...options})
}

export * from '@testing-library/react'
export {renderWithProviders}
