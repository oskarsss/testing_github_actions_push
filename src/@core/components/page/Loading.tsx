import CircularProgress from '@mui/material/CircularProgress';

type Props = {
    loading?: boolean;
};

export default function Loading({ loading = true }: Props) {
    if (!loading) {
        return null;
    }

    return (
        <div
            style={{
                width         : '100%',
                height        : '100%',
                display       : 'flex',
                flexDirection : 'row',
                alignItems    : 'center',
                justifyContent: 'center',
                position      : 'absolute',
                top           : 0,
                left          : 0,
                right         : 0,
                bottom        : 0
            }}
        >
            <CircularProgress size={30} />
        </div>
    );
}
