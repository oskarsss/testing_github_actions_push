import { Stack, Typography } from '@mui/material';
import { memo } from 'react';
import { Control, Path, useWatch } from 'react-hook-form';
import UploadLogoWrapper from '@/views/settings/tabs/Invoicing/FactoringCompanies/dialogs/FactoringCompanyForm/Sections/Details/components/UploadLogo/UploadLogoWrapper';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { IntlMessageKey } from '@/@types/next-intl';
import UploadLogoActions from './UploadLogoActions';
import Logo from './Logo';
import { UploadType } from './UploadButton';
import { TeamDefaultValues } from '../TeamFields';

type Props = {
    isPrivate: boolean;
    title: IntlMessageKey;
    name: Path<TeamDefaultValues>;
    uploadType: UploadType;
    control: Control<TeamDefaultValues>;
};

function UploadLogo({
    isPrivate,
    title,
    name,
    uploadType,
    control
}: Props) {
    const { t } = useAppTranslation();

    const url = useWatch({ control, name });

    return (
        <Stack
            direction="row"
            gap="12px"
        >
            <UploadLogoWrapper>
                <Logo
                    title={t(title)}
                    url={url}
                />
            </UploadLogoWrapper>

            <Stack gap="8px">
                <Typography
                    fontSize="16px"
                    fontWeight={600}
                >
                    {t(title)}
                </Typography>

                <UploadLogoActions
                    control={control}
                    isPrivate={isPrivate}
                    url={url}
                    name={name}
                    uploadType={uploadType}
                />
            </Stack>
        </Stack>
    );
}

export default memo(UploadLogo);
