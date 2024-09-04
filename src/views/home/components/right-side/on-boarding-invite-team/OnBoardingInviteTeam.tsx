import VectorIcons from '@/@core/icons/vector_icons';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useInviteDriverDialog } from '@/views/fleet/drivers/dialogs/InviteDriver/InviteDriver';
import { useInviteUserDialog } from '@/views/settings/tabs/Members/dialogs/InviteUserDialog';
import RightSideComponents from '@/views/home/components/right-side/components/RightSideComponents';

export default function OnBoardingInviteTeam() {
    const { t } = useAppTranslation('onboarding');

    const inviteDriverDialog = useInviteDriverDialog();
    const inviteUserDialog = useInviteUserDialog();

    const onInviteMember = () => {
        inviteUserDialog.open({});
    };

    const onInviteDriver = () => {
        inviteDriverDialog.open({});
    };

    return (
        <RightSideComponents.Wrapper>
            <RightSideComponents.TitleWrapper>
                <RightSideComponents.Title>
                    {t('side.right.item.invite_team.title')}
                </RightSideComponents.Title>
                <RightSideComponents.SubTitle>
                    {t('side.right.item.invite_team.sub_title')}
                </RightSideComponents.SubTitle>
            </RightSideComponents.TitleWrapper>
            <RightSideComponents.ControllersWrapper>
                <RightSideComponents.Button
                    onClick={onInviteMember}
                    startIcon={<VectorIcons.PlusIcon />}
                    variant="outlined"
                >
                    {t('side.right.item.invite_team.button.invite_member')}
                </RightSideComponents.Button>
                <RightSideComponents.Button
                    onClick={onInviteDriver}
                    startIcon={<VectorIcons.InviteUserIcon />}
                    variant="outlined"
                >
                    {t('side.right.item.invite_team.button.invite_driver')}
                </RightSideComponents.Button>
            </RightSideComponents.ControllersWrapper>
        </RightSideComponents.Wrapper>
    );
}
