import React from 'react';
import TimeOffButton from '@/views/dispatch/scheduling/components/Header/TimeOffButton/TimeOffButton';
import CapListButton from '@/views/dispatch/scheduling/components/Header/CapListButton/CapListButton';
import FilterSelects from '@/views/dispatch/scheduling/components/Header/Filters/FilterSelects';
import ClearFilters from '@/views/dispatch/scheduling/components/Header/Filters/ClearFilters';
import PageHeadersKit from '@/@core/ui-kits/page-headers';
import { SchedulingIcon } from '@/@core/icons/custom-nav-icons/icons';
import Search from './Filters/Search';
import RangeDatePicker from './Filters/RangeDatePicker';
import SwitchOnline from './Filters/SwitchOnline';

const SchedulingHeader = () => (
    <PageHeadersKit.Header
        topLeft={(
            <>
                <PageHeadersKit.Title
                    Icon={<SchedulingIcon />}
                    title="pages:schedule"
                />
                <Search />
            </>
        )}
        topRight={(
            <>
                <PageHeadersKit.AvatarGroup />
                <CapListButton />
                <TimeOffButton />
                <PageHeadersKit.Divider />
                <PageHeadersKit.Buttons.CreateLoad />
            </>
        )}
        bottomLeft={(
            <>
                {/* <FilterButton /> */}
                <RangeDatePicker />
                <PageHeadersKit.Divider />
                <FilterSelects />
            </>
        )}
        bottomRight={(
            <>
                <SwitchOnline />
                <ClearFilters />
            </>
        )}
    />
);

export default SchedulingHeader;
