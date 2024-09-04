import { Avatar, Box, Divider, Stack, Typography, IconButton, createSvgIcon } from '@mui/material';
import React from 'react';
import SYSTEM from '@/@system';
import { getPublicURL } from '@/configs/storage';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useEditTeamDialog } from '../dialogs/team/EditTeam';

const { BotIcon } = SYSTEM.ASSETS;

type Props = {
    src: string;
    name: string;
    description: string;
    teamId: string;
};

const SettingsIcon = createSvgIcon(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.3335 8.00028C13.3335 7.61685 13.2929 7.24224 13.2156 6.88075L13.9319 5.62043C14.0428 5.42523 14.048 5.18731 13.9458 4.98743C13.8344 4.76963 13.71 4.55593 13.5724 4.34733C13.4349 4.13874 13.2875 3.9402 13.1312 3.75199C12.9877 3.57927 12.767 3.49034 12.5439 3.5154L11.1237 3.67492C10.7535 3.40692 10.3491 3.1869 9.91592 3.02066L9.2607 1.73422C9.1588 1.53416 8.96305 1.39882 8.7399 1.37415C8.49673 1.34727 8.24984 1.3335 7.99998 1.3335C7.75012 1.3335 7.50323 1.34727 7.26006 1.37415C7.03691 1.39882 6.84116 1.53416 6.73926 1.73422L6.08336 3.022C5.65097 3.18879 5.24872 3.40976 4.88087 3.67658L3.44405 3.51519C3.22094 3.49013 3.00019 3.57906 2.85676 3.75178C2.70046 3.93999 2.55305 4.13853 2.41551 4.34712C2.27797 4.55572 2.15357 4.76942 2.04215 4.98722C1.93989 5.18713 1.94513 5.4251 2.05611 5.62031L2.78138 6.8961C2.70623 7.25285 2.66681 7.62228 2.66681 8.00028C2.66681 8.36941 2.70393 8.73335 2.77597 9.08476L2.05581 10.352C1.94488 10.5472 1.93965 10.7851 2.0419 10.985C2.15331 11.2028 2.27772 11.4165 2.41526 11.6251C2.5528 11.8337 2.70021 12.0322 2.85651 12.2204C2.99989 12.3931 3.22053 12.482 3.44357 12.457L4.84442 12.3002C5.22185 12.5776 5.63741 12.8067 6.08198 12.9781L6.73969 14.2666C6.84167 14.4664 7.03728 14.6015 7.26023 14.6262C7.50339 14.653 7.75028 14.6668 8.00014 14.6668C8.25 14.6668 8.49689 14.653 8.74006 14.6262C8.96322 14.6015 9.15897 14.4661 9.26086 14.2661L9.91653 12.9788C10.3607 12.8077 10.776 12.579 11.1532 12.3021L12.5448 12.4573C12.7678 12.4822 12.9883 12.3933 13.1316 12.2207C13.2879 12.0325 13.4353 11.8339 13.5728 11.6253C13.7104 11.4167 13.8348 11.203 13.9462 10.9852C14.0484 10.7854 14.0432 10.5474 13.9323 10.3522L13.22 9.09895C13.2944 8.7439 13.3335 8.37633 13.3335 8.00028ZM8 10.6668C9.47276 10.6668 10.6667 9.47292 10.6667 8.00016C10.6667 6.5274 9.47276 5.3335 8 5.3335C6.52724 5.3335 5.33333 6.5274 5.33333 8.00016C5.33333 9.47292 6.52724 10.6668 8 10.6668Z"
            fill="#6B7789"
        />
    </svg>,
    'SettingsIcon'
);

export default function AboutTeamSidebarContent({
    description,
    name,
    src,
    teamId
}: Props) {
    const { t } = useAppTranslation();
    const editTeamDialog = useEditTeamDialog();
    const url = getPublicURL(src);

    const openEditTeamDialog = () =>
        editTeamDialog.open({
            name,
            teamId,
            description,
            logoUrl: src
        });
    return (
        <Stack
            flex="1 1 100%"
            direction="column"
            gap="12px"
        >
            {src ? (
                <Avatar
                    src={url || ''}
                    alt={name}
                />
            ) : (
                <Box
                    sx={{
                        svg: {
                            borderRadius: '50%',
                            width       : '60px',
                            height      : '60px'
                        }
                    }}
                >
                    <BotIcon />
                </Box>
            )}
            <Typography
                fontSize="20px"
                fontWeight={600}
                sx={{
                    color: ({ palette }) => palette.semantic.text.primary
                }}
                variant="body1"
            >
                {name}
            </Typography>
            <Divider variant="fullWidth" />
            <Stack direction="column">
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Typography
                        variant="body1"
                        color="semantic.foreground.disabled"
                        fontSize="12px"
                        textTransform="uppercase"
                        fontWeight={600}
                        sx={{
                            color: ({ palette }) => palette.semantic.text.primary
                        }}
                    >
                        {t('settings:teams.profile.about')}
                    </Typography>
                    <IconButton
                        size="small"
                        aria-label="edit-team"
                        onClick={openEditTeamDialog}
                    >
                        <SettingsIcon fontSize="small" />
                    </IconButton>
                </Stack>
                <Typography
                    fontSize="16px"
                    variant="body1"
                    fontWeight={500}
                    sx={{
                        color: ({ palette }) => palette.semantic.text.primary
                    }}
                >
                    {description}
                </Typography>
            </Stack>
        </Stack>
    );
}
