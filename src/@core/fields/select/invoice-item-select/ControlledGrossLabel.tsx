import { useLoadInvoiceCategoriesMap } from '@/store/hash_maps/hooks';
import { GrossLabel } from '@/@core/ui-kits/basic/gross-label/GrossLabel';
import React from 'react';

type Props = {
    value: string;
};

export default function ControlledGrossLabel({ value }: Props) {
    const invoiceItemCategoriesMap = useLoadInvoiceCategoriesMap();
    const category = invoiceItemCategoriesMap[value];
    if (!category || !category.includeInGrossAmount) return null;
    return <GrossLabel />;
}
