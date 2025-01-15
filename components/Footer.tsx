const footerLinks = {
  'Explore': [
    'Most Popular',
    'New Courses',
    'Learning Paths',
    'Free Courses',
  ],
  'Categories': [
    'Development',
    'Business',
    'IT & Software',
    'Design',
    'Marketing',
  ],
  'Community': [
    'Blog',
    'Forums',
    'Teaching',
    'Support',
  ],
  'About': [
    'About Us',
    'Careers',
    'Press',
    'Contact Us',
  ],
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-lg mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Your Learning Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

