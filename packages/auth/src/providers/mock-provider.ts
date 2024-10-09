import type { OAuth2Provider } from "arctic"
import { OAuth2Client } from "oslo/oauth2"

export interface MockJWTPayload {
  iss: string
  iat: number
  exp: number
  nbf: number
  sub: string
  amr: string[]
  scope: string
}

export class MockProvider implements OAuth2Provider {
  private client: OAuth2Client
  private clientSecret: string
  private baseUrl: string
  constructor(
    clientId: string,
    clientSecret: string,
    options: {
      redirectURI?: string
      baseUrl: string
    },
  ) {
    const baseUrl = options.baseUrl

    this.baseUrl = baseUrl

    const authorizeEndpoint = baseUrl + "/authorize"
    const tokenEndpoint = baseUrl + "/token"

    this.client = new OAuth2Client(clientId, authorizeEndpoint, tokenEndpoint, {
      redirectURI: options.redirectURI,
    })
    this.clientSecret = clientSecret
  }

  public getBaseUrl() {
    return this.baseUrl
  }

  public async createAuthorizationURL(
    state: string,
    options?: {
      scopes?: string[]
    },
  ): Promise<URL> {
    return await this.client.createAuthorizationURL({
      state,
      scopes: options?.scopes ?? [],
    })
  }

  public async validateAuthorizationCode(code: string): Promise<MockTokens> {
    const result = await this.client.validateAuthorizationCode(code, {
      authenticateWith: "request_body",
      credentials: this.clientSecret,
    })
    const tokens: MockTokens = {
      accessToken: result.access_token,
    }
    return tokens
  }
}

export interface MockTokens {
  accessToken: string
}
