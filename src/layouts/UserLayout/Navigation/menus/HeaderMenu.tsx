/* eslint-disable no-nested-ternary */
import { type MouseEvent, useState } from 'react';
import { useAccountCompanies, usePermissions } from '@/store/app/hooks';
import { useAppDispatch } from '@/store/hooks';
import { useRouter } from 'next/router';
import { AppActions } from '@/store/app/slice';
import { useCreateNewCompanyDialog } from '@/layouts/UserLayout/Navigation/dialogs/CreateNewCompany/CreateNewCompany';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuComponents from '@/@core/ui-kits/menus';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import { useCompaniesDocuments } from '@/@core/components/documents/CompaniesDocuments';
import navigateToPage from '@/utils/navigateToPage';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { PERMISSIONS } from '@/models/permissions/permissions';
import { authGrpcApi } from '@/@grpcServices/services/auth.service';
import { useStableArray } from '@/hooks/useStable';
import { Box, Fade, Stack, IconButton, Tooltip } from '@mui/material';
import Logo from '@/layouts/UserLayout/Navigation/components/NavHeader/components/NavHeaderLogo/Logo';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import HeaderMenuStyled from './styled';
import SubMenu from './SubMenu/SubMenu';
import MenuStyled from './SubMenu/styled';
import InvitesMenu from './invites-menu';

export const useHeaderMenu = menuHookFabric(HeaderMenu, { keepMounted: false }, (props) => (
    <MenuComponents.MenuWrapper
        {...props}
        anchorPosition={{
            top : 60,
            left: 16
        }}
    />
));

function HeaderMenu() {
    const menu = useHeaderMenu(true);
    const createCompanyDialog = useCreateNewCompanyDialog();
    const companiesDocuments = useCompaniesDocuments();
    const { hasPermission } = usePermissions();
    const { t } = useAppTranslation('navigation');

    const { data } = authGrpcApi.useInvitesGetQuery({});
    const invites = useStableArray(data?.invites);

    const [positionTop, setPositionTop] = useState<number>(0);
    const [invitesTopPosition, setInvitesTopPosition] = useState<number>(0);

    const handleOpenInvites = (e: MouseEvent) => {
        const position = e.currentTarget.getBoundingClientRect();
        setInvitesTopPosition(position.top);
    };

    const {
        companies,
        company
    } = useAccountCompanies();
    const companyId = company?.companyId || '';
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleClose = () => setPositionTop(0);
    const handleOpen = (e: MouseEvent) => {
        const position = e.currentTarget.getBoundingClientRect();
        setPositionTop(position.top);
    };

    const handleCloseInvites = () => setInvitesTopPosition(0);

    const onChangeCompany = (company_id: string) => {
        if (company_id !== companyId) {
            router.push({ search: '' }, undefined, { shallow: true });
            const split_route = router.route.split('/');
            const splitIndex = split_route.findIndex(
                (item) => item.startsWith('[') && item.endsWith(']')
            );
            if (splitIndex >= 0) {
                const new_route = split_route.slice(0, splitIndex).join('/');
                handleClose();
                menu.close();
                router.push(new_route || '/').then(() => {
                    dispatch(AppActions.SelectCompany(company_id));
                });
                return;
            }

            dispatch(AppActions.SelectCompany(company_id));
        }
        handleClose();
        menu.close();
    };

    const onClickSettings = (id: string, e: MouseEvent) => {
        navigateToPage(`/settings/${id}/`, e);

        menu.close();
    };

    const openCreateCompanyDialog = () => {
        createCompanyDialog.open({
            changeCompany: (data) => onChangeCompany(data.companyId)
        });
        handleClose();
        menu.close();
    };

    const onClickDocuments = () => {
        companiesDocuments.open({});
    };

    const onClickOnboarding = () => {
        router.push('/home');
        menu.close();
    };

    const mouseHandler = (e: MouseEvent<SVGSVGElement>) => e.stopPropagation();

    return (
        <HeaderMenuStyled.List>
            {hasPermission(PERMISSIONS.SETTINGS_PAGE) && (
                <HeaderMenuStyled.MenuItemStyled onClick={(e) => onClickSettings('company', e)}>
                    {t('header_menu.items.org_settings')}
                </HeaderMenuStyled.MenuItemStyled>
            )}

            {hasPermission(PERMISSIONS.SETTINGS_PAGE) && (
                <HeaderMenuStyled.MenuItemStyled onClick={(e) => onClickSettings('members', e)}>
                    {t('header_menu.items.members')}
                </HeaderMenuStyled.MenuItemStyled>
            )}

            {hasPermission(PERMISSIONS.SETTINGS_BILLING_PAGE) && (
                <HeaderMenuStyled.MenuItemStyled onClick={(e) => onClickSettings('billing', e)}>
                    {t('header_menu.items.billing')}
                </HeaderMenuStyled.MenuItemStyled>
            )}

            {invites.length > 0 && (
                <HeaderMenuStyled.MenuItemStyled
                    onMouseEnter={handleOpenInvites}
                    onMouseLeave={handleCloseInvites}
                    sx={{
                        display       : 'flex',
                        alignItems    : 'center',
                        justifyContent: 'space-between'
                    }}
                    onClick={(e) => {}}
                >
                    Invites{' '}
                    <Stack
                        spacing={1}
                        direction="row"
                        alignItems="center"
                    >
                        <Box
                            component="span"
                            sx={{
                                display        : 'flex',
                                alignItems     : 'center',
                                justifyContent : 'center',
                                width          : '18px',
                                height         : '18px',
                                backgroundColor: '#FF5A5F',
                                color          : '#fff',
                                borderRadius   : '50%',
                                fontWeight     : 'bold',
                                marginLeft     : '5px',
                                fontSize       : '12px'
                            }}
                        >
                            {invites.length}
                        </Box>
                        <ChevronRightIcon
                            onMouseLeave={mouseHandler}
                            onMouseOver={mouseHandler}
                            sx={{ fontSize: '20px', color: '#99A4B0' }}
                        />
                    </Stack>
                    {!!invitesTopPosition && (
                        <InvitesMenu
                            invites={invites}
                            invitesTopPosition={invitesTopPosition}
                        />
                    )}
                </HeaderMenuStyled.MenuItemStyled>
            )}

            <HeaderMenuStyled.MenuItemStyled onClick={onClickDocuments}>
                {t('header_menu.items.documents')}
            </HeaderMenuStyled.MenuItemStyled>

            <HeaderMenuStyled.MenuItemStyled onClick={onClickOnboarding}>
                {t('header_menu.items.onboarding')}
            </HeaderMenuStyled.MenuItemStyled>

            <HeaderMenuStyled.MenuItemStyled
                onClick={handleOpen}
                onMouseEnter={handleOpen}
                onMouseLeave={handleClose}
            >
                {t('header_menu.items.switch_organization')}
                <ChevronRightIcon
                    onMouseLeave={mouseHandler}
                    onMouseOver={mouseHandler}
                    sx={{ fontSize: '20px', color: '#99A4B0' }}
                />
                {!!positionTop && (
                    <SubMenu
                        position_top={positionTop}
                        id={companyId}
                        companies={companies}
                        onChangeCompany={onChangeCompany}
                        onCreateCompany={openCreateCompanyDialog}
                    />
                )}
            </HeaderMenuStyled.MenuItemStyled>
        </HeaderMenuStyled.List>
    );
}
