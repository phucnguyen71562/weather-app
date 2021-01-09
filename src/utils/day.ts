const SIXTY_SECONDS = 60_000;
const ONE_HOUR = 3_600_000;
const TWENTY_FOUR_HOURS = 86_400_000;

export const diffMinsFromNow = (time: number) =>
  Math.floor(
    (((Date.now() - time) % TWENTY_FOUR_HOURS) % ONE_HOUR) / SIXTY_SECONDS
  );

export const diffDaysFromNow = (time: number) =>
  Math.floor((Date.now() - time) / TWENTY_FOUR_HOURS);

export const isDifferentDay = (time: number) =>
  new Date().toDateString() !== new Date(time).toDateString();
