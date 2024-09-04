import React from 'react';
import { DomainGetReply_Domain_DNS_RequiredVerification } from '@proto/domain';
import styles from './DomainCard.module.scss';

type Props = {
    verificationTxt?: DomainGetReply_Domain_DNS_RequiredVerification[];
    verificationError?: DomainGetReply_Domain_DNS_RequiredVerification;
};

export default function VerifyDomainOwnership({
    verificationError,
    verificationTxt
}: Props) {
    return (
        <div className={styles.instructionsContainer}>
            {verificationError && verificationTxt && (
                <p className={styles.instructionsTitle}>Verify Domain Ownership</p>
            )}
            <p className={styles.instructions}>{verificationError?.value}</p>
            {Boolean(verificationTxt?.length) && (
                <table className={styles.instructionsTable}>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Name</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {verificationTxt?.map((v) => (
                            <tr key={v.value}>
                                <td>{v.type}</td>
                                <td>{v.domain}</td>
                                <td>{v.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
