import { ref } from 'vue';
import { CountDown } from '@/index';
import '@/components/CountDown/style/index.less';
import mdx from './CountDown.mdx';

import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  RedoOutlined,
} from '@ant-design/icons-vue';

import { message } from 'ant-design-vue';

export default {
  title: '组件/CountDown',
  component: CountDown,
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
    const time = ref(30 * 60 * 60 * 1000);

    return () => (
      <div>
        <CountDown time={time.value} />
      </div>
    );
  },
});

Basic.storyName = '基础用法';

export const Diy: any = (args: any) => ({
  setup() {
    const time = ref(30 * 60 * 60 * 1000);

    return () => (
      <div>
        <CountDown time={time.value} format="DD 天 HH 时 mm 分 ss 秒" />
      </div>
    );
  },
});

Diy.storyName = '自定义格式';

export const Ms: any = (args: any) => ({
  setup() {
    const time = ref(30 * 60 * 60 * 1000);

    return () => (
      <div>
        <CountDown time={time.value} millisecond format="HH:mm:ss:SS" />
      </div>
    );
  },
});

Ms.storyName = '毫秒级渲染';

export const DiyStyle: any = (args: any) => ({
  setup() {
    const time = ref(30 * 60 * 60 * 1000);

    return () => (
      <div>
        <CountDown time={time.value}>
          {{
            default: (timeData: any) => (
              <>
                <span class="block">{timeData.hours}</span>
                <span class="colon">:</span>
                <span class="block">{timeData.minutes}</span>
                <span class="colon">:</span>
                <span class="block">{timeData.seconds}</span>
              </>
            ),
          }}
        </CountDown>
      </div>
    );
  },
});

DiyStyle.storyName = '自定义样式';

export const Manual: any = (args: any) => ({
  setup() {
    const countDown = ref<Record<string, any>>();

    const onStart = () => {
      countDown.value?.start();
    };
    const onPause = () => {
      countDown.value?.pause();
    };
    const onReset = () => {
      countDown.value?.reset();
    };
    const onFinish = () => {
      message.success('倒计时结束');
    };

    return () => (
      <div>
        <CountDown
          ref={countDown}
          millisecond
          time={3000}
          autoStart={false}
          format="ss:SSS"
          onFinish={onFinish}
        />
        <div class="play-wrapper">
          <div class="play-item" onClick={onStart}>
            <PlayCircleOutlined style={{ fontSize: '30px', color: '#666' }} />
            <span>开始</span>
          </div>
          <div class="play-item" onClick={onPause}>
            <PauseCircleOutlined style={{ fontSize: '30px', color: '#666' }} />
            <span>暂停</span>
          </div>
          <div class="play-item" onClick={onReset}>
            <RedoOutlined style={{ fontSize: '30px', color: '#666' }} />
            <span>重置</span>
          </div>
        </div>
      </div>
    );
  },
});

Manual.storyName = '手动控制';
