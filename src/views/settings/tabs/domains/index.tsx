import DomainGrpcService from '@/@grpcServices/services/domains.service';
import React, { useState } from 'react';
import DomainIcon from '@mui/icons-material/Domain';
import { Button } from '@mui/material';
import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import { DomainCard, NoDomains } from '@/@core/components/domain-card';
import Container from '../../components/Container/Container';
import SettingsHeader from '../../components/Header/SettingsHeader';
import Search from './Search';
import styles from './Domains.module.scss';

export default function Domains() {
    const [search, setSearch] = useState('');
    const [remove] = DomainGrpcService.useDomainDeleteMutation();
    const removeHandler = (id: string) => {
        remove({ domainId: id });
    };

    const {
        domains,
        isLoading
    } = DomainGrpcService.useDomainGetQuery(
        {},
        {
            selectFromResult: ({
                data,
                ...rest
            }) => ({ domains: data?.domains || [], ...rest })
        }
    );

    const [addDomain] = DomainGrpcService.useDomainCreateMutation();

    const handleAddDomain = () => {
        addDomain({ domainName: search });
    };

    const filteredDomains = domains.filter((domain) => domain.name.includes(search));

    if (isLoading) {
        return <Preloader />;
    }

    return (
        <Container
            sx={{
                minHeight: '100%'
            }}
        >
            <SettingsHeader
                title="Domains"
                icon={<DomainIcon />}
            />
            {!isLoading ? (
                <>
                    <div className={styles.searchContainer}>
                        <Search
                            onChange={setSearch}
                            value={search}
                        />
                        <Button
                            variant="contained"
                            onClick={handleAddDomain}
                        >
                            Add
                        </Button>
                    </div>

                    <div className={styles.domainsContainer}>
                        {filteredDomains.length ? (
                            filteredDomains.map((domain) => (
                                <DomainCard
                                    remove={removeHandler}
                                    key={domain.domainId}
                                    domain={domain}
                                />
                            ))
                        ) : (
                            <NoDomains />
                        )}
                    </div>
                </>
            ) : (
                <Preloader />
            )}
        </Container>
    );
}
