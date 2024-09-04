import { getPublicURL } from '@/configs/storage';
import { createSvgIcon } from '@mui/material';
import SettingIcons from '@/views/settings/icons/icons';
import { useRetrieveFileStream } from '@/@grpcServices/services/app-sevices/storage-service/store-service-hooks';
import { FileModel_MimeType } from '@proto/models/model_file';
import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';

export const EmptyUrlLogoIcon = createSvgIcon(
    <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            opacity="0.3"
            d="M19.9697 4C18.2412 4.01281 16.7735 5.12197 16.2275 6.66655L8.8 6.66667C8.05326 6.66667 7.6799 6.66667 7.39468 6.81199C7.1438 6.93982 6.93982 7.1438 6.81199 7.39468C6.66667 7.6799 6.66667 8.05326 6.66667 8.8V21.2411C8.13721 19.7886 11.0984 16.86 11.0984 16.86C11.4997 16.5075 11.937 16.1936 12.4782 16.0096C13.2849 15.7355 14.158 15.726 14.9704 15.9827C15.5155 16.1549 15.9595 16.4592 16.3682 16.803C16.7558 17.1289 17.1913 17.5608 17.6965 18.0619L19.0193 19.3736C19.3412 19.0583 19.6328 18.7815 19.9014 18.5556C20.3106 18.2115 20.7551 17.9069 21.3008 17.7348C22.114 17.4782 22.9879 17.4883 23.795 17.7635C24.3366 17.9481 24.774 18.2629 25.1751 18.6163C25.227 18.662 25.2797 18.7097 25.3333 18.7592V15.7723C26.8779 15.2263 27.987 13.7586 27.9998 12.0302L28 21.6C28 23.8402 28 24.9603 27.564 25.816C27.1805 26.5686 26.5686 27.1805 25.816 27.564C24.9603 28 23.8402 28 21.6 28H10.4C8.15979 28 7.03969 28 6.18404 27.564C5.43139 27.1805 4.81947 26.5686 4.43597 25.816C4 24.9603 4 23.8402 4 21.6V10.4C4 8.15979 4 7.03969 4.43597 6.18404C4.81947 5.43139 5.43139 4.81947 6.18404 4.43597C7.03969 4 8.15979 4 10.4 4H19.9697Z"
            fill="#6B7789"
        />
        <path
            d="M25.3333 3.99996C25.3333 3.26358 24.7364 2.66663 24 2.66663C23.2636 2.66663 22.6667 3.26358 22.6667 3.99996V6.66663H20C19.2636 6.66663 18.6667 7.26358 18.6667 7.99996C18.6667 8.73634 19.2636 9.33329 20 9.33329H22.6667V12C22.6667 12.7363 23.2636 13.3333 24 13.3333C24.7364 13.3333 25.3333 12.7363 25.3333 12V9.33329H28C28.7364 9.33329 29.3333 8.73634 29.3333 7.99996C29.3333 7.26358 28.7364 6.66663 28 6.66663H25.3333V3.99996Z"
            fill="#6B7789"
        />
    </svg>,
    'EmptyUrlLogo'
);

type Props = {
    title: string;
    url: string;
};

export default function Logo({
    title,
    url
}: Props) {
    const {
        data,
        isLoading
    } = useRetrieveFileStream(url);
    const result = usePrivateFileUrl(url);

    if (!url || isLoading) {
        return <EmptyUrlLogoIcon />;
    }

    if (data.mimeType === FileModel_MimeType.PDF && data.blobUrl) {
        return (
            <SettingIcons.ViewNoa
                sx={{
                    fontSize: '24px',
                    fill    : (theme) => theme.palette.semantic.foreground.brand.primary
                }}
            />
        );
    }

    const src = result.url || getPublicURL(url);

    return (
        <img
            src={src}
            alt={title}
        />
    );
}
