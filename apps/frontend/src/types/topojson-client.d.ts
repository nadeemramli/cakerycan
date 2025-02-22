declare module 'topojson-client' {
  export function feature(topology: any, o: any): any;
  export function mesh(topology: any, o: any, filter?: (a: any, b: any) => boolean): any;
  export function neighbors(objects: any): Array<Array<number>>;
  export function presimplify(topology: any, weight?: (triangle: Array<any>) => number): any;
  export function quantize(topology: any, transform: any): any;
  export function simplify(topology: any, minWeight?: number): any;
  export function filter(topology: any, filter?: (a: any, b: any) => boolean): any;
} 