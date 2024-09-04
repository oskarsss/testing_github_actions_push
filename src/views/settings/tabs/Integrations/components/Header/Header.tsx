import PageHeadersKit from '@/@core/ui-kits/page-headers';
import SettingIcons from '@/views/settings/icons/icons';
import AddIcon from '@mui/icons-material/Add';
import { Stack } from '@mui/material';
import Search from '@/views/settings/tabs/Integrations/components/Header/components/Search';
import { useRequestIntegrationDialog } from '@/views/settings/tabs/Integrations/dialogs/RequestIntegration/RequestIntegration';

export default function Header() {
    const requestIntegrationDialog = useRequestIntegrationDialog();
    const openRequestIntegrationDialog = () => {
        requestIntegrationDialog.open({});
    };
    return (
        <PageHeadersKit.Header
            topLeft={(
                <Stack
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                    width="100%"
                    gap="8px"
                >
                    <PageHeadersKit.Title
                        maxWidth={250}
                        title="settings:integrations.header.title"
                        Icon={<SettingIcons.Integrations />}
                    />
                    <Search />
                    <PageHeadersKit.Buttons.Primary
                        icon={<AddIcon />}
                        onClick={openRequestIntegrationDialog}
                        title="settings:integrations.header.buttons.request_integration"
                    />
                </Stack>
            )}
            sx={{
                backgroundColor: (theme) => theme.palette.semantic.foreground.white.tertiary
            }}
        />
    );
}
