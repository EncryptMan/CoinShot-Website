import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {


  interface User {
    id?: string;
    accessToken?: string;
    accessTokenType?: string;
  }

  interface Session extends DefaultSession {
    user?: User;
  }

}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    accessToken?: string;
    accessTokenType?: string;
  }
}

import { Profile } from 'next-auth';

declare module 'next-auth' {
  interface Profile {
    username: string;
  }
}