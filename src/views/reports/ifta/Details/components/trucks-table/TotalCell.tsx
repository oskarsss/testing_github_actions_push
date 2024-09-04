import MiniTableStyled from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import { Stack, Typography, useTheme } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = { total: string | number };

export default function TotalCell({ total }: Props) {
    const { t } = useAppTranslation();
    const { palette } = useTheme();
    return (
        <MiniTableStyled.Cell
            sx={{
                background    : palette.semantic.border.primary,
                position      : 'sticky',
                bottom        : 0,
                padding       : 0,
                '&:last-child': {
                    padding: '0 !important'
                }
            }}
        >
            <Stack
                direction="row"
                flex="1 1 100%"
                paddingRight="12px"
                sx={{
                    borderBottom: `1px solid ${palette.semantic.border.tertiary}`
                }}
            >
                <Typography
                    fontSize="14px"
                    lineHeight="18px"
                    fontWeight={500}
                    color="semantic.text.secondary"
                    sx={{ width: '100%' }}
                >
                    {t('ifta:details.totals.table.total')}{' '}
                    <Typography
                        component="span"
                        variant="body1"
                        fontSize="14px"
                        color="semantic.text.primary"
                        width="min-content"
                        fontWeight={500}
                    >
                        {total}
                    </Typography>
                </Typography>
            </Stack>
        </MiniTableStyled.Cell>
    );
}
