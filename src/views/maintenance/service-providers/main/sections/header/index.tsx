import { ServiceProviders } from '@/@core/icons/custom-nav-icons/icons';
import PageHeadersKit from '@/@core/ui-kits/page-headers';
import Stats from '@/views/maintenance/service-providers/ui-elements/Stats';
import Search from './Search';
import CreateServiceProviderButton from './CreateServiceProviderButton';

export default function Header() {
    return (
        <PageHeadersKit.Header
            topLeft={(
                <>
                    <PageHeadersKit.Title
                        Icon={<ServiceProviders />}
                        title="navigation:items.maintenance.service_providers"
                        maxWidth={180}
                    />

                    <Search />
                </>
            )}
            topRight={(
                <>
                    <PageHeadersKit.AvatarGroup />
                    <CreateServiceProviderButton />
                </>
            )}
            bottomLeft={(
                <Stats
                    sx={{
                        position : 'fixed',
                        marginTop: '20px'
                    }}
                />
            )}
        />
    );
}
