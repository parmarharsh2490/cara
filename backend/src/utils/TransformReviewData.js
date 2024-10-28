export  const transformProductReviewData = (data) => {
    return {
        _id : data._id,
        name : data.name,
        ratingStar : data.ratingStar,
        reviewTitle : data.reviewTitle, 
        reviewDescription : data.reviewDescription,
        reviewImageUrl : data.reviewImage.imageUrl,
        product : data.product,
    }
}