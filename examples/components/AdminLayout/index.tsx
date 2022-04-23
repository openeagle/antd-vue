import { defineComponent, inject } from 'vue';
import { Card, Form, Radio, Switch } from 'ant-design-vue';
import { AdminLayout, useTabRouter } from '@/index';
import { Settings } from '@/components/AdminLayout';

export default defineComponent({
  setup() {
    const settings = inject('settings') as Settings;
    const tabRouter = useTabRouter();
    return () => {
      return (
        <AdminLayout.PageContainer>
          <Card>
            <Form model={settings}>
              <Form.Item label="navTheme" name="navTheme">
                <Radio.Group
                  v-model={[settings.navTheme, 'value']}
                  button-style="solid"
                >
                  <Radio.Button value="dark">dark</Radio.Button>
                  <Radio.Button value="light">light</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="layout" name="layout">
                <Radio.Group
                  v-model={[settings.layout, 'value']}
                  button-style="solid"
                >
                  <Radio.Button value="side">side</Radio.Button>
                  <Radio.Button value="top">top</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="fixedHeader" name="fixedHeader">
                <Switch v-model={[settings.fixedHeader, 'checked']} />
              </Form.Item>
              <Form.Item label="fixSiderbar" name="fixSiderbar">
                <Switch v-model={[settings.fixSiderbar, 'checked']} />
              </Form.Item>
              <Form.Item label="contentWidth" name="contentWidth">
                <Radio.Group
                  v-model={[settings.contentWidth, 'value']}
                  button-style="solid"
                >
                  <Radio.Button value="Fluid">Fluid</Radio.Button>
                  <Radio.Button value="Fixed">Fixed</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="multiTabs" name="multiTabs">
                <Radio.Group
                  v-model={[settings.routerTabs, 'value']}
                  button-style="solid"
                >
                  <Radio.Button value={true}>show</Radio.Button>
                  <Radio.Button value={false}>hide</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Form>
            {settings.routerTabs ? (
              <>
                <ul>
                  <li>
                    <a onClick={() => tabRouter.open('/components/button')}>
                      /components/button
                    </a>
                  </li>
                  <li>
                    <a onClick={() => tabRouter.open('/components/loader')}>
                      /components/loader
                    </a>
                  </li>
                </ul>
              </>
            ) : null}
          </Card>
          <AdminLayout.FooterToolbar extra="extra...">
            content...
          </AdminLayout.FooterToolbar>
        </AdminLayout.PageContainer>
      );
    };
  },
});
