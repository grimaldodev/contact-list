import { ReactNode } from 'react';
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

export interface iCell {
    className?: string;
    children?: string | number | ReactNode;
}

export interface iHeader extends iCell {
    sortHandler?: (props: iSortHandler) => void;
}

export interface iSortHandler {
    origin: SortOrigin;
    direction: SortDirection;
}

export type SortDirection = 'ASC' | 'DESC' | null;
export type SortOrigin = 'name' | 'email' | 'phone' | 'gender' | null;
