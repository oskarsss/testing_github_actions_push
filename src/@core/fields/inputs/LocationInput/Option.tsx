import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import LocationOnIcon from '@mui/icons-material/LocationOn';

type Part = {
    text: string;
    highlight: boolean;
};

type Props = {
    parts: Part[];
    secondary_text: string;
};

const Option = ({
    parts,
    secondary_text
}: Props) => (
    <Grid
        container
        alignItems="center"
    >
        <Grid
            item
            sx={{ display: 'flex', width: 44 }}
        >
            <LocationOnIcon sx={{ color: 'text.secondary' }} />
        </Grid>
        <Grid
            item
            sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}
        >
            {parts.map((part, index) => (
                <Box
                    // eslint-disable-next-line max-len, react/no-array-index-key
                    key={index}
                    component="span"
                    sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                >
                    {part.text}
                </Box>
            ))}
            <Typography
                variant="body2"
                color="text.secondary"
            >
                {secondary_text}
            </Typography>
        </Grid>
    </Grid>
);

export default Option;
