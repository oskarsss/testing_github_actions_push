import ErrorScreen from '@/@core/ui-kits/error-screen/ErrorScreen';
import { ErrorScreenType } from '@/@core/ui-kits/error-screen/error-screen-config';
import { Fade, Stack } from '@mui/material';

export default function WexViewEmpty() {
    return (
        <Fade
            in
            timeout={500}
        >
            <Stack height="100%">
                <ErrorScreen
                    configType={ErrorScreenType.INTEGRATION_WEX_NO_TRANSACTIONS}
                    withoutBackground
                    withoutBorder
                />
            </Stack>
        </Fade>
    );
}
