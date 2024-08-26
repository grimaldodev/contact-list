export interface iSearch {
    query: string | number | readonly string[] | undefined;
    setQuery: (query: string) => void;
}
