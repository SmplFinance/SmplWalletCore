/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Wallet } from "../smplsecretsvaultchain/wallet";

export const protobufPackage =
  "SmplEcosystem.smplsecretsvaultchain.smplsecretsvaultchain";

export interface MsgStoreWallet {
  creator: string;
  name: string;
  wallet?: Wallet;
  passphrase: string;
}

export interface MsgStoreWalletResponse {}

function createBaseMsgStoreWallet(): MsgStoreWallet {
  return { creator: "", name: "", wallet: undefined, passphrase: "" };
}

export const MsgStoreWallet = {
  encode(
    message: MsgStoreWallet,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.wallet !== undefined) {
      Wallet.encode(message.wallet, writer.uint32(26).fork()).ldelim();
    }
    if (message.passphrase !== "") {
      writer.uint32(34).string(message.passphrase);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgStoreWallet {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStoreWallet();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.wallet = Wallet.decode(reader, reader.uint32());
          break;
        case 4:
          message.passphrase = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgStoreWallet {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      name: isSet(object.name) ? String(object.name) : "",
      wallet: isSet(object.wallet) ? Wallet.fromJSON(object.wallet) : undefined,
      passphrase: isSet(object.passphrase) ? String(object.passphrase) : "",
    };
  },

  toJSON(message: MsgStoreWallet): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.name !== undefined && (obj.name = message.name);
    message.wallet !== undefined &&
      (obj.wallet = message.wallet ? Wallet.toJSON(message.wallet) : undefined);
    message.passphrase !== undefined && (obj.passphrase = message.passphrase);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgStoreWallet>, I>>(
    object: I
  ): MsgStoreWallet {
    const message = createBaseMsgStoreWallet();
    message.creator = object.creator ?? "";
    message.name = object.name ?? "";
    message.wallet =
      object.wallet !== undefined && object.wallet !== null
        ? Wallet.fromPartial(object.wallet)
        : undefined;
    message.passphrase = object.passphrase ?? "";
    return message;
  },
};

function createBaseMsgStoreWalletResponse(): MsgStoreWalletResponse {
  return {};
}

export const MsgStoreWalletResponse = {
  encode(
    _: MsgStoreWalletResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgStoreWalletResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStoreWalletResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgStoreWalletResponse {
    return {};
  },

  toJSON(_: MsgStoreWalletResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgStoreWalletResponse>, I>>(
    _: I
  ): MsgStoreWalletResponse {
    const message = createBaseMsgStoreWalletResponse();
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  /** this line is used by starport scaffolding # proto/tx/rpc */
  StoreWallet(request: MsgStoreWallet): Promise<MsgStoreWalletResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.StoreWallet = this.StoreWallet.bind(this);
  }
  StoreWallet(request: MsgStoreWallet): Promise<MsgStoreWalletResponse> {
    const data = MsgStoreWallet.encode(request).finish();
    const promise = this.rpc.request(
      "SmplEcosystem.smplsecretsvaultchain.smplsecretsvaultchain.Msg",
      "StoreWallet",
      data
    );
    return promise.then((data) =>
      MsgStoreWalletResponse.decode(new _m0.Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

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
