declare module "splitting" {
  const Splitting: any;
  export default Splitting;
}

declare module "*.svg" {
  import * as React from "react";
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;
  const src: string;
  export default src;
}


import "react";

declare module "react-icons/*" {
  import type { FC } from "react";
  import type { IconBaseProps } from "react-icons";

  const component: FC<IconBaseProps>;
  export default component;
}
