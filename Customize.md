# Customize Look and Feel

First, you need to determine a new color scheme you want for the app. Then produce a custom logo.
After that, this should show you how to update the app.

## Select Color Scheme

You can experiment with [color palettes](https://material.io/inline-tools/color/) and look for a primary and seconday (or teriary) color that resonates with you and your app.

Or try this [amazing color picker](https://colorsupplyyy.com/app/) to decide on your color schemes.

Once you have some colors (primary and seconday), [view how they look](https://material.io/resources/color) in a sample app, and tweak them as needed.

We need to record:

- primaryColor
- secondaryColor
- errorColor

You can export them just by [pasting the above URL here](https://react-theming.github.io/create-mui-theme/). But I'm not sure how useful this is.

## Modify Theme

Go to `packages/medulas-react-components/src/theme/utils/variables.ts`:

Set `primaryColor`, `secondaryColor`, and `errorColor` to the desired colors.

## Modify SVG Images

Text search and replace can update many colors in both inline css as well as svg files.
You should make the following replaces (over all files, or at least `*.ts`, `*.tsx`, `*.svg`):

- `#31E6C9` => YOUR_PRIMARY
- `#5dc0b7` => contrast(YOUR_PRIMARY, 0.6)
- `rgba(49, 230, 201` => rgba of YOUR_PRIMARY

Update: `yarn svg` should do this for you (WIP)

## Add Custom Logos

From your color scheme, build a logo that matches them.

First, you want to install your company logo - figured promenantly in the header of the webapps:

`./customize/company_logo.sh <logo.svg>`

Second, you will want to replace the neuma logo everywhere:

`./customize/extension_logo.sh <icon.svg> <icon_with_text.svg>`

TODO:

- Billboard message
  - bierzo-wallet/src/components/BillboardMessage/assets/toolbar.png
  - bierzo-wallet/src/components/BillboardMessage/assets/logo-zoom.svg
  - maybe others there

## Change names...

in `bierzo-wallet/src/theme/variables.ts` and `sil-governance/src/theme/variables.ts`,
set `companyName` and `extensionName` to update the references throughout all text.

Update with proper titles:

- `sil-governance/public/manfest.json`
- `bierzo-wallet/public/manfest.json`

Update configs in `sanes-browser-extension/config/*.json`:

- replace `neuma.io`, `iov.one` with your sites

## Change text

Bierzo: src/routes/{policy,terms} both need removing (rewriting)
Gil: src/routes/login needs overhaul

## Update Font

TODO
