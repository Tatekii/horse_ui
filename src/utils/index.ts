export const getDataOrAriaProps = (props: any) => {
  return Object.keys(props).reduce((prev: any, key: string) => {
    if (
      (key.startsWith("data-") || key.startsWith("aria-") || key === "role") &&
      !key.startsWith("data-__")
    ) {
      prev[key] = props[key];
    }
    return prev;
  }, {});
};

// 格式化size到class名 => large => lg
export const sizeCls = (size?: string) => {
  switch (size) {
    case "large":
      return "lg";
    case "small":
      return "sm";
    case "middle":
      return "md";
    case undefined:
      return "md";
    default:
      console.error("Invalid prop [size]:", size);
      return "";
  }
};
