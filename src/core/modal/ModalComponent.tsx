import { Box, Button, Modal as MuiModal } from "@mui/material"
import { useState } from "react";

import "./ModalComponent.scss"

export interface PanelProps {
    className?: string | string[],
    children?: any,
    open: boolean,
    buttonText: string;
    submit?: boolean;
    cancel?: boolean;
    submitText?: string;
    cancelText?: string;
    modalButtonVariant?: 'outlined' | 'contained'
    onSubmit?: () => void;
    onClose?: () => void;
    onOpen?: () => void;
}

function Modal(props: PanelProps) {
    return (
        <>
            <Button variant={props.modalButtonVariant} onClick={props.onOpen}>{props.buttonText}</Button>
            <MuiModal
                open={props.open}
                onClose={props.onClose}
            >
                <Box className="modal">
                    {props.children}
                    {(props.submit || props.cancel ) && <div className="modal-buttons-container">
                        {props.cancel && (<Button onClick={() => props.onClose?.()}>{props.cancelText ?? 'Cancel'}</Button>)}
                        {props.submit && (<Button variant='contained' onClick={() => props.onSubmit?.()}>{props.submitText ?? 'Submit'}</Button>)}
                    </div>}
                </Box>
            </MuiModal>
        </>
    )
}

export default Modal