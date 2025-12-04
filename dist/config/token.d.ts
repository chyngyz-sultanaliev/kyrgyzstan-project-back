export interface JwtPayload {
    id: string;
    email: string;
    isAdmin: boolean;
    iat?: number;
    exp?: number;
}
/**
 * Генерация JWT
 * @param userId - ID пользователя
 * @param userEmail - Email пользователя
 * @param isAdmin - Является ли админом
 * @returns JWT токен
 */
export declare const generateToken: (userId: string, userEmail: string, isAdmin: boolean) => string;
/**
 * Верификация JWT
 * @param token - токен
 * @returns payload или null
 */
export declare const verifyToken: (token: string) => JwtPayload | null;
declare const _default: {
    generateToken: (userId: string, userEmail: string, isAdmin: boolean) => string;
    verifyToken: (token: string) => JwtPayload | null;
};
export default _default;
//# sourceMappingURL=token.d.ts.map