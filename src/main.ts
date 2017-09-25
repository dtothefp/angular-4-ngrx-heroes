import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'reflect-metadata';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);

function logType() {
  return (target : any, key : string) => {
    var t = Reflect.getMetadata('design:type', target, key);

    console.log(`${key} type: ${t.name}`);
  };
}

class Demo{
  @logType() // apply property decorator
  public attr1 : string;
}
