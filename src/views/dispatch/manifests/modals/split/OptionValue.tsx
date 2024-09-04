import { Stack, Typography } from '@mui/material';
import { AppPalette } from '@/@core/theme/palette';

type Props = {
    city: string;
    date: string;
    icon: React.ReactNode;
    type: string;
    getColor: (palette: AppPalette) => { icon: string; text: string };
};

export default function OptionValue({
    type,
    icon,
    city,
    date,
    getColor
}: Props) {
    return (
        <Stack
            direction="row"
            gap="4px"
            alignItems="center"
            sx={{
                svg: {
                    width : '16px',
                    height: '16px',
                    color : ({ palette }) => getColor(palette).icon
                }
            }}
        >
            {icon}
            <Typography
                fontWeight={500}
                variant="body1"
                color={({ palette }) => getColor(palette).text}
            >
                {type}
            </Typography>

            <Typography
                fontWeight={500}
                variant="body1"
            >
                : {city}
            </Typography>

            <Typography
                width="4px"
                height="4px"
                borderRadius="50%"
                bgcolor="text.secondary"
            />

            <Typography
                fontWeight={500}
                variant="body1"
                color="text.secondary"
            >
                {date}
            </Typography>
        </Stack>
    );
}
