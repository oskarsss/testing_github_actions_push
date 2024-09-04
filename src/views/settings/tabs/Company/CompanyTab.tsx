import Section from '@/views/settings/components/Section/Section';
import FallbackContent from '@/@core/ui-kits/basic/fallback-content/FallbackContent';
import VectorIcons from '@/@core/icons/vector_icons';
import Loading from '@/@core/components/page/Loading';
import React from 'react';
import { useSettings } from '@/store/settings/hooks';
import CompanyDetails from '@/views/settings/tabs/Company/company-details/CompanyDetails';
import OrderPreferences from '@/views/settings/tabs/Company/oreder-preferences/OrderPreferences';

export default function CompanyTab() {
    const {
        companySections,
        ordersSections,
        isLoading,
        isError
    } = useSettings();

    if (isError) {
        return (
            <Section>
                <FallbackContent
                    icon={<VectorIcons.Cone />}
                    firstText="common:error"
                />
            </Section>
        );
    }

    if (isLoading || !ordersSections || !companySections) {
        return (
            <Section>
                <Loading />
            </Section>
        );
    }

    return (
        <Section>
            <CompanyDetails companyData={companySections} />
            <OrderPreferences ordersData={ordersSections} />
        </Section>
    );
}
