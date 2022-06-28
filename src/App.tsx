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

library.add(fas);

function App() {
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const clickOne = () => {
    console.log("click one");
  };
  return (
    <>
      <h1>Hello world</h1>
      <h2>Hello world</h2>
      <h3>Hello world</h3>
      <Transition in={showAlert} animation="zoom-in-left" timeout={400}>
        <Alert
          type="info"
          closeable
          closeText="关闭"
          message="here is message"
          description="here is description"
          closeCallback={() => setShowAlert(false)}
        >
          <Button>123</Button>
        </Alert>
      </Transition>

      <Button>normal</Button>
      <Button
        btnType="primary"
        size="large"
        onClick={() => setShowAlert(true)}
        className="custom-class"
      >
        SHOW ALERT
      </Button>
      <Button btnType="danger" size="small">
        danger small
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
      <Menu
        onSelect={(i) => {
          console.log("select index=> ", i);
        }}
        defaultIndex="1"
        mode="vertical"
        expandMenus={["3"]}
      >
        <MenuItem>item1</MenuItem>
        <MenuItem>item2</MenuItem>
        <SubMenu title="submenu">
          <MenuItem>drop1</MenuItem>
          <MenuItem>drop2</MenuItem>
          <MenuItem>drop3</MenuItem>
        </SubMenu>
        <SubMenu title="submenu2">
          <MenuItem>drop2-1</MenuItem>
          <MenuItem>drop2-2</MenuItem>
          <MenuItem>drop2-3</MenuItem>
        </SubMenu>
      </Menu>

      <hr />
      <Icon theme="primary" icon="coffee" size="10x" />
    </>
  );
}

export default App;
