import React from 'react';
import { Card } from "semantic-ui-react";
import HealthRatingBar from '../components/HealthRatingBar';
import { useStateValue } from "../state";
import { Entry } from "../types";
import EntryTypeIcon from './EntryTypeIcon';

interface Props {
  entry: Entry;
}

const EntryDetails = ({ entry }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Card>
      <Card.Content>
        <Card.Header>
          <strong>{entry.date}</strong>
          <EntryTypeIcon entryType={entry.type} />
        </Card.Header>
        <Card.Description>
          {entry.description}
          <ul>
            {entry.diagnosisCodes?.map(dc => <li key={dc}>{dc} {diagnoses[dc].name}</li>)}
          </ul>
        </Card.Description>
      </Card.Content>
      {entry.type === 'HealthCheck' &&
        <Card.Content extra>
          <HealthRatingBar rating={entry.healthCheckRating} showText={false} />
        </Card.Content>
      }
    </Card>
  );
};

export default EntryDetails;