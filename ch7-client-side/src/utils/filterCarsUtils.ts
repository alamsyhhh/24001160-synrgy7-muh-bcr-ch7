import { Car, DriverType } from '../types/carTypes';

export const filterCars = (
  cars: Car[],
  date: string,
  time: string,
  passengerCount: string,
  driverType: DriverType | ''
): Car[] => {
  return cars.filter((car) => {
    const carAvailableAt = new Date(car.availableAt);

    const selectedDate = date ? new Date(date) : null;
    const matchesDate =
      !selectedDate ||
      carAvailableAt.toDateString() === selectedDate.toDateString();

    const selectedTime = time ? new Date(`2000-01-01T${time}:00Z`) : null;
    const matchesTime =
      !selectedTime ||
      carAvailableAt.getUTCHours() === selectedTime.getUTCHours();

    const matchesPassengers =
      !passengerCount || car.capacity >= parseInt(passengerCount);

    const matchesDriverType = !driverType || car.driverType === driverType;

    console.log(
      `Filtering car: ${car.id}, Available At: ${car.availableAt}, Matches Date: ${matchesDate}, Matches Time: ${matchesTime}, Matches Passengers: ${matchesPassengers}, Matches Driver Type: ${matchesDriverType}`
    );

    return matchesDate && matchesTime && matchesPassengers && matchesDriverType;
  });
};
