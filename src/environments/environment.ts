// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  url: 'http://localhost:8091/',
  apiUrl: 'http://localhost:8091/api/',
  resourceEndpoint: 'https://laplumedor.s3.eu-central-1.amazonaws.com/',
  landingPageUrl: 'https://www.laplumedor.net/',
  websocketUrl: 'ws://localhost:8091/api/ws',
};
