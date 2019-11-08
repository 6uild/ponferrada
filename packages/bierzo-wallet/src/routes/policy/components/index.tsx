import { Block, Paragraph, Section, Title, Typography } from "medulas-react-components";
import React from "react";

import { getConfig } from "../../../config";
import { companyName } from "../../../theme/variables";

/**
 * Workaround to avoid "Comment location overlaps with node location" error
 * https://github.com/prettier/prettier/issues/2347
 */

// const addLinkTo = (link: string): JSX.Element => <Link to={link}>{link}</Link>;

function PolicyLayoutInternal(): JSX.Element {
  const setWebsiteName = React.useState("")[1];

  React.useEffect(() => {
    async function getWebsiteName(): Promise<void> {
      const config = await getConfig();
      setWebsiteName(config.websiteName);
    }

    getWebsiteName();
  }, [setWebsiteName]);

  return (
    <React.Fragment>
      <Title variant="h5">{companyName} Privacy Policy</Title>
      <Block alignSelf="start">
        <Typography variant="body2" color="secondary">
          Updated whenever
        </Typography>
      </Block>
      <Section>
        <Paragraph>We respect your privacy and will not add cookies. Any questions?</Paragraph>
      </Section>
    </React.Fragment>
  );
}

export default PolicyLayoutInternal;
