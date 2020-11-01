import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStateValue, updatePatient } from "../state";
import axios from "axios";

import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { Icon } from "semantic-ui-react";

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

  return (
    <div>
      <h1>
        {currentPatient ? currentPatient.name : "Name"}
        {currentPatient && currentPatient.gender === "male" ? <Icon name="mars" /> : <Icon name="venus" />}
      </h1>
      <div>ssn: {currentPatient ? currentPatient.ssn : "unknown"}</div>
      <div>occupation: {currentPatient ? currentPatient.occupation : "unknown"}</div>
    </div>
  );
};

export default PatientDetailsPage;