import SearchField from '@/@core/components/search/search-field/SearchField';
import { DefectsIcon } from '@/@core/icons/custom-nav-icons/icons';
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
                        Icon={<DefectsIcon />}
                        title="navigation:items.maintenance.defects"
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
                        sx={{
                            minWidth: 'fit-content'
                        }}
                        title="core:basic.page_headers.buttons.add"
                    />
                </>
            )}
        />
    );
}
