import { forwardRef, ReactNode } from 'react';
import { Stack, useTheme } from '@mui/material';

type Props = {
    isEditableNote: boolean;
    fullRounded: boolean;
    children: ReactNode;
    symmetricalPadding?: boolean;
    onContextMenu?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const NoteBodyContent = forwardRef<HTMLDivElement, Props>(
    ({
        isEditableNote,
        fullRounded,
        symmetricalPadding = false,
        children,
        onContextMenu
    }, ref) => {
        const { palette } = useTheme();
        return (
            <Stack
                display="inline"
                borderColor={!isEditableNote ? 'divider' : 'none'}
                border={!isEditableNote ? '1px solid' : 'none'}
                borderRadius="8px"
                padding={symmetricalPadding ? '6px' : '6px 6px 6px 12px'}
                position="relative"
                onContextMenu={onContextMenu}
                overflow="hidden"
                maxWidth="-webkit-fill-available"
                ref={ref}
                sx={{
                    ...(isEditableNote
                        ? {
                            backgroundColor     : palette.semantic.foreground.brand.primary,
                            borderTopRightRadius: 0
                        }
                        : {
                            backgroundColor    : palette.semantic.foreground.white.tertiary,
                            borderTopLeftRadius: fullRounded ? undefined : 0,
                            border             : (theme) =>
                                `1px solid ${theme.palette.semantic.border.secondary}`
                        })
                }}
            >
                {children}
            </Stack>
        );
    }
);

export default NoteBodyContent;
