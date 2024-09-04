import { Tab, Tabs, styled } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { EDIT_DRIVERS_TABS, EditDriverChangeTab } from '../../EditDriverForm';

const StyledTabs = styled(Tabs)(() => ({
    marginLeft         : '20px',
    '.MuiTabs-scroller': {
        '.MuiTabs-flexContainer': {
            '.MuiTab-root': {
                fontWeight: 800
            }
        }
    }
}));

type Props = {
    tabValue: number;
    onChangeTab: EditDriverChangeTab;
};

export default function EditDriverTabs({
    onChangeTab,
    tabValue
}: Props) {
    const { t } = useAppTranslation();
    return (
        <StyledTabs
            value={tabValue}
            onChange={onChangeTab}
            aria-label="edit driver tabs"
        >
            {EDIT_DRIVERS_TABS.map((tab) => (
                <Tab
                    key={tab.value}
                    label={t(tab.label)}
                />
            ))}
        </StyledTabs>
    );
}
