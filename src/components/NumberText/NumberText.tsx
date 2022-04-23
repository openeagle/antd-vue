import { computed, defineComponent, PropType } from '@vue/runtime-core';
import accounting from 'accounting';

const settings: {
  [key: string]: any;
} = {
  integer: {
    symbol: '',
    decimal: '.',
    thousand: ',',
    precision: 0,
  },
  decimal: {
    symbol: '',
    decimal: '.',
    thousand: ',',
    precision: 2,
  },
  money: {
    symbol: '¥',
    format: {
      pos: '%s%v',
      neg: '-%s%v',
      zero: '%s%v',
    },
    decimal: '.',
    thousand: ',',
    precision: 2,
  },
  percent: {
    symbol: '%',
    format: '%v%s',
    decimal: '.',
    thousand: ',',
    precision: 0,
  },
};

export const AccountingProps = {
  placeholder: {
    type: String,
    default: '--',
  },
  value: [Number, String],
  type: String as PropType<'integer' | 'decimal' | 'money' | 'percent'>,
  symbol: {
    type: String,
    default: '',
  },
  format: [String, Object] as PropType<
    | string
    | {
        pos: string;
        neg: string;
        zero: string;
      }
  >,
  decimal: String, // 小数点分隔符
  thousand: String, // 千位分隔符
  precision: Number, // 小数位精度
};

export default defineComponent({
  name: 'OpeneagleAccounting',
  props: AccountingProps,
  setup(props) {
    const numberValue = computed(() => {
      let value;
      if (typeof props.value === 'number') {
        value = props.value;
      } else if (
        typeof props.value === 'string' &&
        props.value.trim().length > 0
      ) {
        value = Number(props.value);
      } else {
        value = NaN;
      }
      return value;
    });
    const formatedValue = computed(() => {
      let result;
      const value = numberValue.value;
      if (Number.isNaN(value)) {
        result = props.placeholder;
      } else {
        const formatSetting: any =
          props.type && settings[props.type] ? { ...settings[props.type] } : {};
        if (props.symbol) {
          formatSetting.symbol = props.symbol;
        }
        if (props.format) {
          formatSetting.format = props.format;
        }
        if (props.decimal) {
          formatSetting.decimal = props.decimal;
        }
        if (props.thousand) {
          formatSetting.thousand = props.thousand;
        }
        if (props.precision) {
          formatSetting.precision = props.precision;
        }
        result = accounting.formatMoney(value, formatSetting);
      }
      return result;
    });
    return () => {
      return <span>{formatedValue.value}</span>;
    };
  },
});
