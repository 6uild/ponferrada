export interface RGB {
  r: number;
  b: number;
  g: number;
}
export declare function fromHex(hex: string): RGB;
export declare function toHex({ r, g, b }: RGB): string;
export declare function asTuple(hex: string): string;
export declare function contrast(hex: string, mult: number): string;
export declare function multiply(hex: string, mult: number): string;
