import SearchField from '@/@core/components/search/search-field/SearchField';
import { ServiceSchedulingIcon } from '@/@core/icons/custom-nav-icons/icons';
import PageHeadersKit from '@/@core/ui-kits/page-headers';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';

export default function Header() {
    const handleCreate = () => {};

    return (
        <PageHeadersKit.Header
            topLeft={(
                <>
                    <PageHeadersKit.Title
                        Icon={<ServiceSchedulingIcon />}
                        title="navigation:items.maintenance.scheduling"
                    />
                    <SearchField
                        filter_id=""
                        isLoading={false}
                    />
                </>
            )}
            topRight={(
                <>
                    <PageHeadersKit.AvatarGroup />
                    <PageHeadersKit.Buttons.Primary
                        onClick={handleCreate}
                        icon={<AddIcon />}
                        disabled={false}
                        size="small"
                        title="core:basic.page_headers.buttons.add"
                        sx={{
                            minWidth: 'fit-content'
                        }}
                    />
                </>
            )}
        />
    );
}
