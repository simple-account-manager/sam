import { KeyObjModel } from "app/model/key.model";

export class SamModel {
  loginCount = 0;
  mapData = new Map<number, KeyObjModel>();
  encryptedData: string;
  version: string;
}