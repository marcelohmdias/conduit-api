declare global {
  /* eslint-disable no-unused-vars */
  namespace NodeJS {
    interface ProcessEnv {
      ADAPTER: string
      APP_NAME: string
      PORT: string
    }
  }
}

export {}
