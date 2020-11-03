import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStateValue, updatePatient } from "../state";
import axios from "axios";

import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { Icon } from "semantic-ui-react";
import EntryDetails from './EntryDetails';

const PatientDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const [currentPatient, setCurrentPatient] = useState<Patient>();

  const getPatientDetails = async () => {
    const response = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
    const patient = response.data;
    if (patient) patients[id] = patient;
    dispatch(updatePatient(patient));
    setCurrentPatient(patients[id]);
  };

  useEffect(() => {
    setCurrentPatient(patients[id]);
    if (patients[id] && !patients[id].entries) getPatientDetails();
  }, []);

  if (!currentPatient) return null;

  return (
    <div>
      <h1>
        {currentPatient.name}
        {currentPatient.gender === "male" ? <Icon name="mars" /> : <Icon name="venus" />}
      </h1>
      <div>ssn: {currentPatient.ssn}</div>
      <div>occupation: {currentPatient.occupation}</div>
      <h3>Entries</h3>
      {currentPatient.entries?.map(entry => {
        return (
          <EntryDetails key={entry.id} entry={entry} />
        );
      })}
    </div>
  );
};

export default PatientDetailsPage;