import React from 'react';
import { Icon } from 'semantic-ui-react';

interface Props {
  entryType: string;
}

const EntryTypeIcon = ({ entryType }: Props) => {
  switch(entryType) {
    case "Hospital":
      return <Icon size="large" name="hospital outline" />;
    case "OccupationalHealthcare":
      return <Icon size="large" name="lab" />;
    case "HealthCheck":
      return <Icon size="large" name="stethoscope"/>;
    default:
      return null;
  }
};

export default EntryTypeIcon;