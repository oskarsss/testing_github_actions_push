import React from 'react';
import LoadboardGrpcService from '@/@grpcServices/services/loadboard-service/loadboard.service';
import { IconButton, Stack, Tooltip, Typography, createSvgIcon } from '@mui/material';
import { LoadboardSearch } from '@proto/models/model_loadboard_search';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useTrucksMap } from '@/store/storage/trucks/hooks/common';
import { TRUCK_TYPE_ICONS } from '@/@core/theme/entities/truck/type';
import { useAppDispatch } from '@/store/hooks';
import { LoadboardActions } from '@/store/loadboard/slice';
import { TRUCK_TYPE_TO_GRPC_REVERSE_ENUM } from '@/models/fleet/trucks/trucks-mappings';

type Props = {
    search: LoadboardSearch;
    searches: LoadboardSearch[];
    isSelectedSearch: boolean;
};

const SearchTruckIcon = createSvgIcon(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
    >
        <g clipPath="url(#clip0_4481_134751)">
            <path
                d="M9.54803 3.93922L9.5484 4.89297C9.54846 5.06238 9.61582 5.22484 9.73566 5.34463C9.85549 5.46442 10.018 5.53172 10.1874 5.53172H11.8149L11.0048 3.61109H9.86728C9.82459 3.61108 9.78233 3.61962 9.74301 3.63621C9.70369 3.65281 9.66809 3.67712 9.63833 3.70771C9.60857 3.7383 9.58524 3.77455 9.56973 3.81431C9.55422 3.85407 9.54684 3.89655 9.54803 3.93922Z"
                fill="currentColor"
            />
            <path
                d="M13.2418 7.30359L12.1258 6.18797C12.1243 6.17781 12.1243 6.1675 12.1258 6.15734H10.1876C9.84999 6.15734 9.52611 6.02321 9.28726 5.78445C9.04841 5.5457 8.91415 5.22187 8.91402 4.88422L8.91365 3.93922C8.91186 3.81308 8.93522 3.68785 8.98238 3.57086C9.02954 3.45387 9.09954 3.34746 9.18831 3.25785C9.27707 3.16823 9.38281 3.09722 9.49934 3.04895C9.61588 3.00068 9.74088 2.97613 9.86703 2.97672H10.742L10.3041 1.96609C10.2706 1.88702 10.2146 1.81954 10.143 1.77209C10.0714 1.72463 9.98741 1.69929 9.90153 1.69922H7.21966C7.16199 1.70034 7.10701 1.72375 7.06624 1.76453C7.02548 1.80531 7.00209 1.8603 7.00099 1.91797L7.00325 7.72797C7.00327 7.78598 6.98025 7.84162 6.93924 7.88265C6.89823 7.92367 6.8426 7.94672 6.78458 7.94672H0.878333C0.820317 7.94672 0.764686 7.96976 0.723678 8.01079C0.682671 8.05181 0.659645 8.10745 0.659668 8.16547L0.660533 10.3967C0.660556 10.4547 0.683624 10.5104 0.724664 10.5514C0.765703 10.5924 0.821352 10.6155 0.879368 10.6155H1.31687C1.30529 10.3932 1.33907 10.1709 1.41614 9.9621C1.49321 9.75332 1.61196 9.56242 1.76517 9.40102C1.91838 9.23962 2.10284 9.11109 2.30733 9.02327C2.51182 8.93544 2.73205 8.89015 2.95464 8.89015C3.17722 8.89015 3.39749 8.93544 3.60205 9.02327C3.8066 9.11109 3.99116 9.23962 4.1445 9.40102C4.29783 9.56242 4.41674 9.75332 4.49397 9.9621C4.5712 10.1709 4.60515 10.3932 4.59374 10.6155H4.81687C4.8167 10.1815 4.98893 9.76532 5.29567 9.45846C5.6024 9.15161 6.01852 8.97922 6.45248 8.97922C6.88644 8.97922 7.3027 9.15161 7.60967 9.45846C7.91665 9.76532 8.0892 10.1815 8.08937 10.6155H9.19187C9.1917 10.1815 9.36393 9.76532 9.67067 9.45846C9.9774 9.15161 10.3935 8.97922 10.8275 8.97922C11.2614 8.97922 11.6777 9.15161 11.9847 9.45846C12.2916 9.76532 12.4642 10.1815 12.4644 10.6155H12.9325C13.0485 10.6155 13.1598 10.5694 13.2418 10.4873C13.3238 10.4053 13.3699 10.294 13.3698 10.178L13.3688 7.61422C13.3691 7.55664 13.3581 7.49956 13.3363 7.44626C13.3145 7.39296 13.2824 7.34447 13.2418 7.30359Z"
                fill="currentColor"
            />
            <path
                d="M2.90897 9.58297C2.77358 9.58297 2.63954 9.6097 2.51454 9.66165C2.38954 9.71359 2.27603 9.78971 2.18054 9.88564C2.08505 9.98158 2.00945 10.0954 1.95809 10.2207C1.90673 10.3459 1.88061 10.4801 1.88124 10.6155C1.8984 10.8771 2.01447 11.1225 2.20588 11.3018C2.3973 11.481 2.64972 11.5808 2.91193 11.5808C3.17414 11.5808 3.42648 11.481 3.61776 11.3018C3.80904 11.1225 3.92491 10.8771 3.94187 10.6155C3.94182 10.4799 3.91506 10.3456 3.86312 10.2203C3.81118 10.0951 3.73509 9.98126 3.63917 9.88538C3.54326 9.7895 3.42941 9.71345 3.30412 9.66156C3.17883 9.60967 3.04456 9.58297 2.90897 9.58297ZM3.43874 10.6155C3.4268 10.747 3.36612 10.8693 3.26861 10.9583C3.17111 11.0474 3.04382 11.0968 2.91174 11.0968C2.77967 11.0968 2.65234 11.0474 2.55477 10.9583C2.45719 10.8693 2.39641 10.747 2.38437 10.6155C2.37766 10.5422 2.38629 10.4683 2.40972 10.3986C2.43315 10.3289 2.47086 10.2648 2.52045 10.2105C2.57003 10.1561 2.6304 10.1127 2.6977 10.083C2.765 10.0534 2.83776 10.038 2.91133 10.038C2.9849 10.038 3.05767 10.0534 3.125 10.083C3.19232 10.1127 3.25273 10.1561 3.30235 10.2105C3.35198 10.2648 3.38974 10.3289 3.41322 10.3986C3.4367 10.4683 3.4454 10.5422 3.43874 10.6155Z"
                fill="currentColor"
            />
            <path
                d="M6.45272 9.58297C6.17888 9.58297 5.9163 9.69175 5.72275 9.88538C5.52919 10.079 5.42051 10.3416 5.42062 10.6155C5.42072 10.8893 5.52961 11.1519 5.72331 11.3456C5.91702 11.5392 6.17968 11.648 6.45352 11.648C6.72735 11.648 6.98993 11.5392 7.18349 11.3456C7.37704 11.1519 7.48572 10.8893 7.48562 10.6155C7.48557 10.4799 7.45881 10.3456 7.40687 10.2203C7.35493 10.0951 7.27884 9.98126 7.18292 9.88538C7.08701 9.7895 6.97316 9.71345 6.84787 9.66156C6.72258 9.60967 6.58831 9.58297 6.45272 9.58297ZM7.00437 10.6155C7.00442 10.7559 6.9487 10.8905 6.84946 10.9898C6.75022 11.0891 6.6156 11.1448 6.4752 11.1448C6.3348 11.1448 6.20013 11.0891 6.10081 10.9898C6.0015 10.8905 5.94567 10.7559 5.94562 10.6155C5.94556 10.4751 6.00128 10.3404 6.10052 10.2411C6.19976 10.1419 6.33439 10.0861 6.47479 10.0861C6.61519 10.0861 6.74986 10.1419 6.84917 10.2411C6.94849 10.3404 7.00431 10.4751 7.00437 10.6155Z"
                fill="currentColor"
            />
            <path
                d="M10.8277 9.58297C10.5539 9.58297 10.2913 9.69175 10.0977 9.88538C9.90419 10.079 9.79551 10.3416 9.79562 10.6155C9.79572 10.8893 9.90461 11.1519 10.0983 11.3456C10.292 11.5392 10.5547 11.648 10.8285 11.648C11.1024 11.648 11.3649 11.5392 11.5585 11.3456C11.752 11.1519 11.8607 10.8893 11.8606 10.6155C11.8605 10.3416 11.7516 10.079 11.5579 9.88538C11.3642 9.69175 11.1016 9.58297 10.8277 9.58297ZM11.3794 10.6155C11.3794 10.7559 11.3237 10.8905 11.2245 10.9898C11.1252 11.0891 10.9906 11.1448 10.8502 11.1448C10.7098 11.1448 10.5751 11.0891 10.4758 10.9898C10.3765 10.8905 10.3207 10.7559 10.3206 10.6155C10.3206 10.4751 10.3763 10.3404 10.4755 10.2411C10.5748 10.1419 10.7094 10.0861 10.8498 10.0861C10.9902 10.0861 11.1249 10.1419 11.2242 10.2411C11.3235 10.3404 11.3793 10.4751 11.3794 10.6155Z"
                fill="currentColor"
            />
        </g>
        <defs>
            <clipPath id="clip0_4481_134751">
                <rect
                    width="14"
                    height="14"
                    fill="currentColor"
                    transform="matrix(1 0 0.000387862 0.999997 0 0)"
                />
            </clipPath>
        </defs>
    </svg>,
    'SearchTruckIcon'
);

const MuteIcon = createSvgIcon(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
    >
        <path
            d="M7.9998 1.33331C6.7764 1.33331 5.59464 1.78648 4.7165 2.60608C3.8368 3.42712 3.33314 4.55094 3.33314 5.73331C3.33314 7.40606 2.91383 8.5499 2.44926 9.31005L2.44187 9.32215C2.19099 9.73266 1.99386 10.0552 1.86128 10.2884C1.79493 10.4051 1.73549 10.5154 1.69182 10.6118C1.6701 10.6597 1.64591 10.718 1.627 10.7807C1.61201 10.8304 1.57991 10.9462 1.59224 11.0871C1.5998 11.1736 1.61789 11.3312 1.7088 11.4933C1.79972 11.6554 1.92473 11.753 1.9946 11.8046C2.09709 11.8802 2.19937 11.9143 2.25407 11.9301C2.3166 11.9482 2.37702 11.9589 2.42692 11.9659C2.52636 11.98 2.64062 11.9871 2.75775 11.9914C2.98595 11.9998 3.30158 12 3.6957 12C6.5651 12 9.4345 12 12.3039 12C12.698 12 13.0137 11.9998 13.2419 11.9914C13.359 11.9871 13.4732 11.98 13.5727 11.9659C13.6226 11.9589 13.683 11.9482 13.7455 11.9301C13.8002 11.9143 13.9025 11.8802 14.005 11.8046C14.0749 11.753 14.1999 11.6554 14.2908 11.4933C14.3817 11.3312 14.3998 11.1736 14.4074 11.0871C14.4197 10.9462 14.3876 10.8304 14.3726 10.7807C14.3537 10.718 14.3295 10.6597 14.3078 10.6118C14.2641 10.5154 14.2047 10.4051 14.1383 10.2884C14.0057 10.0552 13.8086 9.73261 13.5577 9.32206L13.5503 9.31005C13.0858 8.5499 12.6665 7.40606 12.6665 5.73331C12.6665 4.55094 12.1628 3.42712 11.2831 2.60608C10.405 1.78648 9.22321 1.33331 7.9998 1.33331Z"
            fill="currentColor"
        />
        <path
            d="M10.3097 13.3333H5.68989C6.15097 14.1304 7.01276 14.6666 7.9998 14.6666C8.98685 14.6666 9.84864 14.1304 10.3097 13.3333Z"
            fill="currentColor"
        />
    </svg>,
    'MuteIcon'
);

const UnmuteIcon = createSvgIcon(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
    >
        <path
            d="M14.295 11.4857C14.3822 11.3263 14.3999 11.1723 14.4073 11.0871C14.4197 10.9462 14.3876 10.8304 14.3726 10.7807C14.3537 10.718 14.3295 10.6597 14.3077 10.6118C14.2641 10.5154 14.2046 10.4051 14.1383 10.2884C14.0058 10.0553 13.8087 9.73292 13.558 9.32266L13.5503 9.31005C13.0857 8.5499 12.6664 7.40606 12.6664 5.73331C12.6664 4.55094 12.1628 3.42712 11.2831 2.60608C10.4049 1.78648 9.22317 1.33331 7.99976 1.33331C6.94532 1.33331 5.92181 1.66995 5.09698 2.28769L14.295 11.4857Z"
            fill="#6B7789"
        />
        <path
            d="M3.52887 4.47174C3.40043 4.87648 3.3331 5.30098 3.3331 5.73331C3.3331 7.40606 2.91379 8.5499 2.44922 9.31005L2.44183 9.32215C2.19095 9.73266 1.99382 10.0552 1.86124 10.2884C1.79489 10.4051 1.73545 10.5154 1.69178 10.6118C1.67006 10.6597 1.64587 10.718 1.62696 10.7807C1.61197 10.8304 1.57987 10.9462 1.59219 11.0871C1.59976 11.1736 1.61785 11.3312 1.70876 11.4933C1.79968 11.6554 1.92469 11.753 1.99456 11.8046C2.09705 11.8802 2.19933 11.9143 2.25403 11.9301C2.31656 11.9482 2.37698 11.9589 2.42688 11.9659C2.52632 11.98 2.64058 11.9871 2.75771 11.9914C2.98591 11.9998 3.30154 12 3.69566 12H11.0571L13.5285 14.4714C13.7889 14.7317 14.211 14.7317 14.4713 14.4714C14.7317 14.211 14.7317 13.7889 14.4713 13.5286L2.47132 1.52858C2.21097 1.26823 1.78886 1.26823 1.52851 1.52858C1.26816 1.78892 1.26816 2.21103 1.52851 2.47138L3.52887 4.47174Z"
            fill="#6B7789"
        />
        <path
            d="M5.68985 13.3333C6.15093 14.1304 7.01272 14.6666 7.99976 14.6666C8.98681 14.6666 9.8486 14.1304 10.3097 13.3333H5.68985Z"
            fill="#6B7789"
        />
    </svg>,
    'UnmuteIcon'
);

export default function SearchTabLabel({
    search,
    searches,
    isSelectedSearch
}: Props) {
    const [deleteSearch] = LoadboardGrpcService.useDeleteSearchMutation();
    const [muteTrigger] = LoadboardGrpcService.useMuteSearchMutation();
    const [unmuteTrigger] = LoadboardGrpcService.useUnmuteSearchMutation();
    const trucksMap = useTrucksMap();
    const dispatch = useAppDispatch();
    const searchTruck = trucksMap[search.truckId];
    const deleteSearchHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const searchIndex = searches.findIndex((s) => s.searchId === search.searchId);
        const nextIndex = searchIndex + 1;
        const prevIndex = searchIndex - 1;
        if (isSelectedSearch && searches.length > 1) {
            if (searches[nextIndex]) {
                dispatch(LoadboardActions.setSelectedSearchId(searches[nextIndex].searchId));
            } else {
                dispatch(LoadboardActions.setSelectedSearchId(searches[prevIndex].searchId));
            }
        }

        deleteSearch({
            searchId: search.searchId
        });
    };

    const muteSearchHandler = () => {
        if (search.isMuted) {
            unmuteTrigger({
                searchId: search.searchId
            });
        } else {
            muteTrigger({
                searchId: search.searchId
            });
        }
    };

    return (
        <Stack
            direction="row"
            flex="1 1 0"
            width="100%"
            alignItems="center"
            justifyContent="space-between"
        >
            <Stack direction="column">
                <Stack
                    direction="row"
                    alignItems="center"
                    gap={1}
                >
                    {!searchTruck ? (
                        <SearchTruckIcon
                            color="secondary"
                            fontSize="small"
                        />
                    ) : (
                        TRUCK_TYPE_ICONS[TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[searchTruck.type]]
                    )}
                    <Typography
                        fontWeight={500}
                        fontSize="12px"
                        noWrap
                        textOverflow="ellipsis"
                        align="left"
                    >
                        #{searchTruck?.referenceId || '-'}
                    </Typography>
                </Stack>

                <Stack
                    direction="row"
                    alignItems="center"
                    overflow="hidden"
                    gap={1}
                >
                    <Typography
                        textTransform="capitalize"
                        fontWeight={500}
                        fontSize="12px"
                        noWrap
                        maxWidth="70px"
                        textOverflow="ellipsis"
                    >
                        {search.origin?.city ? `${search.origin?.city.substr(0, 10).trim()},` : ''}{' '}
                        {search.origin?.state}
                    </Typography>
                    <Typography
                        fontWeight={500}
                        fontSize="12px"
                    >
                        -
                    </Typography>
                    <Typography
                        textTransform="capitalize"
                        fontWeight={500}
                        fontSize="12px"
                        noWrap
                        maxWidth="70px"
                        textOverflow="ellipsis"
                    >
                        {search.destination?.city || search.destination?.state
                            ? `${search.destination.city.substr(0, 10)}, ${
                                search.destination.state
                            }`
                            : 'Anywhere'}{' '}
                    </Typography>
                </Stack>
            </Stack>

            <Stack
                gap={1}
                direction="row"
                alignItems="center"
            >
                <Tooltip title="Mute search">
                    <IconButton
                        size="small"
                        sx={{
                            display       : 'flex',
                            padding       : '0',
                            alignItems    : 'center',
                            justifyContent: 'center',
                            width         : 20,
                            height        : 20
                        }}
                        onClick={muteSearchHandler}
                    >
                        {search.isMuted ? (
                            <UnmuteIcon
                                sx={{
                                    height: 16,
                                    width : 16,
                                    fill  : '#505966'
                                }}
                            />
                        ) : (
                            <MuteIcon
                                sx={{
                                    height: 16,
                                    width : 16,
                                    fill  : '#505966'
                                }}
                            />
                        )}
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete search">
                    <IconButton
                        size="small"
                        sx={{
                            display       : 'flex',
                            padding       : '0',
                            alignItems    : 'center',
                            justifyContent: 'center',
                            width         : 20,
                            height        : 20
                        }}
                        onClick={deleteSearchHandler}
                    >
                        <CloseOutlinedIcon
                            sx={{
                                height: 16,
                                width : 16,
                                fill  : '#505966'
                            }}
                        />
                    </IconButton>
                </Tooltip>
            </Stack>
        </Stack>
    );
}
