interface JwtPayload {
    id: string;
    email: string;
    iat?: number;
    exp?: number;
}
export declare const verifyToken: (token: string) => JwtPayload | null;
declare const _default: {
    generateToken: (userId: string, userEmail: string, isAdmin: boolean) => string;
    verifyToken: (token: string) => JwtPayload | null;
};
export default _default;
//# sourceMappingURL=token.d.ts.map