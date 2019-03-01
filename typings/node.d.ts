/// <reference types="@types/node" />

declare namespace NodeJS {
  interface Global {
    settings: {
      common: {
        DEV_MODE: Boolean;
        PORT: String | Number | '4000';
      };
    };
    __INIT_MATERIAL_UI__: any;
  }
  interface Process {
    browser: boolean;
  }
}