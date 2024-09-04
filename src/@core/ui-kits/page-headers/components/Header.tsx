import { ReactElement, CSSProperties } from 'react';
import { SxProps, Theme } from '@mui/material';
import HeaderComponents from './styled';

type Props = {
    topLeft: ReactElement;
    topRight?: ReactElement;
    bottomLeft?: ReactElement;
    bottomRight?: ReactElement;
    style?: CSSProperties;
    sx?: SxProps<Theme>;
};

/**
 * ### Vektor Header Components:
 * @example
 * <PageHeadersKit.Header
 *         topLeft={(
 *             <PageHeadersKit.Title icon={fuelIcon} title="Fuel" />
 *         )}
 *         topRight={(
 *             <>
 *                 <PageHeadersKit.AvatarGroup />
 *                 <PageHeadersKit.Buttons.Import processor_id="fuel" />
 *                 <PageHeadersKit.Buttons.Export exporter_id="fuel" />
 *                 <PageHeadersKit.Divider />
 *                 <PageHeadersKit.Buttons.Primary
 *                     title="Add Transaction"
 *                     onClick={handleAddButton}
 *                     icon={<AddIcon fontSize="medium" />}
 *                 />
 *             </>
 *         )}
 *         bottomLeft={(
 *             <>
 *                   <PageHeadersKit.DateRange
 *                      label="Created At"
 *                      field="created_at"
 *                      date={selected_filters.created_at}
 *                      filter_id={filter_id}
 *                  />
 *                 <PageHeadersKit.Divider />
 *                 <Filters
 *                     default_filters={default_fuel_filters}
 *                     filter_id={filter_id}
 *                     filters={filters}
 *                 />
 *             </>
 *         )}
 *         bottomRight={(
 *             <PageHeadersKit.Buttons.ClearFilter
 *                 filter_id={filter_id}
 *                 selected_filters={selected_filters}
 *                 default_filters={default_fuel_filters}
 *             />
 *         )}
 *     />
 */
export default function Header({
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
    style = {},
    sx = {}
}: Props) {
    return (
        <HeaderComponents.Container
            sx={sx}
            style={style}
        >
            <HeaderComponents.FirstRow>
                <HeaderComponents.LeftSide>{topLeft}</HeaderComponents.LeftSide>
                {topRight && <HeaderComponents.RightSide>{topRight}</HeaderComponents.RightSide>}
            </HeaderComponents.FirstRow>
            {(bottomLeft || bottomRight) && (
                <HeaderComponents.SecondRow>
                    <HeaderComponents.LeftSide>{bottomLeft}</HeaderComponents.LeftSide>
                    {bottomRight && (
                        <HeaderComponents.RightSide>{bottomRight}</HeaderComponents.RightSide>
                    )}
                </HeaderComponents.SecondRow>
            )}
        </HeaderComponents.Container>
    );
}
