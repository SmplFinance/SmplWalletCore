/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { WalletStorage } from "../smplsecretsvaultchain/wallet_storage";

export const protobufPackage =
  "SmplEcosystem.smplsecretsvaultchain.smplsecretsvaultchain";

export interface Wallets {
  owner: string;
  walletStorageMap: { [key: string]: WalletStorage };
  testPhrase: string;
  encryptedTestPhrase: string;
}

export interface Wallets_WalletStorageMapEntry {
  key: string;
  value?: WalletStorage;
}

function createBaseWallets(): Wallets {
  return {
    owner: "",
    walletStorageMap: {},
    testPhrase: "",
    encryptedTestPhrase: "",
  };
}

export const Wallets = {
  encode(
    message: Wallets,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    Object.entries(message.walletStorageMap).forEach(([key, value]) => {
      Wallets_WalletStorageMapEntry.encode(
        { key: key as any, value },
        writer.uint32(18).fork()
      ).ldelim();
    });
    if (message.testPhrase !== "") {
      writer.uint32(26).string(message.testPhrase);
    }
    if (message.encryptedTestPhrase !== "") {
      writer.uint32(34).string(message.encryptedTestPhrase);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Wallets {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWallets();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          const entry2 = Wallets_WalletStorageMapEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry2.value !== undefined) {
            message.walletStorageMap[entry2.key] = entry2.value;
          }
          break;
        case 3:
          message.testPhrase = reader.string();
          break;
        case 4:
          message.encryptedTestPhrase = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Wallets {
    return {
      owner: isSet(object.owner) ? String(object.owner) : "",
      walletStorageMap: isObject(object.walletStorageMap)
        ? Object.entries(object.walletStorageMap).reduce<{
            [key: string]: WalletStorage;
          }>((acc, [key, value]) => {
            acc[key] = WalletStorage.fromJSON(value);
            return acc;
          }, {})
        : {},
      testPhrase: isSet(object.testPhrase) ? String(object.testPhrase) : "",
      encryptedTestPhrase: isSet(object.encryptedTestPhrase)
        ? String(object.encryptedTestPhrase)
        : "",
    };
  },

  toJSON(message: Wallets): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner);
    obj.walletStorageMap = {};
    if (message.walletStorageMap) {
      Object.entries(message.walletStorageMap).forEach(([k, v]) => {
        obj.walletStorageMap[k] = WalletStorage.toJSON(v);
      });
    }
    message.testPhrase !== undefined && (obj.testPhrase = message.testPhrase);
    message.encryptedTestPhrase !== undefined &&
      (obj.encryptedTestPhrase = message.encryptedTestPhrase);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Wallets>, I>>(object: I): Wallets {
    const message = createBaseWallets();
    message.owner = object.owner ?? "";
    message.walletStorageMap = Object.entries(
      object.walletStorageMap ?? {}
    ).reduce<{ [key: string]: WalletStorage }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = WalletStorage.fromPartial(value);
      }
      return acc;
    }, {});
    message.testPhrase = object.testPhrase ?? "";
    message.encryptedTestPhrase = object.encryptedTestPhrase ?? "";
    return message;
  },
};

function createBaseWallets_WalletStorageMapEntry(): Wallets_WalletStorageMapEntry {
  return { key: "", value: undefined };
}

export const Wallets_WalletStorageMapEntry = {
  encode(
    message: Wallets_WalletStorageMapEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      WalletStorage.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): Wallets_WalletStorageMapEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWallets_WalletStorageMapEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = WalletStorage.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Wallets_WalletStorageMapEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value)
        ? WalletStorage.fromJSON(object.value)
        : undefined,
    };
  },

  toJSON(message: Wallets_WalletStorageMapEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value
        ? WalletStorage.toJSON(message.value)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Wallets_WalletStorageMapEntry>, I>>(
    object: I
  ): Wallets_WalletStorageMapEntry {
    const message = createBaseWallets_WalletStorageMapEntry();
    message.key = object.key ?? "";
    message.value =
      object.value !== undefined && object.value !== null
        ? WalletStorage.fromPartial(object.value)
        : undefined;
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

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
