import { ListChildComponentProps } from 'react-window';

export interface iItem {
    name: string;
    email: string;
    phone: string;
    gender: string;
}

export interface iList extends Array<iItem> {}

export interface iListSize {
    width: number;
    height: number;
    itemSize: number;
}

export interface iRow extends ListChildComponentProps {
    openModalHandler?: (item: string | number) => void;
}
