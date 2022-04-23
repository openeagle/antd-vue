import { computed, ref } from 'vue';
import { WeekTime } from '@/index';
import weekTimeData, { splicing } from '@/components/WeekTime/weektimeData';
import '@/components/WeekTime/style/index.less';
import mdx from './WeekTime.mdx';

export default {
  title: '组件/WeekTime',
  component: WeekTime,
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    selects: {
      type: 'array',
      required: true,
      description: '指定当前选中的条目',
    },
  },
};

export const Basic: any = (args: any) => ({
  setup() {
    const selects = ref<any>([]);
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

    return () => (
      <div>
        <WeekTime
          v-model={[selects.value, 'selects']}
          onClean={handleClean}
          weekTimeData={weekTimeData}
        />
        <p>选择的值：{JSON.stringify(selects.value)}</p>
      </div>
    );
  },
});

Basic.storyName = '基础用法';

export const Advanced: any = (args: any) => ({
  setup() {
    const handleClean = () => {
      alert('清除成功');
    };
    // 后台请求数据
    const requestData: { [key: string]: any } = {
      '1': ['2'],
      '2': ['1', '3', '5', '6', '7'],
      '3': ['16', '17', '18', '19', '20'],
      '5': ['1', '40', '41', '42', '43', '44', '45', '46', '47', '48'],
    };
    const computedSelects = ref<any>([]);
    const copyWeekData = JSON.parse(JSON.stringify(weekTimeData));
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

    return () => (
      <div>
        <WeekTime
          v-model={[computedSelects.value, 'selects']}
          onClean={handleClean}
          weekTimeData={computeWeekTimeData.value}
        />
        <p>选择的值：{JSON.stringify(computedSelects.value)}</p>
      </div>
    );
  },
});

Advanced.storyName = '高级用法';

export const weekTimeDataBase: any = (args: any) => ({
  setup() {
    return () => <div>{JSON.stringify(weekTimeData)}</div>;
  },
});

weekTimeDataBase.storyName = 'WeekTimeData 数据';
