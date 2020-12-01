import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import CreateAppointmentDTO from '@modules/appointments/dtos/CreateAppointmentDTO';
import FindAvailabilityInMonthDTO from '@modules/appointments/dtos/FindAvailabilityInMonthDTO';
import FindAvailabilityInDayDTO from '@modules/appointments/dtos/FindAvailabilityInDayDTO';
import FindByDateDTO from '@modules/appointments/dtos/FindByDateDTO';

export default interface AppointmentsRepositoryType {
  create(data: CreateAppointmentDTO): Promise<Appointment>;
  findByDate(data: FindByDateDTO): Promise<Appointment | undefined>;
  findAvailabilityInMonth(
    data: FindAvailabilityInMonthDTO,
  ): Promise<Appointment[]>;
  findAvailabilityInDay(data: FindAvailabilityInDayDTO): Promise<Appointment[]>;
}
