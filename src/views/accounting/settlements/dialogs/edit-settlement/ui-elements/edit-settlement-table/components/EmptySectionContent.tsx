/* eslint-disable max-len */

import { Stack, Typography } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { IntlMessageKey } from '@/@types/next-intl';
import { ReactNode } from 'react';
import { SectionNameType } from '../EditSettlementTable';
import EditSettlementIcons from '../../../edit-settlement-icons';

const icons_config: Record<SectionNameType, ReactNode> = {
    manifestsInfo                  : <EditSettlementIcons.Table.Manifests />,
    tollsInfo                      : <EditSettlementIcons.Table.Toll />,
    transactionsInfo               : <EditSettlementIcons.Table.Transactions />,
    fuelInfo                       : <EditSettlementIcons.Table.Fuel />,
    driverRecurringTransactionsInfo: <EditSettlementIcons.Table.Transactions />

    // loadsInfo                      : <EditSettlementIcons.Table.Manifests /> // TODO: DELETE THIS LINE AFTER LOADS IMPLEMENTATION
};

const TEXT_CONFIG: Record<SectionNameType, IntlMessageKey> = {
    manifestsInfo                  : 'modals:settlements.edit_settlement.table.empty.manifests',
    tollsInfo                      : 'modals:settlements.edit_settlement.table.empty.tolls',
    transactionsInfo               : 'modals:settlements.edit_settlement.table.empty.no_transactions',
    fuelInfo                       : 'modals:settlements.edit_settlement.table.empty.no_fuel',
    driverRecurringTransactionsInfo: 'modals:settlements.edit_settlement.table.empty.recurring'

    // loadsInfo                      : 'modals:settlements.edit_settlement.table.empty.manifests' // TODO: DELETE THIS LINE AFTER LOADS IMPLEMENTATION
};

type EmptySectionContentProps = {
    sectionName: SectionNameType;
};

export default function EmptySectionContent({ sectionName }: EmptySectionContentProps) {
    const { t } = useAppTranslation();
    return (
        <Stack
            direction="row"
            marginTop="5%"
            spacing={2}
            justifyContent="center"
            alignItems="center"
        >
            {icons_config[sectionName]}
            <Typography
                fontSize="18px"
                fontWeight={700}
                lineHeight="28px"
                textTransform="capitalize"
                color="text.secondary"
            >
                {t(TEXT_CONFIG[sectionName])}
            </Typography>
        </Stack>
    );
}
