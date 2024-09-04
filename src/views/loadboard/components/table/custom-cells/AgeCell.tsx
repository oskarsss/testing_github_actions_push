import { Stack, Typography, createSvgIcon, useTheme } from '@mui/material';
import moment from 'moment-timezone';
import { memo, useMemo } from 'react';

type Props = {
    age: string;
    updatedAt: string;
};

const StatusIcon = createSvgIcon(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
    >
        <circle
            opacity="0.3"
            cx="7"
            cy="7"
            r="7"
            fill="currentColor"
        />
        <circle
            cx="7"
            cy="7"
            r="3"
            fill="currentColor"
        />
    </svg>,
    'StatusIcon'
);

type AgeType = 'gray' | 'warning' | 'success';

function AgeCell({
    age,
    updatedAt
}: Props) {
    const { palette } = useTheme();
    const minutes = useMemo(() => {
        const now = moment();
        const updated = moment(age);
        return now.diff(updated, 'minutes');
    }, [age]);

    const formattedMinutes = useMemo(() => {
        if (minutes < 60) return `${minutes}m`;
        return `${Math.floor(minutes / 60)}h`;
    }, [minutes]);

    const ageColor: AgeType = useMemo(() => {
        if (minutes > 10) return 'gray';
        if (minutes < 10 && minutes >= 2) return 'warning';
        if (minutes < 2) return 'success';
        return 'gray';
    }, [minutes]);

    return (
        <div>
            <Stack
                onClick={() => {}}
                direction="row"
                alignItems="center"
                gap={1}
                border={`1px solid ${palette.semantic.border.secondary}`}
                borderRadius="4px"
                padding="2px 6px"
                sx={{
                    backgroundColor: palette.semantic.foreground.white.primary
                }}
            >
                <StatusIcon
                    sx={{
                        height: '14px',
                        width : '14px',
                        fill  : palette.utility.foreground[ageColor].primary
                    }}
                />
                <Typography
                    variant="body1"
                    fontSize="12px"
                    fontWeight={500}
                >
                    {formattedMinutes}
                </Typography>
            </Stack>
        </div>
    );
}

export default memo(AgeCell);
