import PageHeadersKit from '@/@core/ui-kits/page-headers';
import VectorIcons from '@/@core/icons/vector_icons';
import OnboardingGrpcService from '@/@grpcServices/services/onboarding.service';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { AppActions } from '@/store/app/slice';
import Router from 'next/router';
import { appHideOnboardingSelector } from '@/store/app/slectors';
import { useGetOnBoardingSeries } from '@/store/home/hooks';

export default function OnBoardingHeader() {
    const isHideOnboarding = useAppSelector(appHideOnboardingSelector);
    const [hidePage] = OnboardingGrpcService.useMarkCompletedMutation();
    const dispatch = useAppDispatch();
    const { isFull } = useGetOnBoardingSeries();

    const onClickHidePage = () => {
        hidePage({}).then(() => {
            dispatch(AppActions.SetHideOnboarding(true));
            Router.push('/analytics');
        });
    };

    return (
        <PageHeadersKit.Header
            sx={{
                borderBottom: (theme) => `1px solid ${theme.palette.semantic.border.primary}`
            }}
            topLeft={(
                <PageHeadersKit.Title
                    Icon={<VectorIcons.GraduationCapIcon />}
                    title="pages:onboarding"
                />
            )}
            topRight={(
                <>
                    <PageHeadersKit.AvatarGroup />
                    {isFull && !isHideOnboarding && (
                        <PageHeadersKit.Buttons.Primary
                            sx={{ minWidth: 0 }}
                            onClick={onClickHidePage}
                            title="onboarding:header.button.hide"
                        />
                    )}
                </>
            )}
        />
    );
}
