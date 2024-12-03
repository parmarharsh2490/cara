const Footer = () => {
  return (
    <footer className="p-6 mx-auto mt-10" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="lg:flex">
        <section className="w-full -mx-6 lg:w-2/5" aria-label="Newsletter">
          <div className="px-6">
            <a href="#" aria-label="Homepage">
              <img loading="lazy" className="w-auto h-7" src="/logo.png" alt="Logo" />
            </a>
            <p className="max-w-sm mt-6 text-gray-500">
              Join 31,000+ others and never miss out on new tips, tutorials, and more.
            </p>
          </div>
        </section>

        {/* Links */}
        <section className="mt-6 lg:mt-0 lg:flex-1" aria-label="Footer Links">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            
            {/* About section */}
            <div>
              <h2 className="text-gray-700 uppercase text-sm font-semibold">About</h2>
              <ul className="mt-2 space-y-2">
                <li><a href="#" className="text-sm text-gray-600 hover:underline">Company</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:underline">Community</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:underline">Careers</a></li>
              </ul>
            </div>

            {/* Blog section */}
            <div>
              <h2 className="text-gray-700 uppercase text-sm font-semibold">Blog</h2>
              <ul className="mt-2 space-y-2">
                <li><a href="#" className="text-sm text-gray-600 hover:underline">Tech</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:underline">Music</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:underline">Videos</a></li>
              </ul>
            </div>

            {/* Products section */}
            <div>
              <h2 className="text-gray-700 uppercase text-sm font-semibold">Products</h2>
              <ul className="mt-2 space-y-2">
                <li><a href="#" className="text-sm text-gray-600 hover:underline">Mega cloud</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:underline">Aperion UI</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:underline">Meraki UI</a></li>
              </ul>
            </div>

            {/* Contact section */}
            <div>
              <h2 className="text-gray-700 uppercase text-sm font-semibold">Contact</h2>
              <ul className="mt-2 space-y-2">
                <li><a href="tel:+919123456789" className="text-sm text-gray-600 hover:underline">+91 9123456789</a></li>
                <li><a href="mailto:2101031000125@silveroakuni.ac.in" className="text-sm text-gray-600 hover:underline">2101031000125@silveroakuni.ac.in</a></li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* Divider */}
      <hr className="h-px my-6 bg-gray-200 border-none" aria-hidden="true" />

      {/* Footer note */}
      <div>
        <p className="text-center text-gray-500">© Brand 2024 - Developed and Designed by Parmar Harsh</p>
      </div>
    </footer>
  );
};

export default Footer;