import { IChipColors } from '@/@core/theme/chip';
import {
    MANIFEST_STOP_TYPE_COLORS,
    MANIFEST_STOP_TYPE_ICONS
} from '@/@core/theme/entities/manifests/stop-type';
import { ManifestStopTypes } from '@/models/manifests/manifest-stop';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import { Stack, styled } from '@mui/material';
import { ManifestModel_ManifestStop_Type } from '@proto/models/model_manifest';
import { useAppTranslation } from '@/hooks/useAppTranslation';

const Item = styled('div')<{ chipColor: IChipColors }>(({
    theme,
    chipColor
}) => ({
    padding: '4px',
    gap    : '4px',
    display: 'flex',
    cursor : 'pointer',
    svg    : {
        color: theme.palette.utility.foreground[chipColor].primary
    },
    '&:hover': {
        background: theme.palette.semantic.foreground.secondary
    }
}));

export const useChangeStopTypeMenu = menuHookFabric(ChangeStopTypeMenu);

type Props = {
    onChange: (value: ManifestModel_ManifestStop_Type) => void;
};

function ChangeStopTypeMenu({ onChange }: Props) {
    const dialog = useChangeStopTypeMenu(true);
    const options = Object.entries(ManifestStopTypes).filter(([value, _]) => Number(value) !== 0);
    const { t } = useAppTranslation();

    return (
        <Stack direction="column">
            {options.map(([value, option]) => (
                <Item
                    key={option}
                    chipColor={MANIFEST_STOP_TYPE_COLORS[option]}
                    onClick={() => {
                        onChange(Number(value));
                        dialog.close();
                    }}
                >
                    {MANIFEST_STOP_TYPE_ICONS[option]}
                    {t(`state_info:stop.type.${option}`)}
                </Item>
            ))}
        </Stack>
    );
}
