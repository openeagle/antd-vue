import { createRequest } from '../../../src';
import { Button, Card } from 'ant-design-vue';
import { ref } from 'vue';
import mdx from './createRequest.mdx';
import config from '@/config';

export default {
  title: 'API/createRequest',
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
      baseURL: 'http://ip::5000/mock/430',
      responseCode: {
        success: '10000',
      },
    });
    const axios = ref()
    const api1 = () => {
      axios.value = request({
        url: '/api/specialtopic',
      })
      console.log('axios.value', axios.value)
    }

    return () => {
      return (
        <>
          <Button type={'primary'} onClick={api1}>基础请求</Button>
          <Card>
            <div>{JSON.stringify(axios.value)}</div>
          </Card>
        </>
      );
    };
  },
});
Basic.storyName = '基础用法';


export const Get: any = (args: any) => ({
  setup() {
    const request = createRequest({
      baseURL: 'http://ip:5000/mock/430',
      responseCode: {
        success: '10000',
      },
    });

    const resDataGet = ref()
    const get = () => {
      request.get('/api/specialtopic', {
        params: {
          a: 'any-data'
        }
      })
        .then(res => {
          resDataGet.value = res
        })
    }

    return () => {
      return (
        <>
          <Button type={'primary'} onClick={get}>get请求</Button>
          <Card>
            <div>{JSON.stringify(resDataGet.value)}</div>
          </Card>
        </>
      );
    };
  },
});
Get.storyName = 'GET';


export const Post: any = (args: any) => ({
  setup() {
    const request = createRequest({
      baseURL: 'http://ip:5000/mock/430',
      responseCode: {
        success: '10000',
      },
    });


    const resDataPost = ref()
    const post = () => {
      request({
        method: 'post',
        url: '/course/page',
        params: {
          a: 'any-data'
        },
      })
        .then(res => {
          resDataPost.value = res
        })
    }

    return () => {
      return (
        <>
          <Button type={'primary'} onClick={post}>post请求</Button>
          <Card>
            <div>{JSON.stringify(resDataPost.value)}</div>
          </Card>
        </>
      );
    };
  },
});
Post.storyName = 'POST';


export const RequestError: any = (args: any) => ({
  setup() {
    const request = createRequest({
      baseURL: 'https://run.mocky.io/v3',
      responseCode: {
        success: '10000',
      },
    });


    const resData = ref('');

    const success = () => {
      resData.value = ''
      return request({
        url: 'http://ip:5000/mock/430/api/specialtopic',
      }).then(res => {
        resData.value = JSON.stringify(res)
      })
    }

    const failure = () => {
      resData.value = ''
      return request('/4f503449-0349-467e-a38a-c804956712b7')
        .then((data) => {
          console.log('failure', data);
        })
        .catch((error) => {
          resData.value = JSON.stringify(error)
        });
    }

    const invalid = () => {
      resData.value = ''
      return request('/1b23549f-c918-4362-9ac8-35bc275c09f0')
        .then((data) => {
          console.log('invalid', data);
        })
        .catch((error) => {
          resData.value = JSON.stringify(error)
        });
    }

    const server_500 = () => {
      resData.value = ''
      return request('/2a9d8c00-9688-4d36-b2de-2dee5e81f5b3')
        .then((data) => {
          console.log('server_500', data);
        })
        .catch((error) => {
          resData.value = JSON.stringify(error)
        });
    }


    return () => {
      return (
        <>
          <p>请求返回数据</p>
          <Button type={'primary'} onClick={success}>success</Button>
          <Button type={'primary'} onClick={failure} style={{marginLeft: '12px'}}>failure</Button>
          <Button type={'primary'} onClick={invalid} style={{marginLeft: '12px'}}>invalid</Button>
          <Button type={'primary'} onClick={server_500} style={{marginLeft: '12px'}}>server_500</Button>
          <Card>
            <div>{resData.value}</div>
          </Card>
        </>
      );
    };
  },
});
RequestError.storyName = '错误状态';

