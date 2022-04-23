import { defineComponent, ref } from 'vue';
import { CountDown } from '@/index';
import { Card, message } from 'ant-design-vue';
import './index.less';
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  RedoOutlined,
} from '@ant-design/icons-vue';

export default defineComponent({
  setup() {
    const time = ref(30 * 60 * 60 * 1000);
    const countDown = ref<Record<string, any>>();

    const onFinish = () => {
      message.success('倒计时结束');
    };
    const onStart = () => {
      countDown.value?.start();
    };
    const onPause = () => {
      countDown.value?.pause();
    };
    const onReset = () => {
      countDown.value?.reset();
    };
    return () => {
      return (
        <div>
          <Card title="说明">
            本组件是移动于 Vant 中的 count-down
            组件，详细API可以查看对应的官网：
            <a href="https://vant-contrib.gitee.io/vant/v3/#/zh-CN/count-down#shou-dong-kong-zhi">
              https://vant-contrib.gitee.io/vant/v3/#/zh-CN/count-down#shou-dong-kong-zhi
            </a>
          </Card>
          <br />
          <Card title="基础用法">
            <CountDown time={time.value} />
          </Card>
          <br />
          <Card title="自定义格式">
            <CountDown time={time.value} format="DD 天 HH 时 mm 分 ss 秒" />
          </Card>
          <br />
          <Card title="毫秒级渲染">
            <CountDown millisecond time={time.value} format="HH:mm:ss:SS" />
          </Card>
          <br />
          <Card title="自定义样式">
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
          </Card>
          <br />
          <Card title="手动控制">
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
                <PlayCircleOutlined
                  style={{ fontSize: '30px', color: '#666' }}
                />
                <span>开始</span>
              </div>
              <div class="play-item" onClick={onPause}>
                <PauseCircleOutlined
                  style={{ fontSize: '30px', color: '#666' }}
                />
                <span>暂停</span>
              </div>
              <div class="play-item" onClick={onReset}>
                <RedoOutlined style={{ fontSize: '30px', color: '#666' }} />
                <span>重置</span>
              </div>
            </div>
          </Card>
          <br />
        </div>
      );
    };
  },
});
