import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import Notes from '@/store/notes/types';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';

import { ACCEPT_FILES_CONFIG } from '@/@core/components/notes/accept_files_config';
import { Props, UsersMap } from '@/@core/components/notes/types';
import moment from 'moment-timezone';
import { useLastDriversPing, useUsersPings } from '@/store/streams/events/hooks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import NotesGrpcService from '@/@grpcServices/services/notes.service';
import NotesTabs from '@/@core/components/notes/components/NotesTabs/NotesTabs';
import UsersGrpcService from '@/@grpcServices/services/users-service/users.service';
import getDeviceId from '@/utils/getDeviceId';
import StorageGrpcService from '@/@grpcServices/services/app-sevices/storage-service/storage.service';
import { fileReader } from '@/utils/file-reader';
import {
    MIME_TYPES_MAP_REVERSE,
    useLazyRetrieveFileStream
} from '@/@grpcServices/services/app-sevices/storage-service/store-service-hooks';
import createMap from '@/utils/create-map';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import DriversGrpcService from '@/@grpcServices/services/drivers.service';
import { getNotesThunk } from '@/store/notes/slice';
import { DriversDataSelectors } from '@/store/storage/drivers/slice';
import StickyDrivers from '@/@core/components/notes/components/StickyDrivers/StickyDrivers';
import { NotesContext, NotesContextDefaultValue } from './NotesContext';
import NotesView from './components/NotesView';
import NotesComponents from './styled';
import { getEntityType } from './components/Form/Form';

/**
 * ### Vektor Notes Components
 * Notes are text notes and files.
 * You can add, edit and delete a note.
 * It is possible to drag a file into the drop zone.
 *
 * Powered by gRPC.
 *
 * #### Props:
 * - `size` - is required
 * - `entity_id` - is required
 * - `entity_type` - is required
 * - `onClose`(optional) - called when a note has been sent
 * - `placeholder`(optional) - is 'Leave a note...' by default
 * - `styleContainer`(optional) - container styles
 * - `size`(optional) - is 'normal' by default
 * - `variant`(optional)
 * - `textFieldBottom`(optional) - is false by default
 * - `isHideHeader`(optional) - is false by default
 * - `testOptions`(optional) - for testing
 * - `slots`(optional) - You can replace the component or pass props
 *
 * #### Usage:
 * @example
 * <Notes
 *  entity_id={load_id}
 *  entity_type="load"
 *  onClose={onClose}
 *  placeholder="Leave a message..."
 *  size="small"
 *  variant="outlined"
 *  textFieldBottom={true}
 *  isHideHeader={true}
 *  testOptions={{ testID: 'notes' }}
 *  slots={{
 *      header: {
 *          component: NotesComponents.SectionHeader, // or your component
 *              props: {
 *                  sx: {
 *                      backgroundColor: (theme) => theme.palette.semantic.background.white,
 *                  }
 *              }
 *          }
 *      }}
 * />
 */

function NotesComponent({
    isHideHeader = false,
    slots,
    wheelPropagation,
    note_type = 'general',
    entity_id,
    entity_type,
    chatsWithDrivers,
    ...props
}: Props) {
    const [editedNote, setEditedNote] = useState<Notes.NoteType | null>(null);
    const [tabValue, setTabValue] = useState<Notes.Tabs>(note_type);
    const [selectedEntity, setSelectedEntity] = useState<{
        entity_id: string;
        entity_type: Props['entity_type'];
    }>({
        entity_id,
        entity_type
    });

    useEffect(() => {
        setSelectedEntity({
            entity_id,
            entity_type
        });
    }, [entity_id, entity_type]);

    const { retrieveFileStream } = useLazyRetrieveFileStream();
    const { t } = useAppTranslation();

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (note_type && entity_type !== 'load') {
            setTabValue(note_type);
        }
    }, [note_type, entity_type]);

    useEffect(() => {
        if (note_type && entity_type === 'load') {
            setTabValue((prev) => {
                if (['general', 'driver', 'team'].includes(prev)) {
                    return prev;
                }
                return note_type;
            });
        }
    }, [entity_type, note_type, entity_id]);

    const entityType = useMemo(
        () => getEntityType(selectedEntity.entity_type, tabValue === 'driver'),
        [selectedEntity.entity_type, tabValue]
    );

    const storeNotes = useAppSelector(
        (state) => state.notes.notesMap[`${entityType}_${selectedEntity.entity_id}`]
    );

    const storeNotesMap = useAppSelector((state) => state.notes.notesMap);
    const storeNotesKeys = useMemo(() => Object.keys(storeNotesMap), [storeNotesMap]);

    const countNotes = useMemo(() => {
        const entityTypeWithDriver = `${getEntityType(entity_type, true)}_${entity_id}`;
        const entityTypeWithoutDriver = `${getEntityType(entity_type, false)}_${entity_id}`;
        const countsMap: Record<string, number> = {
            team:
                storeNotesMap[entityTypeWithoutDriver]?.filter(
                    (note) => !note.deleted && note.body[0] !== '<' && note.userId !== ''
                )?.length || 0,
            driver:
                storeNotesMap[entityTypeWithDriver]?.filter((note) => !note.deleted)?.length || 0
        };
        chatsWithDrivers?.forEach((entity) => {
            const key = `${entity.entity_type}_${entity.entity_id}`;
            countsMap[key] = storeNotesMap[key]?.filter((note) => !note.deleted).length || 0;
        });
        return countsMap;
    }, [entity_id, entity_type, storeNotesMap, chatsWithDrivers]);

    const notes = useMemo(() => {
        if (!storeNotes) return [];
        return storeNotes
            .filter((note) => !note.deleted)
            .sort((a, b) => {
                if (props.textFieldBottom) {
                    return new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf();
                }
                return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
            });
    }, [storeNotes, props.textFieldBottom]);

    useEffect(() => {
        const entityWithDriver = getEntityType(entity_type, true);
        const entityWithoutDriver = getEntityType(entity_type, false);
        if (
            !storeNotesKeys.includes(`${entityWithDriver}_${entity_id}`) &&
            !chatsWithDrivers?.length
        ) {
            dispatch(
                getNotesThunk({
                    entityId  : entity_id,
                    entityType: entityWithDriver
                })
            );
        }
        if (!storeNotesKeys.includes(`${entityWithoutDriver}_${entity_id}`)) {
            dispatch(
                getNotesThunk({
                    entityId  : entity_id,
                    entityType: entityWithoutDriver
                })
            );
        }

        chatsWithDrivers?.forEach((entity) => {
            if (storeNotesKeys.includes(`${entity.entity_type}_${entity.entity_id}`)) return;
            dispatch(
                getNotesThunk({
                    entityId  : entity.entity_id,
                    entityType: entity.entity_type
                })
            );
        });
    }, [entity_id, entity_type, chatsWithDrivers?.length, storeNotesKeys.length, dispatch]);

    const [files, setFiles] = useState<Notes.File[]>([]);
    const [loadingFilesCount, setLoadingFilesCount] = useState<File[]>([]);

    const [uploadFile, { isLoading: isFileUploading }] = StorageGrpcService.useUploadFileMutation();

    const { data } = UsersGrpcService.useGetUsersQuery({});
    const drivers = useAppSelector(DriversDataSelectors.getRows);
    const users_pings = useUsersPings();
    const drivers_pings = useLastDriversPing();

    const usersMap = useMemo(() => {
        if (!data || !drivers) return {};
        const usersPingMap = createMap(users_pings, 'userId');

        const uMap = data.users.reduce((acc, user) => {
            const timestamp = usersPingMap[user.userId]?.timestamp;
            acc[user.userId] = {
                title         : user.title,
                userId        : user.userId,
                driverId      : '',
                selfieThumbUrl: user.selfieThumbUrl,
                fullName      : `${user.firstName} ${user.lastName || ''}`,
                online        : timestamp ? Date.now() - timestamp < 1000 * 60 * 3 : false,
                onlineAge     : timestamp ? moment(timestamp).fromNow() : ''
            };
            return acc;
        }, {} as UsersMap);

        const dMap = drivers.reduce((acc, driver) => {
            const timestamp = drivers_pings.get(driver.driverId)?.timestamp;
            acc[driver.driverId] = {
                title         : t('entity:driver'),
                driverId      : driver.driverId,
                userId        : '',
                online        : timestamp ? Date.now() - timestamp < 1000 * 60 * 3 : false,
                onlineAge     : timestamp ? moment(timestamp).fromNow() : '',
                fullName      : `${driver.firstName} ${driver.lastName || ''}`,
                selfieThumbUrl: driver?.selfieThumbUrl ?? ''
            };
            return acc;
        }, {} as UsersMap);
        return { ...uMap, ...dMap };
    }, [data, drivers, drivers_pings, t, users_pings]);

    const filterTabNotes = useMemo(() => {
        switch (tabValue) {
        case 'general':
            return notes;
        case 'team':
            return notes.filter((note) => note.userId !== '' && note.body[0] !== '<');
        case 'driver':
            return notes.filter((note) => note.userId || note.driverId);
        default:
            return notes.filter((note) => note.userId || note.driverId);
        }
    }, [notes, tabValue]);

    const render_files: (Notes.File | File)[] = useMemo(
        () => [...files, ...loadingFilesCount],
        [files, loadingFilesCount]
    );

    const removeFile = useCallback(
        (fileUrl: string) => {
            setFiles((prev) => prev.filter((f) => f.url !== fileUrl));
        },
        [setFiles]
    );

    const handleFileUpload = useCallback(
        async (files: File[] | FileList) => {
            if (files && files.length > 0) {
                const uploadedFilesLocal: File[] = [];
                for (let i = 0; i < files.length; i += 1) {
                    uploadedFilesLocal.push(files[i]);
                }

                setLoadingFilesCount(uploadedFilesLocal);

                const uploads = Array.from(files).map(async (file) => {
                    const {
                        fileType,
                        uint8Array
                    } = await fileReader(file);

                    if (!uint8Array) {
                        return null;
                    }

                    try {
                        const { fileId } = await uploadFile({
                            name       : file.name,
                            mimeType   : MIME_TYPES_MAP_REVERSE[fileType],
                            data       : uint8Array,
                            thumbNeeded: false
                        }).unwrap();

                        const { name } = await retrieveFileStream(fileId);
                        return { name, url: fileId };
                    } catch (error) {
                        console.error('Error uploading file:', error);
                        return null;
                    }
                });

                try {
                    const uploadedFiles = await Promise.all(uploads);
                    const filesSuccess = uploadedFiles.filter(
                        (file) => file !== null
                    ) as Notes.File[];
                    setFiles((prevState) => [...prevState, ...filesSuccess]);
                    setLoadingFilesCount([]);
                } catch (error) {
                    toast.error(t('core:notes.errors.uploading_file'));
                    setLoadingFilesCount([]);
                }
            }
        },
        [uploadFile, retrieveFileStream]
    );

    const stickyDrivers = useMemo(() => {
        if (!chatsWithDrivers) return undefined;
        const driverIds = chatsWithDrivers?.find(
            (chat) => chat.entity_id === selectedEntity.entity_id
        )?.driverIds;
        if (!driverIds) return undefined;
        return driverIds.map((driverId) => usersMap[driverId]).filter(Boolean);
    }, [chatsWithDrivers, selectedEntity.entity_id, usersMap]);

    const {
        getRootProps,
        isDragActive
    } = useDropzone({
        onDrop        : (files) => handleFileUpload(files),
        noClick       : true,
        multiple      : true,
        accept        : ACCEPT_FILES_CONFIG,
        onDropRejected: () => toast.error(t('core:notes.errors.not_supported_file')),
        onError       : () => toast.error(t('core:notes.errors.not_supported_file'))
    });

    const notesContextDefaultValue: NotesContextDefaultValue = useMemo(
        () => ({
            notes: filterTabNotes,
            usersMap,
            handleFileUpload,
            render_files,
            files,
            removeFile,
            isFileUploading,
            editedNote,
            setEditedNote,
            setFiles,
            tabValue,
            entityType,
            wheelPropagation
        }),
        [
            filterTabNotes,
            usersMap,
            handleFileUpload,
            render_files,
            files,
            removeFile,
            isFileUploading,
            editedNote,
            tabValue,
            entityType,
            wheelPropagation
        ]
    );

    const Header = useMemo(
        () => slots?.header?.component || NotesComponents.SectionHeader,
        [slots?.header?.component]
    );

    const Container = useMemo(
        () => slots?.container?.component || NotesComponents.Container,
        [slots?.container?.component]
    );

    return (
        <NotesContext.Provider value={notesContextDefaultValue}>
            <Container
                tabIndex={-1}
                variant={props.variant}
                size={props.size}
                {...slots?.container?.props}
            >
                {!isHideHeader && (
                    <Header
                        {...slots?.header?.props}
                        variant={props.variant}
                    />
                )}
                {['manifest', 'load'].includes(entity_type) && (
                    <NotesTabs
                        entityId={entity_id}
                        entityType={entity_type}
                        tabValue={tabValue}
                        setTabValue={setTabValue}
                        countNotes={countNotes}
                        setSelectedEntity={setSelectedEntity}
                        chatsWithDrivers={chatsWithDrivers}
                        {...slots?.tabs?.props}
                    />
                )}
                <NotesComponents.SectionBody
                    {...getRootProps()}
                    tabIndex={-1}
                    isDragActive={isDragActive}
                    text_field_bottom={props.textFieldBottom}
                    variant={props.variant}
                >
                    {stickyDrivers && <StickyDrivers stickyDrivers={stickyDrivers} />}
                    <NotesView
                        {...props}
                        entity_id={selectedEntity.entity_id}
                        isDragActive={isDragActive}
                        isLoading={false}
                    />
                </NotesComponents.SectionBody>
            </Container>
        </NotesContext.Provider>
    );
}

const CoreNotes = memo(NotesComponent);
export default CoreNotes;

export const useNotesMenu = menuHookFabric(NotesComponent);
