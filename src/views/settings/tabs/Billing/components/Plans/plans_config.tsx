import type { IntlMessageKey } from '@/@types/next-intl';

interface Plan {
    id: string;
    active: boolean;
    amount: number;
    interval: IntlMessageKey;
    metadata: {
        name: IntlMessageKey;
        range: [number, number];
    };
}

export const plans_config: Plan[] = [
    {
        id      : 'price_1NDGe3Cx1ErwSBhrjiN606QY',
        active  : true,
        amount  : 3000,
        interval: 'settings:billing.plan.cards.interval',
        metadata: {
            name : 'settings:billing.plan.cards.starter',
            range: [1, 25]
        }
    },
    {
        id      : '2',
        active  : false,
        amount  : 2700,
        interval: 'settings:billing.plan.cards.interval',
        metadata: {
            name : 'settings:billing.plan.cards.pro',
            range: [26, 100]
        }
    },
    {
        id      : 'price_1NAJ5wCx1ErwSBhrfPi8lpSJ',
        active  : false,
        amount  : 2500,
        interval: 'settings:billing.plan.cards.interval',
        metadata: {
            name : 'settings:billing.plan.cards.enterprise',
            range: [101, 500]
        }
    },
    {
        id      : '4',
        active  : false,
        amount  : 2400,
        interval: 'settings:billing.plan.cards.interval',
        metadata: {
            name : 'settings:billing.plan.cards.mega_carrier',
            range: [501, 1000]
        }
    }
];
