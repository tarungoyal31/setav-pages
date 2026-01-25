/// <reference types="vite/client" />

declare module "*.json" {
  const value: Record<string, unknown>;
  export default value;
}

declare module '*.svg' {
  import * as React from 'react';
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export { ReactComponent };
  const src: string;
  export default src;
}
