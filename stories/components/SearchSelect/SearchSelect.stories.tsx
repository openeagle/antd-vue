import { reactive, ref } from 'vue';
import { SearchSelect, createRequest } from '@/index';
import { FieldNames } from '@/components/SearchSelect';
import mdx from './SearchSelect.mdx';

const request = createRequest({
  baseURL: 'https://run.mocky.io/v3',
});

const fieldNames: FieldNames = {
  label: 'name',
  value: 'id',
};

const loadDataSource = (keyword: string) => {
  return request({ url: '/bc33002d-c8e1-4a2e-95cf-ea0239010407' }).then(
    (data) => {
      return data.map((item: any) => ({
        name: `${keyword} - ${item.name}`,
        id: `${keyword}-${item.id}`,
      }));
    },
  );
};

export default {
  title: '组件/SearchSelect',
  component: SearchSelect,
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      page: mdx,
    },
  },
};

export const API: any = (args: any, { argTypes }: any) => ({
  setup() {
    return () => {
      return <div></div>;
    };
  },
});

API.parameters = {
  controls: {
    disabled: true,
  },
};


export const Basic: any = (args: any) => ({
  setup() {
    const state = reactive({
      default: undefined,
      multiple: undefined,
      tags: undefined,
      preset: {
        id: 1,
        name: 'a',
      },
    });
    return () => (
      <div>
        <SearchSelect
          allowClear
          dataSource={loadDataSource}
          fieldNames={fieldNames}
          style="width: 200px"
          placeholder="输入过滤条件后选择数据"
          v-model={[state.default, 'value']}
        />
        <span> = {JSON.stringify(state.default)}</span>
      </div>
    );
  },
});

Basic.storyName = '基础用法';

export const multiple: any = (args: any) => ({
  setup() {
    const state = reactive({
      default: undefined,
      multiple: undefined,
      tags: undefined,
      preset: {
        id: 1,
        name: 'a',
      },
    });
    return () => (
      <div>
        <SearchSelect
          allowClear
          mode="multiple"
          dataSource={loadDataSource}
          fieldNames={fieldNames}
          style="width: 200px"
          placeholder="输入过滤条件后选择数据"
          v-model={[state.multiple, 'value']}
        />
        <span> = {JSON.stringify(state.multiple)}</span>
      </div>
    );
  },
});

multiple.storyName = '多选';

export const separators: any = (args: any) => ({
  setup() {
    const state = reactive({
      default: undefined,
      multiple: undefined,
      tags: undefined,
      preset: {
        id: 1,
        name: 'a',
      },
    });
    return () => (
      <div>
        <SearchSelect
          allowClear
          mode="tags"
          dataSource={loadDataSource}
          fieldNames={fieldNames}
          tokenSeparators={[',']}
          style="width: 200px"
          placeholder="输入过滤条件后选择数据"
          v-model={[state.multiple, 'value']}
        />
        <span> = {JSON.stringify(state.multiple)}</span>
      </div>
    );
  },
});

separators.storyName = '自动分词';

export const preset: any = (args: any) => ({
  setup() {
    const state = reactive({
      default: undefined,
      multiple: undefined,
      tags: undefined,
      preset: {
        id: 1,
        name: 'a',
      },
    });
    return () => (
      <div>
        <SearchSelect
          allowClear
          dataSource={loadDataSource}
          fieldNames={fieldNames}
          style="width: 200px"
          v-model={[state.preset, 'value']}
        />
        <span> = {JSON.stringify(state.preset)}</span>
      </div>
    );
  },
});

preset.storyName = '预设(preset)';

export const extras: any = (args: any) => ({
  setup() {
    const state = reactive({
      default: undefined,
      multiple: undefined,
      tags: undefined,
      preset: {
        id: 1,
        name: 'a',
      },
    });
    return () => (
      <div>
        <SearchSelect
          allowClear
          dataSource={loadDataSource}
          fieldNames={fieldNames}
          style="width: 200px"
          v-model={[state.preset, 'value']}
          extras={[{ name: '全部', id: '-4' }]}
        />
        <span> = {JSON.stringify(state.preset)}</span>
      </div>
    );
  },
});
extras.storyName = '额外选项';