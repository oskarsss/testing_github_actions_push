import React from 'react';
import TableSortLabel from '@mui/material/TableSortLabel';
import Import from '@/store/import/types';
import { HeaderCell } from './styled';

type Props = {
    sort_active: boolean;
    order: Import.Filter['order'];
    title: string;
    width: string | number;
    onClick: () => void;
};
export default function TableHeaderCell({
    title,
    width,
    sort_active,
    order,
    onClick
}: Props) {
    return (
        <HeaderCell
            style={{
                maxWidth: width,
                minWidth: width,
                width
            }}
            onClick={onClick}
        >
            <p>{title}</p>
            <TableSortLabel
                active={sort_active}
                direction={order}
            />
        </HeaderCell>
    );
}
