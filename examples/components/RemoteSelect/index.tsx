import { computed, defineComponent, reactive, ref, unref } from 'vue';
import { Card } from 'ant-design-vue';
import { AdminLayout, RemoteSelect, createRequest } from '@/index';
import { FieldNames } from '@/components/RemoteSelect';

const request = createRequest({
  baseURL: 'https://run.mocky.io/v3',
});

const loadDataSource = () => {
  return request({ url: '/bc33002d-c8e1-4a2e-95cf-ea0239010407' });
};
const loadFailureDataSource = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 3000);
  }).then(() => request({ url: '/472d2fa0-c2e1-469e-9cc2-1ffdfd6cea0c' }));
};
const loadCacheableDataSource = () => {
  console.log(1111111);
  return request({ url: '/bc33002d-c8e1-4a2e-95cf-ea0239010407?cache' });
};
const loadLongDataSource = () => {
  return request({ url: '/0c036100-431a-4540-8430-b93d7b246211' });
};
const fieldNames: FieldNames = {
  label: 'name',
  value: 'id',
};
const fieldNamesWithTitle: FieldNames = {
  label: 'name',
  title: (item: any) => `${item.id}: ${item.name}`,
  value: 'id',
};

export default defineComponent({
  setup() {
    const state = reactive({
      default: undefined,
      labelInValue: undefined,
    });
    const requestStatus = ref(false);

    const asyncDataSource = computed(() => {
      if (unref(requestStatus)) {
        return () => loadDataSource();
      }
      return () => Promise.resolve([]);
    });

    setTimeout(() => {
      requestStatus.value = true;
    }, 5000);

    return () => {
      return (
        <AdminLayout.PageContainer>
          <Card title="default">
            <RemoteSelect
              dataSource={loadDataSource}
              fieldNames={fieldNames}
              style="width: 200px"
              v-model={[state.default, 'value']}
            />
            <span> = {state.default}</span>
          </Card>
          <Card title="labelInValue">
            <RemoteSelect
              dataSource={loadDataSource}
              fieldNames={fieldNames}
              labelInValue
              style="width: 200px"
              v-model={[state.labelInValue, 'value']}
            />
            <span> = {JSON.stringify(state.labelInValue)}</span>
          </Card>
          <Card title="failure11">
            <RemoteSelect
              dataSource={loadFailureDataSource}
              fieldNames={fieldNames}
              style="width: 200px"
              showSearch
            />
          </Card>
          <Card title="cacheable">
            <RemoteSelect
              cacheable
              dataSource={loadCacheableDataSource}
              fieldNames={fieldNames}
              style="width: 200px"
            />
            <RemoteSelect
              cacheable
              dataSource={loadCacheableDataSource}
              fieldNames={fieldNames}
              style="width: 200px"
            />
            <RemoteSelect
              cacheable
              dataSource={loadCacheableDataSource}
              fieldNames={fieldNames}
              style="width: 200px"
            />
          </Card>
          <Card title="allowClear">
            <RemoteSelect
              allowClear
              cacheable
              dataSource={loadCacheableDataSource}
              fieldNames={fieldNames}
              style="width: 200px"
              v-model={[state.default, 'value']}
            />
            <span> = {state.default}</span>
          </Card>
          <Card title="defaultActiveFirstOption">
            <div>
              <span>default：</span>
              <RemoteSelect
                cacheable
                dataSource={loadCacheableDataSource}
                fieldNames={fieldNames}
                style="width: 200px"
              />
            </div>
            <div>
              <span>true：</span>
              <RemoteSelect
                cacheable
                defaultActiveFirstOption
                dataSource={loadCacheableDataSource}
                fieldNames={fieldNames}
                style="width: 200px"
              />
            </div>
            <div>
              <span>false：</span>
              <RemoteSelect
                cacheable
                defaultActiveFirstOption={false}
                dataSource={loadCacheableDataSource}
                fieldNames={fieldNames}
                style="width: 200px"
              />
            </div>
          </Card>
          <Card title="dropdownMatchSelectWidth">
            <div>
              <span>default：</span>
              <RemoteSelect
                cacheable
                dataSource={loadLongDataSource}
                fieldNames={fieldNames}
                style="width: 200px"
              />
            </div>
            <div>
              <span>true：</span>
              <RemoteSelect
                cacheable
                dropdownMatchSelectWidth
                dataSource={loadLongDataSource}
                fieldNames={fieldNames}
                style="width: 200px"
              />
            </div>
            <div>
              <span>false：</span>
              <RemoteSelect
                cacheable
                dropdownMatchSelectWidth={false}
                dataSource={loadLongDataSource}
                fieldNames={fieldNames}
                style="width: 200px"
              />
            </div>
            <div>
              <span>true with title：</span>
              <RemoteSelect
                cacheable
                dropdownMatchSelectWidth
                dataSource={loadLongDataSource}
                fieldNames={fieldNamesWithTitle}
                style="width: 200px"
              />
            </div>
          </Card>
          <Card title="optionFilterProp">
            <div>
              <span>default：</span>
              <RemoteSelect
                cacheable
                dataSource={loadCacheableDataSource}
                fieldNames={fieldNames}
                showSearch
                style="width: 200px"
              />
            </div>
            <div>
              <span>label：</span>
              <RemoteSelect
                cacheable
                dataSource={loadCacheableDataSource}
                fieldNames={fieldNames}
                optionFilterProp="label"
                showSearch
                style="width: 200px"
              />
            </div>
            <div>
              <span>title：</span>
              <RemoteSelect
                cacheable
                dataSource={loadCacheableDataSource}
                fieldNames={fieldNamesWithTitle}
                optionFilterProp="title"
                showSearch
                style="width: 200px"
              />
            </div>
          </Card>
          <Card title="optionLabelProp">
            <div>
              <span>default：</span>
              <RemoteSelect
                cacheable
                dataSource={loadCacheableDataSource}
                fieldNames={fieldNames}
                style="width: 200px"
              />
            </div>
            <div>
              <span>label：</span>
              <RemoteSelect
                cacheable
                dataSource={loadCacheableDataSource}
                fieldNames={fieldNames}
                optionLabelProp="label"
                style="width: 200px"
              />
            </div>
            <div>
              <span>value：</span>
              <RemoteSelect
                cacheable
                dataSource={loadCacheableDataSource}
                fieldNames={fieldNames}
                optionLabelProp="value"
                style="width: 200px"
              />
            </div>
            <div>
              <span>title：</span>
              <RemoteSelect
                cacheable
                dataSource={loadCacheableDataSource}
                fieldNames={fieldNamesWithTitle}
                optionLabelProp="title"
                style="width: 200px"
              />
            </div>
          </Card>
          <Card title="异步的dataSource">
            <RemoteSelect
              cacheable
              dataSource={unref(asyncDataSource)}
              fieldNames={fieldNames}
              optionLabelProp="value"
              style="width: 200px"
            />
          </Card>
        </AdminLayout.PageContainer>
      );
    };
  },
});
