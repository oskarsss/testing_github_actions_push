import { CSSProperties, memo, useCallback, useMemo } from 'react';
import moment from 'moment-timezone';
import Stack from '@mui/material/Stack';
import Fade from '@mui/material/Fade';
import { useAccount, useAccountCompanies } from '@/store/app/hooks';
import Notes from '@/store/notes/types';
import {
    Avatar,
    Message,
    NoteBodyContainer,
    NoteHiddenTime,
    NoteVisibleTime,
    Title
} from '@/@core/components/notes/components/AllNotes/AllNotes.styled';
import { BadgeOnlineContainer } from '@/@core/ui-kits/page-headers/components/AvatarGroup/styled';
import TooltipComponent from '@/@core/components/avatar-tooltip-info/AvatarTooltipInfo';
import { getPublicURL } from '@/configs/storage';
import { Box, Skeleton, Typography } from '@mui/material';

import { useNoteMoreOptionMenu } from '@/@core/components/notes/menus/NoteMoreOption/NoteMoreOption';
import VectorIcons from '@/@core/icons/vector_icons';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import NoteBodyContent from '@/@core/components/notes/components/AllNotes/components/NoteBodyContent';
import FileWrapper from '@/@core/components/notes/components/AllNotes/components/FileWrapper';
import { UserTypeWithOnline } from '@/@core/components/notes/types';

import SYSTEM from '@/@system';
import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';
import getInitials from '@/utils/get-initials';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useNotesContext } from '../../../NotesContext';
import { formatDate, replaceFromString } from '../utils';

const { BotIcon } = SYSTEM.ASSETS;

type UserAvatarProps = {
    user: UserTypeWithOnline;
    is_driver?: boolean;
};

const UserAvatar = ({
    user,
    is_driver
}: UserAvatarProps) => {
    const { url } = usePrivateFileUrl(is_driver ? user.selfieThumbUrl : '');
    return (
        <TooltipComponent
            online_age={user.onlineAge}
            fullName={user.fullName}
            selfie={user.selfieThumbUrl}
            online={user.online}
            avatar_props={is_driver ? { src: url } : {}}
            tooltip_props={{
                placement      : 'top',
                componentsProps: {
                    popper: {
                        sx: {
                            '.MuiTooltip-tooltip': {
                                marginBottom: '4px !important'
                            }
                        }
                    }
                }
            }}
        >
            <div>
                <BadgeOnlineContainer isOnline={user.online}>
                    <Avatar
                        alt={user.fullName || 'name'}
                        src={is_driver ? url : getPublicURL(user.selfieThumbUrl)}
                    >
                        {getInitials(user.fullName)}
                    </Avatar>
                </BadgeOnlineContainer>
            </div>
        </TooltipComponent>
    );
};

type ConfigProperties = {
    backgroundColor: CSSProperties['backgroundColor'];
    color: CSSProperties['color'];
    border: CSSProperties['border'];
};

const UserTitle = ({ title }: { title: string }) => {
    const title_config: Record<string, ConfigProperties> = {
        Client: {
            backgroundColor: '#EFF8FF',
            color          : '#175CD3',
            border         : '1px solid #B2DDFF'
        },
        Team: {
            backgroundColor: '#F9F5FF',
            color          : '#6941C6',
            border         : '1px solid #E9D7FE'
        },
        Driver: {
            backgroundColor: '#F8F9FC',
            color          : '#363F72',
            border         : '1px solid #D5D9EB'
        },
        System: {
            backgroundColor: '#F4F3FF',
            color          : '#5925DC',
            border         : '1px solid #D9D6FE'
        }
    };

    return (
        <Typography
            padding="0 8px"
            borderRadius="10px"
            bgcolor={title_config[title]?.backgroundColor}
            border={title_config[title]?.border}
            variant="body2"
            fontSize="11px"
            lineHeight="16px"
            fontWeight={600}
            color={title_config[title]?.color}
        >
            {title}
        </Typography>
    );
};

type Props = {
    note: Notes.NoteType;
    hasEditPermission: boolean;
    hasDeletePermission: boolean;
    showAvatar: boolean;
    size: 'small' | 'normal';
};

function Note({
    note,
    hasEditPermission,
    hasDeletePermission,
    showAvatar,
    size
}: Props) {
    const {
        usersMap,
        setEditedNote
    } = useNotesContext();
    const { user: noteOwner } = useAccount();
    const { timezone } = useAccountCompanies();
    const { t } = useAppTranslation();

    const isCurrentUserNote = useMemo(
        () => !note.body.includes('<') && note.userId === noteOwner?.userId,
        [note, noteOwner]
    );

    const userCanEditNote = isCurrentUserNote && moment().diff(note.createdAt, 'minutes') < 60;

    const user = usersMap[note.userId || note.driverId] || ({} as UserTypeWithOnline);
    const noteMoreOptionMenu = useNoteMoreOptionMenu();

    const noteAuthoredByUser = !!usersMap[note.userId || note.driverId];
    const isLoading = Object.keys(usersMap).length === 0;

    const openEditNoteMenu = useCallback(
        (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if (!userCanEditNote) return;

            if (document.getSelection()?.toString()) {
                return;
            }
            e.stopPropagation();
            e.preventDefault();
            noteMoreOptionMenu.open({
                note,
                setEditedNote,
                hasDeletePermission,
                hasEditPermission,
                isEditableNote: isCurrentUserNote
            })(e);
        },
        [
            hasDeletePermission,
            hasEditPermission,
            isCurrentUserNote,
            note,
            noteMoreOptionMenu,
            setEditedNote,
            userCanEditNote
        ]
    );

    const noteTimeContent = (
        <>
            {formatDate(note.createdAt, timezone, t)}
            {note.delivered && !note.read && (
                <CheckSharpIcon sx={{ fontSize: '14px', marginRight: '-2px' }} />
            )}
            {note.delivered && note.read && (
                <VectorIcons.DoubleCheck
                    style={{ marginRight: -2 }}
                    fill={isCurrentUserNote ? 'white' : '#555E6A'}
                />
            )}
        </>
    );

    return (
        <Fade
            in
            appear={moment().diff(note.createdAt, 'seconds') > 5}
        >
            <Stack
                direction="row"
                alignItems="baseline"
                spacing={2}
                gap="12px"
                fontSize={size === 'small' ? '12px' : '14px'}
                padding={showAvatar ? '8px 12px 0px 12px' : '4px 12px 0px 12px'}
                position="relative"
                width="95%"
                marginLeft={isCurrentUserNote ? 'auto' : '0'}
                marginRight={isCurrentUserNote ? '0' : 'auto'}
                borderRadius="4px"
            >
                <Stack
                    direction="column"
                    justifyContent="space-between"
                    alignItems="start"
                    width="100%"
                    gap="4px"
                >
                    {showAvatar && (
                        <Stack
                            direction="row"
                            justifyContent={isCurrentUserNote ? 'flex-end' : 'flex-start'}
                            width="100%"
                            paddingTop="8px"
                        >
                            {isCurrentUserNote && (
                                <Typography
                                    variant="body1"
                                    fontSize="inherit"
                                    fontWeight={700}
                                    lineHeight="20px"
                                    marginBottom="4px"
                                >
                                    {t('core:notes.you')}
                                </Typography>
                            )}

                            {!isCurrentUserNote && (
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    gap="4px"
                                    marginBottom="4px"
                                >
                                    {isLoading ? (
                                        <>
                                            <Skeleton
                                                variant="circular"
                                                width={24}
                                                height={24}
                                            />
                                            <Skeleton
                                                variant="text"
                                                width={130}
                                                sx={{ pl: '8px' }}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            {noteAuthoredByUser ? (
                                                <UserAvatar
                                                    user={user}
                                                    is_driver={!!note.driverId}
                                                />
                                            ) : (
                                                <Box
                                                    sx={{
                                                        borderRadius: '50%',
                                                        display     : 'flex',
                                                        overflow    : 'hidden',
                                                        svg         : {
                                                            maxHeight: '24px',
                                                            maxWidth : '24px'
                                                        }
                                                    }}
                                                >
                                                    <BotIcon />
                                                </Box>
                                            )}
                                            <Title style={{ paddingLeft: '8px' }}>
                                                {noteAuthoredByUser
                                                    ? user.fullName
                                                    : SYSTEM.BOT_NAME}
                                            </Title>

                                            <UserTitle title={user.title} />
                                        </>
                                    )}
                                </Stack>
                            )}
                        </Stack>
                    )}

                    {note.body && (
                        <NoteBodyContainer
                            sx={{
                                justifyContent: isCurrentUserNote ? 'flex-end' : 'flex-start'
                            }}
                        >
                            <NoteBodyContent
                                isEditableNote={isCurrentUserNote}
                                fullRounded={!showAvatar}
                                onContextMenu={openEditNoteMenu}
                            >
                                <Message
                                    is_it_me={isCurrentUserNote}
                                    dangerouslySetInnerHTML={{
                                        __html: replaceFromString(note.body)
                                    }}
                                />

                                {note.files.length === 0 && (
                                    <NoteHiddenTime
                                        size={size}
                                        is_it_me={isCurrentUserNote}
                                    >
                                        {noteTimeContent}
                                        <NoteVisibleTime>{noteTimeContent}</NoteVisibleTime>
                                    </NoteHiddenTime>
                                )}
                            </NoteBodyContent>
                        </NoteBodyContainer>
                    )}

                    {note.files
                        .filter((file) => !!file.url)
                        .map((file) => (
                            <FileWrapper
                                key={file.url}
                                fullRounded={!showAvatar}
                                file={file}
                                createdAt={note.createdAt}
                                read={note.read}
                                delivered={note.delivered}
                                size={size}
                                isEditableNote={isCurrentUserNote}
                                onContextMenu={userCanEditNote ? openEditNoteMenu : undefined}
                            />
                        ))}
                </Stack>
            </Stack>
        </Fade>
    );
}

export default memo(Note);
