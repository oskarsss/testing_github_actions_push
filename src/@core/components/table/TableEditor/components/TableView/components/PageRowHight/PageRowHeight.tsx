import { useMemo, ChangeEvent } from 'react';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import { useTheme } from '@mui/material/styles';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { IntlMessageKey } from '@/@types/next-intl';
import PagesGrpcService from '@/@grpcServices/services/pages.service';
import small_light from './size_row_images/small_light.png';
import small_dark from './size_row_images/small_dark.png';
import medium_light from './size_row_images/medium_light.png';
import medium_dark from './size_row_images/medium_dark.png';
import large_light from './size_row_images/large_light.png';
import large_dark from './size_row_images/large_dark.png';
import { useTableEditorPropsContext, useTableEditorQueryContext } from '../../../../context';

export const PAGE_ROW_HEIGHT_CONFIG = Object.freeze({
    small : 32,
    medium: 46,
    large : 60
});

type Option = {
    label: IntlMessageKey;
    value: number;
    image_src: Record<string, string>;
};

const options: Option[] = [
    {
        label    : 'core:table.table_editor.columns.small',
        value    : PAGE_ROW_HEIGHT_CONFIG.small,
        image_src: {
            light: small_light.src,
            dark : small_dark.src
        }
    },
    {
        label    : 'core:table.table_editor.columns.medium',
        value    : PAGE_ROW_HEIGHT_CONFIG.medium,
        image_src: {
            light: medium_light.src,
            dark : medium_dark.src
        }
    },
    {
        label    : 'core:table.table_editor.columns.large',
        value    : PAGE_ROW_HEIGHT_CONFIG.large,
        image_src: {
            light: large_light.src,
            dark : large_dark.src
        }
    }
];

export default function PageRowHeight() {
    const { t } = useAppTranslation();
    const [updateRowHeight] = PagesGrpcService.useUpdateRowHeightMutation();
    const { mode } = useTheme().palette;
    const {
        page,
        viewId
    } = useTableEditorPropsContext();
    const { views } = useTableEditorQueryContext();

    const selectedViewSize = useMemo(() => views[viewId], [views, viewId]);

    const handleSize = (event: ChangeEvent<HTMLInputElement>) => {
        if (!selectedViewSize) return;
        updateRowHeight({
            page,
            viewId   : selectedViewSize.viewId,
            rowHeight: Number(event.target.value)
        });
    };

    return (
        <FormControl>
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={selectedViewSize?.rowHeight || 32}
                onChange={handleSize}
            >
                {options.map((option) => (
                    <Stack
                        key={option.value}
                        direction="column"
                        alignItems="flex-start"
                        justifyContent="space-between"
                        gap="8px"
                        padding="12px"
                        marginTop="16px"
                        borderRadius="8px"
                        sx={{ background: ({ palette }) => palette.semantic.background.secondary }}
                    >
                        <FormControlLabel
                            sx={{ height: '24px' }}
                            value={option.value}
                            control={<Radio />}
                            label={t(option.label)}
                        />

                        <img
                            src={option.image_src[mode]}
                            alt={`${option.value}-row`}
                            width="100%"
                        />
                    </Stack>
                ))}
            </RadioGroup>
        </FormControl>
    );
}
