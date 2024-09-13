export { getLatestProducts, createProduct, getProductDetails, updateProduct, deleteProduct };
declare const getLatestProducts: () => Promise<any>;
declare const getProductDetails: (productId: string) => Promise<any>;
declare const createProduct: (data: any) => Promise<import("axios").AxiosResponse<any, any>>;
declare const updateProduct: (data: any) => Promise<import("axios").AxiosResponse<any, any>>;
declare const deleteProduct: (productId: any) => Promise<import("axios").AxiosResponse<any, any>>;
