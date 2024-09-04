import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { getPublicURL } from '@/configs/storage';
import { Typography } from '@mui/material';
import { FactoringCompanyModel } from '@proto/models/model_factoring_company';
import { memo } from 'react';

type Props = {
    company: FactoringCompanyModel;
};

function HeaderTitle({ company }: Props) {
    return (
        <Stack
            justifyContent="space-between"
            alignItems="center"
            direction="row"
            spacing={3}
        >
            {company.logoFileId && (
                <Avatar
                    variant="rounded"
                    src={getPublicURL(company.logoFileId)}
                    sx={{ '.MuiAvatar-img': { objectFit: 'contain' } }}
                />
            )}

            <Stack direction="column">
                <Typography
                    fontSize="24px"
                    fontWeight={600}
                    variant="h6"
                >
                    {company.name}
                </Typography>

                <Typography
                    color={(theme) => theme.palette.semantic.foreground.quarterary}
                    fontSize="14px"
                    fontWeight={400}
                    variant="subtitle1"
                >
                    {company.address?.line1} {company.address?.line2} {company.address?.city}{' '}
                    {company.address?.state} {company.address?.postalCode}
                </Typography>
            </Stack>
        </Stack>
    );
}

export default memo(HeaderTitle);
