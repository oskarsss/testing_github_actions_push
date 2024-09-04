import MiniTable from '@/@core/ui-kits/basic/mini-table/MiniTable';
import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import {
    MiniTableColumnType,
    MiniTableExecuteActionType
} from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import SettingsEmptyScreen, { FallbackType } from '@/views/settings/components/SettingsEmptyScreen';

type Props<Row extends Record<string, any>> = {
    rows: Row[];
    isLoading: boolean;
    elementKey: keyof Row;
    columns: MiniTableColumnType[];
    executeAction: MiniTableExecuteActionType<Row>;
    fallbackType: FallbackType;
    onClickFallback: () => void;
};

export default function SettingTable<Row extends Record<string, any>>({
    rows,
    isLoading,
    elementKey,
    columns,
    executeAction,
    fallbackType,
    onClickFallback
}: Props<Row>) {
    if (isLoading) {
        return (
            <Preloader
                sx={{
                    height: '100%'
                }}
            />
        );
    }

    if (!rows.length) {
        return (
            <SettingsEmptyScreen
                type={fallbackType}
                onClickFallback={onClickFallback}
            />
        );
    }

    return (
        <MiniTable
            rows={rows}
            elementKey={elementKey}
            executeAction={executeAction}
            columns={columns}
            turnOffBorder
            stickyHeader
        />
    );
}
