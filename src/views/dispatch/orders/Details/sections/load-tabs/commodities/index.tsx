import CommoditiesTable from '@/@core/ui-kits/loads/commodities-table';
import React from 'react';
import VectorIcons from '@/@core/icons/vector_icons';
import { Button, Stack } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useCreateCommodityDialog } from '@/@core/ui-kits/loads/commodities-table/modals/CreateCommodity';
import LoadCommoditiesGrpcService from '@/@grpcServices/services/loads-service/load-comodities.service';
import { useStableArray } from '@/hooks/useStable';
import { LoadData_Load } from '@proto/loads';
import LoadDetailsViewStyled from '../../../LoadDetailsView.styled';

type Props = {
    load: LoadData_Load;
};

function Commodities({ load }: Props) {
    const { t } = useAppTranslation();

    const { data } = LoadCommoditiesGrpcService.useGetCommoditiesForLoadQuery({
        loadId: load.loadId
    });

    const commodities = useStableArray(data?.commodities);

    // const list = load.commodities;

    const createDialog = useCreateCommodityDialog();

    const createCommodity = () => {
        createDialog.open({ loadId: load.loadId });
    };
    return (
        <Stack
            direction="column"
            sx={{
                padding: '16px 8px'
            }}
        >
            <LoadDetailsViewStyled.FlexContainer
                style={{
                    justifyContent: 'space-between',
                    marginBottom  : '16px',
                    padding       : '0 8px',
                    minHeight     : '32px'
                }}
            >
                <LoadDetailsViewStyled.FlexContainer style={{ gap: '4px' }}>
                    <VectorIcons.FullDialogIcons.Commodity size={24} />
                    <LoadDetailsViewStyled.Title style={{ fontSize: '16px' }}>
                        {t('loads:details.tabs.labels.commodities')}
                    </LoadDetailsViewStyled.Title>
                </LoadDetailsViewStyled.FlexContainer>
                <Button
                    variant="contained"
                    onClick={createCommodity}
                    size="small"
                >
                    {t('common:button.add_item')}
                </Button>
            </LoadDetailsViewStyled.FlexContainer>
            <CommoditiesTable
                loadId={load.loadId}
                commodities={commodities}
            />
        </Stack>
    );
}

export default React.memo(Commodities);
