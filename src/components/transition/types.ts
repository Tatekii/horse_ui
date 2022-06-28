import { CSSTransitionProps } from "react-transition-group/CSSTransition";

export type TransitionType =
  | "zoom-in-top"
  | "zoom-in-bottom"
  | "zoom-in-left"
  | "zoom-in-right";

export type TransitionProps = CSSTransitionProps & {
  animation?: TransitionType;
};
