import { computed, reactive, ref, unref } from 'vue';
import { RemoteSelect, createRequest } from '@/index';
import { FieldNames } from '@/components/RemoteSelect';
import mdx from './RemoteSelect.mdx';

const request = createRequest({
  baseURL: 'https://run.mocky.io/v3',
});

const loadDataSource = () => {
  return request({ url: '/bc33002d-c8e1-4a2e-95cf-ea0239010407' });
};

const loadCacheableDataSource = () => {
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

export default {
  title: '组件/RemoteSelect',
  component: RemoteSelect,
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
      labelInValue: undefined,
    });
    return () => (
      <div>
        <RemoteSelect
          dataSource={loadDataSource}
          fieldNames={fieldNames}
          style="width: 200px"
          v-model={[state.default, 'value']}
        />
        <span> = {state.default}</span>
      </div>
    );
  },
});
Basic.storyName = '基础用法';

export const labelInValue: any = (args: any) => ({
  setup() {
    const state = reactive({
      default: undefined,
      labelInValue: undefined,
    });
    return () => (
      <div>
        <RemoteSelect
          dataSource={loadDataSource}
          fieldNames={fieldNames}
          labelInValue
          style="width: 200px"
          v-model={[state.labelInValue, 'value']}
        />
        <span> = {JSON.stringify(state.labelInValue)}</span>
      </div>
    );
  },
});
labelInValue.storyName = 'labelInValue';

export const fail: any = (args: any) => ({
  setup() {
    const loadFailureDataSource = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(null);
        }, 3000);
      }).then(() => request({ url: '/472d2fa0-c2e1-469e-9cc2-1ffdfd6cea0c' }));
    };
    return () => (
      <div>
        <RemoteSelect
          dataSource={loadFailureDataSource}
          fieldNames={fieldNames}
          style="width: 200px"
        />
      </div>
    );
  },
});
fail.storyName = 'fail';

export const cacheable: any = (args: any) => ({
  setup() {
    return () => (
      <div>
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
      </div>
    );
  },
});
cacheable.storyName = 'cacheable';

export const allowClear: any = (args: any) => ({
  setup() {
    const state = reactive({
      default: undefined,
      labelInValue: undefined,
    });
    return () => (
      <div>
        <RemoteSelect
          allowClear
          cacheable
          dataSource={loadCacheableDataSource}
          fieldNames={fieldNames}
          style="width: 200px"
          v-model={[state.default, 'value']}
        />
        <span> = {state.default}</span>
      </div>
    );
  },
});
allowClear.storyName = 'allowClear';

export const defaultActiveFirstOption: any = (args: any) => ({
  setup() {
    const state = reactive({
      default: undefined,
      labelInValue: undefined,
    });
    return () => (
      <div>
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
      </div>
    );
  },
});
defaultActiveFirstOption.storyName = 'defaultActiveFirstOption';

export const dropdownMatchSelectWidth: any = (args: any) => ({
  setup() {
    return () => (
      <div>
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
      </div>
    );
  },
});
dropdownMatchSelectWidth.storyName = 'dropdownMatchSelectWidth';

export const optionFilterProp: any = (args: any) => ({
  setup() {
    return () => (
      <div>
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
      </div>
    );
  },
});
optionFilterProp.storyName = 'optionFilterProp';

export const optionLabelProp: any = (args: any) => ({
  setup() {
    return () => (
      <div>
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
      </div>
    );
  },
});
optionLabelProp.storyName = 'optionLabelProp';

export const asyncLabelProp: any = (args: any) => ({
  setup() {
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

    return () => (
      <div>
        <RemoteSelect
          cacheable
          dataSource={unref(asyncDataSource)}
          fieldNames={fieldNames}
          optionLabelProp="value"
          style="width: 200px"
        />
      </div>
    );
  },
});
asyncLabelProp.storyName = 'asyncLabelProp';
