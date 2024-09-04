import { TooltipProps } from '@mui/material/Tooltip';
import { IntlMessageKey } from '@/@types/next-intl';
import type { ReactElement } from 'react';

export type HotKeyTooltipTitleProps = {
    title: IntlMessageKey | ReactElement;
    hot_keys?: string;
    modifier_keys?: ('altKey' | 'ctrlKey' | 'shiftKey' | 'metaKey')[];
};

export type HotKeyTooltipProps = HotKeyTooltipTitleProps &
    Pick<TooltipProps, 'className' | 'children' | 'placement'>;
