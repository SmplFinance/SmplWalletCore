/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Wallet } from "../smplsecretsvaultchain/wallet";

export const protobufPackage =
  "SmplEcosystem.smplsecretsvaultchain.smplsecretsvaultchain";

export interface WalletStorage {
  wallet?: Wallet;
  testPhrase: string;
  encryptedTestPhrase: string;
}

function createBaseWalletStorage(): WalletStorage {
  return { wallet: undefined, testPhrase: "", encryptedTestPhrase: "" };
}

export const WalletStorage = {
  encode(
    message: WalletStorage,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.wallet !== undefined) {
      Wallet.encode(message.wallet, writer.uint32(10).fork()).ldelim();
    }
    if (message.testPhrase !== "") {
      writer.uint32(18).string(message.testPhrase);
    }
    if (message.encryptedTestPhrase !== "") {
      writer.uint32(26).string(message.encryptedTestPhrase);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WalletStorage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWalletStorage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.wallet = Wallet.decode(reader, reader.uint32());
          break;
        case 2:
          message.testPhrase = reader.string();
          break;
        case 3:
          message.encryptedTestPhrase = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WalletStorage {
    return {
      wallet: isSet(object.wallet) ? Wallet.fromJSON(object.wallet) : undefined,
      testPhrase: isSet(object.testPhrase) ? String(object.testPhrase) : "",
      encryptedTestPhrase: isSet(object.encryptedTestPhrase)
        ? String(object.encryptedTestPhrase)
        : "",
    };
  },

  toJSON(message: WalletStorage): unknown {
    const obj: any = {};
    message.wallet !== undefined &&
      (obj.wallet = message.wallet ? Wallet.toJSON(message.wallet) : undefined);
    message.testPhrase !== undefined && (obj.testPhrase = message.testPhrase);
    message.encryptedTestPhrase !== undefined &&
      (obj.encryptedTestPhrase = message.encryptedTestPhrase);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WalletStorage>, I>>(
    object: I
  ): WalletStorage {
    const message = createBaseWalletStorage();
    message.wallet =
      object.wallet !== undefined && object.wallet !== null
        ? Wallet.fromPartial(object.wallet)
        : undefined;
    message.testPhrase = object.testPhrase ?? "";
    message.encryptedTestPhrase = object.encryptedTestPhrase ?? "";
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
