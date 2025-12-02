import { Request, Response } from "express";
type TourCategoryBody = {
    name?: string;
    image?: string | null;
};
type CarCategoryBody = {
    name?: string;
    images?: string | null;
    seats?: number;
    withDriver?: boolean | null;
};
type HotelCategoryBody = {
    name?: string;
    image?: string | null;
};
export declare const getTourCategories: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getTourCategory: (req: Request<{
    id: string;
}>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createTourCategory: (req: Request<{}, {}, TourCategoryBody>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateTourCategory: (req: Request<{
    id: string;
}, {}, Partial<TourCategoryBody>>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteTourCategory: (req: Request<{
    id: string;
}>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getCarCategories: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getCarCategory: (req: Request<{
    id: string;
}>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createCarCategory: (req: Request<{}, {}, CarCategoryBody>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateCarCategory: (req: Request<{
    id: string;
}, {}, Partial<CarCategoryBody>>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteCarCategory: (req: Request<{
    id: string;
}>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getHotelCategories: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getHotelCategory: (req: Request<{
    id: string;
}>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createHotelCategory: (req: Request<{}, {}, HotelCategoryBody>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateHotelCategory: (req: Request<{
    id: string;
}, {}, Partial<HotelCategoryBody>>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteHotelCategory: (req: Request<{
    id: string;
}>, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const _default: {
    getTourCategories: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getTourCategory: (req: Request<{
        id: string;
    }>, res: Response) => Promise<Response<any, Record<string, any>>>;
    createTourCategory: (req: Request<{}, {}, TourCategoryBody>, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateTourCategory: (req: Request<{
        id: string;
    }, {}, Partial<TourCategoryBody>>, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteTourCategory: (req: Request<{
        id: string;
    }>, res: Response) => Promise<Response<any, Record<string, any>>>;
    getCarCategories: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getCarCategory: (req: Request<{
        id: string;
    }>, res: Response) => Promise<Response<any, Record<string, any>>>;
    createCarCategory: (req: Request<{}, {}, CarCategoryBody>, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateCarCategory: (req: Request<{
        id: string;
    }, {}, Partial<CarCategoryBody>>, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteCarCategory: (req: Request<{
        id: string;
    }>, res: Response) => Promise<Response<any, Record<string, any>>>;
    getHotelCategories: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getHotelCategory: (req: Request<{
        id: string;
    }>, res: Response) => Promise<Response<any, Record<string, any>>>;
    createHotelCategory: (req: Request<{}, {}, HotelCategoryBody>, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateHotelCategory: (req: Request<{
        id: string;
    }, {}, Partial<HotelCategoryBody>>, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteHotelCategory: (req: Request<{
        id: string;
    }>, res: Response) => Promise<Response<any, Record<string, any>>>;
};
export default _default;
//# sourceMappingURL=categoties.controllers.d.ts.map