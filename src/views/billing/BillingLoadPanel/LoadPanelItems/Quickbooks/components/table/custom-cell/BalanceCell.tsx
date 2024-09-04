import React from 'react';

type Props = {
    balance: string;
};

export default function BalanceCell({ balance }: Props) {
    return <span style={balance ? { color: '#FF1F25' } : {}}>{balance || '-'}</span>;
}
