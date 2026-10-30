import { User } from '@/types/database';

export const getInstructorsName = (instructor: User | null) => {
  if (instructor?.firstName && instructor?.lastName) {
    return `${instructor.firstName} ${instructor.lastName}`;
  } else if (instructor?.firstName) {
    return `${instructor.firstName}`;
  }
};
