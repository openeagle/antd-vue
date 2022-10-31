import { computed, defineComponent, nextTick, onMounted, reactive, ref, toRefs, unref, watch } from 'vue';
import type { CSSProperties, Ref } from 'vue';
import { Recordable, Nullable } from './typings';
import type { AdvanceState } from './types/hooks';
import type { FormActionType, FormProps, FormSchema } from './types/form';
import dayjs from 'dayjs'
import { Form, Row } from 'ant-design-vue';
import { dateItemType } from './helper';
import { dateUtil } from '../../utils/dateUtil';
import useAdvanced from './hooks/useAdvanced';
import { useFormValues } from './hooks/useFormValues';
import { useAutoFocus } from './hooks/useAutoFocus';
import { useFormEvents } from './hooks/useFormEvents';
import { createFormContext } from './hooks/useFormContext';
import { deepMerge } from '../../utils';
import { basicProps } from './props';
import FormItem from './components/FormItem';
import FormAction from './components/FormAction';

export default defineComponent({
  name: 'OpeneagleBaseForm',
  props: basicProps,
  emits: ['advanced-change', 'reset', 'submit', 'register'],
  setup(props, { emit, slots, attrs }) {
    const formModel = reactive<Recordable>({});
    // const modalFn = useModalContext();

    const advanceState = reactive<AdvanceState>({
      isAdvanced: true,
      hideAdvanceBtn: false,
      isLoad: false,
      actionSpan: 6,
    });

    const defaultValueRef = ref<Recordable>({});
    const isInitedDefaultRef = ref(false);
    const propsRef = ref<Partial<FormProps>>({});
    const schemaRef = ref<Nullable<FormSchema[]>>(null);
    const formElRef = ref<Nullable<FormActionType>>(null);
    
    // Get the basic configuration of the form
    const getProps = computed(
      (): FormProps => {
        return Object.assign(props, propsRef.value) as any
      }
    );
    const getFormClass = computed(() => {
      return [
        'openeagle-ant',
        {
          [`openeagle-ant--compact`]: unref(getProps).compact,
        },
      ];
    });
    // Get uniform row style
    const getRowWrapStyle = computed(
      (): CSSProperties => {
        const { baseRowStyle = {} } = unref(getProps);
        return baseRowStyle;
      }
    );

    const getSchema = computed((): FormSchema[] => {
      const schemas: FormSchema[] = unref(schemaRef) || (unref(getProps).schemas as any);
      for (const schema of schemas) {
        const { defaultValue, component } = schema;
        // handle date type
        if (defaultValue && dateItemType.includes(component)) {
          if (!Array.isArray(defaultValue)) {
            schema.defaultValue = dateUtil(defaultValue);
          } else {
            const def: dayjs.Dayjs[] = [];
            defaultValue.forEach((item) => {
              def.push(dateUtil(item));
            });
            schema.defaultValue = def;
          }
        }
      }
      return schemas as FormSchema[];
    });

    
    const { handleToggleAdvanced } = useAdvanced({
      advanceState,
      emit,
      getProps,
      getSchema,
      formModel,
      defaultValueRef,
    });

    const { transformDateFunc, fieldMapToTime, autoFocusFirstItem } = toRefs(props);

    const { handleFormValues, initDefault } = useFormValues({
      transformDateFuncRef: transformDateFunc,
      fieldMapToTimeRef: fieldMapToTime,
      defaultValueRef,
      getSchema,
      formModel,
    });

    
    useAutoFocus({
      getSchema,
      autoFocusFirstItem,
      isInitedDefault: isInitedDefaultRef,
      formElRef: formElRef as Ref<FormActionType>,
    });

    const {
      handleSubmit,
      setFieldsValue,
      clearValidate,
      validate,
      validateFields,
      getFieldsValue,
      updateSchema,
      appendSchemaByField,
      removeSchemaByFiled,
      resetFields,
      scrollToField,
    } = useFormEvents({
      emit,
      getProps,
      formModel,
      getSchema,
      defaultValueRef,
      formElRef: formElRef as Ref<FormActionType>,
      schemaRef: schemaRef as Ref<FormSchema[]>,
      handleFormValues,
    });

    
    createFormContext({
      resetAction: resetFields,
      submitAction: handleSubmit,
    });

    watch(
      () => unref(getProps).model,
      () => {
        const { model } = unref(getProps);
        if (!model) return;
        setFieldsValue(model);
      },
      {
        immediate: true,
      }
    );

    watch(
      () => getSchema.value,
      (schema) => {
        nextTick(() => {
          //  Solve the problem of modal adaptive height calculation when the form is placed in the modal
          // modalFn?.redoModalHeight?.();
        });
        if (unref(isInitedDefaultRef)) {
          return;
        }
        if (schema?.length) {
          initDefault();
          isInitedDefaultRef.value = true;
        }
      }
    );

    async function setProps(formProps: Partial<FormProps>): Promise<void> {
      propsRef.value = deepMerge(unref(propsRef) || {}, formProps);
    }

    function setFormModel(key: string, value: any) {
      formModel[key] = value;
    }


    const formActionType: Partial<FormActionType> = {
      getFieldsValue,
      setFieldsValue,
      resetFields,
      updateSchema,
      setProps,
      removeSchemaByFiled,
      appendSchemaByField,
      clearValidate,
      validateFields,
      validate,
      submit: handleSubmit,
      scrollToField: scrollToField,
    };


    onMounted(() => {
      initDefault();
      emit('register', formActionType);
    });
    
    // const slotsMap = computed(() => {
    //   const obj: Recordable = {}
    //   Object.keys(slots).forEach((key: string) => {
    //     obj[key] = (data: any) => <slot name={key} {...data}></slot>
    //   })
    // })
    // const slotsActionMap = computed(() => {
    //   const obj: Recordable = {} as any;
    //   ['resetBefore', 'submitBefore', 'advanceBefore', 'advanceAfter'].forEach((key: string) => {
    //     obj[key] = (data: any) => <slot name={key} {...data}></slot>
    //   })
    // })

    return () => {
      return <Form {...attrs} {...(props as any)} ref={formElRef} class={getFormClass} model={formModel}>
        <Row style={getRowWrapStyle.value}>
          <slot name="formHeader"></slot>
          {
            getSchema.value.map(schema =>{
              return <FormItem
                formActionType={formActionType as any}
                schema={schema}
                formProps={getProps.value}
                allDefaultValues={defaultValueRef}
                formModel={formModel}
                setFormModel={setFormModel}
              >
                <div v-slots={slots}></div>
              </FormItem>
            })
          }
          <FormAction
            { ...getProps} {...advanceState} 
            toggle-advanced={handleToggleAdvanced}>
            <div v-slots={slots}></div>
          </FormAction>
          <slot name="formFooter"></slot>

        </Row>
      </Form>;
    };
  },
});
