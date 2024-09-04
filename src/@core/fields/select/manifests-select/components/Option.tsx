import { Stack, Typography, createSvgIcon } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import ManifestStatusChipSelect from '@/@core/fields/chip-select/ManifestStatusChipSelect';
import type ManifestsTypes from '@/store/dispatch/manifests/types';
import CircleProgressBar from '@/@core/components/circle-progress-bar';
import { ManifestModel_Manifest } from '@proto/models/model_manifest';
import { getActiveStopsCount } from '@/@grpcServices/services/manifests-service/utils';
import DriverWithTooltip from './driver';
import Truck from './Truck';
import Trailer from './Trailer';

type Props = {
    option: ManifestModel_Manifest;
};

const Miles = createSvgIcon(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.82377 5.39457C8.93031 5.54214 9.04746 5.68852 9.17055 5.83317H8.45817C7.33059 5.83317 6.4165 6.74726 6.4165 7.87484C6.4165 9.00242 7.33059 9.9165 8.45817 9.9165H10.2082C10.6914 9.9165 11.0832 10.3083 11.0832 10.7915C11.0832 11.2748 10.6914 11.6665 10.2082 11.6665H4.82912C4.95221 11.5218 5.06936 11.3755 5.17591 11.2279C5.53883 10.7252 5.83317 10.1387 5.83317 9.44984C5.83317 8.13277 4.82339 6.99984 3.49984 6.99984C2.17628 6.99984 1.1665 8.13277 1.1665 9.44984C1.1665 10.1387 1.46085 10.7252 1.82377 11.2279C2.12408 11.6439 2.50866 12.0503 2.87299 12.4354L2.87405 12.4365C2.94167 12.508 3.00873 12.5789 3.07427 12.6488C3.18455 12.7664 3.3386 12.8332 3.49984 12.8332H10.2082C11.3358 12.8332 12.2498 11.9191 12.2498 10.7915C12.2498 9.66392 11.3358 8.74984 10.2082 8.74984H8.45817C7.97492 8.74984 7.58317 8.35809 7.58317 7.87484C7.58317 7.39159 7.97492 6.99984 8.45817 6.99984H10.4998C10.6611 6.99984 10.8151 6.9331 10.9254 6.81547C10.9912 6.74527 11.0584 6.67425 11.1263 6.60249C11.4906 6.2174 11.8756 5.81054 12.1759 5.39457C12.5388 4.89191 12.8332 4.30541 12.8332 3.6165C12.8332 2.29944 11.8234 1.1665 10.4998 1.1665C9.17628 1.1665 8.1665 2.29944 8.1665 3.6165C8.1665 4.30541 8.46085 4.89191 8.82377 5.39457ZM11.6665 3.49984C11.6665 4.14417 11.1442 4.6665 10.4998 4.6665C9.8555 4.6665 9.33317 4.14417 9.33317 3.49984C9.33317 2.8555 9.8555 2.33317 10.4998 2.33317C11.1442 2.33317 11.6665 2.8555 11.6665 3.49984ZM3.49984 10.4998C4.14417 10.4998 4.6665 9.9775 4.6665 9.33317C4.6665 8.68884 4.14417 8.1665 3.49984 8.1665C2.8555 8.1665 2.33317 8.68884 2.33317 9.33317C2.33317 9.9775 2.8555 10.4998 3.49984 10.4998Z"
            fill="currentColor"
        />
    </svg>,
    'MilesIcon'
);

export default function ManifestOption({ option }: Props) {
    const { t } = useAppTranslation();
    const totalStopsCount = option.stops.length;
    const completedStopsCount = totalStopsCount - getActiveStopsCount(option.stops).length;

    return (
        <Stack
            direction="column"
            flex="1 1 100%"
            gap="2px"
            overflow="hidden"
        >
            <Stack
                direction="row"
                alignItems="center"
                flex="1 1 100%"
                justifyContent="space-between"
                gap="8px"
                overflow="hidden"
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    gap="4px"
                    overflow="hidden"
                >
                    <Typography
                        color="semantic.text.primary"
                        fontSize="16px"
                        fontWeight={500}
                    >
                        {t('common:manifests.friendlyId', { friendlyId: option.friendlyId })}
                    </Typography>

                    {option.title && (
                        <Typography
                            noWrap
                            fontSize="16px"
                            fontWeight={500}
                            color="semantic.text.secondary"
                        >
                            {`l ${option.title}`}
                        </Typography>
                    )}
                </Stack>

                <ManifestStatusChipSelect
                    manifestId={option.manifestId}
                    status={option.status}
                    size="small"
                    is_changing={false}
                    show_arrow={false}
                />
            </Stack>

            <Stack
                direction="row"
                alignItems="center"
                flex="1 1 100%"
                justifyContent="space-between"
                gap="4px"
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    gap="4px"
                    overflow="hidden"
                    flex={1}
                >
                    {option.truckId && (
                        <>
                            <DriverWithTooltip driverIds={option.driverIds} />

                            <Truck truckId={option.truckId} />

                            <Trailer trailerId={option.trailerId} />
                        </>
                    )}
                </Stack>

                <Stack
                    gap="4px"
                    direction="row"
                    alignItems="center"
                >
                    <Miles
                        sx={{
                            color : ({ palette }) => palette.semantic.foreground.primary,
                            width : '14px',
                            height: '14px'
                        }}
                    />

                    <Typography
                        fontSize="12px"
                        fontWeight={500}
                        color="semantic.text.secondary"
                    >
                        {option.totalDistance?.milesFormatted || '0'}
                        {t('common:mi')}
                    </Typography>

                    <Typography
                        noWrap
                        fontSize="12px"
                        fontWeight={500}
                        color="semantic.text.secondary"
                    >
                        l
                    </Typography>

                    <CircleProgressBar
                        value={Math.round((completedStopsCount / totalStopsCount) * 100)}
                        size={14}
                    />

                    <Typography
                        fontSize="12px"
                        fontWeight={500}
                        color="semantic.text.secondary"
                        whiteSpace="nowrap"
                    >
                        {completedStopsCount}/{totalStopsCount} {t('entity:stops').toLowerCase()}
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    );
}
