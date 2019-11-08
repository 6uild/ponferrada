#/bin/bash

# This copies the given input file to all locations for the "corporate image".
# It must be a .svg file

if [ -z "$1" ]; then
  echo "Usage: company_logo.sh <file.svg>"
fi

echo "Install needed tools"
sudo apt-get install librsvg2-bin icoutils

# 85 × 39 (same as Header/assets/logoBlack.svg)
rsvg-convert "$1" -w 85 -h 39 -f svg -o packages/sil-governance/src/assets/iov-logo-title.svg

# 161 × 161
rsvg-convert "$1" -w 161 -h 161 -f svg -o packages/sil-governance/src/assets/iov-logo.svg

# 106 × 51
rsvg-convert "$1" -w 106 -h 51 -f svg -o packages/bierzo-wallet/src/routes/login/assets/logoBlack.svg

# 85 x 39
rsvg-convert "$1" -w 85 -h 39 -f svg -o packages/bierzo-wallet/src/components/Header/assets/logoBlack.svg

# make 16x16 ico
rsvg-convert "$1" -w 16 -h 16 -f png -o favicon.png
icotool -c favicon.png -o packages/bierzo-wallet/public/favicon.ico
icotool -c favicon.png -o packages/sil-governance/public/favicon.ico
rm favicon.png
