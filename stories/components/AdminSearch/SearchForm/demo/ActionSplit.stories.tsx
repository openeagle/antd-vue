// import { AdminSearch } from '@/index';
// import withVueApp from '@stories/internals/withVueApp';
// import { Card } from 'ant-design-vue';
// import mdx from '../SearchForm.mdx';

// export default {
//   title: '组件/AdminSearch/SearchForm',
// };

// export const ActionSplit: any = (args: any) =>
//   withVueApp({
//     setup() {
//       const form = AdminSearch.SearchForm.useForm([
//         {
//           type: 'text',
//           name: 'text',
//           label: 'text',
//         },
//         {
//           type: 'number',
//           name: 'number',
//           label: 'number',
//         },
//         {
//           type: 'year',
//           name: 'year',
//           label: 'year',
//         },
//         {
//           type: 'month',
//           name: 'month',
//           label: 'month',
//         },
//         {
//           type: 'week',
//           name: 'week',
//           label: 'week',
//         },
//         {
//           type: 'date',
//           name: 'date',
//           label: 'date',
//           controlProps: {
//             style: {
//               width: '100%',
//             },
//           },
//         },
//         {
//           type: 'dateRange',
//           name: 'dateRange',
//           label: 'dateRange',
//           controlProps: {
//             style: {
//               width: '100%',
//             },
//           },
//         },
//       ]);
//       return () => {
//         return (
//           <div>
//             <Card bordered={false} title="inline">
//               <AdminSearch pure>
//                 <AdminSearch.SearchForm
//                   layout="inline"
//                   form={form}
//                   actionSplit
//                 />
//               </AdminSearch>
//             </Card>
//             <Card bordered={false} title="grid">
//               <AdminSearch pure>
//                 <AdminSearch.SearchForm layout="grid" form={form} actionSplit />
//               </AdminSearch>
//             </Card>
//           </div>
//         );
//       };
//     },
//   });

// ActionSplit.storyName = 'ActionSplit';
