declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ESRGAN_DOWNLOAD_URL: string
      ESRGAN_FOLDER_NAME: string
    }
  }
}
export {}
