const Blog = () => {
    const blogs = [
        { image: "/blog1.jpg", title: "Summer 2024: Top Fashion Trends", description: "Get ahead of the season with the hottest trends in summer fashion for 2024. From bold prints to airy fabrics, find your perfect look. Whether you're heading to the beach or a summer soirée, our guide will help you navigate the latest trends in style. Discover the colors, patterns, and silhouettes that are making waves this season, and learn how to incorporate them into your wardrobe effortlessly." },
        { image: "/blog2.jpg", title: "How to Style a Classic White Tee", description: "Elevate your wardrobe basics with these stylish tips on how to make a simple white tee the star of your outfit. A classic white tee is one of the most versatile pieces you can own, and with the right styling, it can be transformed into an elegant, chic, or even edgy look. We'll show you how to pair it with everything from tailored blazers to distressed jeans, ensuring you get the most out of this wardrobe staple." },
        { image: "/blog3.jpg", title: "The Ultimate Guide to Winter Layering", description: "Stay warm and stylish this winter with our guide to layering. Learn how to mix textures and colors for a chic look that keeps the cold at bay. From cozy knitwear to sleek outerwear, layering is key to creating a functional and fashionable winter wardrobe. We'll take you through the essential pieces you need, and provide tips on how to combine them to create outfits that are not only warm but also incredibly stylish." },
        { image: "/blog4.jpg", title: "5 Must-Have Accessories for Every Wardrobe", description: "Discover the essential accessories that can transform any outfit. From statement belts to timeless bags, find out what you need to elevate your style. Accessories are the finishing touches that can take your look from ordinary to extraordinary. In this blog, we'll explore the five key accessories that every wardrobe should include, offering tips on how to choose pieces that reflect your personal style and complement your wardrobe effortlessly." },
        { image: "/blog5.jpg", title: "Denim Done Right: The Best Jeans for Every Body Type", description: "Find your perfect pair of jeans with our guide to denim. Learn which styles flatter your figure and how to style them for any occasion. Whether you're looking for a pair of classic skinny jeans or something more relaxed, finding the right fit is essential. We'll help you navigate the world of denim, offering advice on the cuts, washes, and brands that work best for different body types, ensuring you feel confident and comfortable in your jeans." },
    ];

    return (
        <div className="flex flex-1 flex-col items-center justify-center p-6">
            <div className="w-full text-center my-3">
                <h1 className="font-bold text-2xl">Today's Blogs</h1>
                <p className="text-slate-600 text-base">Read our exciting blogs written by our fashion experts</p>
            </div>
            <div className="border p-3 space-y-6">
                {blogs.map((blog, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:gap-7 flex-1 mt-5">
                        <img loading='lazy' src={blog.image} alt={`Blog image for ${blog.title}`} className="w-full h-auto max-w-md bg-cover" />
                        <div className="flex flex-col items-center justify-center max-w-3xl w-full">
                            <h1 className="text-2xl my-2 font-semibold sm:text-3xl">{blog.title}</h1>
                            <p className="text-base sm:text-sm md:text-lg">{blog.description}</p>
                            <a href="#" className="text-slate-700 py-2 inline-block w-full text-xs font-semibold hover:text-slate-900 transition duration-500 text-start">CONTINUE READING</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blog;
