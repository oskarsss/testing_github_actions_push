import React from 'react';
import { Fade, IconButton, Stack, Tooltip } from '@mui/material';
import { InviteGetReply_Invite } from '@proto/auth';
import Logo from '@/layouts/UserLayout/Navigation/components/NavHeader/components/NavHeaderLogo/Logo';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { authGrpcApi } from '@/@grpcServices/services/auth.service';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/store/hooks';
import { AppActions } from '@/store/app/slice';
import MenuStyled from '../SubMenu/styled';

type Props = { invitesTopPosition: number; invites: InviteGetReply_Invite[] };

export default function InvitesMenu({
    invites,
    invitesTopPosition
}: Props) {
    const [accept] = authGrpcApi.useInviteAcceptMutation();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [decline] = authGrpcApi.useInviteDeclineMutation();
    const acceptInvite = async (invite: InviteGetReply_Invite) => {
        await accept({
            companyId: invite.companyId
        }).unwrap();
        router.push({ search: '' }, undefined, { shallow: true });
        const split_route = router.route.split('/');
        const splitIndex = split_route.findIndex(
            (item) => item.startsWith('[') && item.endsWith(']')
        );
        if (splitIndex >= 0) {
            const new_route = split_route.slice(0, splitIndex).join('/');
            router.push(new_route || '/').then(() => {
                dispatch(AppActions.SelectCompany(invite.companyId));
            });
            return;
        }

        dispatch(AppActions.SelectCompany(invite.companyId));
    };
    const declineInvite = (invite: InviteGetReply_Invite) => {
        decline({
            companyId: invite.companyId
        });
    };

    return (
        <Fade in={!!invitesTopPosition}>
            <MenuStyled.SecondMenuContainer
                style={{
                    top     : invitesTopPosition,
                    overflow: 'hidden'
                }}
            >
                <MenuStyled.SecondMenu>
                    <MenuStyled.Companies>
                        {invites.map((invite, index) => (
                            <MenuStyled.Company>
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    spacing={1}
                                    flex="1 1 100%"
                                >
                                    <MenuStyled.CompanyInfo>
                                        <MenuStyled.WrapLogo>
                                            <Logo
                                                size={24}
                                                logo_url={invite.lightLogoUrl}
                                                dark_logo_url={invite.darkLogoUrl}
                                                style={{
                                                    borderRadius: 5,
                                                    objectFit   : 'contain'
                                                }}
                                            />
                                        </MenuStyled.WrapLogo>

                                        <p>{invite.companyName}</p>
                                    </MenuStyled.CompanyInfo>
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        alignItems="center"
                                    >
                                        <IconButton
                                            size="small"
                                            aria-label=""
                                            onClick={() => acceptInvite(invite)}
                                        >
                                            <Tooltip
                                                placement="top"
                                                disableInteractive
                                                title="Accept"
                                            >
                                                <ThumbUpAltIcon
                                                    sx={{
                                                        '&:hover': {
                                                            color: '#00A699'
                                                        }
                                                    }}
                                                    fontSize="small"
                                                />
                                            </Tooltip>
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            aria-label=""
                                            onClick={() => declineInvite(invite)}
                                        >
                                            <Tooltip
                                                disableInteractive
                                                placement="top"
                                                title="Decline"
                                            >
                                                <ThumbDownAltIcon
                                                    sx={{
                                                        '&:hover': {
                                                            color: '#FF5A5F'
                                                        }
                                                    }}
                                                    fontSize="small"
                                                />
                                            </Tooltip>
                                        </IconButton>
                                    </Stack>
                                </Stack>
                            </MenuStyled.Company>
                        ))}
                    </MenuStyled.Companies>
                </MenuStyled.SecondMenu>
            </MenuStyled.SecondMenuContainer>
        </Fade>
    );
}
