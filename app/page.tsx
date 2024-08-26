'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FixedSizeList as Grid } from 'react-window';
import Modal from './components/modal.component';
import Row from './components/row.component';
import Search from './components/search.component';
import { iItem, iList, iListSize } from './interfaces/list.interface';
import ListService from './services/list.service';

export default function Home() {
    const isFirstRender = useRef(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const [rawData, setRawData] = useState<iList>([] as iList);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string | null>(null);
    const [modalContent, setModalContent] = useState<iItem | null>(null);
    const [listSize, setListSize] = useState<iListSize>({
        width: 100,
        height: 100,
        itemSize: 10,
    });

    const parsedData: iList = useMemo<iList>((): iList => {
        if (searchQuery) {
            const regExp = new RegExp(searchQuery, 'i');
            return rawData?.filter(item => {
                if (regExp.test(item.name)) {
                    return item;
                }
            });
        }
        return rawData;
    }, [rawData, searchQuery]);

    const fetchList = useCallback(async () => {
        await ListService.getList().then(data => {
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
        <div className="container flex flex-col align-items-center mx-auto h-screen">
            <div className="flex flex-row w-3/5 mb-4">
                <div className="basis-1/2 text-2xl font-bold">Customer List</div>
                <div className="basis-1/2">
                    <Search query={searchQuery} setQuery={setSearchQuery} />
                </div>
            </div>
            <div className="flex flex-col w-3/5 h-3/5" ref={containerRef}>
                <div className="flex flex-row gap-2 px-4 py-1 text-xs mb-3">
                    <div className="basis-1/5">Name</div>
                    <div className="basis-2/5">Email</div>
                    <div className="basis-1/5">Phone</div>
                    <div className="grow-0 w-20">Gender</div>
                    <div className="grow-0 w-10"></div>
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
