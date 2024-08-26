import { iItem } from './list.interface';

export interface ModalProps {
    content: iItem;
    closeModalHandler?: () => void;
}
