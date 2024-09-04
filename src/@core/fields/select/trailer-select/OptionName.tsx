import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { TrailerModel_Trailer } from '@proto/models/model_trailer';

type Props = {
    trailer: TrailerModel_Trailer;
};

export default function OptionName({ trailer }: Props) {
    return (
        <Stack direction="column">
            <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{ width: '100%' }}
            >
                <Typography variant="body1">#{trailer.referenceId}</Typography>
            </Stack>
            <Stack
                direction="row"
                alignItems="center"
                spacing={1}
            >
                <Typography variant="body2">{trailer.year}</Typography>
                <Typography variant="body2">
                    {trailer.model.charAt(0).toUpperCase() + trailer.model.slice(1)}
                </Typography>
                <Typography variant="body2">
                    {trailer.make.charAt(0).toUpperCase() + trailer.make.slice(1)}
                </Typography>
            </Stack>
        </Stack>
    );
}
