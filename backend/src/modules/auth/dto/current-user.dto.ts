export class CurrentUserDto {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  status: boolean;
  type: 'USER' | 'ASSOCIATE' | 'ADMIN';
  created_at: number;
  updated_at: number;
  created_by: number;
}
