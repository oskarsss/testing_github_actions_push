import React from 'react';
import { HotKeyTooltipTitleProps } from '@/@core/ui-kits/basic/hot-key-tooltip/types';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { Stack } from '@mui/material';

const modifierKeys = {
    macOS: {
        altKey  : '⌥',
        ctrlKey : '^',
        shiftKey: '⇧',
        metaKey : '⌘'
    },
    Windows: {
        altKey  : 'Alt',
        ctrlKey : 'Ctrl',
        shiftKey: 'Shift',
        metaKey : 'Win'
    }
};

export default function HotKeyTooltipTitle({
    title,
    hot_keys,
    modifier_keys
}: HotKeyTooltipTitleProps) {
    const { t } = useAppTranslation();
    const is_windows = window.navigator.userAgent?.includes('Win');
    const system_keys = modifierKeys[is_windows ? 'Windows' : 'macOS'];
    return (
        <>
            <span>{typeof title === 'string' ? t(title) : title}</span>
            {(modifier_keys || hot_keys) && (
                <Stack
                    flexDirection="row"
                    alignItems="center"
                    gap="2px"
                    fontWeight={400}
                    fontSize="13px"
                    color="#E3E4EB"
                    padding="0px 2px"
                    borderRadius="4px"
                    sx={{
                        backgroundColor: '#575868'
                    }}
                >
                    {modifier_keys?.map((key) => (
                        <span key={key}>{system_keys[key]}</span>
                    ))}
                    <span>{hot_keys}</span>
                </Stack>
            )}
        </>
    );
}
