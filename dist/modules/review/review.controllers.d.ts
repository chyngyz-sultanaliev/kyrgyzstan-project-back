import { Request, Response } from "express";
declare const _default: {
    postCarReview: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    postTourReview: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    postHotelReview: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    putReview: (req: Request<{
        id: string;
    }>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    deleteReview: (req: Request<{
        id: string;
    }>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
export default _default;
//# sourceMappingURL=review.controllers.d.ts.map