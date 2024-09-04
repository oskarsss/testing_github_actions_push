import PageHeadersKit from '@/@core/ui-kits/page-headers';
import { StatsIcon } from '@/@core/icons/custom-nav-icons/icons';
import DispatchersCycleSelect from '@/views/accounting/dispatchers/sections/header/componetns/Cycles/DispatchersCycleSelect';
import DispatchersCyclePeriodSelect from '@/views/accounting/dispatchers/sections/header/componetns/Periods/DispatchersCyclePeriodSelect';

export default function DispatchersHeader() {
    return (
        <PageHeadersKit.Header
            sx={{ zIndex: 1 }}
            topLeft={(
                <>
                    <PageHeadersKit.Title
                        Icon={<StatsIcon />}
                        title="dispatchers:header.title"
                        maxWidth={210}
                    />
                    <DispatchersCycleSelect />
                    <DispatchersCyclePeriodSelect />
                </>
            )}
            topRight={<PageHeadersKit.AvatarGroup />}
        />
    );
}
