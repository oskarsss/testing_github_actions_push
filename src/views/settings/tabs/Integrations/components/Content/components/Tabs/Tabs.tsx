import {
    IntegrationCategoryArray,
    IntegrationCategoryIcons,
    IntegrationCategoryLabels
} from '@/views/settings/tabs/Integrations/components/Content/categories_configs';
import IntegrationComponents from '@/views/settings/tabs/Integrations/components/Content/components/IntegrationComponents';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useFiltersIntegrations } from '@/store/settings/integrations/hooks';

export default function Tabs() {
    const { t } = useAppTranslation();
    const {
        selectedViewId,
        selectView
    } = useFiltersIntegrations();
    return (
        <IntegrationComponents.Tabs.Items>
            {IntegrationCategoryArray.map((category) => (
                <IntegrationComponents.Tabs.Item
                    key={category}
                    selected={category.toString() === selectedViewId}
                    variant="outlined"
                    onClick={() => selectView(category.toString())}
                >
                    {IntegrationCategoryIcons[category]}
                    {t(IntegrationCategoryLabels[category])}
                </IntegrationComponents.Tabs.Item>
            ))}
        </IntegrationComponents.Tabs.Items>
    );
}
