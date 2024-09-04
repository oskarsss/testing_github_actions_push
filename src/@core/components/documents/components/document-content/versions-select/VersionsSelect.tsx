import {
    Avatar,
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Typography
} from '@mui/material';
import {
    DocumentModel_DocumentEntityType,
    DocumentModel_Version
} from '@proto/models/model_document';
import moment from 'moment-timezone';
import { useMemo } from 'react';
import { useStableArray } from '@/hooks/useStable';
import createMap from '@/utils/create-map';
import DocumentsGrpcService from '@/@grpcServices/services/app-sevices/documents-services/documents.service';
import { useUsersMap } from '@/store/hash_maps/hooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';
import { useDocumentsContext } from '../../../Documents';
import VersionBox from './VersionBox';

type Props = {
    selectedVersion?: DocumentModel_Version;
    setSelectedVersion: (version: DocumentModel_Version) => void;
    documentTypeId: string;
    isCurrentVersion: boolean;
};

export const useGetDocumentVersionsQuery = ({
    documentTypeId,
    entityId,
    entityType
}: {
    documentTypeId?: string;
    entityId: string;
    entityType: DocumentModel_DocumentEntityType;
}) => {
    const {
        data,
        ...rest
    } = DocumentsGrpcService.useGetDocumentVersionsQuery(
        {
            documentTypeId: documentTypeId || '',
            entityId,
            entityType
        },
        {
            skip: !documentTypeId
        }
    );

    const versions = useStableArray(data?.documentVersions);

    const versionsMap = useMemo(() => createMap(versions, 'version'), [versions]);

    return {
        versions,
        versionsMap,
        ...rest
    };
};

export default function VersionsSelect({
    selectedVersion,
    setSelectedVersion,
    documentTypeId,
    isCurrentVersion
}: Props) {
    const {
        entityId,
        entityType
    } = useDocumentsContext();
    const driversMap = useDriversMap();
    const dispatchersMap = useUsersMap();
    const { t } = useAppTranslation('core');

    const {
        versions,
        versionsMap
    } = useGetDocumentVersionsQuery({
        documentTypeId,
        entityId,
        entityType
    });

    if (!selectedVersion || !versions.length) {
        return null;
    }

    return (
        <FormControl
            fullWidth
            size="small"
            variant="filled"
        >
            <InputLabel
                htmlFor="select-input-versions"
                id="select-input-versions"
                size="small"
            >
                {t('documents.version')}
            </InputLabel>
            <Select
                variant="filled"
                size="small"
                labelId="select-input-versions"
                value={selectedVersion.version}
                onChange={(e) => {
                    const version = versionsMap[e.target.value];
                    if (version) {
                        setSelectedVersion(version);
                    }
                }}
                label={t('documents.version')}
                renderValue={(value) => {
                    const version = versionsMap[value];

                    if (!version) {
                        return null;
                    }

                    const now = moment.utc();
                    const createdAt = moment.utc(version.createdAt);
                    const diff = now.diff(createdAt);

                    const diffFormatted = moment.duration(diff).humanize();

                    const driver = driversMap[version.uploadedByDriverId];
                    const dispatcher = dispatchersMap[version.uploadedByUserId];

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
                        <Stack
                            direction="row"
                            spacing={2}
                            maxHeight="20px"
                        >
                            <Box
                                flexDirection="row"
                                alignItems="center"
                                component="span"
                                display="flex"
                                gap={1}
                                width="fit-content"
                                sx={{
                                    position    : 'relative',
                                    padding     : '2px 4px',
                                    borderRadius: '4px',
                                    fontSize    : '12px',
                                    background  : ({ palette }) =>
                                        palette.utility.foreground.gray.primary,
                                    color     : ({ palette }) => palette.semantic.text.white,
                                    fontWeight: 500
                                }}
                            >
                                <VersionBox
                                    isCurrentVersion={isCurrentVersion}
                                    version={version.version}
                                />
                                {diffFormatted}
                            </Box>

                            {person && (
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
                                        background  : ({ palette }) =>
                                            palette.utility.foreground.gray.primary,
                                        color     : ({ palette }) => palette.semantic.text.white,
                                        fontWeight: 500
                                    }}
                                >
                                    <Avatar
                                        src={person.thumbUrl}
                                        sx={{
                                            width   : 14,
                                            height  : 14,
                                            fontSize: '8px'
                                        }}
                                    >
                                        {person.initials}
                                    </Avatar>
                                    <Typography
                                        fontSize="12px"
                                        color="semantic.text.white"
                                        fontWeight={600}
                                        noWrap
                                    >
                                        {person.name}
                                    </Typography>
                                </Box>
                            )}
                        </Stack>
                    );
                }}
            >
                {versions.map((version) => (
                    <MenuItem
                        key={version.version}
                        value={version.version}
                    >
                        V. {version.version}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
