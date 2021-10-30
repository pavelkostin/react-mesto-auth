import React, { useRef } from 'react'
import { PopupWithForm } from './PopupWithForm';
import { Input } from './Input';

export function PopupAddPlace({onClose, isOpen, onAddPlace}) {

    const nameInput = useRef();
    const linkInput = useRef();


    function handleSubmit(e) {
        e.preventDefault()
        onAddPlace({
            name: nameInput.current.value,
            link: linkInput.current.value
        })
    }


    return (

        <PopupWithForm
            onClose={onClose}
            isOpen={isOpen}
            classText='add-card'
            name="addCardForm"
            header='Новое место'
            submitBtnText='Создать'
            onSubmit={handleSubmit}
        >
            <Input
                className='popup__input popup__input_add popup__input_place'
                placeholder='Название'
                type="text"
                name='name'
                id='name'
                inputRef={nameInput}
            />
            <Input
                className='popup__input popup__input_add popup__input_link'
                placeholder='Ссылка на картинку'
                type="url"
                name='url'
                id='url'
                inputRef={linkInput}
            />
        </PopupWithForm>
    )
}















/* export function AddPlacePopup(props) {


    return(
        <>
        <PopupWithForm name='place' isOpen={props.isOpen}/>
        </>
    )
}
 */




