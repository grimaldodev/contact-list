'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FixedSizeList as Grid } from 'react-window';
import Header from './components/header.component';
import Modal from './components/modal.component';
import Row from './components/row.component';
import Search from './components/search.component';
import { iItem, iList, iListSize, iSortHandler, SortDirection, SortOrigin } from './interfaces/list.interface';
import ListService from './services/list.service';

export default function Home() {
    const isFirstRender = useRef(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const [rawData, setRawData] = useState<iList>([] as iList);
    const [loading, setLoading] = useState<boolean>(true);
    const [sortOrigin, setSortOrigin] = useState<SortOrigin>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>('DESC');
    const [searchQuery, setSearchQuery] = useState<string | number | string[] | undefined>(undefined);
    const [modalContent, setModalContent] = useState<iItem | null>(null);
    const [listSize, setListSize] = useState<iListSize>({
        width: 100,
        height: 100,
        itemSize: 10,
    });

    const parsedData: iList = useMemo<iList>((): iList => {
        let response: iList = rawData;
        if (searchQuery) {
            const regExp = new RegExp(searchQuery as string, 'i');
            response = rawData?.filter(item => {
                if (regExp.test(item.name)) {
                    return item;
                }
            });
        }

        if (sortOrigin) {
            if (sortDirection === 'ASC') {
                response.sort((a, b) => (a[sortOrigin] > b[sortOrigin] ? -1 : 1));
            } else {
                response.sort((a, b) => (a[sortOrigin] < b[sortOrigin] ? -1 : 1));
            }
        }

        return response;
    }, [rawData, searchQuery, sortOrigin, sortDirection]);

    const fetchList = useCallback(async () => {
        await ListService.getList(10000).then(data => {
            setLoading(false);
            setRawData(data);
        });
    }, []);

    const closeModalHandler = () => {
        setModalContent(null);
    };

    const openModalHandler = (item: string | number) => {
        setModalContent(rawData[item as number]);
    };

    const sortHandler = (props: iSortHandler): void => {
        setSortDirection(props.direction);
        setSortOrigin(props.origin);
    };

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            fetchList();
        }
    }, [ListService]);

    useEffect(() => {
        setListSize(prevState => {
            return {
                ...prevState,
                width: containerRef.current ? containerRef.current?.offsetWidth : prevState.width,
                height: containerRef.current ? containerRef.current?.offsetHeight * 0.8 : prevState.height,
                listSize: containerRef.current ? containerRef.current?.offsetHeight : prevState.itemSize,
            };
        });
    }, [containerRef.current]);
    return (
        <div className="container flex flex-col items-center mx-auto h-screen">
            <div className="flex flex-row w-3/5 mb-4">
                <div className="basis-1/2 text-2xl font-bold">Customer List</div>
                <div className="basis-1/2">
                    <Search query={searchQuery} setQuery={setSearchQuery} />
                </div>
            </div>
            <div className="flex flex-col w-3/5 h-3/5" ref={containerRef}>
                <div className="flex flex-row gap-2 px-4 py-1 text-xs mb-3">
                    <Header className="basis-1/5" sortHandler={sortHandler}>
                        Name
                    </Header>
                    <Header className="basis-2/5" sortHandler={sortHandler}>
                        Email
                    </Header>
                    <Header className="basis-1/5" sortHandler={sortHandler}>
                        Phone
                    </Header>
                    <Header className="grow-0 w-20" sortHandler={sortHandler}>
                        Gender
                    </Header>
                    <Header className="grow-0 w-10">{''}</Header>
                </div>
                {loading ? <>Loading...</> : null}
                <Grid
                    className="flex flex-row"
                    itemData={parsedData}
                    itemCount={parsedData.length}
                    height={listSize.height}
                    width={listSize.width}
                    itemSize={60}
                >
                    {props => <Row {...props} openModalHandler={openModalHandler} />}
                </Grid>
            </div>
            {modalContent ? <Modal content={modalContent} closeModalHandler={closeModalHandler} /> : null}
        </div>
    );
}
