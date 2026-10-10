import { Box, Button, Modal as MuiModal } from '@mui/material'
import { ReactNode } from 'react'

import './ModalComponent.scss'

export interface ModalProps {
  className?: string | string[]
  children?: ReactNode
  open: boolean
  buttonText: string
  submit?: boolean
  cancel?: boolean
  submitText?: string
  cancelText?: string
  modalButtonVariant?: 'outlined' | 'contained'
  onSubmit?: () => void
  onClose?: () => void
  onOpen?: () => void
  'aria-label'?: string
}

function Modal(props: ModalProps) {
  return (
    <>
      <Button
        variant={props.modalButtonVariant}
        onClick={props.onOpen}
        aria-haspopup="dialog"
        aria-expanded={props.open}
      >
        {props.buttonText}
      </Button>
      <MuiModal open={props.open} onClose={props.onClose}>
        <Box
          className="modal"
          role="dialog"
          aria-modal="true"
          aria-label={props['aria-label']}
        >
          {props.children}
          {(props.submit || props.cancel) && (
            <div className="modal-buttons-container">
              {props.cancel && (
                <Button onClick={() => props.onClose?.()}>
                  {props.cancelText ?? 'Cancel'}
                </Button>
              )}
              {props.submit && (
                <Button
                  variant="contained"
                  onClick={() => props.onSubmit?.()}
                >
                  {props.submitText ?? 'Submit'}
                </Button>
              )}
            </div>
          )}
        </Box>
      </MuiModal>
    </>
  )
}

export default Modal