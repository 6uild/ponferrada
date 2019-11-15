import { storiesOf } from "@storybook/react";
import React from "react";

import { sanesRoot, SanesStorybook } from "../../utils/storybook";
import DeleteKeyring from "./index";

storiesOf(sanesRoot, module).add("Delete keyring page", () => (
  <SanesStorybook>
    <DeleteKeyring />
  </SanesStorybook>
));
