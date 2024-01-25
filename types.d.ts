import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {


  interface User {
    id?: string;
    globalName: string | null;
    discriminator?: string;
    accessToken?: string;
  }

  interface Session extends DefaultSession {
    user?: User;
  }

}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    globalName: string | null;
    discriminator?: string;
    accessToken?: string;
  }
}

import { Profile } from 'next-auth';

declare module 'next-auth' {
  interface Profile {
    id: string;
    username: string;
    discriminator: string;
    global_name: string | null;
  }
}

import { Account } from 'next-auth';