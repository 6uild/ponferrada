export interface RGB {
  r: number;
  b: number;
  g: number;
}

export function fromHex(hex: string): RGB {
  const val = hex[0] === "#" ? hex.substr(1, 6) : hex;
  return {
    r: parseInt(val.substr(0, 2), 16),
    g: parseInt(val.substr(2, 2), 16),
    b: parseInt(val.substr(4, 2), 16),
  };
}

export function toHex({ r, g, b }: RGB): string {
  const hex = (x: number): string => ("0" + x.toString(16)).slice(-2).toUpperCase();
  return "#" + hex(r) + hex(g) + hex(b);
}

// convert from #12a37d to 31, 201, 145
export function asTuple(hex: string): string {
  const { r, g, b } = fromHex(hex);
  return `${r}, ${g}, ${b}`;
}

export function contrast(hex: string, mult: number): string {
  const { r, g, b } = fromHex(hex);
  const f = (x: number): number => Math.round((x - 128) * mult + 128);
  return toHex({ r: f(r), g: f(g), b: f(b) });
}

function redistribute({ r, g, b }: RGB): RGB {
  const threshold = 256;
  const m = Math.max(r, g, b);
  if (m < threshold) {
    return { r, g, b };
  }
  const total = r + g + b;
  if (total >= 3 * threshold) {
    return { r: 255, g: 255, b: 255 };
  }
  const x = (3 * threshold - total) / (3 * m - total);
  const f = (color: number): number => Math.ceil(threshold - x * m + x * color);
  return { r: f(r), g: f(g), b: f(b) };
}

export function multiply(hex: string, mult: number): string {
  const { r, g, b } = fromHex(hex);
  const f = (x: number): number => Math.ceil(x * mult);
  const out = redistribute({ r: f(r), g: f(g), b: f(b) });
  return toHex(out);
}
