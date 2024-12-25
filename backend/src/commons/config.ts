import { ConfigModule } from '@nestjs/config';

interface IOption {
  isRequired?: boolean;
  defaultValue?: any;
}

ConfigModule.forRoot();
export const getEnvVariable = (
  name: string,
  options: IOption = { isRequired: false },
) => {
  const { isRequired } = options || {};
  const value = process.env[name];
  if (!value && isRequired) {
    console.error(`ENV variable ${name} is required`);
    process.exit(1);
  }
  // eslint-disable-next-line no-prototype-builtins
  if (!value && options && options.hasOwnProperty('defaultValue')) {
    return options.defaultValue;
  }
  return value;
};

export const config = {
  port: getEnvVariable('PORT', { defaultValue: 3001 }),
  mode: getEnvVariable('MODE', { defaultValue: 'DEV' }),
  db: {
    username: getEnvVariable('DB_USERNAME', { isRequired: true }),
    password: getEnvVariable('DB_PASSWORD') || '',
    host: getEnvVariable('DB_HOST', { isRequired: true }),
    port: getEnvVariable('DB_PORT', { defaultValue: 9002 }),
    database: getEnvVariable('DB_DATABASE', {
      defaultValue: 'stuparv_nodedemo',
    }),
  },
  accessKey: getEnvVariable('ACCESS_SECRET_KEY', { isRequired: true }),
  refreshKey: getEnvVariable('REFRESH_SECRET_KEY', { isRequired: true }),
};
