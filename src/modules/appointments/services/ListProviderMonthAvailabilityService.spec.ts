import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it("should be able to list provider's month availability", async () => {
    await fakeAppointmentsRepository.create({
      provider_id: '123456789',
      user_id: '987654321',
      date: new Date(2030, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123456789',
      user_id: '987654321',
      date: new Date(2030, 4, 20, 9, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123456789',
      user_id: '987654321',
      date: new Date(2030, 4, 20, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123456789',
      user_id: '987654321',
      date: new Date(2030, 4, 20, 11, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123456789',
      user_id: '987654321',
      date: new Date(2030, 4, 20, 12, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123456789',
      user_id: '987654321',
      date: new Date(2030, 4, 20, 13, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123456789',
      user_id: '987654321',
      date: new Date(2030, 4, 20, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123456789',
      user_id: '987654321',
      date: new Date(2030, 4, 20, 15, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123456789',
      user_id: '987654321',
      date: new Date(2030, 4, 20, 16, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123456789',
      user_id: '987654321',
      date: new Date(2030, 4, 20, 17, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123456789',
      user_id: '987654321',
      date: new Date(2030, 4, 21, 17, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: '123456789',
      year: 2030,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
      ]),
    );
  });
});
