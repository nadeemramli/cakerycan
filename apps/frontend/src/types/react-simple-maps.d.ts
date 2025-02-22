declare module 'react-simple-maps' {
  import { ReactNode, ComponentType, CSSProperties } from 'react';

  interface ComposableMapProps {
    projection?: string;
    projectionConfig?: {
      center?: [number, number];
      scale?: number;
    };
    style?: CSSProperties;
    children?: ReactNode;
  }

  interface ZoomableGroupProps {
    center?: [number, number];
    zoom?: number;
    maxZoom?: number;
    minZoom?: number;
    children?: ReactNode;
  }

  interface MarkerProps {
    coordinates: [number, number];
    children?: ReactNode;
  }

  interface GeographyProps {
    geography: any;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    style?: {
      default?: any;
      hover?: any;
      pressed?: any;
    };
  }

  interface GeographiesProps {
    geography: any;
    children: (props: { geographies: any[] }) => ReactNode;
  }

  export const ComposableMap: ComponentType<ComposableMapProps>;
  export const ZoomableGroup: ComponentType<ZoomableGroupProps>;
  export const Marker: ComponentType<MarkerProps>;
  export const Geographies: ComponentType<GeographiesProps>;
  export const Geography: ComponentType<GeographyProps>;
} 