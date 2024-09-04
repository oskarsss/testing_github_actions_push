import { menuHookFabric } from '@/utils/menu-hook-fabric';
import MenuComponents from '@/@core/ui-kits/menus';
import openNewWindow from '@/utils/open-new-window';
import useCopyToClipboard from '@/utils/copy-to-clipboard';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import ContentCopy from '@mui/icons-material/ContentCopy';
import VectorIcons from '@/@core/icons/vector_icons';
import { useTheme } from '@mui/material/styles';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export const useOptionsMenu = menuHookFabric(Options, {
    keepMounted: false
});

type Props = {
    copy_text: IntlMessageKey;
    copy_value: string;
    entity_type?: string;
    entity_id?: string;
    onChangePrimaryDriver?: () => void;
    onRemove: () => void;
    test_id?: string;
};

export default function Options({
    copy_text,
    copy_value,
    entity_type,
    entity_id,
    onChangePrimaryDriver,
    onRemove,
    test_id
}: Props) {
    const { t } = useAppTranslation();
    const theme = useTheme();
    const menu = useOptionsMenu(true);
    const copy = useCopyToClipboard();

    const moveToProfile = () => {
        openNewWindow(`/${entity_type}/${entity_id}`);
        menu.close();
    };

    const copyHandler = () => {
        copy(copy_value, `${t('common:copy.copied')} ${t(copy_text)}`);
        menu.close();
    };

    const remove = () => {
        onRemove();
        menu.close();
    };

    return (
        <MenuComponents.List>
            {entity_type && (
                <MenuComponents.Item
                    Icon={<AccountCircleSharpIcon fontSize="small" />}
                    text="common:button.view_profile"
                    onClick={moveToProfile}
                />
            )}

            <MenuComponents.Item
                Icon={<ContentCopy fontSize="small" />}
                text="common:copy.title"
                translateOptions={{ text: t(copy_text) }}
                onClick={copyHandler}
            />

            {onChangePrimaryDriver && (
                <MenuComponents.Item
                    Icon={(
                        <VectorIcons.LoadIcons.Switch
                            style={{ fill: theme.palette.semantic.text.secondary }}
                        />
                    )}
                    text="trucks:profile.right.drivers.menu.options.make_primary"
                    onClick={onChangePrimaryDriver}
                />
            )}

            <MenuComponents.DangerItem
                Icon={(
                    <VectorIcons.DetailsIcons.Unassigned
                        style={{ fill: theme.palette.semantic.text.secondary }}
                    />
                )}
                text="common:button.unassign"
                onClick={remove}
                test_id={test_id}
            />
        </MenuComponents.List>
    );
}
