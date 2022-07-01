import React from "react";
import { TransitionProps } from "./types";
import { CSSTransition } from "react-transition-group";

const Transition: React.FC<TransitionProps> = ({
  animation,
  children,
  classNames,
  ...restProps
}) => {
  // const wrapped: React.FC<React.ReactNode> = (children) => (
  //   <div>{children}</div>
  // );
  return (
    <CSSTransition classNames={classNames || animation} {...restProps}>
      {children}
    </CSSTransition>
  );
};

Transition.displayName = "Transition";

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
};

export default Transition;
