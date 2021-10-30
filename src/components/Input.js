import React from 'react';


export function Input({ value, className, placeholder, type, name, id, onChange, inputRef }) {



    return (
        <section className='popup__section'>
            <input
                defaultValue={value || ''} //ошибка в консоли, поэтому поставил defaultValue. вроде работает
                className={className}
                placeholder={placeholder}
                type={type}
                name={name}
                id={id}
                onChange={onChange}
                ref={inputRef}
            />
        </section>
    )

}