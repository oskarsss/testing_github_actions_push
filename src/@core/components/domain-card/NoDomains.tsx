import React from 'react';
import styles from './DomainCard.module.scss';

export function NoDomains() {
    return <div className={styles.emptyDomainsContainer}>No Domains</div>;
}
