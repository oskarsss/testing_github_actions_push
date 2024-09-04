import { Box } from '@mui/material';

function EquipmentCell({ code }: { code?: string }) {
    return (
        <Box
            sx={{
                display       : 'flex',
                flexDirection : 'row',
                justifyContent: 'flex-start',
                alignItems    : 'center',
                height        : '100%',
                fontSize      : '14px',
                fontWeight    : 500,
                color         : ({ palette }) => palette.semantic.text.secondary
            }}
        >
            {code}
        </Box>
    );
}

export default EquipmentCell;
