import React, { FunctionComponent, useEffect, useState } from 'react'
import styles from './Input.module.scss'

export type InputProps = {
    icon?: HTMLElement
    type?: string
    id?: string
    className?: string
    name?: string
    label?: string
    optional?: boolean
    placeholder?: string
    optionalText?: string
    onEnter?: (value: string) => void
    onChange?: React.DOMAttributes<HTMLInputElement>['onChange']
    value?: React.InputHTMLAttributes<HTMLInputElement>['value']
}

const Input: FunctionComponent<InputProps> = (props) => {
    const [value, setValue] = useState<string>((props.value ?? '').toString())
    const optionalText = props.optionalText ?? 'optional'

    // If the prop value is changed, we update the local value state
    useEffect(() => {
        setValue((props.value ?? '').toString())
    }, [props.value])

    const onEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            props.onEnter?.(value)
        }
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)

        props.onChange?.(event)
    }

    const classNames = [styles['input'], props.className ?? ''].join(' ').trim()

    return (
        <div className={classNames}>
            <label htmlFor={props.id}>
                {props.label} {props.optional && <span className={styles['optional']}>{optionalText}</span>}
            </label>
            <input
                placeholder={props.placeholder}
                value={value}
                onChange={onChange}
                onKeyDown={onEnter}
                required={!props.optional}
                id={props.id}
                name={props.name}
                type={props.type}
            />
        </div>
    )
}

export default Input
