# Customize Look and Feel

First, you need to determine a new color scheme you want for the app. Then produce a custom logo.
After that, this should show you how to update the app.

## Select Color Scheme

You can experiment with [color palettes](https://material.io/inline-tools/color/) and look for a primary and seconday (or teriary) color that resonates with you and your app.

Or try this [amazing color picker](https://colorsupplyyy.com/app/) to decide on your color schemes.

Once you have some colors (primary and seconday), [view how they look](https://material.io/resources/color) in a sample app, and tweak them as needed.

Finally, you can export them just by [pasting the above URL here](https://react-theming.github.io/create-mui-theme/).

This will generate you some code that looks like:

```js
const palette = {
  primary: { main: "#311B92" },
  secondary: { main: "#FFE0B2" },
};
```

From this scheme, build a logo that matches them.

## Modify Theme

Go to `packages/medulas-react-components/src/theme/utils/variables.ts`:

- `secondaryColor` to secondary color above

Go to `packages/medulas-react-components/src/theme/utils/mui.ts`:

- Replace `palette.primary` with the results above
- `palette.text`: primary is secondayColor(secondary is from_rgb(primary) with a 0.47 alpha applied)
- `pallete.error.main` pick a new value , eg. `#b62843` (was `#ffb968`)
- `pallete.action.disabledBackground` pick a new value, eg. multiply(YOUR_PRIMARY, 0.9)

## Modify SVG Images

Text search and replace can update many colors in both inline css as well as svg files.
You should make the following replaces (over all files, or at least `*.ts`, `*.tsx`, `*.svg`):

- `#31E6C9` => YOUR_PRIMARY
- `#5dc0b7` => contrast(YOUR_PRIMARY, 0.6)
- `rgba(49, 230, 201` => rgba of YOUR_PRIMARY

TODO: which colors to use where

## Add Custom Logos

- Billboard message
  - bierzo-wallet/src/components/BillboardMessage/assets/toolbar.png
  - bierzo-wallet/src/components/BillboardMessage/assets/logo-zoom.svg
  - maybe others there
- IOV logos
- title sil-governance/src/assets/iov-logo-title.svg
- circle sil-governance/src/assets/iov-logo.svg
- large bierzo-wallet/src/routes/login/assets/logoBlack.svg
- medium bierzo-wallet/src/components/Header/assets/logoBlack.svg
- favicon bierzo-wallet/public/favicon.ico
- Neuma logos
- bierzo-wallet/src/routes/login/assets/neuma.svg
- bierzo-wallet/src/routes/login/assets/neumaWalletLogo.svg
- sanes-browser-extension/src/components/assets/NeumaLogo.svg
  - (maybe just overhaul src/components/NeumaPageLayout.tsx)
- Extension Icon sanes-browser-extension/public/assets/icons/\*

## Update Font

TODO

## Change names...

replace `www.neuma.io` with your site
replace `neumaUrl` with `extensionUrl`

In `sanes/config/manifest-*.json`: `*.iov.one` and `*.neuma.io` with your sites

In _.json, _.ts, \*.tsx:

- s/neuma/haxor/
- s/Neuma/Haxor/

And for now, revert in `*.tsx` (imports falsely changed):

- `HaxorBillboardMessage` to `NeumaBillboardMessage`
- `HaxorPageLayout` to `NeumaPageLayout`
- `HaxorLogo` to `NeumaLogo`
- `haxorWalletLogo` to `neumaWalletLogo`
- `haxor.svg` to `neuma.svg`

TODO: improve this - maybe rename images / files

Replace "starnames" references: -> personalized addresses

- bierzo-wallet/src/routes/addresses/components/AddressesTab.tsx (`Your starnames`)
- bierzo-wallet/src/routes/addresses/components/StarnamesNotExists.tsx (`You have no starnames`)

## Change text

Bierzo: src/routes/{policy,terms} both need removing (rewriting)
Gil: src/routes/login needs overhaul
