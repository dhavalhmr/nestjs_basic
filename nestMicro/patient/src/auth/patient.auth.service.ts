/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './patient.auth.dto';

const patients: CreatePatientDto[] = [];

@Injectable()
export class PatientService {
  createNewPatient(patient: CreatePatientDto) {
    const exist = patients.find(
      (p: CreatePatientDto) =>
        p.name === patient.name && p.disease === patient.disease,
    );
    if (exist) {
      return false;
    }
    patient.id === 'Patient_ ' + (patients.length + 1);
    patients.push(patient);
    return patient.id;
  }

  getPatientById(patientId: CreatePatientDto) {
    return patients.find((p: CreatePatientDto) => p.id === patientId.id);
  }

  getAllPatients(doctorId: CreatePatientDto) {}
}
