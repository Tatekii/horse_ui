import Button from "./components/button";
import Alert from "./components/alert";
import Menu from "./components/menu";
import MenuItem from "./components/menu/MenuItem";
import SubMenu from "./components/menu/SubMenu";
import Icon from "./components/icon";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Transition from "@/components/transition";
import Tab from "./components/tabs";
import TabPane from "./components/tabs/TabPane";

library.add(fas);

function App() {
  const [showAlert, setShowAlert] = useState<boolean>(false);

  return (
    <>
      <Transition in={showAlert} animation="zoom-in-left" timeout={400}>
        <Alert
          type="warning"
          closeable
          message="here is message"
          description="here is description"
          closeCallback={() => setShowAlert(false)}
          showIcon
        >
          <Button>123</Button>
        </Alert>
      </Transition>

      <Button
        btnType="primary"
        size="large"
        onClick={() => setShowAlert(true)}
        className="custom-class"
      >
        SHOW ALERT
      </Button>
      <Menu
        onSelect={(i) => {
          console.log("select index=> ", i);
        }}
        defaultIndex="0"
        expandMenus={["2"]}
      >
        <MenuItem>item1</MenuItem>
        <MenuItem disabled>disabled item</MenuItem>
        <SubMenu title="submenu">
          <MenuItem>drop1</MenuItem>
          <MenuItem>drop2</MenuItem>
          <MenuItem>drop3</MenuItem>
        </SubMenu>
      </Menu>

      <Tab defaultActive={3}>
        <TabPane tab="tab1">tab1 content</TabPane>
        <TabPane tab="tab2">tab2 content</TabPane>
        <TabPane tab="tab3" disabled></TabPane>
        <TabPane
          tab={
            <>
              <Icon theme="primary" icon="coffee" />
              {"tab4"}
            </>
          }
        >
          <Button>tab3 button</Button>
        </TabPane>
      </Tab>
    </>
  );
}

export default App;
