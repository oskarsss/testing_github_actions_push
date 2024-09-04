import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { memo } from 'react';
import PinnedColumns from '@/@core/components/table/TableEditor/components/ReorderColumns/components/Header';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { TFunction } from '@/@types/next-intl';

const columnsTitleOptions = (index: number, t: TFunction, pinnedAmount?: number) => [
    {
        name:
            index === 0
                ? PinnedColumns({ pinnedColumnsAmount: pinnedAmount as number })
                : t('core:table.table_editor.columns.regular_columns'),
        size: 3.2
    },
    {
        name: t('core:table.table_editor.columns.type'),
        size: 2.9
    },
    {
        name: t('core:table.table_editor.columns.group_name'),
        size: 2.9
    },
    {
        name: t('core:table.table_editor.columns.border'),
        size: 2
    },
    {
        name: t('core:table.table_editor.columns.total'),
        size: 1
    }
];

type Props = {
    index: number;
    pinnedAmount?: number;
};

const ColumnsTitles = ({
    index,
    pinnedAmount
}: Props) => {
    const { t } = useAppTranslation();
    return (
        <Grid
            p={2}
            container
            spacing={1}
            sx={{
                marginTop: index === 0 ? '6px' : '0px'
            }}
        >
            {columnsTitleOptions(index, t, pinnedAmount).map((item, index) => (
                <Grid
                    item
                    xs={item.size}
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                >
                    <Typography
                        variant="subtitle1"
                        fontSize="14px"
                        fontWeight={500}
                    >
                        {item.name}
                    </Typography>
                </Grid>
            ))}
        </Grid>
    );
};

export default memo(ColumnsTitles);
