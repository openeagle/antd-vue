// import { AdminSearch } from '@/index';
// import { computed, defineComponent, reactive, watch } from 'vue';
// import withVueApp from '@stories/internals/withVueApp';
// import { Checkbox, Col, Card, Input, Row } from 'ant-design-vue';
// import mdx from '../SearchForm.mdx';

// export default {
//   title: '组件/AdminSearch/SearchForm',
//   component: AdminSearch.SearchForm,
//   parameters: {
//     docs: {
//       // page: mdx,
//     },
//   },
// };
// export const CustomControl: any = (args: any) => {
//   const Phone = defineComponent({
//     emits: ['update:value'],
//     setup(props, { emit }) {
//       const state = reactive({
//         value1: '',
//         value2: '',
//       });
//       const value = computed(() => {
//         const { value1, value2 } = state;
//         if (value1 && value) {
//           return `${value1}-${value2}`;
//         }
//         if (value1) {
//           return value1;
//         }
//         if (value2) {
//           return value2;
//         }
//         return '';
//       });
//       watch(value, () => {
//         emit('update:value', value.value);
//       });
//       return () => {
//         return (
//           <Input.Group>
//             <Row gutter={8}>
//               <Col span={8}>
//                 <Input v-model={[state.value1, 'value']} />
//               </Col>
//               <Col span={16}>
//                 <Input v-model={[state.value2, 'value']} />
//               </Col>
//             </Row>
//           </Input.Group>
//         );
//       };
//     },
//   });
//   return withVueApp({
//     setup() {
//       const form = AdminSearch.SearchForm.useForm([
//         {
//           type: Phone,
//           name: 'phone',
//           label: 'phone',
//         },
//         {
//           type: Checkbox,
//           name: 'checkbox',
//           label: 'checkbox',
//           valuePropName: 'checked',
//         },
//       ]);
//       return () => {
//         return (
//           <AdminSearch>
//             <Card title="state">{JSON.stringify(form.state)}</Card>
//             <AdminSearch.SearchForm layout="inline" form={form} />
//           </AdminSearch>
//         );
//       };
//     },
//   });
// };

// CustomControl.storyName = '定制组件';
