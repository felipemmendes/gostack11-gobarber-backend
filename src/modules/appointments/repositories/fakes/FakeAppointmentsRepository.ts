import { uuid } from 'uuidv4';
import { isEqual, getYear, getMonth, getDate } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAvailabilityInMonthDTO from '@modules/appointments/dtos/IFindAvailabilityInMonthDTO';
import IFindAvailabilityInDayDTO from '@modules/appointments/dtos/IFindAvailabilityInDayDTO';
import IFindByDateDTO from '@modules/appointments/dtos/IFindByDateDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class AppointmentsRepositories implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate({
    provider_id,
    date,
  }: IFindByDateDTO): Promise<Appointment | undefined> {
    const findAppointent = this.appointments.find(
      (appointment) =>
        isEqual(appointment.date, date) &&
        provider_id === appointment.provider_id,
    );

    return findAppointent;
  }

  public async findAvailabilityInMonth({
    provider_id,
    month,
    year,
  }: IFindAvailabilityInMonthDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      (appointment) =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }

  public async findAvailabilityInDay({
    provider_id,
    day,
    month,
    year,
  }: IFindAvailabilityInDayDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      (appointment) =>
        appointment.provider_id === provider_id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, {
      id: uuid(),
      date,
      provider_id,
      user_id,
    });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepositories;
