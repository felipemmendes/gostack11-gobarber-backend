import { injectable, inject } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepository';

interface Request {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class LitsProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: AppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: Request): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAvailabilityInDay(
      {
        provider_id,
        day,
        month,
        year,
      },
    );

    const hourStart = 8;

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    const currentDate = new Date(Date.now());

    const availability = eachHourArray.map((hour) => {
      const hourInnavailability = appointments.find(
        (appointment) => getHours(appointment.date) === hour,
      );

      const compareDate = new Date(year, month - 1, day, hour);

      return {
        available: !hourInnavailability && isAfter(compareDate, currentDate),
        hour,
      };
    });

    return availability;
  }
}

export default LitsProviderDayAvailabilityService;
