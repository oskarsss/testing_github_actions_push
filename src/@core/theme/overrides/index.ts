// ** Overrides Imports
import { Theme } from '@mui/material';
import { LayoutSettingsType } from '@/context/LayoutSettingsContext';
import MuiCard from './card';
import MuiChip from './chip';
import MuiLink from './link';
import MuiList from './list';
import MuiMenu from './menu';
import MuiTabs from './tabs';
import MuiInput from './input';
import MuiPaper from './paper';
import MuiTable from './table';
import MuiAlerts from './alerts';
import MuiButton from './button';
import MuiDialog from './dialog';
import MuiRating from './rating';
import MuiSelect from './select';
import MuiAvatar from './avatars';
import MuiDivider from './divider';
import MuiPopover from './popover';
import MuiTooltip from './tooltip';
import MuiBackdrop from './backdrop';
import MuiDataGrid from './dataGrid';
import MuiSnackbar from './snackbar';
import MuiSwitches from './switches';
import MuiTimeline from './timeline';
import MuiAccordion from './accordion';
import MuiPagination from './pagination';
import MuiTypography from './typography';
import MuiAutocomplete from './autocomplete';
import MuiToggleButton from './toggleButton';
import MuiDateTimePicker from './dateTimePicker';
import MuiSvgIcon from './svg-icon';
import MuiCheckbox from './checkbox';

const Overrides = (theme: Theme, settings: LayoutSettingsType) => {
    const skin = settings.skin ?? 'default';
    const button = MuiButton(theme);
    const chip = MuiChip(theme);
    const list = MuiList(theme);
    const tabs = MuiTabs(theme);
    const input = MuiInput(theme);
    const tables = MuiTable(theme);
    const alerts = MuiAlerts(theme);
    const rating = MuiRating(theme);
    const avatars = MuiAvatar(theme);
    const divider = MuiDivider(theme);
    const menu = MuiMenu(theme, skin);
    const tooltip = MuiTooltip();
    const cards = MuiCard(theme, skin);
    const backdrop = MuiBackdrop(theme);
    const dataGrid = MuiDataGrid(theme);
    const switches = MuiSwitches(theme);
    const timeline = MuiTimeline(theme);
    const accordion = MuiAccordion(theme);
    const dialog = MuiDialog(theme, skin);
    const pagination = MuiPagination(theme);
    const popover = MuiPopover(theme, skin);
    const snackbar = MuiSnackbar(theme, skin);
    const dateTimePicker = MuiDateTimePicker(theme);
    const autocomplete = MuiAutocomplete(theme, skin);
    const icon = MuiSvgIcon(theme, skin);
    const checkbox = MuiCheckbox(theme);

    return Object.assign(
        chip,
        list,
        menu,
        checkbox,
        tabs,
        cards,
        input,
        alerts,
        button,
        dialog,
        rating,
        tables,
        avatars,
        divider,
        MuiLink,
        popover,
        tooltip,
        backdrop,
        dataGrid,
        MuiPaper,
        snackbar,
        switches,
        timeline,
        accordion,
        MuiSelect,
        pagination,
        autocomplete,
        MuiTypography,
        dateTimePicker,
        MuiToggleButton,
        icon
    );
};

export default Overrides;
