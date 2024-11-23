import { Controller, Get, Put, Post, Delete, Body, Param, BadRequestException, NotFoundException } from '@nestjs/common';
import { ConsultationService } from 'src/consultation/consultation.service';
import { CreateConsultationDto } from 'src/consultation/dto/create-consultation.dto';
import { UpdateConsultationDto } from 'src/consultation/dto/update-consultation.dto';

import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Consultation')
@ApiBearerAuth()
@Controller('api/consultations')
export class ConsultationController {
  constructor(private readonly consultationService: ConsultationService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new consultation' })
  @ApiBody({ type: CreateConsultationDto })
  async create(@Body() createConsultationDto: CreateConsultationDto) {
    return this.consultationService.create(createConsultationDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing consultation' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateConsultationDto })
  async update(@Param('id') id: number, @Body() updateConsultationDto: UpdateConsultationDto) {
    return this.consultationService.update(id, updateConsultationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a consultation by ID' })
  @ApiParam({ name: 'id', type: Number })
  async findOne(@Param('id') id: number) {
    return this.consultationService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a consultation by ID' })
  @ApiParam({ name: 'id', type: Number })
  async remove(@Param('id') id: number) {
    return this.consultationService.remove(id);
  }

  @Get('patient/:patientId')
  @ApiOperation({ summary: 'Get all consultations of a patient' })
  @ApiParam({ name: 'patientId', type: Number })
  async getConsultationsByPatient(@Param('patientId') patientId: number) {
    try {
      return await this.consultationService.getConsultationsByPatient(patientId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException('Error retrieving consultations for patient');
    }
  }

  @Get('doctor/:doctorId')
  @ApiOperation({ summary: 'Get all consultations of a doctor' })
  @ApiParam({ name: 'doctorId', type: Number })
  async getConsultationsByDoctor(@Param('doctorId') doctorId: number) {
    try {
      return await this.consultationService.getConsultationsByDoctor(doctorId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException('Error retrieving consultations for doctor');
    }
  }
}