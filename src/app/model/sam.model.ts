import { KeyObjModel } from "app/model/key.model";

export class SamModel {
  loginCount: number;
  mapData = new Map<number, KeyObjModel>();
  encryptedData: string;
  version: string;
}