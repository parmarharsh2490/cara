# cara
**Cara** is a user-friendly e-commerce platform designed for both buyers and sellers. It enables users to shop easily while providing sellers with tools to manage their products, inventory, and orders efficiently.
"# cara" 
export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};
export const useGetRecentPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPosts,
  });
};