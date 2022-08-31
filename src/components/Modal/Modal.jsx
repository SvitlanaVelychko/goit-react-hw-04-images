import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Overlay, ModalBox } from "./Modal.styled";

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, children }) => {
    useEffect(() => {
        const handleKeyDown = e => {
            if (e.code === 'Escape') {
                onClose();
            }
        }

        window.addEventListener('keydown', handleKeyDown);
            
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const handleOverlayClick = e => {
        if (e.currentTarget === e.target) {
            onClose();
        }
    };

    return createPortal(
        <Overlay onClick={handleOverlayClick}>
            <ModalBox>
                {children}
            </ModalBox>
        </Overlay>,
        modalRoot,
    );
};

export default Modal;