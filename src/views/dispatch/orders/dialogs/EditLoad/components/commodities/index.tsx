import VectorIcons from '@/@core/icons/vector_icons';
import FullDialog from '@/@core/ui-kits/full-dialog';
import CommoditiesTable from '@/@core/ui-kits/loads/commodities-table';
import { useCreateCommodityDialog } from '@/@core/ui-kits/loads/commodities-table/modals/CreateCommodity';
import LoadDetailsViewStyled from '@/views/dispatch/orders/Details/LoadDetailsView.styled';
import { Button, Stack } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import LoadCommoditiesGrpcService from '@/@grpcServices/services/loads-service/load-comodities.service';
import { useStableArray } from '@/hooks/useStable';
import { LoadData_Load } from '@proto/loads';

type Props = {
    load: LoadData_Load;
};

export default function Commodities({ load }: Props) {
    const createDialog = useCreateCommodityDialog();

    const { data } = LoadCommoditiesGrpcService.useGetCommoditiesForLoadQuery({
        loadId: load.loadId
    });

    const commodities = useStableArray(data?.commodities);

    const createCommodity = () => {
        createDialog.open({ loadId: load.loadId });
    };
    const { t } = useAppTranslation();
    return (
        <Stack
            direction="column"
            spacing={1}
        >
            <LoadDetailsViewStyled.FlexContainer
                style={{
                    justifyContent: 'space-between',
                    marginBottom  : '16px',
                    padding       : '0 8px',
                    minHeight     : '32px'
                }}
            >
                <FullDialog.TableHeader
                    icon={<VectorIcons.FullDialogIcons.Commodity />}
                    title="modals:loads.edit_load.titles.commodities"
                    noWrap
                />
                <Button
                    variant="text"
                    startIcon={<AddIcon fontSize="small" />}
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
