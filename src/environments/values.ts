export const envValues = {
  NODE_ENV: process.env.NODE_ENV,
  isServer: typeof window === 'undefined',
}
