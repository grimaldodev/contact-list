import { iRow } from '../interfaces/list.interface';
import Cell from './cell.component';

export default function Row(props: iRow) {
    const { index, data, style, openModalHandler } = props;
    const item = data[index];
    const bgColor = item.gender === 'male' ? 'bg-blue-100' : 'bg-rose-200';
    const txtColor = item.gender === 'male' ? 'text-blue-400' : 'text-rose-400';

    const onclickHandler = (item: string | number) => {
        if (openModalHandler) {
            openModalHandler(item);
        }
    };
    return (
        <div style={style} data-key={index}>
            <div className="flex flex-crow gap-2 bg-white mb-2 p-4 rounded text-sm">
                <Cell className="basis-1/5">{item.name}</Cell>
                <Cell className="basis-2/5">{item.email}</Cell>
                <Cell className="basis-1/5">{item.phone}</Cell>
                <Cell className="grow-0 w-20">
                    <span className={`rounded-full px-3 py-1 ${bgColor} ${txtColor}`}>{item.gender}</span>
                </Cell>
                <Cell className="grow-0 w-10">
                    <button
                        onClick={() => {
                            onclickHandler(index);
                        }}
                        className="float-right"
                    >
                        ...
                    </button>
                </Cell>
            </div>
        </div>
    );
}
