import ChartsTypes from '@/store/charts/types';
import { CSSProperties } from 'react';

export type Item2 = {
    id: ChartsTypes.ChartIds;
    width: string;
};

export type Item = {
    id?: ChartsTypes.ChartIds;
    type: string;
    width: string;
    items?: Item2[];
    styles?: CSSProperties;
};

export type Column = {
    type?: string;
    items?: Item[];
    width: string;
    styles?: CSSProperties;
    id?: ChartsTypes.ChartIds;
};

export type View = {
    viewId: string;
    name: string;
    columns: Column[];
};
