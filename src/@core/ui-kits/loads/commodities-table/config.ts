import { CommodityModel_PackagingUnit } from '@proto/models/model_commodity';
import type { IntlMessageKey } from '@/@types/next-intl';
import { MeasurementUnit } from '@proto/models/measurement_unit';
import { WeightUnit } from '@proto/models/weight_unit';

export const COMMODITY_PACKAGE_UNIT: Record<CommodityModel_PackagingUnit, IntlMessageKey> = {
    [CommodityModel_PackagingUnit.UNSPECIFIED]: 'common:packaging_unit.UNSPECIFIED',
    [CommodityModel_PackagingUnit.BAG]        : 'common:packaging_unit.BAG',
    [CommodityModel_PackagingUnit.BLE]        : 'common:packaging_unit.BLE',
    [CommodityModel_PackagingUnit.BBL]        : 'common:packaging_unit.BBL',
    [CommodityModel_PackagingUnit.BSK]        : 'common:packaging_unit.BSK',
    [CommodityModel_PackagingUnit.BIN]        : 'common:packaging_unit.BIN',
    [CommodityModel_PackagingUnit.BIC]        : 'common:packaging_unit.BIC',
    [CommodityModel_PackagingUnit.BOX]        : 'common:packaging_unit.BOX',
    [CommodityModel_PackagingUnit.BKT]        : 'common:packaging_unit.BKT',
    [CommodityModel_PackagingUnit.BDL]        : 'common:packaging_unit.BDL',
    [CommodityModel_PackagingUnit.CAN]        : 'common:packaging_unit.CAN',
    [CommodityModel_PackagingUnit.CCS]        : 'common:packaging_unit.CCS',
    [CommodityModel_PackagingUnit.CBY]        : 'common:packaging_unit.CBY',
    [CommodityModel_PackagingUnit.CAR]        : 'common:packaging_unit.CAR',
    [CommodityModel_PackagingUnit.CTN]        : 'common:packaging_unit.CTN',
    [CommodityModel_PackagingUnit.CAS]        : 'common:packaging_unit.CAS',
    [CommodityModel_PackagingUnit.CSK]        : 'common:packaging_unit.CSK',
    [CommodityModel_PackagingUnit.CHS]        : 'common:packaging_unit.CHS',
    [CommodityModel_PackagingUnit.COL]        : 'common:packaging_unit.COL',
    [CommodityModel_PackagingUnit.CBC]        : 'common:packaging_unit.CBC',
    [CommodityModel_PackagingUnit.COR]        : 'common:packaging_unit.COR',
    [CommodityModel_PackagingUnit.CRT]        : 'common:packaging_unit.CRT',
    [CommodityModel_PackagingUnit.CYL]        : 'common:packaging_unit.CYL',
    [CommodityModel_PackagingUnit.DRM]        : 'common:packaging_unit.DRM',
    [CommodityModel_PackagingUnit.DBK]        : 'common:packaging_unit.DBK',
    [CommodityModel_PackagingUnit.GAL]        : 'common:packaging_unit.GAL',
    [CommodityModel_PackagingUnit.HMP]        : 'common:packaging_unit.HMP',
    [CommodityModel_PackagingUnit.HED]        : 'common:packaging_unit.HED',
    [CommodityModel_PackagingUnit.KEG]        : 'common:packaging_unit.KEG',
    [CommodityModel_PackagingUnit.LVN]        : 'common:packaging_unit.LVN',
    [CommodityModel_PackagingUnit.LBK]        : 'common:packaging_unit.LBK',
    [CommodityModel_PackagingUnit.LOG]        : 'common:packaging_unit.LOG',
    [CommodityModel_PackagingUnit.LUG]        : 'common:packaging_unit.LUG',
    [CommodityModel_PackagingUnit.PKG]        : 'common:packaging_unit.PKG',
    [CommodityModel_PackagingUnit.PAL]        : 'common:packaging_unit.PAL',
    [CommodityModel_PackagingUnit.PLT]        : 'common:packaging_unit.PLT',
    [CommodityModel_PackagingUnit.PCL]        : 'common:packaging_unit.PCL',
    [CommodityModel_PackagingUnit.PCS]        : 'common:packaging_unit.PCS',
    [CommodityModel_PackagingUnit.POV]        : 'common:packaging_unit.POV',
    [CommodityModel_PackagingUnit.QTR]        : 'common:packaging_unit.QTR',
    [CommodityModel_PackagingUnit.REL]        : 'common:packaging_unit.REL',
    [CommodityModel_PackagingUnit.ROL]        : 'common:packaging_unit.ROL',
    [CommodityModel_PackagingUnit.SAK]        : 'common:packaging_unit.SAK',
    [CommodityModel_PackagingUnit.SHT]        : 'common:packaging_unit.SHT',
    [CommodityModel_PackagingUnit.SID]        : 'common:packaging_unit.SID',
    [CommodityModel_PackagingUnit.SKD]        : 'common:packaging_unit.SKD',
    [CommodityModel_PackagingUnit.TNK]        : 'common:packaging_unit.TNK',
    [CommodityModel_PackagingUnit.TIN]        : 'common:packaging_unit.TIN',
    [CommodityModel_PackagingUnit.TBN]        : 'common:packaging_unit.TBN',
    [CommodityModel_PackagingUnit.TBE]        : 'common:packaging_unit.TBE',
    [CommodityModel_PackagingUnit.UNT]        : 'common:packaging_unit.UNT',
    [CommodityModel_PackagingUnit.VPK]        : 'common:packaging_unit.VPK',
    [CommodityModel_PackagingUnit.VEH]        : 'common:packaging_unit.VEH',
    [CommodityModel_PackagingUnit.WDC]        : 'common:packaging_unit.WDC'
} as const;

export const COMMODITY_MEASUREMENT_UNIT: Record<MeasurementUnit, IntlMessageKey> = {
    [MeasurementUnit.INCH]       : 'common:units.measurement.inch',
    [MeasurementUnit.CENTIMETER] : 'common:units.measurement.centimeter',
    [MeasurementUnit.UNSPECIFIED]: 'common:unspecified'
} as const;

export const COMMODITY_MEASUREMENT_SHORT_NAME: Record<MeasurementUnit, IntlMessageKey> = {
    [MeasurementUnit.INCH]                    : 'common:units.measurement.in',
    [MeasurementUnit.CENTIMETER]              : 'common:units.measurement.cm',
    [CommodityModel_PackagingUnit.UNSPECIFIED]: 'common:unspecified'
};

export const COMMODITY_WEIGHT_UNIT: Record<WeightUnit, IntlMessageKey> = {
    [WeightUnit.UNSPECIFIED]: 'common:unspecified',
    [WeightUnit.KG]         : 'common:units.weight.kg',
    [WeightUnit.LB]         : 'common:units.weight.lb'
};
