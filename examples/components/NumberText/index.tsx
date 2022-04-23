import { defineComponent } from 'vue';
import { NumberText } from '@/index';

export default defineComponent({
  render() {
    return (
      <div>
        <div>
          <NumberText value={123456789.987654321} type="integer" />
        </div>
        <div>
          <NumberText value={123456789.987654321} type="decimal" />
        </div>
        <div>
          <NumberText value={123456789.987654321} type="money" />
        </div>
        <div>
          <NumberText value={123456789.987654321} type="percent" />
        </div>
      </div>
    );
  },
});
