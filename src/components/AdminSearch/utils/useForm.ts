import { UnwrapRef, reactive, ref, onBeforeUnmount, onMounted } from 'vue';
import moment from 'moment';
import { useRoute, useRouter } from 'vue-router';
import {
  SearchField,
  SearchFieldSerialization,
  SearchFormInstance,
  SearchFormRule,
} from '../typings';

const COMMON_SERIALIZATION: {
  [key: string]: SearchFieldSerialization;
} = {
  string: {
    parse(str?: string) {
      return typeof str === 'string' ? decodeURIComponent(str) : str;
    },
    stringify(value?: string) {
      return typeof value === 'string' ? encodeURIComponent(value) : value;
    },
  },
  number: {
    parse(str?: string) {
      const value = Number(str);
      return Number.isNaN(value) ? undefined : value;
    },
    stringify(value?: number) {
      const numberValue = Number(value);
      if (Number.isNaN(numberValue)) {
        return undefined;
      }
      return String(numberValue);
    },
  },
  time: {
    parse(str?: string) {
      const timestamp = Number(str);
      return Number.isNaN(timestamp) ? undefined : moment(timestamp);
    },
    stringify(value?: moment.Moment) {
      return value ? String(value.toDate().getTime()) : undefined;
    },
  },
  timeRange: {
    parse(str?: string) {
      if (!str) {
        return undefined;
      }
      try {
        const value = JSON.parse(decodeURIComponent(str));
        if (Array.isArray(value) && value.length >= 2) {
          const start = Number(value[0]);
          const end = Number(value[1]);
          if (!Number.isNaN(start) && !Number.isNaN(end)) {
            return [moment(start), moment(end)];
          }
        }
        return undefined;
      } catch (error) {
        return undefined;
      }
    },
    stringify(value?: moment.Moment[]) {
      return value && value[0] && value[1]
        ? encodeURIComponent(
            JSON.stringify([
              value[0].toDate().getTime(),
              value[1].toDate().getTime(),
            ]),
          )
        : undefined;
    },
  },
  object: {
    parse(str?: string) {
      if (!str) {
        return undefined;
      }
      try {
        const value = JSON.parse(decodeURIComponent(str));
        return value;
      } catch (error) {
        return undefined;
      }
    },
    stringify(value?: boolean) {
      return value ? encodeURIComponent(JSON.stringify(value)) : undefined;
    },
  },
  array: {
    parse(str?: string) {
      if (!str) {
        return undefined;
      }
      try {
        const value = JSON.parse(decodeURIComponent(str));
        return value;
      } catch (error) {
        return undefined;
      }
    },
    stringify(value?: boolean) {
      return value ? encodeURIComponent(JSON.stringify(value)) : undefined;
    },
  },
};
const CONTROL_SERIALIZATION: {
  [key: string]: SearchFieldSerialization;
} = {
  text: COMMON_SERIALIZATION.string,
  textarea: COMMON_SERIALIZATION.string,
  number: COMMON_SERIALIZATION.number,
  year: COMMON_SERIALIZATION.time,
  month: COMMON_SERIALIZATION.time,
  week: COMMON_SERIALIZATION.time,
  date: COMMON_SERIALIZATION.time,
  dateRange: COMMON_SERIALIZATION.timeRange,
  dateTime: COMMON_SERIALIZATION.time,
  dateTimeRange: COMMON_SERIALIZATION.timeRange,
  time: COMMON_SERIALIZATION.time,
  select: COMMON_SERIALIZATION.string,
};

function getInitialValue(initialValue: SearchField['initialValue']) {
  return typeof initialValue === 'function' ? initialValue() : initialValue;
}

function parseReactiveObject(data: any) {
  return JSON.parse(JSON.stringify(data));
}

function useForm<T extends object = any>(
  options:
    | {
        name: string;
        fields: SearchField[];
      }
    | SearchField[],
): SearchFormInstance<T> {
  const route = useRoute();
  const router = useRouter();

  const name = Array.isArray(options) ? 'search' : options.name;
  const fields = Array.isArray(options) ? options : options.fields;

  /**
   * ????????????
   */
  const FORM_ID = btoa(name);

  /**
   * ????????????????????????
   * @returns
   */
  const getDefaultState = (): any => {
    const defaultState: any = {};
    for (let index = 0; index < fields.length; index++) {
      const { name, initialValue } = fields[index];
      defaultState[name] = getInitialValue(initialValue);
    }
    return defaultState;
  };

  /**
   * ??????????????????
   * @param initiation ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
   * @returns
   */
  const getLatestState = (initiation = true) => {
    return fields.reduce((rcc: any, field) => {
      const { name, type } = field;
      let serialization: SearchFieldSerialization | undefined;
      if (field.serialization) {
        serialization =
          typeof field.serialization === 'string'
            ? COMMON_SERIALIZATION[field.serialization]
            : field.serialization;
      } else if (typeof type === 'string') {
        serialization = CONTROL_SERIALIZATION[type];
      }
      if (serialization) {
        const query: string | null = route.query[name] as any;
        const queryValue = serialization.parse(
          query === null ? undefined : query,
        );
        if (queryValue !== undefined) {
          rcc[name] = queryValue;
        } else if (initiation) {
          rcc[name] = getInitialValue(field.initialValue);
        }
      } else if (initiation) {
        rcc[name] = getInitialValue(field.initialValue);
      }
      return rcc;
    }, {});
  };

  const formId = ref<string>(
    String(route.query[FORM_ID]) ?? Date.now().toString(),
  );
  const state: UnwrapRef<T> = reactive(getLatestState());
  // AdminSearch ??? useForm ???????????????????????????????????????????????????????????????????????????????????????????????????????????? SearchTable ????????????????????????????????????
  const searchState = parseReactiveObject(state);

  const rules = reactive(
    fields.reduce((rules: SearchFormRule, field) => {
      if (field.rules) {
        rules[field.name] = field.rules;
      }
      return rules;
    }, {}),
  );

  const formRef = ref();
  const listeners: {
    initiate: ((form: SearchFormInstance) => void)[];
    submit: ((form: SearchFormInstance) => void)[];
    reset: ((form: SearchFormInstance) => void)[];
  } = {
    initiate: [],
    submit: [],
    reset: [],
  };
  const form: SearchFormInstance = {
    ref: formRef,
    name,
    fields,
    state,
    searchState,
    rules: rules as any,
    validate: (...args: any) => {
      return formRef.value?.validate?.(...args);
    },
    initiate: () => {
      listeners.initiate.forEach((callback) => {
        callback(form);
      });
    },
    submit: () => {
      return formRef.value
        .validate()
        .then(() => {
          // ??????????????????
          Object.assign(form, {
            searchState: parseReactiveObject(state),
          });
          formId.value = Date.now().toString();
          listeners.submit.forEach((callback) => {
            callback(form);
          });
        })
        .catch(() => {
          // ignore
        });
    },
    reset: () => {
      Object.assign(state, getDefaultState());
      Object.assign(form, {
        searchState: parseReactiveObject(state),
      });
      formId.value = Date.now().toString();
      listeners.reset.forEach((callback) => {
        callback(form);
      });
    },
    onInitiate: (callback: (form: SearchFormInstance) => void) => {
      listeners.initiate.push(callback);
    },
    onSubmit: (callback: (form: SearchFormInstance) => void) => {
      listeners.submit.push(callback);
    },
    onReset: (callback: (form: SearchFormInstance) => void) => {
      listeners.reset.push(callback);
    },
  };

  /**
   * ????????????????????????
   * @returns
   */
  const getFieldsQuery = () => {
    const result = fields.reduce((rcc: any, field) => {
      const { name, type = 'string' } = field;
      let serialization: SearchFieldSerialization | undefined;
      if (field.serialization) {
        serialization =
          typeof field.serialization === 'string'
            ? COMMON_SERIALIZATION[field.serialization]
            : field.serialization;
      } else if (typeof type === 'string') {
        serialization = CONTROL_SERIALIZATION[type];
      }
      if (serialization) {
        rcc[name] = serialization.stringify((state as any)[name]);
      }
      return rcc;
    }, {});

    result[FORM_ID] = formId.value;
    return result;
  };

  /**
   * ?????????????????????????????????????????????????????????????????????
   * @param extraParams
   */
  const syncRoute = () => {
    const query = {
      ...route.query,
      ...getFieldsQuery(),
    };
    router.replace({
      path: route.path,
      query: Object.keys(query).reduce((rcc: any, key) => {
        if (query[key] !== undefined) {
          rcc[key] = query[key];
        }
        return rcc;
      }, {}),
    });
  };

  /**
   * ???????????????????????????????????????????????????????????????????????????????????? ID ??????????????????????????????
   *
   * @param initiation ????????????????????????????????????????????????????????????????????????????????????
   */
  const syncState = (initiation: boolean) => {
    Object.assign(state, getLatestState(initiation));
    Object.assign(form, {
      searchState: parseReactiveObject(state),
    });
    formId.value = String(route.query[FORM_ID] || Date.now());
    form.initiate();
  };

  /**
   * ??????????????????????????????????????????????????????????????????????????????
   */
  const removeAfterEachRegister = router.afterEach((to) => {
    if (to.query[FORM_ID] !== formId.value) {
      // ?????? ID ????????????????????????
      const hasFieldsQuery = !!fields
        .map(({ name }) => {
          const value = to.query[name];
          if (value !== undefined && value !== null) {
            return `${name}=${value}`;
          }
          return '';
        })
        .filter((item) => item !== '')
        .join('&');
      syncState(!hasFieldsQuery);
    }
  });

  form.onSubmit(syncRoute);
  form.onReset(syncRoute);

  onMounted(() => {
    form.initiate();
  });
  onBeforeUnmount(() => {
    removeAfterEachRegister();
  });

  return form;
}

export default useForm;
