import { Controller } from '@nestjs/common';
import { PatientService } from './patient.auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreatePatientDto } from './patient.auth.dto';

function delay(ms) {
  const start = new Date().getTime();
  let end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

@Controller()
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @MessagePattern({ cmd: 'new_patient' })
  createPatient(patient: CreatePatientDto) {
    console.log('PatientController  patient:', patient);
    // delay(10000);
    const result = this.patientService.createNewPatient(patient);
    if (result) {
      return result;
    } else {
      return 'Patient Already Exist';
    }
  }

  @MessagePattern({ cmd: 'get_patient' })
  getPatient(patientId: CreatePatientDto) {
    return this.patientService.getPatientById(patientId);
  }

  @MessagePattern({ cmd: 'get_patients' })
  getPatients(doctorId: CreatePatientDto) {
    return this.patientService.getAllPatients(doctorId);
  }
}
