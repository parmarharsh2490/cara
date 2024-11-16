export const allReviews = (reviews: any | undefined) => {
    if (!reviews?.pages) {
        return [];
    }
    const data :any = []
    
    reviews?.pages.map((review :any) => {
        data.push(...review.reviews)
    });
    return data
}