import type { WaClient } from 'zapo-js';

declare module 'zapo-js' {
  interface WaClient {
    /** `true` after the `auth_pairing_required` event is received. */
    _zapoPairingReady?: boolean;
    getCredentials?(): { meLid?: string; me?: { lid?: string; id?: string }; meJid?: string; [key: string]: unknown };
    group: WaClient['group'] & {
      setSetting(jid: string, setting: string, value: boolean): Promise<unknown>;
      createGroup(subject: string, participants: string[], options?: Record<string, unknown>): Promise<Record<string, unknown>>;
    };
    profile: WaClient['profile'] & {
      getStatus(jid: string): Promise<{ status?: string; setAt?: number; [key: string]: unknown }>;
      getProfilePicture(jid: string, type?: string): Promise<{ url?: string; [key: string]: unknown }>;
    };
    presence: WaClient['presence'] & {
      sendChatstate(jid: string, opts: { state: string; [key: string]: unknown }): Promise<unknown>;
    };
    message: WaClient['message'] & {
      sendReceipt(jid: string, ids: string[], opts?: Record<string, unknown>): Promise<unknown>;
    };
    chat: WaClient['chat'] & {
      deleteChat(jid: string): Promise<unknown>;
      clearChat(jid: string): Promise<unknown>;
    };
    lowlevel: WaClient['lowlevel'] & {
      query(node: unknown): Promise<unknown>;
    };
  }
}

export {};
