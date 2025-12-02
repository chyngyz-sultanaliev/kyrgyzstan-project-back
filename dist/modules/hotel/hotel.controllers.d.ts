import { Request, Response } from "express";
export declare const getHotel: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const postHotel: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateHotel: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteHotel: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const _default: {
    getHotel: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    postHotel: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateHotel: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    deleteHotel: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
export default _default;
//# sourceMappingURL=hotel.controllers.d.ts.map