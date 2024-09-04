import { CommodityModel } from '@proto/models/model_commodity';
import columns from '@/@core/ui-kits/loads/commodities-table/columns';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { COMMODITY_WEIGHT_UNIT } from '@/@core/ui-kits/loads/commodities-table/config';
import type { IntlMessageKey } from '@/@types/next-intl';
import { ReactElement } from 'react';
import TotalsRow from '../../basic/mini-table/components/TotalsRow';
import AddItemButton from '../add-item-button/AddItemButton';
import MiniTable from '../../basic/mini-table/MiniTable';
import type {
    MiniTableColumnType,
    MiniTableExecuteActionType
} from '../../basic/mini-table/MiniTable.types';
import { useCreateCommodityDialog } from './modals/CreateCommodity';
import { useEditCommodityDialog } from './modals/EditCommodity';

type Props = {
    commodities: CommodityModel[];
    loadId?: string;
    customColumns?: MiniTableColumnType<CommodityModel>[];
    hideAddButton?: boolean;
    emptyStateText?: IntlMessageKey | ReactElement;
};

export default function CommoditiesTable({
    commodities,
    loadId,
    customColumns,
    hideAddButton = false,
    emptyStateText
}: Props) {
    const { t } = useAppTranslation();
    const createDialog = useCreateCommodityDialog();
    const editDialog = useEditCommodityDialog();
    const createCommodity = () => {
        createDialog.open({ loadId });
    };

    const openEditDialog = (commodityId: string, commodityItem: CommodityModel) => {
        if (loadId) {
            editDialog.open({ loadId, commodityId, item: commodityItem });
        }
    };

    const executeAction: MiniTableExecuteActionType<CommodityModel> = (name, props) => {
        openEditDialog(props.row.commodityId, props.row);
    };

    const totalWeight = commodities.reduce((acc, commodity) => acc + (commodity.weight || 0), 0);

    const formattedWeight = totalWeight.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const weightUnit = commodities[0]?.weightUnit;
    const translatedWeightUnit = t(
        weightUnit in COMMODITY_WEIGHT_UNIT ? COMMODITY_WEIGHT_UNIT[weightUnit] : ''
    );

    return (
        <MiniTable
            stickyHeader
            turnOffBorder
            fontSize="large"
            columns={customColumns || columns}
            rows={commodities}
            elementKey="commodityId"
            executeAction={executeAction}
            emptyStateText={emptyStateText}
            ComponentAfterContent={(
                <TotalsRow
                    fontSize="large"
                    without_border
                    columns={customColumns || columns}
                    info_config={{
                        weight       : `${formattedWeight || '-'} ${translatedWeightUnit}`,
                        commodityName: hideAddButton ? undefined : (
                            <AddItemButton onClick={createCommodity} />
                        )
                    }}
                />
            )}
        />
    );
}
