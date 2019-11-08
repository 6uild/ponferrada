import { Block, Link, Paragraph, Section, Title } from "medulas-react-components";
import React from "react";

import { getConfig } from "../../../config";

export default (): JSX.Element => {
  const [websiteName, setWebsiteName] = React.useState("");

  React.useEffect(() => {
    async function getWebsiteName(): Promise<void> {
      const config = await getConfig();
      setWebsiteName(config.websiteName);
    }

    getWebsiteName();
  }, []);

  return (
    <React.Fragment>
      <Title>Terms</Title>
      <Section>
        <Paragraph>The website {websiteName} is open for business.</Paragraph>
      </Section>
      <Title>User License</Title>
      <Section>
        <Paragraph>Free as in speech.</Paragraph>
        <Paragraph>TODO: put something meaningful here???</Paragraph>
      </Section>
    </React.Fragment>
  );
};
