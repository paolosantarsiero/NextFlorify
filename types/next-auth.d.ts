import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      store_id: number;
      user_email: string;
      stripe_id?: string;
      token: string;
      user_email: string;
      user_nicename: string;
      user_display_name: string;
      roles: string[];
    };
  }

  interface User {
    store_id: number;
    user_email: string;
    stripe_id?: string;
    token: string;
    user_email: string;
    user_nicename: string;
    user_display_name: string;
    roles: string[];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      store_id: number;
      token: string;
      user_email: string;
      user_nicename: string;
      user_display_name: string;
      roles: string[];
    };
  }
}
