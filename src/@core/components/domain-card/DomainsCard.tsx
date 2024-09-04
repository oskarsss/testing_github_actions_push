import { DomainGetReply_Domain } from '@proto/domain';
import React from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Button, IconButton } from '@mui/material';
import clsx from 'clsx';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { CustomerPortalDomainGetReply_Domain } from '@proto/customer_portal';
import styles from './DomainCard.module.scss';
import VerifyDomainOwnership from './VerifyDomainOwnership';
import InvalidConfiguration from './InvalidConfiguration';

type Props = {
    domain: DomainGetReply_Domain | CustomerPortalDomainGetReply_Domain;
    remove: (id: string) => void;
};

export function DomainCard({
    domain,
    remove
}: Props) {
    const removeHandler = () => {
        remove(domain.domainId);
    };
    const isValid = !domain.dns?.misconfigured;

    const verificationError = domain.dns?.requiredVerifications?.find((v) => v.type === 'error');
    const verificationTxt = domain.dns?.requiredVerifications?.filter((v) => v.type !== 'error');
    const missingRecords = domain.dns?.missingRecords;
    const openDomain = () => {
        window.open(`https://${domain.name}`);
    };

    return (
        <div className={styles.container}>
            <div className={styles.nameContainer}>
                <div className={styles.name}>
                    <p>{domain.name}</p>
                    <IconButton onClick={openDomain}>
                        <OpenInNewIcon />
                    </IconButton>
                </div>
                <Button
                    onClick={removeHandler}
                    variant="contained"
                    color="error"
                    size="small"
                >
                    Remove
                </Button>
            </div>
            <div
                className={clsx(styles.status, {
                    [styles.error]: !isValid
                })}
            >
                {!isValid ? <ErrorIcon /> : <CheckCircleIcon />}
                <p>{isValid ? 'Valid Configuration' : 'Invalid Configuration'}</p>
            </div>
            {(missingRecords || verificationError || verificationTxt) && <hr />}

            <div className={styles.content}>
                <VerifyDomainOwnership
                    verificationError={verificationError}
                    verificationTxt={verificationTxt}
                />
                {!isValid && <InvalidConfiguration missingRecords={missingRecords} />}
            </div>
        </div>
    );
}
