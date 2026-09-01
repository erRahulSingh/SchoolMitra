import { AxiosInstance } from 'axios';

// Add types here later or import from @schoolmitra/types
export interface LoginCredentials {
  email: string;
  password?: string;
  role?: string;
  schoolId?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: {
      id: string;
      name: string;
      role: string;
      schoolId?: string;
    };
    permissions: string[];
  };
}

export class AuthAPI {
  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.client.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  }

  async getSession(): Promise<any> {
    const response = await this.client.get('/auth/session');
    return response.data;
  }

  async logout(refreshToken: string): Promise<any> {
    const response = await this.client.post('/auth/logout', { refreshToken });
    return response.data;
  }
}
