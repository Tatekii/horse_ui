import React from "react";
import Button from "./components/button/button.component";
import Alert from "./components/alert/alert";

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
        type="info"
        closeable
        closeText="CLOSE"
        message="here is message"
        description="here is description"
        closeCallback={() => console.log("close call back")}
      ></Alert>
      <Button>normal</Button>
      <Button
        btnType="primary"
        size="large"
        onClick={clickOne}
        className="custom-class"
      >
        SHOW ALERT
      </Button>
      <Button btnType="link" href="http://www.google.com" target="blank">
        LINK Normal
      </Button>
      <Button btnType="link" size="small" href="http://www.google.com">
        LINK small
      </Button>
    </>
  );
}

export default App;
