import { createSvgIcon, Stack } from '@mui/material';
import { useAddManifestStopDialog } from '@/views/dispatch/manifests/modals/manifest-stop/AddManifestStop';
import { useMergeManifestsDialog } from '@/views/dispatch/manifests/modals/merge';
import { useSplitManifestsDialog } from '@/views/dispatch/manifests/modals/split';
import VectorIcons from '@/@core/icons/vector_icons';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { TableMode } from '@/@core/ui-kits/loads/load-stop/utils';
import openNewTab from '@/utils/openNewTab';
import ManifestStopsTableActionsStyled from './styled';

type Props = {
    setTableMode: (mode: TableMode) => void;
    manifestId: string;
    countStops: number;
    lastStopAppointmentStartAt?: string;
    onCloseDialog?: () => void;
};

const EditIcon = createSvgIcon(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
    >
        <path
            d="M9.62633 4.40243L3.5785 10.4503C3.04517 10.9836 2.74407 11.2846 2.5097 11.6329C2.30184 11.9418 2.13464 12.2762 2.01226 12.6278C1.87427 13.0242 1.81406 13.4458 1.70742 14.1924L1.67022 14.4528C1.65491 14.56 1.69262 14.668 1.77134 14.7423C1.85006 14.8166 1.95999 14.8481 2.06613 14.8267L2.42631 14.754C3.09714 14.6187 3.47592 14.5423 3.83161 14.4023C4.14719 14.2781 4.44709 14.1172 4.72516 13.9231C5.03859 13.7043 5.3118 13.431 5.79569 12.9471L11.9834 6.75945L9.62633 4.40243Z"
            fill="currentColor"
        />
        <path
            d="M12.9262 5.81665L13.7287 5.01412C14.3796 4.36325 14.3796 3.30797 13.7287 2.6571C13.0778 2.00623 12.0225 2.00623 11.3717 2.6571L10.5691 3.45962L12.9262 5.81665Z"
            fill="currentColor"
        />
    </svg>,

    'EditIcon'
);

export const TakeOutIcon = createSvgIcon(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.1953 4.69526C10.4556 4.43491 10.8777 4.43491 11.1381 4.69526L13.8047 7.36193C14.0651 7.62228 14.0651 8.04439 13.8047 8.30474L11.1381 10.9714C10.8777 11.2318 10.4556 11.2318 10.1953 10.9714C9.93491 10.7111 9.93491 10.2889 10.1953 10.0286L11.7239 8.5H5.86667C5.29561 8.5 4.90742 8.50052 4.60736 8.52503C4.31508 8.54891 4.16561 8.5922 4.06135 8.64532C3.81046 8.77316 3.60649 8.97713 3.47866 9.22801C3.42553 9.33228 3.38225 9.48175 3.35837 9.77402C3.33385 10.0741 3.33333 10.4623 3.33333 11.0333V11.8333C3.33333 12.2015 3.03486 12.5 2.66667 12.5C2.29848 12.5 2 12.2015 2 11.8333L2 11.0058C1.99999 10.4692 1.99998 10.0262 2.02946 9.66545C2.06008 9.29072 2.12579 8.94625 2.29065 8.62269C2.54631 8.12093 2.95426 7.71298 3.45603 7.45732C3.77958 7.29246 4.12405 7.22675 4.49878 7.19613C4.85958 7.16665 5.30249 7.16666 5.83913 7.16667L11.7239 7.16667L10.1953 5.63807C9.93491 5.37772 9.93491 4.95561 10.1953 4.69526Z"
            fill="currentColor"
        />
    </svg>,
    'TakeOutIcon'
);

const AddStopIcon = createSvgIcon(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.66663 7.30001C2.66663 4.29868 5.03686 1.83334 7.99996 1.83334C10.9631 1.83334 13.3333 4.29868 13.3333 7.30001C13.3333 8.83102 12.6573 10.1712 11.7419 11.3937C10.978 12.414 10.0001 13.4111 9.02737 14.4029C8.84356 14.5903 8.65993 14.7776 8.47796 14.9647C8.35244 15.0938 8.18003 15.1667 7.99996 15.1667C7.81989 15.1667 7.64748 15.0938 7.52196 14.9647C7.33999 14.7776 7.15636 14.5903 6.97255 14.4029C5.99979 13.4111 5.02191 12.414 4.25797 11.3937C3.34267 10.1712 2.66663 8.83102 2.66663 7.30001ZM8.66663 5.16668C8.66663 4.79849 8.36815 4.50001 7.99996 4.50001C7.63177 4.50001 7.33329 4.79849 7.33329 5.16668V6.50019L6.00005 6.50001C5.63186 6.49996 5.33334 6.7984 5.33329 7.16659C5.33324 7.53478 5.63168 7.83329 5.99987 7.83334L7.33329 7.83353V9.16668C7.33329 9.53487 7.63177 9.83334 7.99996 9.83334C8.36815 9.83334 8.66663 9.53487 8.66663 9.16668V7.83371L9.99987 7.83389C10.3681 7.83394 10.6666 7.5355 10.6666 7.16732C10.6667 6.79913 10.3682 6.50061 10.0001 6.50056L8.66663 6.50038V5.16668Z"
            fill="white"
        />
    </svg>,
    'AddStopIcon'
);

export default function DefaultActions({
    setTableMode,
    manifestId,
    countStops,
    lastStopAppointmentStartAt,
    onCloseDialog
}: Props) {
    const { t } = useAppTranslation('modals');
    const addStopDialog = useAddManifestStopDialog();

    const mergeManifestDialog = useMergeManifestsDialog();

    const splitManifestDialog = useSplitManifestsDialog();

    const handleAddStop = () => {
        addStopDialog.open({
            manifestId,
            lastStopAppointmentStartAt,
            sequence: countStops + 1
        });
    };

    const handleSplit = () => {
        splitManifestDialog.open({
            manifestId,
            onSuccessSplit: onCloseDialog
                ? (manifestId) => {
                    openNewTab(`/dispatch/manifests/${manifestId}`);
                }
                : undefined
        });
    };

    const handleMerge = () => {
        mergeManifestDialog.open({
            manifestId,
            onSuccessMerge: onCloseDialog
                ? (manifestId) => {
                    openNewTab(`/dispatch/manifests/${manifestId}`);
                    onCloseDialog();
                }
                : undefined
        });
    };

    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            flex="1 1 100%"
        >
            <Stack
                direction="row"
                gap={2}
            >
                <ManifestStopsTableActionsStyled.Button
                    onClick={() => setTableMode(TableMode.EDIT_ROUTE)}
                    startIcon={<EditIcon color="primary" />}
                >
                    {t('manifests.details.tabs.stops.header.buttons.edit_route')}
                </ManifestStopsTableActionsStyled.Button>

                {/* // TODO: code should be uncommented this when it needed */}
                {/* <ManifestStopsTableActionsStyled.Button */}
                {/*     variant="outlined" */}
                {/*     color="primary" */}
                {/*     onClick={() => setTableMode(TableMode.TAKE_ROUTE)} */}
                {/*     startIcon={<TakeOutIcon color="primary" />} */}
                {/* > */}
                {/*     {t('manifests.details.tabs.stops.header.buttons.take_out')} */}
                {/* </ManifestStopsTableActionsStyled.Button> */}

                <ManifestStopsTableActionsStyled.Button
                    variant="outlined"
                    color="primary"
                    onClick={handleMerge}
                    startIcon={<VectorIcons.MergeIcon color="primary" />}
                >
                    {t('manifests.details.tabs.stops.header.buttons.merge')}
                </ManifestStopsTableActionsStyled.Button>

                <ManifestStopsTableActionsStyled.Button
                    variant="outlined"
                    color="primary"
                    onClick={handleSplit}
                    startIcon={<VectorIcons.SplitIcon color="primary" />}
                >
                    {t('manifests.details.tabs.stops.header.buttons.split')}
                </ManifestStopsTableActionsStyled.Button>
            </Stack>

            <ManifestStopsTableActionsStyled.Button
                variant="contained"
                color="primary"
                onClick={handleAddStop}
                startIcon={<AddStopIcon />}
            >
                {t('manifests.details.tabs.stops.header.buttons.add_stop')}
            </ManifestStopsTableActionsStyled.Button>
        </Stack>
    );
}
