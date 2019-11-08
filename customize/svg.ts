/// <reference types="../ambient" />
import replace from "replace";

import { primaryColor } from "../packages/medulas-react-components/src/theme/utils/variables";
import { asTuple, contrast } from "../packages/medulas-react-components/src/theme/utils/converter";

// config
const preview = false;
const silent = false;

// TODO: load these from files
const oldPrimary = "#31E6C9";
const oldMuted = "#5dc0b7";
const oldRgba = "49, 230, 201";

const newPrimary = primaryColor;
const newMuted = contrast(primaryColor, 0.6);
const newRgba = asTuple(primaryColor);

replace({
  regex: oldPrimary,
  replacement: newPrimary,
  paths: ["./packages"],
  recursive: true,
  include: "*.svg",
  preview,
  silent,
});

replace({
  regex: oldMuted,
  replacement: newMuted,
  paths: ["./packages"],
  recursive: true,
  include: "*.svg",
  preview,
  silent,
});

replace({
  regex: oldRgba,
  replacement: newRgba,
  paths: ["./packages"],
  recursive: true,
  include: "*.svg",
  preview,
  silent,
});
