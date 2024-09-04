import { Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { SettlementsActions } from '@/store/accounting/settlements/slice';
import SettlementsTypes from '@/store/accounting/settlements/types';
import { useMemo } from 'react';
import { useEditManifestDialog } from '@/views/dispatch/manifests/modals/edit-manifest/EditManifest';
import EditDialogTable from '../../../ui-elements/edit-settlement-table/EditSettlementTable';
import columnsConfig from './columns';
import EditSettlementIcons from '../../../edit-settlement-icons';
import EditSettlement from '../../../styled';
import SwitchMode, { ChangeType } from '../../edit-settlement-actions/SwitchMode';
import { useEditSettlementContext } from '../../../EditSettlement';

type Props = {
    setMaxHeight?: boolean;
};

export default function EditSettlementManifests({ setMaxHeight = false }: Props) {
    const { settlement } = useEditSettlementContext();

    const dispatch = useAppDispatch();
    const isExpandDriverPayColumn = useAppSelector(
        (state) => state.settlements.edit_dialog.expand_driver_pay_columns
    );

    const editManifestDialog = useEditManifestDialog();

    const manifestIds = useMemo(() => {
        const items = columnsConfig.getItems(settlement);
        return items.map((item) => item.manifestId);
    }, [settlement]);

    const handleSwitch: ChangeType = (event, checked) => {
        if (checked) {
            dispatch(SettlementsActions.SetEditDialogExpandDriverPayColumns(manifestIds));
            return;
        }
        dispatch(SettlementsActions.SetEditDialogExpandDriverPayColumns([]));
    };

    const executeAction = (
        name: string,
        props: { row: SettlementsTypes.CycleSettlementDetails.Manifests }
    ) => {
        switch (name) {
        case 'edit':
            editManifestDialog.open({
                manifestId: props.row.manifestId
            });
            break;
        default:
            break;
        }
    };

    return (
        <Stack
            direction="column"
            spacing={1}
            flex={!setMaxHeight ? '1 1 0' : '1 1 200px'}
            gap={1}
        >
            <EditSettlement.SectionHeader
                title="entity:manifests"
                Icon={<EditSettlementIcons.Section.Manifests />}
            >
                <SwitchMode
                    checked={isExpandDriverPayColumn.length > 0}
                    onChange={handleSwitch}
                    disabled={manifestIds.length === 0}
                    label="modals:settlements.edit_settlement.tabs.manifests.header.switch.expand_details"
                />
            </EditSettlement.SectionHeader>
            <EditDialogTable
                sectionName="manifestsInfo"
                columnsConfig={columnsConfig}
                executeAction={executeAction}
            />
        </Stack>
    );
}
