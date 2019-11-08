#/bin/bash

# This copies the given input file to all locations for the "extension image".
# It must be a .svg file

# TODO: we need two vairants... one with text, one without

if [ -z "$1" ]; then
  echo "Usage: extension_logo.sh <image.svg> <with_text.svg>"
fi

if [ -z "$2" ]; then
  echo "Usage: extension_logo.sh <image.svg> <with_text.svg>"
fi

echo "Install needed tools"
sudo apt-get install librsvg2-bin icoutils

# with text

# 160 × 28
rsvg-convert "$2" -w 160 -h 28 -f svg -o packages/bierzo-wallet/src/routes/login/assets/neumaWalletLogo.svg

# 414 × 72
rsvg-convert "$2" -w 414 -h 72 -f svg -o packages/sanes-browser-extension/src/components/assets/NeumaLogo.svg

# simple image

# 16x17
rsvg-convert "$1" -w 16 -h 17 -f svg -o packages/bierzo-wallet/src/routes/login/assets/neuma.svg

# images
rsvg-convert "$1" -w 128 -h 128 -f png -o packages/sanes-browser-extension/public/assets/icons/icon128.png
rsvg-convert "$1" -w 48 -h 48 -f png -o packages/sanes-browser-extension/public/assets/icons/icon48.png
rsvg-convert "$1" -w 16 -h 16 -f png -o packages/sanes-browser-extension/public/assets/icons/icon16.png

# TODO: apply color filter on the requests...
rsvg-convert "$1" -w 128 -h 128 -f png -o packages/sanes-browser-extension/public/assets/icons/request128.png
rsvg-convert "$1" -w 48 -h 48 -f png -o packages/sanes-browser-extension/public/assets/icons/request48.png
rsvg-convert "$1" -w 16 -h 16 -f png -o packages/sanes-browser-extension/public/assets/icons/request16.png
