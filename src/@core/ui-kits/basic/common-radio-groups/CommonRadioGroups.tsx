import { FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import React from 'react';
import { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export type CommonRadioConfigType<T extends string> = {
    Icon: React.FC;
    label: IntlMessageKey;
    value: T;
}[];

type Props<T extends string> = {
    radioValue: T;
    setRadioValue: (value: T) => void;
    config: CommonRadioConfigType<T>;
};

export default function CommonRadioGroups<T extends string>({
    radioValue,
    setRadioValue,
    config
}: Props<T>) {
    const { t } = useAppTranslation();
    return (
        <RadioGroup
            aria-label="Your plan"
            name="people"
            value={radioValue}
        >
            <Stack direction="row">
                {config.map((item) => (
                    <FormControlLabel
                        sx={{
                            border: (theme) =>
                                `1px solid ${theme.palette.semantic.border.secondary}`,
                            paddingLeft                        : '10px',
                            borderRadius                       : '5px',
                            '& .MuiButtonBase-root.Mui-checked': {
                                color: (theme) =>
                                    `${theme.palette.semantic.foreground.brand.primary} !important`
                            }
                        }}
                        labelPlacement="start"
                        label={(
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                                sx={{
                                    svg: {
                                        fill: (theme) =>
                                            theme.palette.semantic.foreground.brand.primary
                                    }
                                }}
                            >
                                <item.Icon />
                                <Typography
                                    fontSize={14}
                                    fontWeight={500}
                                >
                                    {t(item.label)}
                                </Typography>
                            </Stack>
                        )}
                        onChange={() => setRadioValue(item.value)}
                        key={item.value}
                        control={<Radio />}
                        value={item.value}
                    />
                ))}
            </Stack>
        </RadioGroup>
    );
}
