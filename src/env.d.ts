declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ESRGAN_DOWNLOAD_URL: string
    }
  }
}
export {}
