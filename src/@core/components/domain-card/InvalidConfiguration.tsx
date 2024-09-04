import React from 'react';
import { DomainGetReply_Domain_DNS_MissingRecord } from '@proto/domain';
import styles from './DomainCard.module.scss';

type Props = {
    missingRecords?: DomainGetReply_Domain_DNS_MissingRecord[];
};

export default function InvalidConfiguration({ missingRecords }: Props) {
    return (
        <div className={styles.instructionsContainer}>
            <p className={styles.instructionsTitle}>CNAME Record </p>
            <p className={styles.instructions}>
                Set the following record on your DNS provider to continue:
            </p>
            {Boolean(missingRecords?.length) && (
                <table className={styles.instructionsTable}>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Name</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {missingRecords?.map((v) => (
                            <tr key={v.value}>
                                <td>{v.type}</td>
                                <td>{v.name}</td>
                                <td>{v.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
