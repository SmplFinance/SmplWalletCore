/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage =
  "SmplEcosystem.smplsecretsvaultchain.smplsecretsvaultchain";

export interface Wallet {
  mnemonic: string[];
  prefix: string;
  hdpath: string;
  chainSymbol: string;
}

function createBaseWallet(): Wallet {
  return { mnemonic: [], prefix: "", hdpath: "", chainSymbol: "" };
}

export const Wallet = {
  encode(
    message: Wallet,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.mnemonic) {
      writer.uint32(10).string(v!);
    }
    if (message.prefix !== "") {
      writer.uint32(18).string(message.prefix);
    }
    if (message.hdpath !== "") {
      writer.uint32(26).string(message.hdpath);
    }
    if (message.chainSymbol !== "") {
      writer.uint32(34).string(message.chainSymbol);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Wallet {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWallet();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.mnemonic.push(reader.string());
          break;
        case 2:
          message.prefix = reader.string();
          break;
        case 3:
          message.hdpath = reader.string();
          break;
        case 4:
          message.chainSymbol = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Wallet {
    return {
      mnemonic: Array.isArray(object?.mnemonic)
        ? object.mnemonic.map((e: any) => String(e))
        : [],
      prefix: isSet(object.prefix) ? String(object.prefix) : "",
      hdpath: isSet(object.hdpath) ? String(object.hdpath) : "",
      chainSymbol: isSet(object.chainSymbol) ? String(object.chainSymbol) : "",
    };
  },

  toJSON(message: Wallet): unknown {
    const obj: any = {};
    if (message.mnemonic) {
      obj.mnemonic = message.mnemonic.map((e) => e);
    } else {
      obj.mnemonic = [];
    }
    message.prefix !== undefined && (obj.prefix = message.prefix);
    message.hdpath !== undefined && (obj.hdpath = message.hdpath);
    message.chainSymbol !== undefined &&
      (obj.chainSymbol = message.chainSymbol);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Wallet>, I>>(object: I): Wallet {
    const message = createBaseWallet();
    message.mnemonic = object.mnemonic?.map((e) => e) || [];
    message.prefix = object.prefix ?? "";
    message.hdpath = object.hdpath ?? "";
    message.chainSymbol = object.chainSymbol ?? "";
    return message;
  },
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Long
  ? string | number | Long
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
