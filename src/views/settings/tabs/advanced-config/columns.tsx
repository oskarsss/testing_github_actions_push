import { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import common_table_styles from '@/views/settings/common_table_styles';
import ActionsSettingsTable from '@/views/settings/components/Table/components/Actions';
import { ConfigKeyGetReply_ConfigKey } from '@proto/companies';
import { ConfigModel_ValueType } from '@proto/models/model_config';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { Typography, Tooltip, Stack } from '@mui/material';
import HelpOutlineSharpIcon from '@mui/icons-material/HelpOutlineSharp';

const UnitValue: Record<ConfigModel_ValueType, IntlMessageKey> = {
    [ConfigModel_ValueType.CONFIG_VALUE_UNSPECIFIED]: '',
    [ConfigModel_ValueType.CONFIG_VALUE_BOOL]       : '',
    [ConfigModel_ValueType.CONFIG_VALUE_STRING]     : '',
    [ConfigModel_ValueType.CONFIG_VALUE_INT]        : 'common:time.short.h',
    [ConfigModel_ValueType.CONFIG_VALUE_FLOAT]      : 'common:mi'
};

function RangeHeader() {
    const { t } = useAppTranslation();
    return (
        <Stack
            direction="row"
            gap="4px"
            alignItems="center"
        >
            <Tooltip
                title={t('settings:advanced_config.table.tooltip')}
                placement="top"
            >
                <HelpOutlineSharpIcon
                    sx={{
                        fill    : ({ palette }) => palette.semantic.text.secondary,
                        fontSize: '12px'
                    }}
                />
            </Tooltip>

            <Typography
                variant="body1"
                fontWeight={700}
                fontSize="9px"
            >
                {t('settings:advanced_config.table.range')}
            </Typography>
        </Stack>
    );
}

const columns: MiniTableColumnType<ConfigKeyGetReply_ConfigKey>[] = [
    {
        field     : 'key',
        headerName: 'settings:advanced_config.table.action',
        minWidth  : 200,
        flex_start: true,
        renderCell: (row) => <div>{row.name}</div>,
        onClick   : (row, props) => {
            props.executeAction('edit', { row, event: props.event });
        }
    },
    {
        field     : 'value',
        headerName: <RangeHeader />,
        minWidth  : 200,
        flex_start: true,
        renderCell: (row, t) => (
            <div>
                {row.value} {t(UnitValue[row.valueType])}
            </div>
        ),
        onClick: (row, props) => {
            props.executeAction('edit', { row, event: props.event });
        }
    },
    {
        field      : 'edit',
        headerName : '',
        minWidth   : 50,
        hasMaxWidth: true,
        styles     : common_table_styles,
        renderCell : () => <ActionsSettingsTable.Edit />,
        onClick    : (row, {
            executeAction,
            event
        }) => {
            executeAction('edit', { row, event });
        }
    }
];

export default columns;
