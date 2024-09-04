import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useAppSelector } from '@/store/hooks';
import type { IntlMessageKey } from '@/@types/next-intl';
import { Container, Label, Separator, Step, Wrap } from './styled';

const STEPS: IntlMessageKey[] = [
    'core:import.steps.upload',
    'core:import.steps.extract',
    'core:import.steps.import'
];

export default function Stepper() {
    const { t } = useAppTranslation();
    const activeStep = useAppSelector((state) => state.import.active_step);

    return (
        <Container activeStep={activeStep}>
            {STEPS.map((step, index) => {
                const isActive = index <= activeStep;
                const lastItem = index === STEPS.length - 1;
                return (
                    <Wrap
                        style={lastItem ? { flex: 0 } : {}}
                        key={step}
                    >
                        <Step isActive={isActive}>{index + 1}</Step>
                        <Label isActive={isActive}>{t(step)}</Label>
                        {!lastItem && <Separator activeStep={index < activeStep} />}
                    </Wrap>
                );
            })}
        </Container>
    );
}
