import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStateValue, updatePatient } from "../state";
import axios from "axios";

import { apiBaseUrl } from "../constants";
import { NewEntry, Patient } from "../types";
import { Button, Icon } from "semantic-ui-react";
import EntryDetails from './EntryDetails';
import AddHealthCheckEntryModal from '../AddHealthCheckEntryModal';
import AddHospitalEntryModal from '../AddHospitalEntryModal';
import AddOccupationalEntryModal from '../AddOccupationalEntryModal';

const PatientDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const [currentPatient, setCurrentPatient] = useState<Patient>();
  const [hospitalModalOpen, setHospitalModalOpen] = useState<boolean>(false);
  const [healthCheckModalOpen, setHealthCheckModalOpen] = useState<boolean>(false);
  const [occupationalModalOpen, setOccupationalModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const openHospitalModal = (): void => {
    setHospitalModalOpen(true);
  };

  const openHealthCheckModal = (): void => {
    setHealthCheckModalOpen(true);
  };

  const openOccupationalEntryModal = (): void => {
    setOccupationalModalOpen(true);
  };

  const closeModal = (): void => {
    setHospitalModalOpen(false);
    setHealthCheckModalOpen(false);
    setOccupationalModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: NewEntry) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(`${apiBaseUrl}/patients/${currentPatient?.id}/entries`, values);
      dispatch(updatePatient(updatedPatient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

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
  }, [patients]);

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
      <AddHealthCheckEntryModal
        modalOpen={healthCheckModalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <AddHospitalEntryModal
        modalOpen={hospitalModalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <AddOccupationalEntryModal
        modalOpen={occupationalModalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openHospitalModal()}>Add New Hospital Entry</Button>
      <Button onClick={() => openHealthCheckModal()}>Add New Health Check Entry</Button>
      <Button onClick={() => openOccupationalEntryModal()}>Add New Occupational Healthcare Entry</Button>
    </div>
  );
};

export default PatientDetailsPage;