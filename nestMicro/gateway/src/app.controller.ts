import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePatientDto } from './patient.dto';

@Controller()
export class AppController {
  constructor(@Inject('PATIENT_SERVICE') private client: ClientProxy) {}

  @Get()
  getAllPatients() {
    return this.client.send({ cmd: 'get_patients' }, {});
  }

  @Get(':id')
  getAllPatientById(@Param('id') id) {
    return this.client.send({ cmd: 'get_patient' }, id);
  }

  @Post()
  createPatient(@Body() patient: CreatePatientDto) {
    console.log('calling');
    return this.client.send({ cmd: 'new_patient' }, patient);
  }
}
