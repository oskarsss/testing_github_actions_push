import { Stack, Typography } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { memo } from 'react';
import { useFactoringCompanyFormContext } from '@/views/settings/tabs/Invoicing/FactoringCompanies/dialogs/FactoringCompanyForm/FactoringCompanyForm';
import { useWatch } from 'react-hook-form';
import UploadLogoWrapper from '@/views/settings/tabs/Invoicing/FactoringCompanies/dialogs/FactoringCompanyForm/Sections/Details/components/UploadLogo/UploadLogoWrapper';
import type { IntlMessageKey } from '@/@types/next-intl';
import UploadLogoActions from './UploadLogoActions';
import Logo from './Logo';
import { ButtonName, UploadType } from './UploadButton';

type Props = {
    isPrivate: boolean;
    title: IntlMessageKey;
    name: ButtonName;
    uploadType: UploadType;
};

function UploadLogo({
    isPrivate,
    title,
    name,
    uploadType
}: Props) {
    const { t } = useAppTranslation();
    const { control } = useFactoringCompanyFormContext();

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
