import React from 'react'
import { PopupWithForm } from "./PopupWithForm"

export function PopupConfirm() {
    return (
        <PopupWithForm

            classText='confirm'
            name="confirmDeletion"
            header='Вы уверены?'
            submitBtnText='Да'
        >



        </PopupWithForm>


    )
}