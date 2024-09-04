import Container from '@/views/settings/components/Container/Container';
import Header from '@/views/settings/components/Header/SettingsHeader';
import SettingIcons from '@/views/settings/icons/icons';
import React, { useState } from 'react';
import Table from '@/views/settings/tabs/Loads/LoadTypes/components/Table';
import { useAddLoadTypeDialog } from '@/views/settings/tabs/Loads/LoadTypes/dialogs/AddLoadTypeDialog';
import SettingsHeaderTabs, { TabsValue } from '@/views/settings/components/tabs/SettingsHeaderTabs';
import { useStableArray } from '@/hooks/useStable';
import LoadTypesGrpcService from '@/@grpcServices/services/loads-service/load-types.service';
import { useFilteredDeletedRows } from '@/views/settings/components/tabs/filteredDeletedRowsHook';

export default function LoadTypes() {
    const [value, setValue] = useState<TabsValue>(TabsValue.CURRENT);
    const addLoadTypeDialog = useAddLoadTypeDialog();
    const addLoadType = () => {
        addLoadTypeDialog.open({});
    };

    const {
        data,
        isLoading
    } = LoadTypesGrpcService.useGetLoadTypesQuery({});

    const loadTypes = useStableArray(data?.loadTypes);

    const filteredLoadTypes = useFilteredDeletedRows(loadTypes, value);

    return (
        <Container>
            <Header
                title="settings:loads.load_types.title"
                icon={<SettingIcons.LoadTypes />}
                onClick={addLoadType}
                children_left_side={(
                    <SettingsHeaderTabs
                        value={value}
                        setValue={setValue}
                        categories={loadTypes}
                    />
                )}
            />
            <Table
                isLoading={isLoading}
                loadTypes={filteredLoadTypes}
            />
        </Container>
    );
}
