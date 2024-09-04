import LoadOverviewStyled from '@/views/dispatch/orders/Details/sections/load-overview/LoadOverview.styled';
import CopyText from '@/@core/components/copy-text/CopyText';
import VectorIcons from '@/@core/icons/vector_icons';
import FilterButton from '@/views/dispatch/orders/Details/sections/load-overview/components/load-overview-client/components/FilterButton';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useBrokersMap, useCustomersMap } from '@/store/hash_maps/hooks';
import React from 'react';
import Button from '@/views/dispatch/orders/Details/sections/load-overview/ui-elements/Button';
import { useSelectClientMembersMenu } from '@/views/dispatch/orders/menus/select-client-members/SelectClientMembersMenu';

type Props = {
    brokerId: string;
    customerId: string;
    referenceId: string;
    loadId: string;
    loadFriendlyId: string;
};

function LoadOverviewClient({
    brokerId,
    customerId,
    referenceId,
    loadId,
    loadFriendlyId
}: Props) {
    const { t } = useAppTranslation('common');
    const broker = useBrokersMap(brokerId);
    const customer = useCustomersMap(customerId);
    const selectClientMembersMenu = useSelectClientMembersMenu();

    const handleOpenSelectClientMembersMenu = (e: React.MouseEvent<HTMLElement>) => {
        const clientName = brokerId ? broker?.name : customer?.name;
        selectClientMembersMenu.open({
            brokerId,
            customerId,
            clientName     : clientName || '',
            orderId        : loadId,
            orderFriendlyId: loadFriendlyId
        })(e);
    };

    return (
        <LoadOverviewStyled.Wrapper
            sx={{
                flex: '1 3 100%'
            }}
        >
            <LoadOverviewStyled.Item.Container>
                {brokerId ? (
                    <VectorIcons.FullDialogIcons.Briefcase
                        size={35}
                        style={{ flexShrink: 0 }}
                    />
                ) : (
                    <VectorIcons.FullDialogIcons.Customer
                        size={35}
                        style={{ flexShrink: 0 }}
                    />
                )}
                <LoadOverviewStyled.Item.InfoWrapper>
                    <CopyText text={referenceId}>
                        <LoadOverviewStyled.Item.Title>
                            {`#${referenceId || '-'}`}
                        </LoadOverviewStyled.Item.Title>
                    </CopyText>

                    {brokerId ? (
                        <CopyText text={broker?.name || broker?.mc}>
                            <LoadOverviewStyled.Item.Description>
                                {broker?.name ||
                                    `${t('not_provided')}${broker?.mc ? ` (${broker.mc})` : ''}`}
                            </LoadOverviewStyled.Item.Description>
                        </CopyText>
                    ) : (
                        <CopyText text={customer?.name}>
                            <LoadOverviewStyled.Item.Description>
                                {customer?.name || t('not_provided')}
                            </LoadOverviewStyled.Item.Description>
                        </CopyText>
                    )}
                </LoadOverviewStyled.Item.InfoWrapper>
                <Button
                    onClick={handleOpenSelectClientMembersMenu}
                    tooltipProps={{
                        title: 'common:tooltips.select_members_for_order_notifications'
                    }}
                >
                    <VectorIcons.TwoUsersIcon color="primary" />
                </Button>
                <FilterButton
                    brokerId={brokerId}
                    customerId={customerId}
                    brokerName={broker?.name}
                    brokerMc={broker?.mc}
                    customerName={customer?.name}
                />
            </LoadOverviewStyled.Item.Container>
        </LoadOverviewStyled.Wrapper>
    );
}

export default React.memo(LoadOverviewClient);
