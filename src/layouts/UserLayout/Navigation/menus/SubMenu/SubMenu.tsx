import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import { Fade } from '@mui/material';
import App from '@/store/app/types';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import SubMenuCompanies from './SubMenuCompanies';
import MenuStyled from './styled';

type Props = {
    position_top: number;
    id: string;
    companies: App.Company[];
    onChangeCompany: (companyId: string) => void;
    onCreateCompany: () => void;
};

export default function SubMenu({
    position_top,
    id,
    companies,
    onChangeCompany,
    onCreateCompany
}: Props) {
    const { t } = useAppTranslation('navigation');
    return (
        <Fade in={!!position_top}>
            <MenuStyled.SecondMenuContainer
                style={{
                    top     : position_top,
                    overflow: 'hidden'
                }}
            >
                <MenuStyled.SecondMenu>
                    <SubMenuCompanies
                        companyId={id}
                        companies={companies}
                        onChangeCompany={onChangeCompany}
                    />

                    <Divider sx={{ margin: 0, width: '100%' }} />

                    <MenuStyled.AddNewCompanyWrapper>
                        <MenuStyled.AddNewCompany
                            variant="outlined"
                            onClick={onCreateCompany}
                            startIcon={<AddIcon />}
                        >
                            {t('header_menu.sub_menu.buttons.create_new_organization')}
                        </MenuStyled.AddNewCompany>
                    </MenuStyled.AddNewCompanyWrapper>
                </MenuStyled.SecondMenu>
            </MenuStyled.SecondMenuContainer>
        </Fade>
    );
}
