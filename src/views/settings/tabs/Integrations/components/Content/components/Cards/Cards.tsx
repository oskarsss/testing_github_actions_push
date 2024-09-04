/* eslint-disable react/jsx-no-useless-fragment */
import { IntegrationProvider } from '@proto/integrations';
import CardItem from '@/views/settings/tabs/Integrations/components/Content/components/Cards/CardItem';
import React from 'react';
import SettingsEmptyScreen, { FallbackType } from '@/views/settings/components/SettingsEmptyScreen';
import { useRequestIntegrationDialog } from '@/views/settings/tabs/Integrations/dialogs/RequestIntegration/RequestIntegration';

type Props = {
    providers: IntegrationProvider[];
};

export default function Cards({ providers }: Props) {
    const requestIntegrationDialog = useRequestIntegrationDialog();

    if (providers.length === 0) {
        const onClick = () => {
            requestIntegrationDialog.open({});
        };
        return (
            <SettingsEmptyScreen
                onClickFallback={onClick}
                type={FallbackType.ELD_PROVIDER}
            />
        );
    }

    return (
        <>
            {providers.map((item) => (
                <CardItem
                    key={item.id}
                    item={item}
                />
            ))}
        </>
    );
}
