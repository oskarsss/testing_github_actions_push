import { Box, Divider, Stack, Typography, styled, useTheme } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { formatMinutes } from '@/utils/formatting';
import moment from 'moment-timezone';
import getScrollBarStyles from '@/utils/get-scrollbar-styles';
import { useVirtualized } from '@/hooks/useVirtualized';
import { memo, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { PopupData, PreparedEtaState } from '../../layers/EtaStatesLayer';

type Props = {
    data: PopupData;
    onMouseLeave?: () => void;
};

const Text = styled(Typography, {
    shouldForwardProp(propName) {
        return propName !== 'textColor';
    }
})<{ textColor: 'secondary' | 'primary' | 'success' | 'error' | 'disabled' }>(
    ({
        theme,
        textColor
    }) => ({
        fontSize  : '12px',
        color     : theme.palette.semantic.text[textColor],
        fontWeight: 500
    })
);

const EtaStateItem = memo(
    ({
        eta,
        earliness,
        lateness,
        createdAt
    }: {
        eta: number;
        earliness: number;
        lateness: number;
        createdAt: string;
    }) => {
        const theme = useTheme();
        const { t } = useAppTranslation();
        return (
            <Stack
                gap={1}
                padding={1}
                justifyContent="space-between"
                direction="row"
                sx={{
                    minHeight: '18px',
                    maxHeight: '18px'
                }}
            >
                <Stack
                    direction="row"
                    gap={1}
                    alignItems="center"
                    minWidth="110px"
                >
                    <Text
                        noWrap
                        textColor="secondary"
                    >
                        ETA:
                    </Text>
                    <Text
                        noWrap
                        textColor="primary"
                    >
                        {formatMinutes(eta, t)}
                    </Text>
                    {earliness > 0 && (
                        <Text
                            noWrap
                            textColor="success"
                        >
                            {formatMinutes(earliness, t)}
                        </Text>
                    )}
                    <Text
                        noWrap
                        textColor="disabled"
                    >
                        &#x2022;
                    </Text>
                    {lateness > 0 && (
                        <Text
                            noWrap
                            textColor="error"
                        >
                            {formatMinutes(lateness, t)}
                        </Text>
                    )}
                </Stack>
                <Stack
                    direction="row"
                    gap={1}
                    alignItems="center"
                    paddingLeft={1}
                    sx={{
                        borderLeft: `1px solid ${theme.palette.semantic.text.disabled}`
                    }}
                >
                    <Text textColor="secondary">{moment(createdAt).format('HH:mm')}</Text>
                </Stack>
            </Stack>
        );
    }
);

function EtaStatePopupContent({
    data,
    onMouseLeave
}: Props) {
    const theme = useTheme();

    // The scrollable element for your list
    const parentRef = useRef<HTMLDivElement | null>(null);

    const { etaStates } = data;

    // The virtualizer
    const rowVirtualizer = useVirtualizer({
        count           : etaStates.length,
        getScrollElement: () => parentRef.current,
        estimateSize    : () => 20,
        overscan        : 40,
        paddingStart    : 2
    });

    const virtualItems = rowVirtualizer.getVirtualItems();

    return (
        <Box
            ref={parentRef}
            onMouseLeave={onMouseLeave}
            sx={{
                height  : '100px',
                width   : '190px',
                overflow: 'auto',
                ...getScrollBarStyles(theme)
            }}
        >
            <div
                style={{
                    height  : `${rowVirtualizer.getTotalSize()}px`,
                    width   : '100%',
                    position: 'relative',
                    padding : '2px'
                }}
            >
                {virtualItems.map((virtualRow) => (
                    <div
                        key={virtualRow.index}
                        className={virtualRow.index % 2 ? 'ListItemOdd' : 'ListItemEven'}
                        style={{
                            position : 'absolute',
                            top      : 0,
                            left     : 0,
                            width    : '100%',
                            height   : `${virtualRow.size}px`,
                            transform: `translateY(${virtualRow.start}px)`
                        }}
                    >
                        <EtaStateItem
                            createdAt={etaStates[virtualRow.index].createdAt}
                            earliness={etaStates[virtualRow.index].earliness}
                            eta={etaStates[virtualRow.index].eta}
                            lateness={etaStates[virtualRow.index].lateness}
                        />
                    </div>
                ))}
            </div>
        </Box>

    // <Stack
    //     ref={parentRef}
    //     direction="column"
    //     gap={1.5}
    //     borderRadius="4px"
    //     sx={{
    //         ...getScrollBarStyles(theme),
    //         height  : '100px',
    //         width   : '200px',
    //         overflow: 'auto',

    //         // minHeight: fullSize
    //     }}
    //     onMouseLeave={onMouseLeave}
    // >
    //     <div
    //         style={{
    //             height  : `${rowVirtualizer.getTotalSize()}px`,
    //             width   : '100%',
    //             position: 'relative',
    //         }}
    //     >
    //         {rowVirtualizer.getVirtualItems()?.map((virtualRow) => (

    //             <Stack
    //                 gap={1}
    //                 justifyContent="space-between"
    //                 direction="row"
    //                 key={virtualRow.key}
    //                 sx={{
    //                     position : 'absolute',
    //                     top      : 0,
    //                     left     : 0,
    //                     width    : '100%',
    //                     height   : `${virtualRow.size}px`,
    //                     transform: `translateY(${virtualRow.start}px)`,
    //                 }}
    //             >
    //                 <Stack
    //                     direction="row"
    //                     gap={1}
    //                     alignItems="center"
    //                     minWidth="110px"
    //                 >
    //                     <Text
    //                         noWrap
    //                         textColor="secondary"
    //                     >
    //                         {virtualRow.index}ETA:
    //                     </Text>
    //                     <Text
    //                         noWrap
    //                         textColor="primary"
    //                     >
    //                         {formatMinutes(etaStates[virtualRow.index].eta, t)}
    //                     </Text>
    //                     {etaStates[virtualRow.index].earliness > 0 && (
    //                         <Text
    //                             noWrap
    //                             textColor="success"
    //                         >
    //                             {formatMinutes(etaStates[virtualRow.index].earliness, t)}
    //                         </Text>
    //                     )}
    //                     <Text
    //                         noWrap
    //                         textColor="disabled"
    //                     >
    //                         &#x2022;
    //                     </Text>
    //                     {etaStates[virtualRow.index].lateness > 0 && (
    //                         <Text
    //                             noWrap
    //                             textColor="error"
    //                         >
    //                             {formatMinutes(etaStates[virtualRow.index].lateness, t)}
    //                         </Text>
    //                     )}
    //                 </Stack>
    //                 <Stack
    //                     direction="row"
    //                     gap={1}
    //                     alignItems="center"
    //                     paddingLeft={1}
    //                     sx={{
    //                         borderLeft: `1px solid ${theme.palette.semantic.text.disabled}`
    //                     }}
    //                 >
    //                     <Text textColor="secondary">
    //                         {moment(etaStates[virtualRow.index].createdAt).format('HH:mm')}
    //                     </Text>
    //                 </Stack>
    //             </Stack>
    //         ))}
    //     </div>
    // </Stack>
    );
}

export default EtaStatePopupContent;
