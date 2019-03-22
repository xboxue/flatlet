declare module 'passport-google-token' {
  import { Request } from 'express';

  export interface StrategyOptions {
    clientID: string;
    clientSecret: string;
    authorizationURL?: string;
    tokenURL?: string;
  }

  export interface StrategyOptionsWithRequest extends StrategyOptions {
    passReqToCallback: true;
  }

  export interface VerifyOptions {
    message: string;
  }

  export type VerifyCallback = (
    error: any,
    user?: any,
    options?: VerifyOptions
  ) => void;

  export type VerifyFunctionWithRequest = (
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ) => void;

  export type VerifyFunction = (
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ) => void;

  export class Strategy implements Strategy {
    name: string;
    authenticate: (req: Request, options?: object) => void;

    constructor(
      options: StrategyOptionsWithRequest,
      verify: VerifyFunctionWithRequest
    );
    constructor(options: StrategyOptions, verify: VerifyFunction);
    constructor(verify: VerifyFunction);
  }
}
