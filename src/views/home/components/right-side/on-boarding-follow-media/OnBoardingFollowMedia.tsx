import { useAppTranslation } from '@/hooks/useAppTranslation';
import { createSvgIcon } from '@mui/material';
import RightSideComponents from '@/views/home/components/right-side/components/RightSideComponents';
import SYSTEM from '@/@system';

const LinkedinIcon = createSvgIcon(
    <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M14.8156 0H1.18125C0.528125 0 0 0.515625 0 1.15313V14.8438C0 15.4813 0.528125 16 1.18125 16H14.8156C15.4688 16 16 15.4813 16 14.8469V1.15313C16 0.515625 15.4688 0 14.8156 0ZM4.74687 13.6344H2.37188V5.99687H4.74687V13.6344ZM3.55938 4.95625C2.79688 4.95625 2.18125 4.34062 2.18125 3.58125C2.18125 2.82188 2.79688 2.20625 3.55938 2.20625C4.31875 2.20625 4.93437 2.82188 4.93437 3.58125C4.93437 4.3375 4.31875 4.95625 3.55938 4.95625ZM13.6344 13.6344H11.2625V9.92188C11.2625 9.0375 11.2469 7.89687 10.0281 7.89687C8.79375 7.89687 8.60625 8.8625 8.60625 9.85938V13.6344H6.2375V5.99687H8.5125V7.04063H8.54375C8.85938 6.44063 9.63438 5.80625 10.7875 5.80625C13.1906 5.80625 13.6344 7.3875 13.6344 9.44375V13.6344Z"
            fill="currentColor"
        />
    </svg>,
    'LinkinIcon'
);

const FacebookIcon = createSvgIcon(
    <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g clipPath="url(#clip0_7142_1068)">
            <path
                d="M16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 11.993 2.92547 15.3027 6.75 15.9028V10.3125H4.71875V8H6.75V6.2375C6.75 4.2325 7.94438 3.125 9.77172 3.125C10.6467 3.125 11.5625 3.28125 11.5625 3.28125V5.25H10.5538C9.56 5.25 9.25 5.86672 9.25 6.5V8H11.4688L11.1141 10.3125H9.25V15.9028C13.0745 15.3027 16 11.993 16 8Z"
                fill="currentColor"
            />
        </g>
        <defs>
            <clipPath id="clip0_7142_1068">
                <rect
                    width="16"
                    height="16"
                    fill="white"
                />
            </clipPath>
        </defs>
    </svg>,
    'LinkinIcon'
);

const InstagramIcon = createSvgIcon(
    <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M8 1.44062C10.1375 1.44062 10.3906 1.45 11.2313 1.4875C12.0125 1.52187 12.4344 1.65313 12.7156 1.7625C13.0875 1.90625 13.3563 2.08125 13.6344 2.35938C13.9156 2.64062 14.0875 2.90625 14.2313 3.27813C14.3406 3.55938 14.4719 3.98438 14.5063 4.7625C14.5438 5.60625 14.5531 5.85938 14.5531 7.99375C14.5531 10.1313 14.5438 10.3844 14.5063 11.225C14.4719 12.0063 14.3406 12.4281 14.2313 12.7094C14.0875 13.0813 13.9125 13.35 13.6344 13.6281C13.3531 13.9094 13.0875 14.0813 12.7156 14.225C12.4344 14.3344 12.0094 14.4656 11.2313 14.5C10.3875 14.5375 10.1344 14.5469 8 14.5469C5.8625 14.5469 5.60938 14.5375 4.76875 14.5C3.9875 14.4656 3.56563 14.3344 3.28438 14.225C2.9125 14.0813 2.64375 13.9063 2.36563 13.6281C2.08438 13.3469 1.9125 13.0813 1.76875 12.7094C1.65938 12.4281 1.52813 12.0031 1.49375 11.225C1.45625 10.3813 1.44688 10.1281 1.44688 7.99375C1.44688 5.85625 1.45625 5.60313 1.49375 4.7625C1.52813 3.98125 1.65938 3.55938 1.76875 3.27813C1.9125 2.90625 2.0875 2.6375 2.36563 2.35938C2.64688 2.07812 2.9125 1.90625 3.28438 1.7625C3.56563 1.65313 3.99063 1.52187 4.76875 1.4875C5.60938 1.45 5.8625 1.44062 8 1.44062ZM8 0C5.82813 0 5.55625 0.009375 4.70313 0.046875C3.85313 0.084375 3.26875 0.221875 2.7625 0.41875C2.23438 0.625 1.7875 0.896875 1.34375 1.34375C0.896875 1.7875 0.625 2.23438 0.41875 2.75938C0.221875 3.26875 0.084375 3.85 0.046875 4.7C0.009375 5.55625 0 5.82812 0 8C0 10.1719 0.009375 10.4438 0.046875 11.2969C0.084375 12.1469 0.221875 12.7313 0.41875 13.2375C0.625 13.7656 0.896875 14.2125 1.34375 14.6562C1.7875 15.1 2.23438 15.375 2.75938 15.5781C3.26875 15.775 3.85 15.9125 4.7 15.95C5.55313 15.9875 5.825 15.9969 7.99688 15.9969C10.1688 15.9969 10.4406 15.9875 11.2938 15.95C12.1438 15.9125 12.7281 15.775 13.2344 15.5781C13.7594 15.375 14.2063 15.1 14.65 14.6562C15.0938 14.2125 15.3688 13.7656 15.5719 13.2406C15.7688 12.7313 15.9063 12.15 15.9438 11.3C15.9813 10.4469 15.9906 10.175 15.9906 8.00313C15.9906 5.83125 15.9813 5.55938 15.9438 4.70625C15.9063 3.85625 15.7688 3.27188 15.5719 2.76562C15.375 2.23438 15.1031 1.7875 14.6563 1.34375C14.2125 0.9 13.7656 0.625 13.2406 0.421875C12.7313 0.225 12.15 0.0875 11.3 0.05C10.4438 0.009375 10.1719 0 8 0Z"
            fill="currentColor"
        />
        <path
            d="M8 3.89062C5.73125 3.89062 3.89062 5.73125 3.89062 8C3.89062 10.2688 5.73125 12.1094 8 12.1094C10.2688 12.1094 12.1094 10.2688 12.1094 8C12.1094 5.73125 10.2688 3.89062 8 3.89062ZM8 10.6656C6.52813 10.6656 5.33437 9.47188 5.33437 8C5.33437 6.52813 6.52813 5.33437 8 5.33437C9.47188 5.33437 10.6656 6.52813 10.6656 8C10.6656 9.47188 9.47188 10.6656 8 10.6656Z"
            fill="currentColor"
        />
        <path
            d="M13.2312 3.72811C13.2312 4.25936 12.8 4.68749 12.2719 4.68749C11.7406 4.68749 11.3125 4.25624 11.3125 3.72811C11.3125 3.19686 11.7438 2.76874 12.2719 2.76874C12.8 2.76874 13.2312 3.19999 13.2312 3.72811Z"
            fill="currentColor"
        />
    </svg>,
    'InstagramIcon'
);

export default function OnBoardingFollowMedia() {
    const { t } = useAppTranslation('onboarding');

    if (
        !SYSTEM.SOCIAL_LINKS.LINKEDIN &&
        !SYSTEM.SOCIAL_LINKS.FACEBOOK &&
        !SYSTEM.SOCIAL_LINKS.INSTAGRAM
    ) return null;

    return (
        <>
            <RightSideComponents.Divider />
            <RightSideComponents.Wrapper>
                <RightSideComponents.Title>
                    {t('side.right.item.follow_social_media.title')}
                </RightSideComponents.Title>
                <RightSideComponents.ControllersWrapper style={{ flexDirection: 'row' }}>
                    {SYSTEM.SOCIAL_LINKS.LINKEDIN && (
                        <RightSideComponents.SocialMediaLink
                            href={SYSTEM.SOCIAL_LINKS.LINKEDIN}
                            target="_blank"
                        >
                            <LinkedinIcon color="primary" />
                        </RightSideComponents.SocialMediaLink>
                    )}

                    {SYSTEM.SOCIAL_LINKS.FACEBOOK && (
                        <RightSideComponents.SocialMediaLink
                            href={SYSTEM.SOCIAL_LINKS.FACEBOOK}
                            target="_blank"
                        >
                            <FacebookIcon color="primary" />
                        </RightSideComponents.SocialMediaLink>
                    )}

                    {SYSTEM.SOCIAL_LINKS.INSTAGRAM && (
                        <RightSideComponents.SocialMediaLink
                            href={SYSTEM.SOCIAL_LINKS.INSTAGRAM}
                            target="_blank"
                        >
                            <InstagramIcon color="primary" />
                        </RightSideComponents.SocialMediaLink>
                    )}
                </RightSideComponents.ControllersWrapper>
            </RightSideComponents.Wrapper>
        </>
    );
}
