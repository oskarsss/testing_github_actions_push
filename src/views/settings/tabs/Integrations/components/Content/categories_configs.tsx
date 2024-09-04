import { IntegrationProvider_Category } from '@proto/integrations';
import React from 'react';
import IntegrationIcons from '@/views/settings/tabs/Integrations/icons';
import { IntlMessageKey } from '@/@types/next-intl';

export const IntegrationCategoryIcons: Record<IntegrationProvider_Category, React.ReactNode> = {
    [IntegrationProvider_Category.UNSPECIFIED]: <IntegrationIcons.All />,
    [IntegrationProvider_Category.GPS]        : <IntegrationIcons.GPS />,
    [IntegrationProvider_Category.ELD]        : <IntegrationIcons.ELD />,
    [IntegrationProvider_Category.Accounting] : <IntegrationIcons.Accounting />,
    [IntegrationProvider_Category.Factoring]  : <IntegrationIcons.Factoring />,
    [IntegrationProvider_Category.Fuel]       : <IntegrationIcons.Fuel />,
    [IntegrationProvider_Category.Tolls]      : <IntegrationIcons.Tools />,
    [IntegrationProvider_Category.Loadboard]  : <IntegrationIcons.Loadboard />
};

export const IntegrationCategoryLabels: Record<IntegrationProvider_Category, IntlMessageKey> = {
    [IntegrationProvider_Category.UNSPECIFIED]: 'settings:integrations.cards.all_categories',
    [IntegrationProvider_Category.GPS]        : 'settings:integrations.cards.gps',
    [IntegrationProvider_Category.ELD]        : 'settings:integrations.cards.eld',
    [IntegrationProvider_Category.Accounting] : 'settings:integrations.cards.accounting',
    [IntegrationProvider_Category.Factoring]  : 'settings:integrations.cards.factoring',
    [IntegrationProvider_Category.Fuel]       : 'settings:integrations.cards.fuel',
    [IntegrationProvider_Category.Tolls]      : 'settings:integrations.cards.tolls',
    [IntegrationProvider_Category.Loadboard]  : 'settings:integrations.cards.loadboard'
};

export const IntegrationCategoryArray: IntegrationProvider_Category[] = [
    IntegrationProvider_Category.UNSPECIFIED,
    IntegrationProvider_Category.GPS,
    IntegrationProvider_Category.ELD,
    IntegrationProvider_Category.Accounting,
    IntegrationProvider_Category.Factoring,
    IntegrationProvider_Category.Fuel,
    IntegrationProvider_Category.Tolls,
    IntegrationProvider_Category.Loadboard
];
