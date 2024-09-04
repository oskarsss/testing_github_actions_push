import PageSwitcher, { View } from '@/views/fleet/trailers/Table/components/Header/PageSwitcher';
import { TestIDs } from '@/configs/tests';
import AddIcon from '@mui/icons-material/Add';
import BusinessIcon from '@mui/icons-material/Business';
import PageHeadersKit from '@/@core/ui-kits/page-headers';
import { TrailerIcon } from '@/@core/icons/custom-nav-icons/icons';
import navigateToPage from '@/utils/navigateToPage';
import Views from './Views';
import Search from './Search';
import { useAddTrailerCompanyDialog } from '../../dialogs/TrailerCompany/AddTrailerCompany';

const VIEWS: View[] = [
    {
        view_id: '0',
        name   : 'entity:trailers',
        icon   : TrailerIcon(),
        testID : TestIDs.pages.fleetTrailers.buttons.trailers
    },
    {
        view_id: '1',
        name   : 'entity:companies',
        icon   : <BusinessIcon color="primary" />,
        testID : TestIDs.pages.fleetTrailers.buttons.companies
    }
];
const SELECTED_VIEW_ID = '1';
const PATH = '/trailers';

export default function CompaniesHeader() {
    const addCompanyDialog = useAddTrailerCompanyDialog();

    const selectView = (view_id: string) => {
        if (view_id !== SELECTED_VIEW_ID) {
            navigateToPage(PATH);
        }
    };

    const add = () => {
        addCompanyDialog.open({});
    };

    return (
        <PageHeadersKit.Header
            topLeft={(
                <>
                    <div>
                        <PageSwitcher
                            views={VIEWS}
                            selectView={selectView}
                            selected_view_id={SELECTED_VIEW_ID}
                        />
                    </div>
                    <Search />
                    <Views />
                </>
            )}
            topRight={(
                <PageHeadersKit.Buttons.Primary
                    onClick={add}
                    testID={TestIDs.pages.trailersCompanies.buttons.addCompany}
                    title="trailers:trailer_company.header.button.add"
                    icon={<AddIcon />}
                />
            )}
        />
    );
}
