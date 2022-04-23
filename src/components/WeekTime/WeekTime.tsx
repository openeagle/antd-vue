import { PropType, computed, defineComponent, reactive, ref } from 'vue';
import { WeekData, WeekDataChild, splicing } from './weektimeData';

export interface SelectData {
  id: number | string;
  week: string;
  value: string;
}

export default defineComponent({
  name: 'OpeneagleWeekTime',
  props: {
    colspan: {
      type: Number,
      default: 2,
    },
    weekTimeData: {
      type: Array as PropType<WeekData[]>,
      required: true,
    },
    selects: {
      type: Array as PropType<SelectData[]>,
      default: [],
    },
    onClean: {
      type: Function as PropType<() => void>,
    },
  },
  setup(props, { emit }) {
    const createArr = (len: number) => {
      return Array.from(Array(len)).map((ret, id) => id);
    };
    const startStatus = reactive({
      width: 0,
      height: 0,
      left: 0,
      top: 0,
      mode: 0,
      row: 0,
      col: 0,
    });
    let mode = ref(0);
    let check = ref(false);
    const theadArr = createArr(24);
    const weektimeRefData = ref(props.weekTimeData);

    // 计算
    const styleRef = computed(() => {
      return {
        width: `${startStatus.width}px`,
        height: `${startStatus.height}px`,
        left: `${startStatus.left}px`,
        top: `${startStatus.top}px`,
      };
    });
    const selectState = computed(() => {
      return weektimeRefData.value.some((item) => item.value);
    });

    // 方法
    const handleMouseenter = (item: WeekDataChild) => {
      const ele = document.querySelector(
        `td[data-week='${item.row}'][data-time='${item.col}']`,
      ) as HTMLElement;
      if (ele && !mode.value) {
        startStatus.left = ele.offsetLeft;
        startStatus.top = ele.offsetTop;
      } else {
        if (item.col <= startStatus.col && item.row <= startStatus.row) {
          // 左上方横向拖动
          startStatus.width =
            (startStatus.col - item.col + 1) * ele.offsetWidth;
          startStatus.height =
            (startStatus.row - item.row + 1) * ele.offsetHeight;
          startStatus.left = ele.offsetLeft;
          startStatus.top = ele.offsetTop;
        } else if (item.col >= startStatus.col && item.row >= startStatus.row) {
          // 右下方
          startStatus.width =
            (item.col - startStatus.col + 1) * ele.offsetWidth;
          startStatus.height =
            (item.row - startStatus.row + 1) * ele.offsetHeight;
          // 向右横向拖动
          if (item.col > startStatus.col && item.row === startStatus.row) {
            startStatus.top = ele.offsetTop;
          }
          // 向下拖动
          if (item.col === startStatus.col && item.row > startStatus.row) {
            startStatus.left = ele.offsetLeft;
          }
        } else if (item.col > startStatus.col && item.row < startStatus.row) {
          // 右上方
          startStatus.width =
            (item.col - startStatus.col + 1) * ele.offsetWidth;
          startStatus.height =
            (startStatus.row - item.row + 1) * ele.offsetHeight;
          startStatus.top = ele.offsetTop;
        } else if (item.col < startStatus.col && item.row > startStatus.row) {
          // 左下方
          startStatus.width =
            (startStatus.col - item.col + 1) * ele.offsetWidth;
          startStatus.height =
            (item.row - startStatus.row + 1) * ele.offsetHeight;
          startStatus.left = ele.offsetLeft;
        }
      }
    };
    const handleMousedown = (item: WeekDataChild) => {
      const ele = document.querySelector(
        `td[data-week='${item.row}'][data-time='${item.col}']`,
      ) as HTMLElement;
      check.value = Boolean(item.check);
      mode.value = 1;
      if (ele) {
        startStatus.width = ele.offsetWidth;
        startStatus.height = ele.offsetHeight;
      }
      startStatus.row = item.row;
      startStatus.col = item.col;
    };
    const handleMouseup = (item: WeekDataChild) => {
      if (item.col <= startStatus.col && item.row <= startStatus.row) {
        selectWeek(
          [item.row, startStatus.row],
          [item.col, startStatus.col],
          !check.value,
        );
      } else if (item.col >= startStatus.col && item.row >= startStatus.row) {
        selectWeek(
          [startStatus.row, item.row],
          [startStatus.col, item.col],
          !check.value,
        );
      } else if (item.col > startStatus.col && item.row < startStatus.row) {
        selectWeek(
          [item.row, startStatus.row],
          [startStatus.col, item.col],
          !check.value,
        );
      } else if (item.col < startStatus.col && item.row > startStatus.row) {
        selectWeek(
          [startStatus.row, item.row],
          [item.col, startStatus.col],
          !check.value,
        );
      }

      startStatus.width = 0;
      startStatus.height = 0;
      mode.value = 0;
    };

    const splicingCols = (list: WeekDataChild[]) => {
      let arr: any = [];
      list.forEach((item: WeekDataChild) => {
        if (item.check) {
          arr.push(item.col);
        }
      });

      return arr;
    };

    const selectWeek = (
      row: [number, number],
      col: [number, number],
      check: boolean,
    ) => {
      const [minRow, maxRow] = row;
      const [minCol, maxCol] = col;
      weektimeRefData.value.forEach((item: WeekData) => {
        item.child.forEach((t) => {
          if (
            t.row >= minRow &&
            t.row <= maxRow &&
            t.col >= minCol &&
            t.col <= maxCol
          ) {
            t.check = check;
          }
        });
      });
      const updateSelects = weektimeRefData.value.map((item) => {
        return {
          id: item.row,
          week: item.value,
          value: splicing(item.child),
          row: item.row,
          cols: splicingCols(item.child),
        };
      });
      emit('update:selects', updateSelects);
    };
    const selectClasses = (item: WeekDataChild) => {
      return item.check ? 'ui-selected' : '';
    };
    const handleClean = () => {
      weektimeRefData.value.forEach((item) => {
        item.child.forEach((t) => {
          t.check = false;
        });
      });
      emit('update:selects', []);
      if (props.onClean) {
        props.onClean();
      }
    };
    return () => {
      const { colspan } = props;
      return (
        <div class="openeagle-ant-weektime">
          <div class="openeagle-ant-weektime-schedue"></div>
          <div
            class={{
              'openeagle-ant-weektime-schedue': true,
              'openeagle-ant-weektime-schedue-notransi': mode.value,
            }}
            style={styleRef.value}
          ></div>
          <table
            class={{
              'openeagle-ant-weektime-table': true,
              'openeagle-ant-weektime-min-table': colspan < 2,
            }}
          >
            <thead class="openeagle-ant-weektime-table-head">
              <tr>
                <th rowspan={8} class="week-td">
                  星期/时间
                </th>
                <th colspan={12 * colspan}>00:00 - 12:00</th>
                <th colspan={12 * colspan}>12:00 - 24:00</th>
              </tr>
              <tr>
                {theadArr.map((t) => {
                  return (
                    <td key={t} colspan={colspan}>
                      {t}
                    </td>
                  );
                })}
              </tr>
            </thead>
            <tbody class="openeagle-ant-weektime-table-body">
              {weektimeRefData.value.map((item: WeekData) => {
                return (
                  <tr key={item.row}>
                    <td>{item.value}</td>
                    {item.child.map((childItem: WeekDataChild) => {
                      return (
                        <td
                          class={[
                            'weektime-atom-item',
                            selectClasses(childItem),
                          ]}
                          key={`${childItem.row}-${childItem.col}`}
                          data-week={childItem.row}
                          data-time={childItem.col}
                          onMouseenter={() => {
                            handleMouseenter(childItem);
                          }}
                          onMousedown={() => {
                            handleMousedown(childItem);
                          }}
                          onMouseup={() => {
                            handleMouseup(childItem);
                          }}
                        ></td>
                      );
                    })}
                  </tr>
                );
              })}
              <tr>
                <td colspan={49} class="openeagle-ant-weektime-table-preview">
                  <div class="g-clearfix c-weektime-con">
                    <span class="g-pull-left">
                      {selectState.value
                        ? '已选择时间段'
                        : '可拖动鼠标选择时间段'}
                    </span>
                    <span class="g-pull-right" onClick={handleClean}>
                      清空选择
                    </span>
                  </div>
                  {selectState.value && (
                    <div class="c-weektime-time">
                      {props.selects.map((item) => {
                        if (item.value) {
                          return (
                            <p>
                              <span class="g-tip-text">{item.week}：</span>
                              <span>{item.value}</span>
                            </p>
                          );
                        }
                      })}
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    };
  },
});
