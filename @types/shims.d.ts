import { Interpolation } from "@emotion/serialize";
import { Theme } from "..";

declare module "react" {
  interface Attributes {
    css?: Interpolation<Theme>;
  }
}

declare module "*.module.less" {
  const classes: {
    readonly [key: string]: string;
  };
  export default classes;
  declare module "*.less";
}
