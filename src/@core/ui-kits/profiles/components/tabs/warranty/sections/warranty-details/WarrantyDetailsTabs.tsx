import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Stack, Tab, Typography } from '@mui/material';
import { ReactNode, SyntheticEvent, useState } from 'react';
import CoverageItems from '@/@core/ui-kits/profiles/components/tabs/warranty/sections/warranty-details/coverage-items/CoverageItems';
import WarrantyDocument from '@/@core/ui-kits/profiles/components/tabs/warranty/sections/warranty-details/documents/WarrantyDocument';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import getScrollbarStyles from '@/utils/get-scrollbar-styles';

type WarrantyDetailsTab = {
    label: IntlMessageKey;
    value: string;
    Component: ReactNode;
};

type Props = {
    vehicleWarrantyId: string;
};

export default function WarrantyDetailsTabs({ vehicleWarrantyId }: Props) {
    const { t } = useAppTranslation();
    const [tabValue, setTabValue] = useState('coverageItems');

    const WARRANTY_DETAILS_TABS: WarrantyDetailsTab[] = [
        {
            label    : 'common:profile.center.warranty.tabs.coverage_items.title',
            value    : 'coverageItems',
            Component: <CoverageItems vehicleWarrantyId={vehicleWarrantyId} />
        },
        {
            label    : 'common:profile.center.warranty.tabs.documents.title',
            value    : 'documents',
            Component: (
                <WarrantyDocument
                    entityId={vehicleWarrantyId}
                    entityType={DocumentModel_DocumentEntityType.VEHICLE_WARRANTY}
                />
            )
        }
    ];

    const handlerTabChange = (e: SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    };

    return (
        <Stack
            borderRadius="8px"
            border="1px solid"
            borderColor="semantic.border.secondary"
            box-shadow="0px 1px 2px 0px #1018280D"
            height="100%"
            overflow="hidden"
        >
            <TabContext value={tabValue}>
                <TabList
                    sx={{
                        minHeight   : '42px',
                        borderBottom: '1px solid',
                        borderColor : 'semantic.border.secondary'
                    }}
                    onChange={handlerTabChange}
                >
                    {WARRANTY_DETAILS_TABS.map(({
                        label,
                        value
                    }) => (
                        <Tab
                            value={value}
                            key={value}
                            sx={{
                                width   : `calc(100% / ${WARRANTY_DETAILS_TABS.length})`,
                                minWidth: `calc(100% / ${WARRANTY_DETAILS_TABS.length})`
                            }}
                            label={(
                                <Typography
                                    variant="body1"
                                    fontSize="14px"
                                    fontWeight={500}
                                    textTransform="capitalize"
                                    color={
                                        value === tabValue
                                            ? 'semantic.text.brand.primary'
                                            : 'semantic.text.primary'
                                    }
                                >
                                    {t(label)}
                                </Typography>
                            )}
                        />
                    ))}
                </TabList>

                {WARRANTY_DETAILS_TABS.map(({
                    value,
                    Component
                }) => (
                    <TabPanel
                        key={value}
                        value={value}
                        sx={(theme) => ({
                            padding : '16px',
                            height  : '100%',
                            overflow: 'auto',
                            ...getScrollbarStyles(theme)
                        })}
                    >
                        {Component}
                    </TabPanel>
                ))}
            </TabContext>
        </Stack>
    );
}
