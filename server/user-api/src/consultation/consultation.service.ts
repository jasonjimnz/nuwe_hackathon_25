import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consultation } from 'src/consultation/entities/consultation.entity';
import { CreateConsultationDto } from 'src/consultation/dto/create-consultation.dto';
import { UpdateConsultationDto } from 'src/consultation/dto/update-consultation.dto';
import { UserService } from 'src/user/user.service';
import { Role } from 'src/enums/role';

@Injectable()
export class ConsultationService {
  constructor(
    @InjectRepository(Consultation)
    private readonly consultationRepository: Repository<Consultation>,
    private readonly userService: UserService,
  ) { }

  async create(createConsultationDto: CreateConsultationDto): Promise<Consultation> {
    const { patientId, doctorId, date } = createConsultationDto;

    const patient = await this.userService.findById(patientId);
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    const doctor = await this.userService.findById(doctorId);
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    if (patient.role !== Role.Patient) {
      throw new BadRequestException('The user is not a valid patient');
    }

    if (doctor.role !== Role.Doctor) {
      throw new BadRequestException('The user is not a valid doctor');
    }

    if (patientId === doctorId) {
      throw new BadRequestException('A user cannot be both the doctor and the patient');
    }

    const openConsultations = await this.consultationRepository.find({
      where: { patient: { id: patientId }, isCompleted: false },
    });
    if (openConsultations.length > 0) {
      throw new BadRequestException('Patient has open consultations');
    }

    const consultation = this.consultationRepository.create({
      patient,
      doctor,
      date: new Date(date),
      isCompleted: false,
    });

    try {
      return await this.consultationRepository.save(consultation);
    } catch (error) {
      throw new BadRequestException('Error creating consultation');
    }
  }

  async update(id: number, updateConsultationDto: UpdateConsultationDto): Promise<Consultation> {
    const consultation = await this.consultationRepository.findOne({ where: { id } });
    if (!consultation) {
      throw new NotFoundException('Consultation not found');
    }

    if (consultation.isCompleted) {
      throw new BadRequestException('Cannot update a completed consultation');
    }

    const { patientId, doctorId, date } = updateConsultationDto;

    if (patientId) {
      const patient = await this.userService.findById(patientId);
      if (!patient) {
        throw new NotFoundException('Patient not found');
      }
      if (patient.role !== Role.Patient) {
        throw new BadRequestException('The user is not a valid patient');
      }
      consultation.patient = patient;
    }

    if (doctorId) {
      const doctor = await this.userService.findById(doctorId);
      if (!doctor) {
        throw new NotFoundException('Doctor not found');
      }
      if (doctor.role !== Role.Doctor) {
        throw new BadRequestException('The user is not a valid doctor');
      }
      consultation.doctor = doctor;
    }

    if (date) {
      consultation.date = new Date(date);
    }

    Object.assign(consultation, updateConsultationDto);

    try {
      return await this.consultationRepository.save(consultation);
    } catch (error) {
      throw new BadRequestException('Error updating consultation');
    }
  }

  async findOne(id: number): Promise<Consultation> {
    const consultation = await this.consultationRepository.findOne({ where: { id } });
    if (!consultation) {
      throw new NotFoundException('Consultation not found');
    }
    return consultation;
  }

  async remove(id: number): Promise<void> {
    const consultation = await this.consultationRepository.findOne({ where: { id } });
    if (!consultation) {
      throw new NotFoundException('Consultation not found');
    }
    await this.consultationRepository.remove(consultation);
  }

  async getConsultationsByPatient(patientId: number): Promise<Consultation[]> {
    const consultations = await this.consultationRepository.find({
      where: { patient: { id: patientId } },
      relations: ['doctor', 'messages'],
    });

    if (!consultations || consultations.length === 0) {
      throw new NotFoundException('No consultations found for this patient');
    }

    return consultations;
  }

  async getConsultationsByDoctor(doctorId: number): Promise<Consultation[]> {
    const consultations = await this.consultationRepository.find({
      where: { doctor: { id: doctorId } },
      relations: ['patient', 'messages'],
    });

    if (!consultations || consultations.length === 0) {
      throw new NotFoundException('No consultations found for this doctor');
    }

    return consultations;
  }
}