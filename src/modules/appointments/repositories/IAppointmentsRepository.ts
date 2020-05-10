import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAvailabilityInMonthDTO from '@modules/appointments/dtos/IFindAvailabilityInMonthDTO';
import IFindAvailabilityInDayDTO from '@modules/appointments/dtos/IFindAvailabilityInDayDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAvailabilityInMonth(
    data: IFindAvailabilityInMonthDTO,
  ): Promise<Appointment[]>;
  findAvailabilityInDay(
    data: IFindAvailabilityInDayDTO,
  ): Promise<Appointment[]>;
}
