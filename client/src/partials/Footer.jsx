import React from 'react'

function Footer() {
  return (
    <div>
      <footer className="bg-gray-800 text-white py-8">
    <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
                <h2 className="text-2xl font-bold">ApnaBazzar</h2>
                <p className="mt-2 text-gray-400">
                ApnaBazzar. Shop electronics, cosmetics, and more. Quality products, great prices, fast shipping. Satisfaction guaranteed.
                </p>
            </div>

            <div className="w-full md:w-1/4 mb-6 md:mb-0">
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul>
                    <li className="mb-2">
                        <a href="#" className="text-gray-400 hover:text-white">Home</a>
                    </li>
                    <li className="mb-2">
                        <a href="#" className="text-gray-400 hover:text-white">About</a>
                    </li>
                    <li className="mb-2">
                        <a href="#" className="text-gray-400 hover:text-white">Courses</a>
                    </li>
                    <li className="mb-2">
                        <a href="#" className="text-gray-400 hover:text-white">Contact</a>
                    </li>
                </ul>
            </div>

            <div className="w-full md:w-1/4 mb-6 md:mb-0">
                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                <ul>
                    <li className="mb-2">
                        <a href="#" className="text-gray-400 hover:text-white">Blog</a>
                    </li>
                    <li className="mb-2">
                        <a href="#" className="text-gray-400 hover:text-white">Support</a>
                    </li>
                    <li className="mb-2">
                        <a href="#" className="text-gray-400 hover:text-white">FAQs</a>
                    </li>
                    <li className="mb-2">
                        <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
                    </li>
                </ul>
            </div>

            <div className="w-full md:w-1/4">
                <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                <p className="text-gray-400">Email: info@apnabazzar.com</p>
                <p className="text-gray-400">Phone: +1 234 567 890</p>
                <p className="text-gray-400">Address: 123 ApnaBazzar  St, Ecommarce Site , USA</p>
            </div>
        </div>

        <div className="mt-8 text-center text-gray-400">
            &copy; 2024 ApnaBazzar. All rights reserved.
        </div>
    </div>
</footer>

    </div>
  )
}

export default Footer
