import { MidwayConfig } from '@midwayjs/core';

export default (appInfo) : MidwayConfig => {
  const { baseDir } = appInfo;

  return {
    // use for cookie sign key, should change to your own and keep security
    keys: '1647422065278_1234123',
    koa: {
      port: 8201,
    },
    view: {
      root: `${baseDir}/view`,
      mapping: {
        '.ejs': 'ejs'
      }
    },
    ejs: {},
    orm: {
      "type": "mysql",
      "host": "localhost",
      "port": 3306,
      "username": "root",
      "password": "123456",
      "database": "midway_test",
      "synchronize": true,
      "logging": true,
      "entities": [
        `${baseDir}/entities/*.js`,
      ],
      // "migrations": [
      //    "src/migration/**/*.ts"
      // ],
      // "subscribers": [
      //    "src/subscriber/**/*.ts"
      // ],
      // "cli": {
      //    "entitiesDir": "src/entity",
      //    "migrationsDir": "src/migration",
      //    "subscribersDir": "src/subscriber"
      // }
    }
  };
};
