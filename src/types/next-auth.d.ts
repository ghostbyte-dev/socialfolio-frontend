declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      jwt: string;
    }
  }
}