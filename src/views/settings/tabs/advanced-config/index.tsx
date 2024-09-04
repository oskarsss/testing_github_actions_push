import CompaniesGrpcService from '@/@grpcServices/services/companies.service';
import { useStableArray } from '@/hooks/useStable';
import Container from '@/views/settings/components/Container/Container';
import SettingsHeader from '@/views/settings/components/Header/SettingsHeader';
import { FallbackType } from '@/views/settings/components/SettingsEmptyScreen';
import SettingTable from '@/views/settings/components/Table/Table';
import { ExecuteAction } from '@/views/settings/components/Table/types';
import SettingIcons from '@/views/settings/icons/icons';
import { ConfigKeyGetReply_ConfigKey } from '@proto/companies';
import React, { useCallback } from 'react';
import { useUpdateActionRange } from './UpdateActionRange';
import columns from './columns';

export default function DriversActionRange() {
    const {
        data,
        isLoading
    } = CompaniesGrpcService.useGetCompaniesConfigQuery({});
    const configKeys = useStableArray(data?.configKeys);

    const updateDialog = useUpdateActionRange();

    const executeAction = useCallback<ExecuteAction<ConfigKeyGetReply_ConfigKey>>(
        (name, props) => {
            updateDialog.open({ config: props.row });
        },
        [updateDialog]
    );

    return (
        <Container>
            <SettingsHeader
                title="settings:advanced_config.header.title"
                icon={<SettingIcons.ActionRange />}
            />
            <SettingTable<ConfigKeyGetReply_ConfigKey>
                rows={configKeys}
                isLoading={isLoading}
                elementKey="key"
                columns={columns}
                executeAction={executeAction}
                onClickFallback={() => {}}
                fallbackType={FallbackType.COMPANY_KEYS}
            />
        </Container>
    );
}
