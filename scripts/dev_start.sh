#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck > /dev/null && shellcheck "$0"

# This runs all the scripts to set up for a local bns testing environment
# (blockchains and faucets).
# Intended as a convenience script for developers.

# get this files directory regardless of pwd when we run it
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# use this in home, as docker has funny issues when I mount volumes under /tmp (at least on ubuntu)
export TMPDIR="$HOME/tmp"
mkdir -p "$TMPDIR"

echo
echo ">>> Starting bns chain and faucet..."
echo
"${SCRIPT_DIR}"/bnsd/start.sh
"${SCRIPT_DIR}"/faucet/bnsd_start.sh

echo
echo ">>> Waiting for faucets to load tokens..."
echo
sleep 3
echo "Done!"
