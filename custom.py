def redistribute_rgb(r, g, b):
    threshold = 255.999
    m = max(r, g, b)
    if m <= threshold:
        return int(r), int(g), int(b)
    total = r + g + b
    if total >= 3 * threshold:
        return int(threshold), int(threshold), int(threshold)
    x = (3 * threshold - total) / (3 * m - total)
    gray = threshold - x * m
    return int(gray + x * r), int(gray + x * g), int(gray + x * b)

def from_rgb(hex):
    f = lambda s: int(s, 16) * 1.0
    return f(hex[0:2]), f(hex[2:4]), f(hex[4:6])

def to_rgb(r, g, b):
    f = lambda s: hex(int(s))[2:]
    return f(r) + f(g) + f(b)

def multiply(rgb, val):
    (r, g, b) = from_rgb(rgb)
    (r, g, b) = redistribute_rgb(r*val, g*val, b*val)
    return to_rgb(r, g, b)

def contrast(rgb, val):
    (r, g, b) = from_rgb(rgb)
    f = lambda x: int((x - 128) * val + 128)
    return to_rgb(f(r), f(g), f(b))
