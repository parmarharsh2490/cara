import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCreateProductReview, useDeleteProductReview, useGetProductReview, useUpdateProductReview } from "../../query/productReview.queries";
import { StarIcon } from "../icons/StarIcon";
import { VerifiedBuyerIcon } from "../icons/VerifiedBuyerIcon";
import PopupForm from "./PopupForm";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/query/queryKeys";
import { getProductReview } from "@/services/productReview.services";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
const Reviews: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  if (!productId) return <p className="text-red-500">Error: Product ID not found!</p>;
  const [showPopupForm, setShowPopupForm] = useState(false);
  const [action, setAction] = useState("create");
  const {toast} = useToast();
  const { mutateAsync: createProductReview, isPending: creatingProductReview } = useCreateProductReview();
  const { mutateAsync: updateProductReview, isPending: updatingProductReview } = useUpdateProductReview();
  const {data : reviews,fetchNextPage,isLoading,isFetching,isFetchingNextPage,error} = useInfiniteQuery<any[]>({
    queryKey : [QUERY_KEYS.PRODUCTREVIEW,productId],
    queryFn : ({pageParam =0}) => getProductReview({productId,pageParam}),
    initialPageParam : 0,
    enabled : !!productId,
    retry :false,
    refetchOnMount : false,
    refetchOnWindowFocus : false,
    getNextPageParam : (lastPageParam, allPages, lastPage: any) => {
      return lastPage+1
    },
  })
  if (isLoading && !isFetching) return <p className="text-gray-500">Loading...</p>;
  const handleEditReview = () => {
    setAction("edit");
    setShowPopupForm(true);
  };
  const handlePopupFormSubmit = async(data: any) => {
    if(action === "create"){
      try {
        await createProductReview({ data, productId })
        toast({
          title : "Success",
          description : "Successfully Added Product Review",
          variant : "productReview"
        })
      } catch (error) {
        console.log(error);
        toast({
          title : "Failed",
          description : "Failed To Add Product Review",
          variant : "destructive"
        })
      }
    }else{
    try {
      await updateProductReview({ data, productId });
      console.log("here after success");
      
      toast({
        title : "Success",
        description : "Successfully Updated Product Review",
        variant : "productReview"
      })
    } catch (error) {
      console.log(error);
      toast({
        title : "Failed",
        description : "Failed To Update Product Review",
        variant : "destructive"
      })
    }
  }

  }
  const loadMore = () => {
    fetchNextPage()
  };
  console.log(reviews);
  
  const ratingStar = reviews?.pages[0]?.ratingStar || {};
  const totalUserCount = reviews?.pages[0]?.totalUserCount || 0;
  const averageRating = reviews?.pages[0]?.averageRating || 0;
  const reviewList = reviews?.pages.reduce<any[]>((acc, page) => {
    console.log(acc);
console.log(page);
    
    return [...acc, ...(page?.reviews || [])];
  }, []);
console.log(reviewList);

  return (
    <div className="p-5 sm:p-10 flex flex-col sm:flex-row gap-4 mt-5 sm:mt-10">
      <RatingSummary 
        averageRating={averageRating} 
        totalUserCount={totalUserCount} 
        ratingStar={ratingStar} 
      />
      <CustomerReviews
      setAction={setAction} 
        loadMore={loadMore}
        error={error}
        isLoading={isLoading}
        reviews={reviewList || []}
        setShowPopupForm={setShowPopupForm}
        showPopupForm={showPopupForm}
        onEditReview={handleEditReview}
      />
      {showPopupForm && (
        <PopupForm
          showPopupForm={showPopupForm}
          setShowPopupForm={setShowPopupForm}
          title={action === "create" ? "Create a Product Review" : "Edit Product Review"}
          inputData={[
            { type: "number", label: "ratingStar", name: "Rating Star" },
            { type: "file", label: "reviewImage", name: "Review Image" },
            { type: "string", label: "reviewTitle", name: "Review Title" },
            { type: "string", label: "reviewDescription", name: "Review Description" }
          ]}
          label="Product Review"
          isLoading={action === "create" ? creatingProductReview : updatingProductReview}
          handleSubmitFunction={handlePopupFormSubmit}
        />
      )}
    </div>
  );
};

const RatingSummary: React.FC<{ 
  averageRating: number; 
  totalUserCount: number; 
  ratingStar: Record<string, number>;
}> = ({ averageRating, totalUserCount, ratingStar }) => (
  <div className="w-full sm:w-[30%] border-t-2 sm:border-t-0">
    <h1 className="text-xl sm:text-3xl font-semibold mb-5 sm:mb-1 mt-5 sm:mt-0">
      Rate & Review
    </h1>
    <div className="flex items-center mt-3">
      <StarIcon className="text-xl text-green-600" />
      <span className="font-semibold text-xl mx-1 sm:mx-2">{averageRating.toFixed(1)}</span>
      <span className="text-slate-400 sm:ml-4 ml-1 text-sm">
        {totalUserCount} verified customers reviewed this.
      </span>
    </div>
    {Object.entries(ratingStar).length > 0 ? (
      Object.entries(ratingStar).map(([rating, count]) => (
        <RatingBar key={rating} rating={rating} count={count} totalCount={totalUserCount} />
      ))
    ) : (
      [1,2,3,4,5].map((rating) => (
        <RatingBar key={rating} rating={rating.toString()} count={0} totalCount={totalUserCount} />
      ))
    )}
  </div>
);

const RatingBar: React.FC<{ rating: string; count: number; totalCount: number }> = ({ rating, count, totalCount }) => {
  const percentage = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;
  return (
    <div className="flex items-center text-slate-400 text-sm sm:text-base my-1 sm:my-3">
      {rating}
      <StarIcon className="text-slate-400 mx-3" />
      <div className="h-2 w-1/2 sm:w-3/5 mr-2 bg-slate-200">
        <div
          style={{ width: `${percentage}%` }}
          className="h-full bg-green-500"
        ></div>
      </div>
      <div className="text-slate-900">{count}</div>
    </div>
  );
};

const CustomerReviews: React.FC<{
  loadMore: () => void,
  error: any,
  isLoading: boolean,
  reviews: any[],
  setShowPopupForm: React.Dispatch<React.SetStateAction<boolean>>,
  showPopupForm: boolean,
  onEditReview: (review: any) => void
}> = ({ loadMore, setAction,error, isLoading, reviews, setShowPopupForm, showPopupForm, onEditReview }) => (
  <div className="w-full sm:w-[70%]">
    <div className="flex items-center justify-between mb-5 sm:mb-10">
      <h1 className="text-xl sm:text-3xl font-semibold">
        Customer Reviews
      </h1>
      <button 
        onClick={() => {
          setShowPopupForm(!showPopupForm);
          setAction("create")
        }
        } 
        className="cursor-pointer py-4 text-white px-2 bg-red-600 rounded-md w-full max-w-48 text-xs font-bold hover:shadow-xl hover:shadow-red-100 duration-500 text-center"
      >
        WRITE A PRODUCT REVIEW
      </button>
    </div>

    {reviews.length > 0 ? (
      <div className="flex flex-col gap-5">
        {reviews.map((review, index) => (
          <ReviewCard 
            key={index} 
            review={review} 
            onEdit={() => onEditReview(review)}
          />
        ))}
        <button 
          onClick={loadMore} 
          disabled={reviews.length < 5}
          className={" max-w-sm my-auto mx-auto py-[6px] px-12 text-base font-bold bg-slate-800 text-white hover:shadow-lg hover:bg-slate-900 duration-500"}
        >
          {error || reviews.length < 5 ? "No More Reviews Found" : isLoading ? "Loading..." : "VIEW ALL REVIEWS"}
        </button>
      </div>
    ) : (
      <p className="text-slate-400">No reviews available</p>
    )}
  </div>
);

const ReviewCard: React.FC<{ 
  review: any,
  onEdit: () => void
}> = ({ review, onEdit }) => {
  const {productId} = useParams();
  const { mutateAsync: deleteProductReview, isPending, isSuccess } = useDeleteProductReview(productId);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const {toast}  = useToast()
  const handleDeleteReview = async() => {
   try {
     await deleteProductReview(review?._id);
     toast({
      title : "Success",
      description : "Successfully Deleted Product Review",
      variant : "productReview"
    })
   } catch (error) {
    console.log(error);
    toast({
      title : "Failed",
      description : "Failed To Delete Product Review",
      variant : "destructive"
    })
   }
  }
  return (
    <div className="flex justify-between items-start border-b-2 pb-3">
      <div className="flex-grow">
        <div className="flex items-center">
          <div className="flex items-center bg-green-600 text-white rounded px-1 py-0.5">
            <p className="font-semibold">{review.rating}</p>
            <StarIcon className="ml-1 text-xs" />
          </div>
          <p className="font-semibold ml-2 sm:ml-5">{review.title}</p>
        </div>
        <p className="text-base font-medium mt-3 text-slate-600">
          {review.description}
        </p>
        <div className="flex items-center mt-4 text-xs">
          <span className="text-slate-500 mr-4">{review.name}</span>
          <span className="hidden sm:inline-flex items-center text-slate-400 mr-4">
            <VerifiedBuyerIcon />
            Certified Buyer, {review.user}
          </span>
          <span className="text-slate-400">{review.date}</span>
        </div>
      </div>
      {review.image && review.image.imageUrl && (
        <img src={review.image.imageUrl} className="max-w-32 ml-4" alt="Review Image" />
      )}
      <div className="flex flex-col items-center gap-2">
        <FaEdit size={25} onClick={onEdit} />
        
        {/* <AlertDialog
          title="Delete"
          description="Are you sure you want to delete this review?"
          loading={isPending}
          setIsPopupVisible={setIsPopupVisible}
          isPopupVisible={isPopupVisible}
          isSuccess={isSuccess}
          submitOnClick={handleDeleteReview}
          navigateUrl=""
        /> */}
        <AlertDialog>
  <AlertDialogTrigger><MdDelete size={25}/></AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure you want to delete this review?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your review from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction disabled={isPending} onClick={handleDeleteReview}>{isPending ? "Loading" : "Continue"}</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
      </div>
    </div>
  );
};

export default Reviews;