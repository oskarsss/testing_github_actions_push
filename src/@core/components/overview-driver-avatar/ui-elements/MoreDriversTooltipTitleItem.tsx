import { Divider, Stack, Typography } from '@mui/material';
import OverviewDriverAvatar from '@/@core/components/overview-driver-avatar/OverviewDriverAvatar';
import CopyText from '@/@core/components/copy-text/CopyText';
import Tooltip from '@mui/material/Tooltip';
import MuiIconButton from '@mui/material/IconButton';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import VectorIcons from '@/@core/icons/vector_icons';
import { formatPhoneNumber } from '@/utils/formatting';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { DriverModel_Driver } from '@proto/models/model_driver';

import openNewWindow from '@/utils/open-new-window';

type Props = {
    noHasPing: boolean;
    driver?: DriverModel_Driver;
    isLast: boolean;
};

export default function MoreDriversTooltipTitleItem({
    noHasPing,
    driver,
    isLast
}: Props) {
    const { t } = useAppTranslation();
    const onClick = (driver_id: string) => openNewWindow(`drivers/${driver_id}`);

    if (!driver) return null;
    const fullName = `${driver?.firstName || ''} ${driver?.lastName || ''}`;
    return (
        <Stack
            key={driver.driverId}
            direction="column"
            overflow="hidden"
        >
            <Stack
                flexDirection="row"
                alignItems="center"
                width="100%"
                gap="4px"
                overflow="hidden"
            >
                <OverviewDriverAvatar
                    driverTypeId={driver.driverTypeId}
                    selfieThumbUrl={driver.selfieThumbUrl}
                    fullName={fullName}
                    slots={{
                        avatarProps: {
                            sx: {
                                fontSize: '14px',
                                width   : '18px',
                                height  : '18px'
                            }
                        },
                        badgeProps: {
                            sx: {
                                svg: {
                                    width : '8px',
                                    height: '8px'
                                }
                            }
                        }
                    }}
                />
                <CopyText text={fullName}>
                    <Typography
                        color="text.primary"
                        fontSize="14px"
                        fontWeight={600}
                        mr="5px"
                        lineHeight="20px"
                        flexGrow={1}
                        noWrap
                    >
                        {fullName}
                    </Typography>
                </CopyText>
                <Tooltip title={t('common:tooltips.open_in_new_tab')}>
                    <MuiIconButton
                        onClick={() => onClick(driver.driverId)}
                        sx={{
                            padding: '0px',
                            svg    : {
                                fontSize: '16px'
                            }
                        }}
                    >
                        <KeyboardArrowRightIcon />
                    </MuiIconButton>
                </Tooltip>
            </Stack>

            <Stack
                flexDirection="row"
                alignItems="center"
            >
                {noHasPing && (
                    <Tooltip title={t('common:tooltips.not_using_the_app')}>
                        <Stack>
                            <VectorIcons.PhoneCrossMarkIcon sx={{ fontSize: '13px' }} />
                        </Stack>
                    </Tooltip>
                )}
                <CopyText text={driver.phoneNumber}>
                    <Typography
                        color="text.secondary"
                        fontSize="12px"
                        fontWeight={500}
                        lineHeight="20px"
                    >
                        {formatPhoneNumber(driver.phoneNumber)}
                    </Typography>
                </CopyText>
            </Stack>
            {!isLast && <Divider sx={{ margin: '3px 0px' }} />}
        </Stack>
    );
}
