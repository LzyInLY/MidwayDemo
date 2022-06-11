import { Configuration, App } from '@midwayjs/decorator';
import { IMidwayContainer } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as orm from '@midwayjs/orm';
import * as axios from '@midwayjs/axios';
import * as view from '@midwayjs/view-ejs';
import * as task from '@midwayjs/task';;
// import { JiraServerService } from './services/JiraServerService';
import { join } from 'path';
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import { axiosResponseInterceptor } from './utils';

@Configuration({
  imports: [
    koa,
    validate,
    orm,
    axios,
    view,
    task,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  async onReady(container: IMidwayContainer) {
    // add middleware
    this.app.useMiddleware([ReportMiddleware]);
    const httpService = await container.getAsync(axios.HttpService);
    axiosResponseInterceptor(httpService);
  }

  async onServerReady() {
    console.log('server ready');
  }
}
