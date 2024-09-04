import { calculateDriverPayItems } from '../../src/views/newLoads/utils/calcPayItems/calcPayItems';
import { RevenueTypeEnum } from '../../src/services/settlements/types/models/RevenueTypes/IRevenueTypes';

describe('calculateDriverPayItems', () => {
    it('should calculate driver pay OptionItems correctly for PER_TOTAL_MILE revenue type', () => {
        const item = {
            revenue_type_id: 1,
            id: 1,
            type: RevenueTypeEnum.PER_TOTAL_MILE,
            amount: 0.5,
            updated_at: '2022-01-01',
            created_at: '2022-01-01'
        };
        const broker_total_rate = 100;
        const empty_miles = 20;
        const loaded_miles = 80;

        const result = calculateDriverPayItems({
            item,
            broker_total_rate,
            empty_miles,
            loaded_miles
        });

        expect(result.amount_per_unit).equal(0.5);
        expect(result.units).equal(100);
        expect(result.total_amount).equal(50);
    });

    it('should calculate driver pay OptionItems correctly for PER_LOADED_MILE revenue type', () => {
        const item = {
            revenue_type_id: 2,
            id: 2,
            type: RevenueTypeEnum.PER_LOADED_MILE,
            amount: 0.8,
            updated_at: '2022-01-01',
            created_at: '2022-01-01'
        };
        const broker_total_rate = 100;
        const empty_miles = 20;
        const loaded_miles = 80;

        const result = calculateDriverPayItems({
            item,
            broker_total_rate,
            empty_miles,
            loaded_miles
        });

        expect(result.amount_per_unit).equal(0.8);
        expect(result.units).equal(80);
        expect(result.total_amount).equal(64);
    });

    it('should calculate driver pay OptionItems correctly for PER_EMPTY_MILE revenue type', () => {
        const item = {
            revenue_type_id: 3,
            id: 3,
            type: RevenueTypeEnum.PER_EMPTY_MILE,
            amount: 0.3,
            updated_at: '2022-01-01',
            created_at: '2022-01-01'
        };
        const broker_total_rate = 100;
        const empty_miles = 20;
        const loaded_miles = 80;

        const result = calculateDriverPayItems({
            item,
            broker_total_rate,
            empty_miles,
            loaded_miles
        });

        expect(result.amount_per_unit).equal(0.3);
        expect(result.units).equal(20);
        expect(result.total_amount).equal(6);
    });

    it('should calculate driver pay OptionItems correctly for PERCENTAGE_FROM_LOAD revenue type', () => {
        const item = {
            revenue_type_id: 4,
            id: 4,
            type: RevenueTypeEnum.PERCENTAGE_FROM_LOAD,
            amount: 15,
            updated_at: '2022-01-01',
            created_at: '2022-01-01'
        };
        const broker_total_rate = 2000;
        const empty_miles = 20;
        const loaded_miles = 80;

        const result = calculateDriverPayItems({
            item,
            broker_total_rate,
            empty_miles,
            loaded_miles
        });

        expect(result.amount_per_unit).equal(15);
        expect(result.units).equal(2000);
        expect(result.total_amount).equal(30000);
    });
});
