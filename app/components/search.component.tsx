import { ChangeEvent } from 'react';
import { iSearch } from '../interfaces/search.interface';

export default function Search(props: iSearch) {
    const { query, setQuery } = props;
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const input = event.currentTarget;
        setQuery(input.value);
    };
    return (
        <form className="flex">
            <input
                id="query"
                name="query"
                placeholder="Type to search"
                className="grow bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0"
                value={query}
                onChange={onChangeHandler}
            />
        </form>
    );
}
