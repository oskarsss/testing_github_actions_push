import { Stack, Typography } from '@mui/material';
import AeroSwitch from '@/@core/ui-kits/basic/aero-switch/AeroSwitch';
import Info from '@/@core/components/Info';
import { IntlMessageKey } from '@/@types/next-intl';

type Props = {
    label: string;
    checked: boolean;
    onChange: () => void;
    info?: IntlMessageKey;
};

export default function Switch({
    label,
    checked,
    onChange,
    info
}: Props) {
    return (
        <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            width="200px"
        >
            <Stack
                flexDirection="row"
                gap="5px"
            >
                <Typography
                    variant="body2"
                    fontWeight={600}
                >
                    {label}
                </Typography>

                {info && <Info title={info} />}
            </Stack>

            <AeroSwitch
                label=""
                isChecked={checked}
                onChange={onChange}
            />
        </Stack>
    );
}
