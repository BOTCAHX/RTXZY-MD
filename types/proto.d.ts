/** Runtime `proto.WebMessageInfo.create/fromObject/toJSON` not present in the generated types. */
export interface WaProtoWebMessageInfo {
  key?: Record<string, unknown>;
  message?: Record<string, unknown>;
  messageTimestamp?: number | string;
  pushName?: string;
  participant?: string;
  [key: string]: unknown;
  toJSON(): Record<string, unknown>;
}

export interface WaProtoWebMessageInfoCtor {
  new (properties?: Record<string, unknown>): WaProtoWebMessageInfo;
  prototype: WaProtoWebMessageInfo;
  create(object: Record<string, unknown>): WaProtoWebMessageInfo;
  fromObject(object: Record<string, unknown>): WaProtoWebMessageInfo;
  toObject(object: WaProtoWebMessageInfo): Record<string, unknown>;
}

export type WaProtoWebMessageInfoClass = typeof import('zapo-js').proto.WebMessageInfo &
  WaProtoWebMessageInfoCtor;

export interface WaProtoMessageClass {
  create(object?: Record<string, unknown>): WaProtoWebMessageInfo;
  fromObject(object: Record<string, unknown>): WaProtoWebMessageInfo;
}
