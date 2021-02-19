import React, { FunctionComponent, useRef, useState } from 'react'
import styles from './App.module.scss'

import Input from './components/Input'

const SlideShow: FunctionComponent = (props) => {
    const [offset, setOffset] = useState(0)
    const mainRef = useRef<HTMLElement>(null)

    const createOffset = (multiplier = 1) => {
        const pageWidth = document.body.clientWidth
        const componentCount = mainRef.current?.childElementCount ?? 0
        const maxOffsetLimit = -((componentCount - 1) * pageWidth) // We negate the number since going right lowers the number

        const desiredOffset = offset + pageWidth * multiplier
        const finalOffset = Math.max(Math.min(desiredOffset, 0), maxOffsetLimit)

        setOffset(finalOffset)
    }

    return (
        <React.Fragment>
            <span onClick={() => createOffset(1)} className={styles['left']}></span>
            <span onClick={() => createOffset(-1)} className={styles['right']}></span>
            <main ref={mainRef} style={{ transform: `translateX(${offset}px)` }}>
                {React.Children.map(props.children, (child) => {
                    return (
                        <article>
                            <div>{child}</div>
                        </article>
                    )
                })}
            </main>
        </React.Fragment>
    )
}

const App = () => {
    return (
        <SlideShow>
            <Input label="yes" value={2} />
            <Input label="yes" value={2} />
        </SlideShow>
    )
}

export default App
