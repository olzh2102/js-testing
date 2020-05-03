import React from 'react'
import {ThemeProvider} from 'emotion-theming'
import Calculator from './calculator'
import * as themes from './themes'

function App() {
    const [theme, setTheme] = React.useState('dark')
    return (
        <div>
            <ThemeProvider theme={themes[theme]}>
                <Calculator />
                <div style={{marginTop: 30, textAlign: 'center'}}>
                    Calculator component{' '}
                    <a href="https://codepen.io/mjijackson/pen/xOzyGX">
                        created
                    </a>
                    {' by '}
                    <br />
                    <a href="https://twitter.com/mjackson">
                        Michael Jackson
                    </a>{' '}
                    of <a href="https://reacttraining.com/">React Training</a>
                </div>
            </ThemeProvider>
        </div>
    )
}

export default App

/* eslint import/namespace:0 */
