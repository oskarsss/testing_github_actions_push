import { DomainCard, NoDomains } from '@/@core/components/domain-card';
import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import CustomerPortalGrpcService from '@/@grpcServices/services/customer-portal.service';
import { CustomerPortalDomainGetReply_Domain } from '@proto/customer_portal';
import { min } from 'lodash';
import React from 'react';

type Props = {
    search: string;
    portalId: string;
};

export default function CustomerPortalDomains({
    search,
    portalId
}: Props) {
    const {
        domains,
        isLoading
    } = CustomerPortalGrpcService.useCustomerPortalDomainGetQuery(
        { customerPortalId: portalId },
        {
            selectFromResult: ({
                data,
                ...rest
            }) => ({ domains: data?.domains || [], ...rest })
        }
    );
    const [remove] = CustomerPortalGrpcService.useCustomerPortalDomainDeleteMutation();

    const removeHandler = (id: string) => {
        remove({
            domainId        : id,
            customerPortalId: portalId
        });
    };
    const filteredDomains = domains.filter((domain) => domain.name.includes(search));

    if (isLoading) {
        return (
            <Preloader
                sx={{
                    minHeight: '100px'
                }}
            />
        );
    }
    return filteredDomains.length ? (
        filteredDomains.map((domain) => (
            <DomainCard
                remove={removeHandler}
                key={domain.domainId}
                domain={domain}
            />
        ))
    ) : (
        <NoDomains />
    );
}
