declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MONGODB: string;
            NODE_ENV: 'development' | 'production';
            PORT?: string;
        }
    }
}

export { }