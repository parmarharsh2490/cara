import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "./queryKeys"
import { getAnalyticsDetails, getDashboardDetails } from "../services/seller.service"

export {
    useGetDashboardDetails,
    useGetAnalyticsDetails
}

const useGetDashboardDetails = () => {
    return useQuery({
        queryKey : [QUERY_KEYS.DASHBOARD],
        queryFn : getDashboardDetails,
        staleTime : Infinity,
        refetchOnMount : false,
        refetchInterval : false
    })
}

const useGetAnalyticsDetails = () => {
    return useQuery({
        queryKey : [QUERY_KEYS.ANALYTICS],
        queryFn : getAnalyticsDetails,
        staleTime : Infinity,
    })
}