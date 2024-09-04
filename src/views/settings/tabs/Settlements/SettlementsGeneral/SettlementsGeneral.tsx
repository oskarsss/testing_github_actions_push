import Section from '@/views/settings/components/Section/Section';
import FallbackContent from '@/@core/ui-kits/basic/fallback-content/FallbackContent';
import VectorIcons from '@/@core/icons/vector_icons';
import Loading from '@/@core/components/page/Loading';
import React from 'react';
import { useSettings } from '@/store/settings/hooks';
import SettlementsLetterhead from '@/views/settings/tabs/Settlements/SettlementsGeneral/settlements-letterhead/SettlementsLetterhead';
import SettlementsEmails from '@/views/settings/tabs/Settlements/SettlementsGeneral/settlements-emails/SettlementsEmails';

export default function SettlementsGeneral() {
    const {
        settlementsSections,
        isLoading,
        isError
    } = useSettings();

    if (isError) {
        return (
            <Section>
                <FallbackContent
                    icon={<VectorIcons.Cone />}
                    firstText="common:error"
                />
            </Section>
        );
    }

    if (isLoading || !settlementsSections) {
        return (
            <Section>
                <Loading />
            </Section>
        );
    }

    return (
        <Section>
            <SettlementsLetterhead settlementsData={settlementsSections} />
            <SettlementsEmails
                ccEmails={settlementsSections.ccEmails}
                replyToEmails={settlementsSections.replyToEmails}
            />
        </Section>
    );
}
