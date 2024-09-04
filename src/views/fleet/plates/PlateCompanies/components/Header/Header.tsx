import PageSwitcher from '@/views/fleet/plates/components/PageSwitcher/PageSwitcher';
import Search from '@/views/fleet/plates/PlateCompanies/components/Header/Search';
import AddCompanyButton from '@/views/fleet/plates/PlateCompanies/components/Header/AddCompanyButton';
import CompaniesViews from '@/views/fleet/plates/PlateCompanies/components/Header/Views';
import PageHeadersKit from '@/@core/ui-kits/page-headers';

export default function PlatesCompaniesHeader() {
    return (
        <PageHeadersKit.Header
            topLeft={(
                <>
                    <PageSwitcher />
                    <Search />
                    <CompaniesViews />
                </>
            )}
            topRight={(
                <>
                    <PageHeadersKit.AvatarGroup />
                    <PageHeadersKit.Divider />
                    <AddCompanyButton />
                </>
            )}
        />
    );
}
