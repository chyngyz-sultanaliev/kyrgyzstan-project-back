import { Request, Response, NextFunction } from "express";
declare module "express-serve-static-core" {
    interface Request {
        user?: {
            id: string;
            email: string;
            isAdmin: boolean;
        };
    }
}
export declare const authMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=auth.middleware.d.ts.map