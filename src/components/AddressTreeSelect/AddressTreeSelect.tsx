import {
  PropType,
  defineComponent,
  ref,
  watch,
  computed,
  toRaw,
  onMounted,
} from 'vue';
import { Row, Col, Tag, Empty, Spin } from 'ant-design-vue';
import SelectItem from './SelectItem';
import SelectBox from './SelectBox';

const getNameOfData = (list: any, value: any) => {
  let i = -1;
  let len = list.length;
  let homeItem = {};
  while (++i < len) {
    let item = list[i];

    if (item.value === value) {
      homeItem = item;
      break;
    } else if (item.children && item.children.length) {
      let res: any = getNameOfData(item.children, value);
      if (res.value) return res;
    }
  }
  return homeItem;
};

const setAllChecked = (data: any, check: any) => {
  data.forEach((ret: any) => {
    if (ret.children && ret.children.length) {
      setAllChecked(ret.children, check);
    }
    ret.check = check;
  });
};

const defaultFieldNames = { id: 'id', value: 'value', children: 'children' };
export default defineComponent({
  name: 'OpeneagleAddressTreeSelect',
  props: {
    selects: Array,
    selectNames: Array,
    value: Array,
    title: Array,
    data: {
      type: Array,
      required: true,
    },
    loading: Boolean,
    fieldNames: {
      type: Object,
      default: () => defaultFieldNames,
    },
  },
  emits: ['select', 'clear', 'delete', 'update:selects', 'update:selectNames'],
  setup(props, { emit }) {
    const resource = ref<any>([]);
    const updateResult = ref<any>([]);
    const updateResultNames = ref<any>([]);
    const result = ref<any>([]);
    const canUpdate = ref(true);

    const updateResource = () => {
      if (props.data.length <= 0) return;
      resource.value = [];
      resource.value.push({
        data: initData(toRaw(props.data)),
        current: '',
        level: 1,
        title: props.title?.[0],
      });
    };

    const col = computed(() => {
      return resource.value.length > 1 ? 24 / resource.value.length : 12;
    });

    const initData = (data: any, parent?: any) => {
      const resultData: any = [];
      data.forEach((item: any) => {
        const json: any = {};
        json['id'] = item[props.fieldNames.id || defaultFieldNames.id];
        json['value'] = item[props.fieldNames.value || defaultFieldNames.value];
        if (props.selects?.includes(json['id'])) {
          json['check'] = true;
          result.value.push(json);
        } else {
          json['check'] = false;
        }
        json['children'] =
          item[props.fieldNames.children || defaultFieldNames.children];
        if (json['children'] && json['children'].length) {
          json['children'].forEach((child: any) => {
            if (json['check']) {
              child['check'] = true;
            } else {
              if (props.selects?.includes(child.id)) {
                child['check'] = true;
                result.value.push(child);
              } else {
                child['check'] = false;
              }
            }
            child['id'] = child[props.fieldNames.id || defaultFieldNames.id];
            child['value'] =
              child[props.fieldNames.value || defaultFieldNames.value];
          });
        }
        resultData.push(json);
      });
      return resultData;
    };

    const computeCol = () => {
      if (resource.value.length > 1) {
        return 12;
      } else {
        return 24;
      }
    };

    const pushChild = (params: any) => {
      const { item, level } = params;
      const len = resource.value.length;
      if (level <= len - 1) {
        resource.value.splice(level, len - level);
      }
      resource.value.push({
        data: item.children,
        current: '',
        level: level + 1,
        title: props.title?.[level] || item.title,
      });
      resource.value[level - 1].current = item.value;
    };

    const selectAll = ({
      level,
      check,
      cat,
    }: {
      level: any;
      check: any;
      cat: any;
    }) => {
      const index = level - 2;
      let current = index > -1 ? resource.value[index].current : '';
      cat && (current = cat);

      if (current) {
        const item = getNameOfData(resource.value[0].data, current);
        item.check = check;
        setAllChecked(item.children, check);
      } else {
        setAllChecked(resource.value[0].data, check);
      }
      selectChange();
    };

    watch(
      () => props.data,
      (nVal) => {
        if (nVal) {
          updateResource();
        } else {
          resource.value = [];
        }
      },
      {
        deep: true,
      },
    );

    watch(
      () => props.selects,
      () => {
        canUpdate.value && updateResource();
      },
    );

    const resetSelectAll = ({
      check = true,
      current = '',
    }: {
      check: any;
      current: any;
    }) => {
      if (current) {
        const item = getNameOfData(resource.value[0].data, current);
        item.check = check;
        setAllChecked(item.children, check);
      } else {
        setAllChecked(resource.value[0].data, check);
      }
    };

    const handleClose = (name: string) => {
      emit('delete', { list: props.data, name });
      if (resource.value[0].data) {
        const data = getNameOfData(resource.value[0].data, name);
        if (data.children && data.children.length) {
          resetSelectAll({ check: false, current: data.value });
        } else {
          data.check = false;
        }
      }
      selectChange();
    };

    const selectChange = () => {
      result.value = [];
      updateResult.value = [];
      updateResultNames.value = [];
      if (resource.value[0]) {
        resource.value[0].data.forEach((item: any) => {
          if (item.check) {
            updateResult.value.push(item.id);
            updateResultNames.value.push(item.value);
            result.value.push(item);
          } else if (item.children && item.children.length > 0) {
            item.children.forEach((child: any) => {
              if (child.check) {
                updateResult.value.push(child.id);
                updateResultNames.value.push(child.value);
                result.value.push(child);
              }
            });
          }
        });
      }
      canUpdate.value = false;
      emit('update:selects', updateResult.value);
      emit('update:selectNames', updateResultNames.value);
    };

    const clearTagOfData = (list: any) => {
      let i = -1;
      let len = list.length;
      while (++i < len) {
        let item = list[i];
        if (item.children && item.children.length) {
          clearTagOfData(item.children);
        }
        item.check = false;
      }
    };

    const handleOnClear = () => {
      if (resource.value[0].data) {
        clearTagOfData(resource.value[0].data);
      }
      selectChange();
    };

    onMounted(() => {
      updateResource();
    });

    return () => {
      return (
        <div class="openeagle-ant-address-tree-select">
          <Spin spinning={props.loading}>
            <Row gutter={12}>
              <Col span={16}>
                <Row>
                  {resource.value.map((box: any, idx: number) => {
                    return (
                      <Col span={computeCol()} key={box.level}>
                        <SelectItem title={box.title}>
                          {{
                            default: () => (
                              <SelectBox
                                key={box.level}
                                value={box.current}
                                data={box.data}
                                level={box.level}
                                onChild={pushChild}
                                onSelect={selectAll}
                                onChange={() => {
                                  setTimeout(() => {
                                    selectChange();
                                  });
                                }}
                              />
                            ),
                          }}
                        </SelectItem>
                      </Col>
                    );
                  })}
                </Row>
              </Col>
              <Col span={7} offset={1}>
                <SelectItem title="已选" clear onClear={handleOnClear}>
                  {result.value.length > 0 ? (
                    result.value?.map((item: any) => {
                      return (
                        <div class="c-pop-tip" key={item.id}>
                          <Tag
                            class="c-tag-item"
                            closable
                            onClose={() => {
                              handleClose(item.value);
                            }}
                          >
                            {item.value}
                          </Tag>
                        </div>
                      );
                    })
                  ) : (
                    <div class="c-item-empty">
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="暂无数据"
                      />
                    </div>
                  )}
                </SelectItem>
              </Col>
            </Row>
          </Spin>
        </div>
      );
    };
  },
});
