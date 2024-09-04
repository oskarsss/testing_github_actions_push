import type { ServiceProviderModel_ServiceProvider } from '@proto/models/model_service_provider';
import { isEqual } from 'lodash';
import { memo } from 'react';
import { IconButton, Stack, Typography } from '@mui/material';
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';
import LocalPhoneSharpIcon from '@mui/icons-material/LocalPhoneSharp';
import { formatPhoneNumber } from '@/utils/formatting';
import { useUpdateServiceProvider } from '@/views/maintenance/service-providers/modals/UpdateServiceProvider';
import EditIcon from '@mui/icons-material/Edit';

type Props = {
    provider: ServiceProviderModel_ServiceProvider;
};

function SelectOption({ provider }: Props) {
    const updateServiceProviderDialog = useUpdateServiceProvider();

    const openUpdateServiceProvider = () => {
        updateServiceProviderDialog.open({ serviceProvider: provider });
    };

    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            gap="20xp"
            width="100%"
        >
            <Stack>
                <Typography
                    variant="body1"
                    fontSize="16px"
                    fontWeight={500}
                >
                    {provider.name}
                </Typography>

                <Typography
                    variant="body1"
                    fontSize="14px"
                    fontWeight={500}
                    color="semantic.text.secondary"
                >
                    {provider.contactName || '-'}
                </Typography>
            </Stack>

            <Stack
                direction="row"
                alignItems="center"
                gap="10px"
            >
                <Stack>
                    <Stack
                        direction="row"
                        alignItems="center"
                        gap="4px"
                    >
                        <LocationOnSharpIcon
                            sx={{
                                fontSize: '14px',
                                color   : ({ palette }) => palette.semantic.foreground.primary
                            }}
                        />

                        {!provider.addressState && !provider.addressState && (
                            <Typography
                                variant="body1"
                                fontSize="14px"
                                fontWeight={500}
                                color="semantic.text.secondary"
                            >
                                -
                            </Typography>
                        )}

                        {provider.addressCity && (
                            <Typography
                                variant="body1"
                                fontSize="14px"
                                fontWeight={500}
                                color="semantic.text.secondary"
                            >
                                {provider.addressCity}
                            </Typography>
                        )}

                        {provider.addressState && provider.addressState && (
                            <Typography
                                variant="body1"
                                fontSize="14px"
                                fontWeight={500}
                                color="semantic.text.secondary"
                            >
                                ,
                            </Typography>
                        )}

                        {provider.addressState && (
                            <Typography
                                variant="body1"
                                fontSize="14px"
                                fontWeight={500}
                                color="semantic.text.secondary"
                            >
                                {provider.addressState}
                            </Typography>
                        )}
                    </Stack>

                    <Stack
                        direction="row"
                        alignItems="center"
                        gap="4px"
                    >
                        <LocalPhoneSharpIcon
                            sx={{
                                fontSize: '14px',
                                color   : ({ palette }) => palette.semantic.foreground.primary
                            }}
                        />

                        <Typography
                            variant="body1"
                            fontSize="14px"
                            fontWeight={500}
                        >
                            {provider.phone ? formatPhoneNumber(provider.phone) : '-'}
                        </Typography>
                    </Stack>
                </Stack>

                <IconButton
                    onClick={openUpdateServiceProvider}
                    sx={{
                        padding   : '8px',
                        background: ({ palette }) => palette.semantic.foreground.brand.secondary
                    }}
                    aria-label="edit invoice item"
                >
                    <EditIcon
                        sx={{
                            fontSize: '20px',
                            color   : ({ palette }) => palette.semantic.foreground.brand.primary
                        }}
                    />
                </IconButton>
            </Stack>
        </Stack>
    );
}

export default memo(SelectOption, isEqual);
