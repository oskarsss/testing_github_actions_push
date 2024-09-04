import React, { useEffect, useState, useRef } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from 'moment-timezone';
import { useAccountCompanies } from '@/store/app/hooks';
import { useAppSelector } from '@/store/hooks';
import { useTrucksManifests } from '@/store/dispatch/scheduling/hooks';
import EmptyData from '@/views/dispatch/scheduling/components/Table/components/EmptyData';
import TableHeader from './TableHeader';
// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import TableBody from './TableBody';
import Loading from './components/Loading';
import { ContainerTable } from './styled';
import { columnType } from './types';

let scrollBarRef: PerfectScrollbar | null = null;

const Table = () => {
    const {
        trucksFiltered: trucks,
        isLoading
    } = useTrucksManifests();
    const { timezone } = useAccountCompanies();

    const {
        periodDays,
        from_date
    } = useAppSelector((state) => state.scheduling.search_options);

    const [columns, setColumns] = useState<columnType[]>([]);

    const ps = useRef<HTMLElement>();

    const getRef = (ref: PerfectScrollbar | null) => {
        scrollBarRef = ref;
    };
    const setContainerRef = (el: HTMLElement) => {
        ps.current = el;
    };

    useEffect(() => {
        const curr = ps.current;
        if (curr) {
            curr.scrollTop = 0;
        }
    }, [from_date]);

    useEffect(() => {
        if (scrollBarRef) {
            scrollBarRef.updateScroll();
        }
    }, [trucks.length]);

    useEffect(() => {
        const widthTabsColumn = 388;
        const columns: columnType[] = [
            {
                id      : 'tabs',
                sticky  : true,
                minWidth: widthTabsColumn
            }
        ];
        const widthTable = document.getElementById('dispatch-table')?.clientWidth || 0;
        const widthCell = (widthTable - widthTabsColumn) / periodDays;
        for (let i = 0; i < periodDays; i += 1) {
            const day = moment(from_date).add(i, 'days');
            columns.push({
                id      : day.format('MMM DD'),
                day,
                minWidth: widthCell < 138 ? 138 : widthCell,
                sticky  : false,
                today   : day.isSame(moment.tz(timezone), 'day')
            });
        }
        setColumns(columns);
    }, [periodDays, from_date, timezone]);

    return (
        <ContainerTable>
            <PerfectScrollbar
                id="dispatch-table"
                options={{
                    wheelSpeed      : 1,
                    wheelPropagation: false
                }}
                containerRef={(el) => setContainerRef(el)}
                ref={(ref) => getRef(ref)}
            >
                {/* --------------- HEADER --------------- */}
                <TableHeader columns={columns} />

                {/* --------------- BODY --------------- */}
                {!isLoading && trucks.length === 0 ? (
                    <EmptyData />
                ) : (
                    <TableBody
                        columns={columns}
                        rows={trucks}
                    />
                )}

                {/* --------------- LOADING --------------- */}
                <Loading isLoading={isLoading} />
            </PerfectScrollbar>
        </ContainerTable>
    );
};

export default Table;
