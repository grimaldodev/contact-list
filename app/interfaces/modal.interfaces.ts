import { iItem } from './list.interface';

export interface iModal {
    content: iItem;
    closeModalHandler?: () => void;
}
