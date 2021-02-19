import { fireEvent } from '@testing-library/react'
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'

import Input from './Input'

let root: HTMLDivElement | null = null

beforeEach(() => {
    root = document.createElement('div')
    document.body.appendChild(root)
})

afterEach(() => {
    if (root instanceof HTMLDivElement) {
        unmountComponentAtNode(root)
        root.remove()
        root = null
    }
})

it('HTML elements renders to the body', () => {
    act(() => {
        render(<Input />, root)
    })

    expect(root?.querySelector('input')).toBeInTheDocument()
    expect(root?.querySelector('label')).toBeInTheDocument()
})

it('Changes value when state is changed', () => {
    act(() => {
        render(<Input value={'abc'} />, root)
    })

    expect(root?.querySelector('input')).toHaveValue('abc')

    act(() => {
        render(<Input value={'123'} />, root)
    })

    expect(root?.querySelector('input')).toHaveValue('123')
})

it('Can render all attributes', () => {
    act(() => {
        render(
            <Input
                optional
                optionalText={'test'}
                className="test"
                id="test"
                label="test"
                name="test"
                placeholder="test"
                type="text"
            />,
            root,
        )
    })

    const container = root?.querySelector('div') as HTMLDivElement
    const input = root?.querySelector('input') as HTMLInputElement
    const label = root?.querySelector('label') as HTMLLabelElement
    const span = root?.querySelector('span') as HTMLSpanElement

    expect(span).toBeInTheDocument()
    expect(span.textContent).toEqual('test')

    expect(label).toBeInTheDocument()
    expect(label.textContent).toEqual('test test')

    expect(input).toBeInTheDocument()
    expect(container).toHaveClass('test')
    expect(input.id).toEqual('test')
    expect(input.name).toEqual('test')
    expect(input.placeholder).toEqual('test')
    expect(input.type).toEqual('text')
})

it('Calls all events', () => {
    const onEnter = jest.fn()
    const onChange = jest.fn()

    act(() => {
        render(<Input onChange={onChange} onEnter={onEnter} />, root)
    })

    const input = root?.querySelector('input') as HTMLInputElement

    expect(input).toBeInTheDocument()

    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', keyCode: 13, charCode: 13 })

    expect(onChange).toBeCalledTimes(1)
    expect(onEnter).toBeCalledTimes(1)
})
