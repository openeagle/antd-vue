import { createRequest, useRequest } from '../../../src';
import { Button, Card } from 'ant-design-vue';
import { ref } from 'vue'
import mdx from './useRequest.mdx';

export default {
  title: 'API/useRequest',
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
  },
};
export const Basic: any = (args: any) => ({
  setup() {
    const request = createRequest({
      baseURL: 'http://ip:5000',
      responseCode: {
        success: '10000',
      },
    });
    const resData = ref()
    const { error, data, loading, run, cancel } = useRequest((cancelToken) => {
      console.log('cancelToken', cancelToken)
      resData.value = {};
      return request({
        ...cancelToken,
        url: 'http://ip:5000/mock/430/bdkaapp/course/list',
      })
        .finally(() => {
          resData.value = data
        })
    });

    return () => {
      return (
        <>
          <Button type={'primary'} onClick={run} loading={loading.value}>请求</Button>
          <Button type={'primary'} onClick={cancel} style={{ marginLeft: '20px' }}>中断请求</Button>
          <Card>
            <p>{JSON.stringify(resData.value)}</p>
          </Card>
        </>
      );
    };
  },
});
Basic.storyName = '基础用法';
