import Container from '@/views/settings/components/Container/Container';
import { useState } from 'react';
import { TabsValue } from '@/views/settings/components/tabs/SettingsHeaderTabs';
import { useAllMainRoles } from '@/store/settings/roles/hooks';
import { useFilteredDeletedRows } from '@/views/settings/components/tabs/filteredDeletedRowsHook';
import RolesTable from './components/Table';
import RolesHeader from './components/Header';

export default function Roles() {
    const [tabsValue, setTabsValue] = useState<TabsValue>(TabsValue.CURRENT);

    const {
        roles,
        isLoading
    } = useAllMainRoles();

    const filteredRoles = useFilteredDeletedRows(roles, tabsValue);

    return (
        <Container>
            <RolesHeader
                tabsValue={tabsValue}
                setTabsValue={setTabsValue}
                roles={roles}
            />
            <RolesTable
                roles={filteredRoles}
                isLoading={isLoading}
            />
        </Container>
    );
}
