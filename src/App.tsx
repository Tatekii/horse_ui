import React from "react";
import Button from "./components/button/button.component";
import { ButtonSize, ButtonType } from "./components/button/button.types";
import Alert from "./components/alert/alert.component";
import { AlertType } from "./components/alert/alert.types";

function App() {
  const clickOne = () => {
    console.log("click one");
  };
  return (
    <>
      <h1>Hello world</h1>
      <h2>Hello world</h2>
      <h3>Hello world</h3>
      <Alert
        type={AlertType.INFO}
        closeable
        closeText="CLOSE"
        message="here is message"
        description="here is description"
        closeCallback={()=>console.log('close call back')}
      ></Alert>
      <Button>normal</Button>
      <Button
        btnType={ButtonType.PRIMARY}
        size={ButtonSize.LARGE}
        onClick={clickOne}
        className="custom-class"
      >
        SHOW ALERT
      </Button>
      <Button
        btnType={ButtonType.LINK}
        href="http://www.google.com"
        target="blank"
      >
        LINK Normal
      </Button>
      <Button
        btnType={ButtonType.LINK}
        size={ButtonSize.SMALL}
        href="http://www.google.com"
      >
        LINK small
      </Button>
    </>
  );
}

export default App;
