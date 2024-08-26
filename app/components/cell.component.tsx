import { ReactNode } from 'react';

type CellProps = {
    className?: string;
    children: string | number | ReactNode;
};

export default function Cell({ className = 'cell', children }: CellProps) {
    return <div className={className}>{children}</div>;
}
