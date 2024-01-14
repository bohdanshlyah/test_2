import { UserRoles } from '@shared/enums';

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  telegramUsername?: string;
  avatar?: {
    prefix: string;
    image: string;
  };
  id: string;
  urls: string[];
  role: UserRoles;
};
