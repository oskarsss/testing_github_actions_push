import { VendorIcon } from '@/@core/icons/custom-nav-icons/icons';
import { useVendorsMap } from '@/store/hash_maps/hooks';
import { Stack, Typography } from '@mui/material';

type Props = {
    vendorId: string;
};

export default function VendorCell({ vendorId }: Props) {
    const vendorsMap = useVendorsMap();

    const vendor = vendorsMap[vendorId];
    if (!vendor) {
        return null;
    }

    return (
        <Stack
            direction="row"
            alignItems="center"
            gap={1}
            sx={{
                svg: {
                    fill: (theme) => theme.palette.semantic.foreground.primary
                }
            }}
        >
            <VendorIcon />

            <Typography
                fontSize="14px"
                variant="body1"
                fontWeight={500}
                noWrap
                textOverflow="ellipsis"
                maxWidth={150}
                sx={{
                    svg: {
                        fill: (theme) => theme.palette.semantic.foreground.primary
                    }
                }}
            >
                {vendor?.name}
            </Typography>
        </Stack>
    );
}
