import Link from "next/link";

const AppFooter = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="">
      <div className="flex flex-col sm:flex-row gap-14 my-10 mt-40  text-sm">
    
        <div className="flex-grow sm:w-1/2">
          <p className="text-xl font-medium mb-5">ABOUT US</p>
          <p className="w-full sm:w-2/3 text-gray-600">
           Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta cum fugiat distinctio corporis
          </p>
        </div>

        <div className="sm:w-1/4">
          <p className="text-xl font-medium mb-5">COMPANY</p>

          <ul className="flex flex-col flex-1 text-gray-600 cursor-pointer">
            <Link href="/"  className="mb-2">
              Learn
            </Link>
            <Link href="/quests"  className="mb-2">
              Quests
            </Link>
            <Link href="/contact"  className="mb-2">
              Shop
            </Link>
          </ul>
        </div>

        <div className="flex-grow sm:w-1/4">
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col flex-1 text-gray-600">
            <li className="mb-2">+261 34 05 838 86</li>
            <li className="mb-2">contact@votremail.com </li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024 @votresite.com - All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default AppFooter;
