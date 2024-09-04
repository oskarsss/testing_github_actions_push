import IntegrationDetailsComponents from '@/views/settings/tabs/Integrations/Details/components/IntegrationDetailsComponents';
import integrationsData from '@/views/settings/tabs/Integrations/Details/integrationsData';
import { IntegrationProvider } from '@proto/integrations';
import ProviderLogo from '@/views/settings/tabs/Integrations/components/ProviderLogo';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    provider: IntegrationProvider;
};

export default function LeftSide({ provider }: Props) {
    const { t } = useAppTranslation();
    const about =
        integrationsData[provider.id as keyof typeof integrationsData] || integrationsData.default;
    return (
        <IntegrationDetailsComponents.Left.Wrapper>
            <ProviderLogo
                srcLightMode={provider.darkLogoUrl}
                srcDarkMode={provider.lightLogoUrl}
                height="40px"
                style={{ marginBottom: '24px' }}
            />
            <IntegrationDetailsComponents.Left.Link
                href={about.link_href}
                text={about.link_text}
            />
            <IntegrationDetailsComponents.Left.Description>
                {about.description
                    ? t(about.description, about?.translateOptions?.description)
                    : provider.shortDescription}
            </IntegrationDetailsComponents.Left.Description>

            <IntegrationDetailsComponents.Divider />

            {about?.rows?.length
                ? about.rows.map((row, index) => (
                    <IntegrationDetailsComponents.Left.Row
                        key={row.title}
                        isLast={index === (about.rows?.length || 0) - 1}
                    >
                        <IntegrationDetailsComponents.Left.Title>
                            {t(row.title, row?.translateOptions?.title)}
                        </IntegrationDetailsComponents.Left.Title>

                        <IntegrationDetailsComponents.Left.Description>
                            {t(row.description, row?.translateOptions?.description)}
                        </IntegrationDetailsComponents.Left.Description>
                    </IntegrationDetailsComponents.Left.Row>
                ))
                : null}
        </IntegrationDetailsComponents.Left.Wrapper>
    );
}
