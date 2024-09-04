import { Box } from '@mui/material';

type Props = {
    version: number;
    isCurrentVersion?: boolean;
};

export default function VersionBox({
    version,
    isCurrentVersion
}: Props) {
    return (
        <Box
            component="span"
            flexDirection="row"
            display="flex"
            alignItems="center"
            flexShrink={0}
            width="fit-content"
            gap={1}
            maxHeight="16px"
            sx={{
                background  : ({ palette }) => palette.semantic.foreground.primary,
                color       : ({ palette }) => palette.semantic.text.white,
                paddingX    : '4px',
                borderRadius: '4px',
                fontSize    : '12px',
                fontWeight  : 600
            }}
        >
            <Box
                sx={{
                    width       : '6px',
                    height      : '6px',
                    borderRadius: '50%',
                    background  : ({ palette }) =>
                        isCurrentVersion
                            ? palette.utility.foreground.success.primary
                            : palette.utility.foreground.warning.primary
                }}
            />
            v{version}
        </Box>
    );
}
