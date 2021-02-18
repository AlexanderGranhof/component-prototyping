import React, { useRef, useState } from 'react'
import styles from './App.module.scss'

const App = () => {
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
                <article>
                    <h1>Component 1</h1>
                </article>
                <article>
                    <h1>Component 2</h1>
                </article>
                <article>
                    <h1>Component 3</h1>
                </article>
            </main>
        </React.Fragment>
    )
}

export default App
