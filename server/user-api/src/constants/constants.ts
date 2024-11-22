import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const Auth = {
    PASSWORD_SALT: parseInt(process.env.PASSWORD_SALT, 10) || 10,
};

export const ApiHost = {
    HOST: process.env.API_HOST || 'localhost',
    PORT: parseInt(process.env.API_PORT, 10) || 3000,
};

export const JwtConstants = {
    secret: process.env.JWT_SECRET || "defaultSecretKey",
};

export function getEnumValue(enumObj: any, value: string, defaultValue: any): any {
    for (const key in enumObj) {
        if (enumObj[key] === value) {
            return enumObj[key];
        }
    }
    return defaultValue;
}
