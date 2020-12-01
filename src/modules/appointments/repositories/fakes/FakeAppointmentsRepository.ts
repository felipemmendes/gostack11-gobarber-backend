import { uuid } from 'uuidv4';
import { isEqual, getYear, getMonth, getDate } from 'date-fns';

import AppointmentsRepositoryType from '@modules/appointments/repositories/AppointmentsRepository';
import CreateAppointmentDTO from '@modules/appointments/dtos/CreateAppointmentDTO';
import FindAvailabilityInMonthDTO from '@modules/appointments/dtos/FindAvailabilityInMonthDTO';
import FindAvailabilityInDayDTO from '@modules/appointments/dtos/FindAvailabilityInDayDTO';
import FindByDateDTO from '@modules/appointments/dtos/FindByDateDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class AppointmentsRepository implements AppointmentsRepositoryType {
  private appointments: Appointment[] = [];

  public async findByDate({
    provider_id,
    date,
  }: FindByDateDTO): Promise<Appointment | undefined> {
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
  }: FindAvailabilityInMonthDTO): Promise<Appointment[]> {
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
  }: FindAvailabilityInDayDTO): Promise<Appointment[]> {
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
  }: CreateAppointmentDTO): Promise<Appointment> {
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

export default AppointmentsRepository;
