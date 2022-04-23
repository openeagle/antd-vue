import { defineComponent, reactive } from 'vue';
import { Card } from 'ant-design-vue';
import { AdminLayout, SearchSelect, createRequest } from '@/index';
import { FieldNames } from '@/components/SearchSelect';

const request = createRequest({
  baseURL: 'https://run.mocky.io/v3',
});

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
const fieldNames: FieldNames = {
  label: 'name',
  value: 'id',
};

export default defineComponent({
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
    return () => {
      return (
        <AdminLayout.PageContainer>
          <Card title="default">
            <SearchSelect
              allowClear
              dataSource={loadDataSource}
              fieldNames={fieldNames}
              style="width: 200px"
              v-model={[state.default, 'value']}
            />
            <span> = {JSON.stringify(state.default)}</span>
          </Card>
          <Card title="multiple">
            <SearchSelect
              allowClear
              mode="multiple"
              dataSource={loadDataSource}
              fieldNames={fieldNames}
              style="width: 200px"
              v-model={[state.multiple, 'value']}
            />
            <span> = {JSON.stringify(state.multiple)}</span>
          </Card>
          <Card title="tags">
            <SearchSelect
              allowClear
              mode="tags"
              dataSource={loadDataSource}
              fieldNames={fieldNames}
              style="width: 200px"
              v-model={[state.tags, 'value']}
            />
            <span> = {JSON.stringify(state.tags)}</span>
          </Card>
          <Card title="preset">
            <SearchSelect
              allowClear
              dataSource={loadDataSource}
              fieldNames={fieldNames}
              style="width: 200px"
              v-model={[state.preset, 'value']}
            />
            <span> = {JSON.stringify(state.preset)}</span>
          </Card>
        </AdminLayout.PageContainer>
      );
    };
  },
});
