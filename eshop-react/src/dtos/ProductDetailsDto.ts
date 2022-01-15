export interface ProductDatailsDto {
  type?: string[] | string;
  keysCount?: number;
  multimediaKeys?: number;
  layout?: string;
  layoutPercent?: number;
  numpad?: boolean;
  angleChange?: {
    available?: boolean;
    positionCount?: number;
  };
  connectivity?: string;
  interfaces?: string[] | string;
  backlight?: {
    available?: boolean;
    color?: string;
    levels?: number;
  };
  switches?: {
    type?: string;
    title?: string;
    color?: string;
    hotSwappable?: boolean;
  };
  battery?: number;
  os?: string[] | string;
  frame?: string;
  keycaps?: string;
  color?: string;
  weight?: number;
  dimensions?: {
    l?: number;
    w?: number;
    h?: number;
  };
  package?: string[] | string;
}
