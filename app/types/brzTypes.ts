import type { Session } from "remix";

export interface BrzLoginResponse {
  responseData: {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
  };
  session: Session;
}
