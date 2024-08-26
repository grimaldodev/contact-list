import { iCell } from '../interfaces/list.interface';

export default function Cell({ className = 'cell', children }: iCell) {
    return <div className={className}>{children}</div>;
}
