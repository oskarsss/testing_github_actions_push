import { TestIDs } from '@/configs/tests';
import HelpIcon from '@mui/icons-material/Help';
import HelpButton from '@/@core/components/help-button/HelpButton';
import DraftsHeaderStyled from './DraftsHeader.styled';
import DraftTabs from './Tabs';
import CreateDraftButton from './draft-header-buttons/CreateDraftButton';
import DraftNewTabButton from './draft-header-buttons/DraftNewTabButton';
import ClearAllDraftsButton from './draft-header-buttons/ClearAllDraftsButton';
import CloseNewLoadButton from './draft-header-buttons/CloseNewLoadButton';

function DraftsHeader() {
    return (
        <DraftsHeaderStyled.Container>
            <DraftsHeaderStyled.TabsWrapper>
                <DraftsHeaderStyled.Tabs>
                    <DraftTabs />
                </DraftsHeaderStyled.Tabs>
                <CreateDraftButton />
            </DraftsHeaderStyled.TabsWrapper>

            <DraftsHeaderStyled.ButtonsWrapper>
                <DraftNewTabButton />

                <HelpButton
                    name="new_loads:buttons.help"
                    icon={<HelpIcon />}
                    url_key="how_to_add_a_load"
                    size="small"
                    style={{ height: '36px' }}
                    testId={TestIDs.pages.createLoad.buttons.help}
                />
                <ClearAllDraftsButton />
                <CloseNewLoadButton />
            </DraftsHeaderStyled.ButtonsWrapper>
        </DraftsHeaderStyled.Container>
    );
}

export default DraftsHeader;
