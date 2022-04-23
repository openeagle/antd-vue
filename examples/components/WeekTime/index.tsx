import { computed, defineComponent, ref } from 'vue';
import { WeekTime } from '@/index';
import weekTimeData, { splicing } from '@/components/WeekTime/weektimeData';
import { Card } from 'ant-design-vue';
export default defineComponent({
  setup() {
    const selects = ref<any>([]);
    const computedSelects = ref<any>([]);
    const copyWeekData = JSON.parse(JSON.stringify(weekTimeData));

    const handleClean = () => {
      alert('清除成功');
    };
    selects.value = weekTimeData.map((item) => {
      return {
        id: item.row,
        week: item.value,
        value: splicing(item.child),
      };
    });

    // 后台请求数据
    const requestData: { [key: string]: any } = {
      '1': ['2'],
      '2': ['1', '3', '5', '6', '7'],
      '3': ['16', '17', '18', '19', '20'],
      '5': ['1', '40', '41', '42', '43', '44', '45', '46', '47', '48'],
    };
    const computeWeekTimeData = computed(() => {
      return copyWeekData.map((item: any, index: any) => {
        const cols = requestData[(index + 1).toString()] || [];
        cols.forEach((col: any) => {
          item.child[col - 1].check = true;
        });
        return item;
      });
    });

    computedSelects.value = computeWeekTimeData.value.map((item: any) => {
      return {
        id: item.row,
        week: item.value,
        value: splicing(item.child),
      };
    });
    return () => {
      return (
        <div>
          <Card title="基本事例">
            <WeekTime
              v-model={[selects.value, 'selects']}
              onClean={handleClean}
              weekTimeData={weekTimeData}
            />
            <p>选择的值：{JSON.stringify(selects.value)}</p>
          </Card>
          <br />
          <Card title="后台请求数据绑定">
            <WeekTime
              v-model={[computedSelects.value, 'selects']}
              onClean={handleClean}
              weekTimeData={computeWeekTimeData.value}
            />
            <p>选择的值：{JSON.stringify(computedSelects.value)}</p>
          </Card>
        </div>
      );
    };
  },
});
