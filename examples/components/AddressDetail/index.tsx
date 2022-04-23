import { defineComponent, reactive, ref } from 'vue';
import { AddressDetail } from '@/index';
import { Card } from 'ant-design-vue';
const optionsData = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

const optionsData2 = [
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
  {
    id: '351',
    name: '内蒙古自治区',
    zipcode: '150000',
    type: 'folder',
    children: [
      {
        id: '352',
        name: '呼和浩特市',
        zipcode: '150100',
        type: 'item',
      },
      {
        id: '362',
        name: '包头市',
        zipcode: '150200',
        type: 'item',
      },
      {
        id: '372',
        name: '乌海市',
        zipcode: '150300',
        type: 'item',
      },
      {
        id: '376',
        name: '赤峰市',
        zipcode: '150400',
        type: 'item',
      },
      {
        id: '389',
        name: '通辽市',
        zipcode: '150500',
        type: 'item',
      },
      {
        id: '398',
        name: '鄂尔多斯市',
        zipcode: '150600',
        type: 'item',
      },
      {
        id: '407',
        name: '呼伦贝尔市',
        zipcode: '150700',
        type: 'item',
      },
      {
        id: '421',
        name: '巴彦淖尔市',
        zipcode: '150800',
        type: 'item',
      },
      {
        id: '429',
        name: '乌兰察布市',
        zipcode: '150900',
        type: 'item',
      },
      {
        id: '441',
        name: '兴安盟',
        zipcode: '152200',
        type: 'item',
      },
      {
        id: '448',
        name: '锡林郭勒盟',
        zipcode: '152500',
        type: 'item',
      },
      {
        id: '461',
        name: '阿拉善盟',
        zipcode: '152900',
        type: 'item',
      },
    ],
  },

  {
    id: '3225',
    name: '台湾省',
    zipcode: '710000',
    type: 'folder',
    children: [
      {
        id: '6915',
        name: '台湾',
        zipcode: '710000',
        type: 'item',
      },
    ],
  },
  {
    id: '3268',
    name: '澳門特別行政區',
    zipcode: '820000',
    type: 'folder',
    children: [
      {
        id: '3269',
        name: '花地瑪堂區',
        zipcode: '820001',
        type: 'item',
      },
      {
        id: '3271',
        name: '大堂区',
        zipcode: '820004',
        type: 'item',
      },
      {
        id: '3272',
        name: '望德堂区',
        zipcode: '820003',
        type: 'item',
      },
      {
        id: '3273',
        name: '风顺堂区',
        zipcode: '820005',
        type: 'item',
      },
      {
        id: '6914',
        name: '花王堂區',
        zipcode: '820002',
        type: 'item',
      },
    ],
  },
  {
    id: '6917',
    name: '香港特別行政区',
    zipcode: '810000',
    type: 'folder',
    children: [
      {
        id: '3249',
        name: '中西區',
        zipcode: '810001',
        type: 'item',
      },
      {
        id: '3250',
        name: '灣仔區',
        zipcode: '810002',
        type: 'item',
      },
      {
        id: '3251',
        name: '屯門區',
        zipcode: '810011',
        type: 'item',
      },
      {
        id: '3252',
        name: '東區',
        zipcode: '810003',
        type: 'item',
      },
      {
        id: '3253',
        name: '元朗區',
        zipcode: '810012',
        type: 'item',
      },
      {
        id: '3254',
        name: '南區',
        zipcode: '810004',
        type: 'item',
      },
      {
        id: '3256',
        name: '油尖旺區',
        zipcode: '810005',
        type: 'item',
      },
      {
        id: '3257',
        name: '大埔區',
        zipcode: '810014',
        type: 'item',
      },
      {
        id: '3258',
        name: '深水埗區',
        zipcode: '810006',
        type: 'item',
      },
      {
        id: '3259',
        name: '西貢區',
        zipcode: '810015',
        type: 'item',
      },
      {
        id: '3260',
        name: '九龍城區',
        zipcode: '810007',
        type: 'item',
      },
      {
        id: '3261',
        name: '沙田區',
        zipcode: '810016',
        type: 'item',
      },
      {
        id: '3262',
        name: '黃大仙區',
        zipcode: '810008',
        type: 'item',
      },
      {
        id: '3263',
        name: '葵青區',
        zipcode: '810017',
        type: 'item',
      },
      {
        id: '3264',
        name: '觀塘區',
        zipcode: '810009',
        type: 'item',
      },
      {
        id: '3265',
        name: '離島區',
        zipcode: '810018',
        type: 'item',
      },
      {
        id: '3266',
        name: '荃灣區',
        zipcode: '810010',
        type: 'item',
      },
      {
        id: '3267',
        name: '元朗区',
        zipcode: '810019',
        type: 'item',
      },
    ],
  },
];
export default defineComponent({
  setup() {
    const selectValue = ref({});
    const selectFetch = ref({});
    const selectFetch2 = ref({
      addressCode: ['220', '250'],
      addressLabel: ['山西省', '长治市'],
      area: '2222222',
    });

    const fieldNames = { value: 'label', label: 'value' };

    const fetchData = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(optionsData);
        }, 3000);
      });
    };
    const fetchData2 = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(optionsData2);
        }, 3000);
      });
    };
    const onChange = () => {
      console.log('change');
    };
    return () => {
      return (
        <div>
          <Card title="基础事例">
            <AddressDetail
              v-model={[selectValue.value, 'value']}
              onChange={onChange}
            />
            填写的值：{JSON.stringify(selectValue.value)}
          </Card>
          <br></br>

          <Card title="提供获取数据方法">
            <AddressDetail
              placeholder="请选择"
              v-model={[selectFetch.value, 'value']}
              dataSource={fetchData}
              field-names={fieldNames}
              maxlength={30}
            />
            填写的值：{JSON.stringify(selectFetch.value)}
          </Card>
          <br></br>
          <Card title="绑定数据">
            <AddressDetail
              placeholder="请选择"
              v-model={[selectFetch2.value, 'value']}
              dataSource={fetchData2}
              field-names={{ value: 'id', label: 'name' }}
            />
            填写的值：{JSON.stringify(selectFetch2.value)}
          </Card>
        </div>
      );
    };
  },
});
