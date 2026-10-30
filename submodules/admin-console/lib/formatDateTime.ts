import { format } from 'date-fns';

export const formatDateTime = (dateTime: string) => {
  return format(new Date(dateTime), 'dd/MM/yyyy hh:mm:ss');
};
