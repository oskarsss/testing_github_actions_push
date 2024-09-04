/* eslint-disable no-nested-ternary */
import { CSSProperties, ReactNode, SyntheticEvent } from 'react';
import { SxProps } from '@mui/material';
import { IntlMessageKey, IntlOptions } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import CommonTabsStyled from './CommonTabs.styled';
import CommonTabLabel from './CommonTabLabel';

export type Options = {
    label: IntlMessageKey;
    icon?: ReactNode;
    value: number | string;
    color?: CSSProperties['color'];
    translationOptions?: IntlOptions;
};

type TabsProps = {
    value: string | number;
    disabledTab?: string;
    onChange: (event: SyntheticEvent, value: any) => void;
    options: Options[];
    aria_label?: string;
    slots?: {
        tabSx?: SxProps;
        tabsSx?: SxProps;
    };
};

export default function CommonTabs({
    value,
    disabledTab,
    onChange,
    options,
    aria_label,
    slots
}: TabsProps) {
    const { t } = useAppTranslation();
    return (
        <CommonTabsStyled.Tabs
            value={value}
            textColor="inherit"
            variant="fullWidth"
            aria-label={aria_label}
            sx={{ ...slots?.tabsSx }}
            onChange={onChange}
        >
            {options.map((option) => (
                <CommonTabsStyled.Tab
                    key={option.value}
                    disabled={option.value === disabledTab}
                    sx={{ ...slots?.tabSx }}
                    label={(
                        <CommonTabLabel
                            label={t(option.label, option.translationOptions)}
                            Icon={option.icon}
                            color={option.color}
                        />
                    )}
                    value={option.value}
                />
            ))}
        </CommonTabsStyled.Tabs>
    );
}
