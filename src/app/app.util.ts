import {environment} from "../environments/environment";

export const am_console = {
  log: (msg: string, obj?: any) => {
    if (!environment.production) {
      if (typeof obj === 'undefined') {
        console.log(msg);
      } else {
        console.log(msg, obj);
      }
    }
  },

}
