import { Tabs as MUITabs, Tab, styled, Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { editSettlementTabValueSelector } from '@/store/accounting/settlements/selectors';
import { SettlementsActions } from '@/store/accounting/settlements/slice';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import TabLabel from './TabLabel';
import ItemsAmount from './ItemsAmount';
import { ChangeTabAction, tabs_config } from './tabs_config';
import { useEditSettlementContext } from '../../../EditSettlement';

export const StyledTabs = styled(MUITabs)(({ theme }) => ({
    '&.MuiTabs-root': {
        border         : `1px solid ${theme.palette.semantic.border.primary}`,
        backgroundColor: theme.palette.semantic.foreground.white.primary,
        maxHeight      : '38px',
        borderRadius   : '6px'
    },
    '& .Mui-selected': {
        transition: 'background-color 0.2s ease-in-out',
        color     : theme.palette.semantic.text.brand.primary
    },
    '& .MuiButtonBase-root': {
        padding       : 0,
        display       : 'flex',
        justifyContent: 'center',
        alignItems    : 'center',
        borderRadius  : '6px'
    }
}));

export const StyledTab = styled(Tab)(({ theme }) => ({
    opacity         : 1,
    '& .MuiTab-root': {
        backgroundColor: theme.palette.semantic.background.secondary,
        padding        : 0,
        margin         : 0
    }
}));

export default function Tabs() {
    const { settlement } = useEditSettlementContext();
    const value = useAppSelector(editSettlementTabValueSelector);

    const dispatch = useAppDispatch();
    const { t } = useAppTranslation();

    const handleChange: ChangeTabAction = (_, newValue) => {
        dispatch(SettlementsActions.ToggleTabValue(newValue));
    };

    return (
        <StyledTabs
            color="primary"
            value={value}
            onChange={handleChange}
            textColor="inherit"
            variant="fullWidth"
            aria-label="edit settlement tabs"
        >
            {tabs_config.map((tab) => (
                <StyledTab
                    value={tab.settlement_field}
                    key={tab.settlement_field}
                    label={(
                        <TabLabel
                            label={t(tab.label)}
                            labelForSmallScreen={t(tab.labelForSmallScreen || '')}
                            isSelected={value === tab.settlement_field}
                            Icon={tab.Icon(value === tab.settlement_field)}
                        >
                            <Stack
                                flexDirection="row"
                                alignItems="center"
                                gap="4px"
                            >
                                <ItemsAmount
                                    amount={tab.assignedQuantity(settlement)}
                                    icon={
                                        tab.assignedIcon ? tab.assignedIcon() : <CheckCircleIcon />
                                    }
                                    isSelected={value === tab.settlement_field}
                                />
                                <ItemsAmount
                                    amount={tab.unassingnedQuantity(settlement)}
                                    icon={
                                        tab.unassingedIcon ? tab.unassingedIcon() : <CancelIcon />
                                    }
                                    isSelected={value === tab.settlement_field}
                                />
                            </Stack>
                        </TabLabel>
                    )}
                />
            ))}
        </StyledTabs>
    );
}
