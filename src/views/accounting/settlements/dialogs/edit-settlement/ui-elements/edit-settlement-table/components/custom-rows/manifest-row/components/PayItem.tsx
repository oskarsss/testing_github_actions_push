import MiniTableStyled from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import Typography from '@mui/material/Typography';
import { React } from 'mdi-material-ui';
import { useDriverPayCategoriesMap } from '@/store/hash_maps/hooks';
import { useTheme } from '@mui/material/styles';
import type { PayItems } from '../manifest-details-table/ManifestDetailsTable';
import manifestDetailsColumns from '../manifest-details-table/ManifestDetailsColumns';

type Props = {
    item: PayItems;
};

export default function PayItem({ item }: Props) {
    const categoryMap = useDriverPayCategoriesMap();
    const payItemCategoryName = categoryMap[item?.categoryId || '']?.name || '';
    const textColor = useTheme().palette.semantic.text;

    return (
        <>
            <MiniTableStyled.Cell
                flex_start
                color={textColor.secondary}
                min_width={manifestDetailsColumns.payItem}
                hasMaxWidth
                sx={{
                    overflow    : 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace  : 'nowrap'
                }}
            >
                {payItemCategoryName}
            </MiniTableStyled.Cell>
            <MiniTableStyled.Cell
                min_width={manifestDetailsColumns.units}
                hasMaxWidth
                flex_start
            >
                {item?.units}
            </MiniTableStyled.Cell>
            <MiniTableStyled.Cell
                min_width={manifestDetailsColumns.rateAndAmount}
                sx={{
                    height        : '34px',
                    display       : 'flex',
                    alignItems    : 'center',
                    justifyContent: 'space-between',
                    borderBottom  : 0
                }}
            >
                <Typography
                    variant="body1"
                    fontSize="12px"
                    fontWeight="inherit"
                >
                    {item?.rate}
                </Typography>

                <Typography
                    variant="body1"
                    fontSize="12px"
                    fontWeight="inherit"
                >
                    {item?.amount}
                </Typography>
            </MiniTableStyled.Cell>
        </>
    );
}
