import { Stack, styled, Tooltip } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useOverrideEditGrossDialog } from '@/views/dispatch/manifests/modals/overrides/OverrideEditGross';
import { Amount } from '@proto/models/amount';
import EditIcon from '@mui/icons-material/Edit';

const InfoBlock = styled(Stack)(({ theme }) => ({
    padding        : '8px 12px',
    backgroundColor: theme.palette.colors.brand[400],
    borderLeft     : `1px solid ${theme.palette.semantic.border.brand.tertiary}`,
    maxHeight      : '65px',
    '&.lastElement': {
        borderRadius: '0 8px 8px 0'
    },
    '&.firstElement': {
        backgroundColor: theme.palette.semantic.foreground.brand.primary,
        borderRadius   : '8px 0 0 8px',
        border         : 'none'

        // cursor         : 'pointer'
    }
}));

const Title = styled('p')(({ theme }) => ({
    fontSize  : '12px',
    fontWeight: 500,
    color     : theme.palette.semantic.text.brand.tertiary,
    margin    : 0
}));

const OverviewAmount = styled('p')(({ theme }) => ({
    fontSize  : '24px',
    fontWeight: 600,
    color     : theme.palette.semantic.text.white,
    margin    : 0
}));

type Props = {
    manifestId: string;
    gross?: Amount;
    totalMiles: string;
    rpm?: Amount;
};

export default function EquipmentOverview({
    manifestId,
    gross,
    totalMiles,
    rpm
}: Props) {
    const { t } = useAppTranslation();
    const editGrossDialog = useOverrideEditGrossDialog();

    const openEditGrossDialog = () => {
        editGrossDialog.open({
            manifestId,
            gross
        });
    };
    return (
        <Stack direction="row">
            <InfoBlock
                className="firstElement"
                flex="2 1 0"
            >
                <Tooltip
                    title={t('common:button.edit')}
                    placement="top"
                    disableInteractive
                    slotProps={{
                        popper: {
                            modifiers: [
                                {
                                    name   : 'offset',
                                    options: {
                                        offset: [0, -12]
                                    }
                                }
                            ]
                        }
                    }}
                >
                    <Stack
                        onClick={openEditGrossDialog}
                        direction="row"
                        gap="4px"
                        maxWidth="fit-content"
                        sx={{
                            cursor: 'pointer'
                        }}
                        alignItems="center"
                    >
                        <Title>{t('common:gross')}</Title>

                        <EditIcon
                            sx={{
                                color: ({ palette }) => palette.semantic.foreground.white.secondary,

                                fontSize: '12px'
                            }}
                        />
                    </Stack>
                </Tooltip>
                <OverviewAmount>{gross?.amountFormatted || '-'}</OverviewAmount>
            </InfoBlock>

            <InfoBlock flex="1 1 0">
                <Title>{t('common:rpm')}</Title>
                <OverviewAmount>{rpm?.amountFormatted}</OverviewAmount>
            </InfoBlock>

            <InfoBlock
                className="lastElement"
                flex="2 1 0"
            >
                <Title>{t('modals:manifests.details.equipment.titles.total_miles')}</Title>
                <OverviewAmount>{totalMiles}</OverviewAmount>
            </InfoBlock>
        </Stack>
    );
}
