import React from 'react';

export const renderField = ({ autocomplete, input, placeholder, 
    label, type, meta: { touched, error, warning }}) => {
    
    return (
        <>
            <label htmlFor = { label } >{label}</label>
            <input 
                { ...input } 
                placeholder = { placeholder } 
                type = { type }
                autoComplete = { autocomplete }
            />
            {touched && ((error && <span 
                className = 'card red lighten-4'
                style = {{
                    padding: 5,
                    color: '#e57373'
                }}
            >{error}
            </span>) || (warning && <span
                className = 'card orange lighten-4'
                style = {{
                    color: '#f57c00'
                }}
            >{warning}
            </span>))}
        </>
    )
}