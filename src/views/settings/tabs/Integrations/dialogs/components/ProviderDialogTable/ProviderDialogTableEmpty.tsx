import ProviderDialogTableComponents from '@/views/settings/tabs/Integrations/dialogs/components/ProviderDialogTable/ProviderDialogTableComponents';
import FallbackContent from '@/@core/ui-kits/basic/fallback-content/FallbackContent';
import { Stack } from '@mui/material';
import { EMPTY_SCREENS_CONFIG } from '@/@core/components/table/empty_screens_config';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    title: React.ReactNode;
    tableName: keyof typeof EMPTY_SCREENS_CONFIG;
    provider_name: string;
    onClose: () => void;
};

export default function ProviderDialogTableEmpty({
    title,
    tableName,
    provider_name,
    onClose
}: Props) {
    const config = EMPTY_SCREENS_CONFIG[tableName];
    const { t } = useAppTranslation();
    return (
        <ProviderDialogTableComponents.Container>
            <ProviderDialogTableComponents.Header sx={{ justifyContent: 'space-between' }}>
                <ProviderDialogTableComponents.Title>{title}</ProviderDialogTableComponents.Title>
                <ProviderDialogTableComponents.ButtonClose
                    variant="outlined"
                    onClick={onClose}
                >
                    {t('common:button.close')}
                </ProviderDialogTableComponents.ButtonClose>
            </ProviderDialogTableComponents.Header>

            <Stack
                position="relative"
                flexGrow={1}
            >
                <FallbackContent
                    size="large"
                    icon={config.NoDataIcon()}
                    firstText="modals:settings.integrations.drivers.empty_screen.first_text"
                    secondText="modals:settings.integrations.drivers.empty_screen.second_text"
                    translateOptions={{
                        firstText: {
                            primaryText: config.primaryText
                        },
                        secondText: {
                            providerName: provider_name
                        }
                    }}
                />
            </Stack>
        </ProviderDialogTableComponents.Container>
    );
}
