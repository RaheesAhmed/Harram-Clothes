export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary">Harram Clothes</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Premium quality clothing in Peshawar. Shop the finest collection of traditional wear.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-base mb-4">Contact</h4>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <span>📞</span>
                <span>+92 317 9511031</span>
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <span>📍</span>
                <span>Peshawar, Pakistan</span>
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-base mb-4">Information</h4>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <span>✓</span>
                <span>Free Delivery Across Pakistan</span>
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <span>✓</span>
                <span>Cash on Delivery Available</span>
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <span>✓</span>
                <span>100% Quality Guarantee</span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-600">
            © 2025 Harram Clothes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
