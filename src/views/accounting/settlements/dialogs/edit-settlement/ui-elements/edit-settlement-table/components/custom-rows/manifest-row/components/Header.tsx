import MiniTableStyled from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import manifestDetailsColumns from '../manifest-details-table/ManifestDetailsColumns';

export default function Header() {
    const { t } = useAppTranslation();
    return (
        <MiniTableStyled.HeaderRow
            sx={{
                backgroundColor: (theme) => (theme.palette.mode === 'light' ? '#F6F7F9' : '#6B6D70')
            }}
        >
            <TableRow>
                <MiniTableStyled.HeaderCell
                    min_width={manifestDetailsColumns.first}
                    hasMaxWidth
                />
                <MiniTableStyled.HeaderCell
                    min_width={manifestDetailsColumns.second}
                    hasMaxWidth
                />
                <MiniTableStyled.HeaderCell
                    min_width={manifestDetailsColumns.emptyMi}
                    hasMaxWidth
                >
                    {t('modals:settlements.edit_settlement.table.manifests.columns.empty_mi')}
                </MiniTableStyled.HeaderCell>
                <MiniTableStyled.HeaderCell
                    min_width={manifestDetailsColumns.loadedMi}
                    hasMaxWidth
                >
                    {t('modals:settlements.edit_settlement.table.manifests.columns.loaded_mi')}
                </MiniTableStyled.HeaderCell>
                <MiniTableStyled.HeaderCell
                    min_width={manifestDetailsColumns.loadAndStops}
                    hasMaxWidth
                >
                    {t('modals:settlements.edit_settlement.table.manifests.columns.load_and_stops')}
                </MiniTableStyled.HeaderCell>
                <MiniTableStyled.HeaderCell
                    min_width={manifestDetailsColumns.payItem}
                    hasMaxWidth
                >
                    {t('modals:settlements.edit_settlement.table.manifests.columns.pay_item')}
                </MiniTableStyled.HeaderCell>
                <MiniTableStyled.HeaderCell
                    min_width={manifestDetailsColumns.units}
                    hasMaxWidth
                >
                    {t('modals:settlements.edit_settlement.table.manifests.columns.units')}
                </MiniTableStyled.HeaderCell>
                <MiniTableStyled.HeaderCell
                    min_width={manifestDetailsColumns.rateAndAmount}
                    is_text_align_left={false}
                    sx={{
                        height        : '23px',
                        display       : 'flex',
                        alignItems    : 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <Typography
                        variant="body1"
                        fontSize="9px"
                        fontWeight="inherit"
                    >
                        {t('modals:settlements.edit_settlement.table.manifests.columns.rate')}
                    </Typography>

                    <Typography
                        variant="body1"
                        fontSize="9px"
                        fontWeight="inherit"
                    >
                        {t('common:amount')}
                    </Typography>
                </MiniTableStyled.HeaderCell>
            </TableRow>
        </MiniTableStyled.HeaderRow>
    );
}
