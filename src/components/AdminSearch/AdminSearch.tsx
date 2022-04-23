import { defineComponent, reactive } from 'vue';
import { SearchContextProps } from './typings';
import SearchContext from './SearchContext';
import useForm from './utils/useForm';
import useParams from './utils/useParams';
import SearchForm from './components/SearchForm';
import SearchTable from './components/SearchTable';

const AdminSearch = defineComponent({
  name: 'OpeneagleAdminSearch',
  props: {
    pure: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    const context = reactive<SearchContextProps>({
      pure: props.pure,
      form: {},
    });

    return () => {
      const content = (
        <SearchContext value={context as any}>
          {slots.default?.()}
        </SearchContext>
      );
      if (props.pure) {
        return content;
      }
      return <div class="openeagle-ant-search">{content}</div>;
    };
  },
});

AdminSearch.SearchForm = SearchForm;
AdminSearch.SearchTable = SearchTable;
AdminSearch.useForm = useForm;
AdminSearch.useParams = useParams;

export default AdminSearch as typeof AdminSearch & {
  readonly SearchForm: typeof SearchForm;
  readonly SearchTable: typeof SearchTable;
  readonly useForm: typeof useForm;
  readonly useParams: typeof useParams;
};
