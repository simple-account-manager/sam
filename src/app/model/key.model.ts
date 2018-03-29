/**
 * contains title, type, created, user, pass, text
 */
export class KeyObjModel {
  title: string;
  type: string;
  created: number;
  user?: string;
  pass?: string;
  text?: string;
}

/**
 * from GUI
 */
export class PlainKeyObjModel extends KeyObjModel {
  oldTitle: string;
  skip: boolean;
}
