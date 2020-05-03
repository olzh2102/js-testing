import React from 'react'
import PropTypes from 'prop-types'
import {render} from '@testing-library/react'
import {ThemeProvider} from 'emotion-theming'
import {dark} from '../themes'
import CalculatorDisplay from './calculator-display'

function renderWithProviders(ui, options) {
    return render(ui, {wrapper: Wrapper, ...options})
}

function Wrapper({children}) {
    return <ThemeProvider theme={dark}>{children}</ThemeProvider>
}

Wrapper.propTypes = {
    children: PropTypes.node,
}

test('renders', () => {
    const {container} = renderWithProviders(<CalculatorDisplay value="0" />)

    expect(container.firstChild).toMatchInlineSnapshot(`
        .emotion-0 {
            color: white;
            background: #1c191c;
            line-height: 130px;
            font-size: 6em;
            -webkit-flex: 1;
            -ms-flex: 1;
            flex: 1;
            position: relative;
        }

        <div
            class="emotion-0 emotion-1"
        >
            <div
                class="autoScalingText"
                data-testid="total"
                style="transform: scale(1,1);"
            >
                0
            </div>
        </div>
    `)
})
