import { Request, Response } from "express";
declare const _default: {
    getTour: (req: Request, res: Response) => Promise<void>;
    postTour: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    putTour: (req: Request<{
        id: string;
    }>, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteTour: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getTourDay: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    postTourDay: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    putTourDay: (req: Request<{
        id: string;
    }>, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteTourday: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
export default _default;
//# sourceMappingURL=tour.controllers.d.ts.map