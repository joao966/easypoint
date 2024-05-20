import 'dotenv/config';

const { AME_BASE_URL, AME_ENV, AME_VERSION } = process.env;

export const createAmeUrl = (api: string, resource: string) =>
  `${AME_BASE_URL}/${AME_ENV}/${api}/${AME_VERSION}/${resource}`;
