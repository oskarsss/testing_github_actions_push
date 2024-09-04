import { Stack, Typography } from '@mui/material';
import Switch from '@/@core/ui-kits/loads/share-link/components/Switcher';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { IntlMessageKey } from '@/@types/next-intl';

type Config<T extends object> = {
    id: string;
    label: IntlMessageKey;
    info: IntlMessageKey;
    field: keyof T;
};

type Props<T extends object> = {
    dataLinks: T;
    switchConfigs: Config<T>[];
    onChange: (field: keyof T, checked: boolean) => void;
};

export type ShareLinkItemsListProps<T extends object> = Props<T>;

export default function ShareLinkItemsList<T extends object>({
    dataLinks,
    switchConfigs,
    onChange
}: Props<T>) {
    const { t } = useAppTranslation();

    return (
        <Stack
            flexDirection="column"
            gap="10px"
        >
            <Typography
                variant="body1"
                fontWeight={600}
                fontSize="14px"
            >
                {t('modals:loads.share_link.show')}:
            </Typography>

            <Stack
                flexDirection="row"
                flexWrap="wrap"
                justifyContent="space-between"
                gap="10px"
            >
                {switchConfigs.map((el) => (
                    <Switch
                        key={el.id}
                        checked={!!dataLinks[el.field]}
                        onChange={() => onChange(el.field, !dataLinks[el.field])}
                        label={t(el.label)}
                        info={el.info}
                    />
                ))}
            </Stack>
        </Stack>
    );
}
