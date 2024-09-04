import { Avatar, Box, Divider, MenuItem, Stack, Typography, createSvgIcon } from '@mui/material';
import { DocumentModel_Version } from '@proto/models/model_document';
import React, { memo } from 'react';
import { useUsersMap } from '@/store/hash_maps/hooks';
import moment from 'moment-timezone';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ChipDotIcon from '@/@core/fields/chip-select/components/ChipDotIcon';
import MenuComponents from '@/@core/ui-kits/menus';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';

type Props = {
    selectedVersion?: DocumentModel_Version;
    setSelectedVersion: (version: DocumentModel_Version) => void;
    isCurrentVersion: boolean;
    versions: DocumentModel_Version[];
};

const ChangeVersionMenu = ({
    versions,
    setSelectedVersion
}: {
    versions: DocumentModel_Version[];
    setSelectedVersion: (version: DocumentModel_Version) => void;
}) => {
    const { t } = useAppTranslation('core');
    return versions.map((version, index) => (
        <MenuComponents.List key={version.fileId}>
            <MenuItem onClick={() => setSelectedVersion(version)}>
                <Stack
                    direction="row"
                    gap={2}
                    alignItems="center"
                >
                    <ChipDotIcon
                        sx={{
                            color: ({ palette }) =>
                                index === 0
                                    ? palette.utility.foreground.success.primary
                                    : palette.utility.foreground.warning.primary,
                            fontSize: '14px'
                        }}
                    />
                    <Typography
                        fontSize="12px"
                        fontWeight={500}
                        noWrap
                    >
                        {`${t('documents.version')} ${version.version}`}
                    </Typography>
                </Stack>
            </MenuItem>
        </MenuComponents.List>
    ));
};

const useChangeVersionMenu = menuHookFabric(ChangeVersionMenu);

const Icon = createSvgIcon(
    <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.00033 1.16602C3.77866 1.16602 1.16699 3.77769 1.16699 6.99935C1.16699 10.221 3.77866 12.8327 7.00033 12.8327C10.222 12.8327 12.8337 10.221 12.8337 6.99935C12.8337 3.77769 10.222 1.16602 7.00033 1.16602ZM7.58366 4.08268C7.58366 3.76052 7.32249 3.49935 7.00033 3.49935C6.67816 3.49935 6.41699 3.76052 6.41699 4.08268V6.99935C6.41699 7.20425 6.5245 7.39413 6.7002 7.49955L8.15854 8.37455C8.43479 8.54031 8.79311 8.45073 8.95886 8.17447C9.12462 7.89822 9.03504 7.5399 8.75878 7.37414L7.58366 6.66907V4.08268Z"
            fill="#6B7789"
        />
    </svg>,
    'ExpandIcon'
);

function VersionsChip({
    isCurrentVersion,
    setSelectedVersion,
    selectedVersion,
    versions
}: Props) {
    const changeVersionMenuHook = useChangeVersionMenu();
    const driversMap = useDriversMap();
    const dispatchersMap = useUsersMap();
    const { t } = useAppTranslation();
    if (!selectedVersion) return null;

    const now = moment.utc();
    const createdAt = moment.utc(selectedVersion.createdAt);
    const diff = now.diff(createdAt);

    const diffFormatted = moment.duration(diff).humanize();

    const driver = driversMap[selectedVersion.uploadedByDriverId];
    const dispatcher = dispatchersMap[selectedVersion.uploadedByUserId];

    // eslint-disable-next-line no-nested-ternary
    const person = driver
        ? {
            name    : `${driver.firstName} ${driver.lastName}`,
            thumbUrl: driver.selfieThumbUrl,
            initials: `${driver.firstName[0]}${driver.lastName[0]}`
        }
        : dispatcher
            ? {
                name    : `${dispatcher.firstName} ${dispatcher.lastName}`,
                thumbUrl: dispatcher.selfieThumbUrl,
                initials: `${dispatcher.firstName[0]}${dispatcher.lastName[0]}`
            }
            : null;

    return (
        <Box
            flexDirection="row"
            alignItems="center"
            display="flex"
            flex="1 1 0"
            paddingBottom={3}
            gap={2}
            minHeight="32px"
            sx={{
                position    : 'relative',
                padding     : '2px 4px',
                borderRadius: '4px',
                fontSize    : '12px',

                fontWeight: 500
            }}
        >
            <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{
                    padding     : '2px 4px',
                    borderRadius: '4px',
                    cursor      : 'pointer',
                    height      : '100%',
                    background  : ({ palette }) => palette.semantic.foreground.secondary
                }}
            >
                <Box
                    component="span"
                    flexDirection="row"
                    display="flex"
                    alignItems="center"
                    flexShrink={0}
                    width="fit-content"
                    gap={1}
                    maxHeight="16px"
                    whiteSpace="nowrap"
                    onClick={changeVersionMenuHook.open({ versions, setSelectedVersion })}
                    sx={{
                        paddingX    : '4px',
                        borderRadius: '4px',
                        fontSize    : '12px',
                        fontWeight  : 600
                    }}
                >
                    <ChipDotIcon
                        sx={{
                            color: ({ palette }) =>
                                isCurrentVersion
                                    ? palette.utility.foreground.success.primary
                                    : palette.utility.foreground.warning.primary,
                            fontSize: '14px'
                        }}
                    />
                    {t('core:documents.fields.version.label')} {selectedVersion.version}
                    <KeyboardArrowDownIcon fontSize="small" />
                </Box>
            </Stack>
            <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                overflow="hidden"
                sx={{
                    padding     : '2px 4px',
                    borderRadius: '4px',
                    height      : '100%',
                    background  : ({ palette }) => palette.semantic.foreground.secondary
                }}
            >
                {person && (
                    <>
                        <Box
                            flexDirection="row"
                            alignItems="center"
                            component="span"
                            display="flex"
                            overflow="hidden"
                            gap={1}
                            width="fit-content"
                            sx={{
                                position    : 'relative',
                                padding     : '2px 4px',
                                borderRadius: '4px',
                                fontSize    : '12px',

                                fontWeight: 500
                            }}
                        >
                            <Avatar
                                src={person.thumbUrl}
                                sx={{
                                    width   : 18,
                                    height  : 18,
                                    fontSize: '8px'
                                }}
                            >
                                {person.initials}
                            </Avatar>
                            <Typography
                                fontSize="12px"
                                fontWeight={500}
                                noWrap
                            >
                                {person.name}
                            </Typography>
                        </Box>
                        <Box>
                            <Divider
                                orientation="vertical"
                                component="span"
                            />
                        </Box>
                    </>
                )}

                <Box
                    flexDirection="row"
                    alignItems="center"
                    display="flex"
                    gap={1}
                >
                    <Icon
                        fontSize="small"
                        sx={{
                            width : '16px',
                            height: '16px'
                        }}
                        fontWeight={600}
                    />
                    <Typography
                        fontSize="12px"
                        fontWeight={500}
                        noWrap
                    >
                        {t('core:documents.fields.version.uploaded', { diffFormatted })}
                    </Typography>
                </Box>
            </Stack>
        </Box>
    );
}

export default memo(VersionsChip);
