import { AddressTreeSelect } from '@/index';
import { ref } from 'vue';
import mdx from './AddressTreeSelect.mdx';
import '@/components/AddressTreeSelect/style/index.less';
import '@/components/WeekTime/style/index.less';
import cityData from '@/components/AddressTreeSelect/data/city_province.json';
export default {
  title: '组件/AddressTreeSelect',
  component: AddressTreeSelect,
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      page: mdx,
    },
  },
};

export const Basic: any = (args: any) => ({
  setup() {
    const select = ref();
    const selectNames = ref([]);
    return () => (
      <div>
        <AddressTreeSelect
          v-models={[
            [select.value, 'selects'],
            [selectNames.value, 'selectNames'],
          ]}
          data={cityData}
          title={['省份', '城市']}
        />
        <br />
        <p>selects： {JSON.stringify(select.value)}</p>
        <p>selectNames： {JSON.stringify(selectNames.value)}</p>
      </div>
    );
  },
});

Basic.storyName = '基础用法';


export const Title: any = (args: any) => ({
  setup() {
    const select = ref();
    const selectNames = ref([]);
    return () => (
      <div>
        <AddressTreeSelect
          v-models={[
            [select.value, 'selects'],
            [selectNames.value, 'selectNames'],
          ]}
          data={cityData}
          title={['自定义一', '自定义一']}
        />
        <br />
        <p>selects： {JSON.stringify(select.value)}</p>
        <p>selectNames： {JSON.stringify(selectNames.value)}</p>
      </div>
    );
  },
});

Title.storyName = '标题';

export const getData: any = (args: any) => ({
  setup() {
    const requestData = [
      {
        id: '2',
        name: '北京',
        zipcode: '110000',
        type: 'folder',
        children: [
          {
            id: '6913',
            name: '北京市',
            zipcode: '110100',
            type: 'item',
          },
        ],
      },
      {
        id: '19',
        name: '天津',
        zipcode: '120000',
        type: 'folder',
        children: [
          {
            id: '6916',
            name: '天津市',
            zipcode: '120100',
            type: 'item',
          },
        ],
      },
      {
        id: '36',
        name: '河北省',
        zipcode: '130000',
        type: 'folder',
        children: [
          {
            id: '37',
            name: '石家庄市',
            zipcode: '130100',
            type: 'item',
          },
          {
            id: '61',
            name: '唐山市',
            zipcode: '130200',
            type: 'item',
          },
          {
            id: '76',
            name: '秦皇岛市',
            zipcode: '130300',
            type: 'item',
          },
          {
            id: '84',
            name: '邯郸市',
            zipcode: '130400',
            type: 'item',
          },
          {
            id: '104',
            name: '邢台市',
            zipcode: '130500',
            type: 'item',
          },
          {
            id: '124',
            name: '保定市',
            zipcode: '130600',
            type: 'item',
          },
          {
            id: '150',
            name: '张家口市',
            zipcode: '130700',
            type: 'item',
          },
          {
            id: '168',
            name: '承德市',
            zipcode: '130800',
            type: 'item',
          },
          {
            id: '180',
            name: '沧州市',
            zipcode: '130900',
            type: 'item',
          },
          {
            id: '197',
            name: '廊坊市',
            zipcode: '131000',
            type: 'item',
          },
          {
            id: '208',
            name: '衡水市',
            zipcode: '131100',
            type: 'item',
          },
        ],
      },
      {
        id: '220',
        name: '山西省',
        zipcode: '140000',
        type: 'folder',
        children: [
          {
            id: '221',
            name: '太原市',
            zipcode: '140100',
            type: 'item',
          },
          {
            id: '232',
            name: '大同市',
            zipcode: '140200',
            type: 'item',
          },
          {
            id: '244',
            name: '阳泉市',
            zipcode: '140300',
            type: 'item',
          },
          {
            id: '250',
            name: '长治市',
            zipcode: '140400',
            type: 'item',
          },
          {
            id: '264',
            name: '晋城市',
            zipcode: '140500',
            type: 'item',
          },
          {
            id: '271',
            name: '朔州市',
            zipcode: '140600',
            type: 'item',
          },
          {
            id: '278',
            name: '晋中市',
            zipcode: '140700',
            type: 'item',
          },
          {
            id: '290',
            name: '运城市',
            zipcode: '140800',
            type: 'item',
          },
          {
            id: '304',
            name: '忻州市',
            zipcode: '140900',
            type: 'item',
          },
          {
            id: '319',
            name: '临汾市',
            zipcode: '141000',
            type: 'item',
          },
          {
            id: '337',
            name: '吕梁市',
            zipcode: '141100',
            type: 'item',
          },
        ],
      },
    ];
    const data = ref<any>([]);
    const requestSelect = ref(['140000', '130000']);
    const requestSelectNames = ref([]);
    const spinning = ref(true);
    setTimeout(() => {
      data.value = requestData;
      spinning.value = false;
    }, 3000);

    return () => (
      <div>
        <AddressTreeSelect
          v-models={[
            [requestSelect.value, 'selects'],
            [requestSelectNames.value, 'selectNames'],
          ]}
          data={data.value}
          fieldNames={{ value: 'name', id: 'zipcode' }}
          title={['省份', '城市']}
          loading={spinning.value}
        />
        <p>选中的值： {JSON.stringify(requestSelect.value)}</p>
        <p>选中的值： {JSON.stringify(requestSelectNames.value)}</p>
      </div>
    );
  },
});

getData.storyName = '后台请求的数据';
