import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import { createProduct, deleteProduct, getLatestProducts, getProductDetails, updateProduct } from "../services/productService";
import { createUserAccount, getUserDetails, loginUserAccount, updateUserDetails } from "../services/userServices";
import { becomeSeller, getSellerDetails, updateSellerDetails } from "../services/adminServices";
/// auth queries
var useCreateUserAccount = function () {
    console.log("here in queries");
    return useMutation({
        mutationFn: function (user) { return createUserAccount(user); }
    });
};
var useLoginUserAccount = function () {
    return useMutation({
        mutationFn: function (user) { return loginUserAccount(user); }
    });
};
// product queries
var useGetLatestProducts = function () {
    return useQuery({
        queryKey: [QUERY_KEYS.LATEST_PRODUCTS],
        queryFn: getLatestProducts
    });
};
var useCreateProduct = function () {
    return useMutation({
        mutationFn: function (data) { return createProduct(data); }
    });
};
var useUpdateProduct = function () {
    var queryClient = useQueryClient();
    return useMutation({
        mutationFn: function (data) { return updateProduct(data); },
        onSuccess: function (data) {
            var _a;
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCT, (_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a._id] });
        }
    });
};
var useDeleteProduct = function () {
    var queryClient = useQueryClient();
    return useMutation({
        mutationFn: function (data) { return deleteProduct(data); },
        onSuccess: function (data) {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCT, data.data._id] });
        }
    });
};
var useGetProductDetails = function (data) {
    console.log("start");
    return useQuery({
        queryKey: [QUERY_KEYS.PRODUCT, data],
        queryFn: function () { return getProductDetails(data); }
    });
};
var useGetUserDetails = function () {
    return useQuery({
        queryKey: [QUERY_KEYS.USER],
        queryFn: getUserDetails,
        // refetchOnWindowFocus: false,
        // refetchOnReconnect: false,
    });
};
// admin queries
var useBecomeSeller = function () {
    var queryClient = useQueryClient();
    return useMutation({
        mutationFn: becomeSeller,
        onSuccess: function () {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER] });
        }
    });
};
var useGetSellerDetails = function () {
    return useQuery({
        queryKey: [QUERY_KEYS.SELLERDETAILS],
        queryFn: getSellerDetails,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: 300000, // 5 minutes
    });
};
var useUpdateSellerDetails = function () {
    var queryClient = useQueryClient();
    return useMutation({
        mutationFn: function (sellerData) { return updateSellerDetails(sellerData); },
        onSuccess: function () {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SELLERDETAILS] });
        },
    });
};
// user queries
var useUpdateUserDetails = function () {
    var queryClient = useQueryClient();
    return useMutation({
        mutationFn: function (data) { return updateUserDetails(data); },
        onSuccess: function () {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER] });
        }
    });
};
export { useGetLatestProducts, useCreateProduct, useUpdateProduct, useGetProductDetails, useDeleteProduct, useCreateUserAccount, useLoginUserAccount, useGetUserDetails, useGetSellerDetails, useUpdateSellerDetails, useUpdateUserDetails, useBecomeSeller };
