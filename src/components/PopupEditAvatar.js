import React, {useRef} from 'react';
import { PopupWithForm } from './PopupWithForm';
import { Input } from './Input';

export function PopupEditAvatar({ onClose, isOpen, onUpdateAvatar }) {

    const avatarInput = useRef();

    function handleSubmit(e) {
        e.preventDefault()
        onUpdateAvatar({
            avatar: avatarInput.current.value
        })
    }

    return (
        <PopupWithForm
            onClose={onClose}
            isOpen={isOpen}
            classText='avatar'
            name="editAvatar"
            header='Обновить аватар'
            submitBtnText='Сохранить'
            onSubmit={handleSubmit}
            >
            <Input
                className='popup__input  popup__input_avatar popup__input_place'
                placeholder='Ссылка на новый аватар'
                type="url"
                name='avatar'
                id='avatar'
                inputRef={avatarInput}
            />
        </PopupWithForm>
    )
}

