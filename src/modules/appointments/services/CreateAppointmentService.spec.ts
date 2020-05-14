import AppError from '@shared/errors/AppError';

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: '987654321',
      provider_id: '123456789',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456789');
  });

  it('should not be able to create two appointment on the same date', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11, 1, 0);

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 10).getTime();
    });

    await createAppointment.execute({
      date: appointmentDate,
      user_id: '987654321',
      provider_id: '123456789',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: '987654321',
        provider_id: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        user_id: '987654321',
        provider_id: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with self', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        user_id: '123456789',
        provider_id: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 7),
        user_id: '123456789',
        provider_id: '987654321',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 18),
        user_id: '123456789',
        provider_id: '987654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
