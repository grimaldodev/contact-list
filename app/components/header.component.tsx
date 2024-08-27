'use client';
import { useState } from 'react';
import { iHeader, SortDirection, SortOrigin } from '../interfaces/list.interface';

export default function Header(props: iHeader) {
    const { children, sortHandler, className } = props;
    const [direction, setDirection] = useState<SortDirection>('DESC');
    const onClickHandler = () => {
        const updatedDirection = direction === 'DESC' ? 'ASC' : 'DESC';

        if (sortHandler) {
            sortHandler({
                origin: children?.toString().toLowerCase() as SortOrigin,
                direction: updatedDirection,
            });
        }
        setDirection(updatedDirection);
    };
    return (
        <div className={className || ''}>
            {children}
            {sortHandler ? (
                <button
                    onClick={() => {
                        onClickHandler();
                    }}
                >
                    <img
                        className="inline"
                        src={direction === 'DESC' ? './icons/caret.down.icon.svg' : './icons/caret.up.icon.svg'}
                        alt=""
                        width={16}
                        height={16}
                    />
                </button>
            ) : null}
        </div>
    );
}
