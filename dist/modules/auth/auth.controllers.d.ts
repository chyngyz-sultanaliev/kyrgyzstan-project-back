import { Request, Response } from "express";
declare const _default: {
    register: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    profile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    update: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    requestResetPassword: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    resetPassword: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    verifyResetCode: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
export default _default;
//# sourceMappingURL=auth.controllers.d.ts.map