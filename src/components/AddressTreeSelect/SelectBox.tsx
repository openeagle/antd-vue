import { computed, defineComponent, onMounted, watch } from 'vue';
import { Checkbox } from 'ant-design-vue';
import { RightOutlined } from '@ant-design/icons-vue';
export default defineComponent({
  props: {
    value: {
      type: [String, Number],
    },
    data: {
      type: Array,
    },
    level: {
      type: Number,
    },
  },
  emits: ['select', 'child', 'change'],
  setup(props, { emit }) {
    const all = computed(() => {
      const len = props.data?.filter((ret: any) => ret.check).length;
      return props.data?.length === len;
    });

    const computeChild = (list: any) => {
      list.forEach((item: any) => {
        if (item.children && item.children.length) {
          const child = item.children;
          if (child.every((ret: any) => ret.check)) {
            item.check = true;
          } else {
            item.check = false;
          }
          child && computeChild(child);
        }
      });
    };

    const selectAll = () => {
      emit('select', {
        check: !all.value,
        level: props.level,
      });
      emit('change');
    };

    const onChild = (item: any, level: any) => {
      emit('child', { item, level });
    };
    const itemIndeterminate = (child: any) => {
      const hasChild = (meta: any) => {
        return meta.children.reduce((sum: any, item: any) => {
          let foundChilds = [];
          if (item.check) sum.push(item);
          if (item.children) foundChilds = hasChild(item);
          return sum.concat(foundChilds);
        }, []);
      };
      const some = hasChild(child).length > 0;
      const every =
        child.children && child.children.every((ret: any) => ret.check);
      return some && !every;
    };
    const selectItem = (item: any) => {
      emit('select', {
        check: !item.check,
        level: props.level,
        cat: item.value,
      });
      // emit('change')
    };

    watch(
      () => props.data,
      (nVal) => {
        computeChild(nVal);
      },
      {
        deep: true,
      },
    );

    onMounted(() => {
      computeChild(props.data);
    });

    return () => {
      return (
        <div class="c-select-box">
          <div class="c-check-all">
            <div class="c-item-select c-cataract" onClick={selectAll}></div>
            <Checkbox
              v-model={[all.value, 'checked']}
              class="c-check-item"
              onChange={() => {
                emit('change');
              }}
            >
              全选
            </Checkbox>
          </div>
          {props.data?.map((item: any) => {
            return (
              <div key={item.id}>
                {item.children && item.children.length ? (
                  <div
                    class={{
                      'c-check-item': true,
                      active: item.value === props.value,
                    }}
                    onClick={() => onChild(item, props.level)}
                  >
                    <Checkbox
                      // v-model={[item.check, 'checked']}
                      checked={item.check}
                      indeterminate={itemIndeterminate(item)}
                    >
                      {item.value}
                    </Checkbox>
                    <RightOutlined class="c-check-arrow" />
                    <span
                      class="c-item-checkbox c-cataract"
                      onClick={() => selectItem(item)}
                    ></span>
                  </div>
                ) : (
                  <Checkbox
                    class="c-check-item"
                    v-model={[item.check, 'checked']}
                    onChange={() => {
                      emit('change');
                    }}
                  >
                    {item.value}
                  </Checkbox>
                )}
              </div>
            );
          })}
        </div>
      );
    };
  },
});
