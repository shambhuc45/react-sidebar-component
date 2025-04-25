import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";

const SubMenu = ({ data }) => {
  const { pathname } = useLocation();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [lineFlowIndex, setLineFlowIndex] = useState(null);

  const isParentActive = data.menus?.some((menu) =>
    pathname.includes(`/${data.name}/${menu}`)
  );

  const handleSubMenuToggle = () => {
    setSubMenuOpen((prev) => !prev);

    // Trigger line animation if one of the items is active
    const activeIdx = data.menus.findIndex(
      (m) => pathname === `/${data.name}/${m}`
    );
    setLineFlowIndex(null); // reset first
    setTimeout(() => {
      setLineFlowIndex(activeIdx);
    }, 10); // slight delay to allow animation restart
  };

  return (
    <>
      <li
        className={`link flex items-center cursor-pointer transition-colors duration-200 ${
          isParentActive ? "text-blue-600 font-medium" : ""
        }`}
        onClick={handleSubMenuToggle}
      >
        <data.icon size={23} className="min-w-max" />
        <p className="flex-1 capitalize">{data.name}</p>
        <IoIosArrowDown
          className={`transition-transform duration-200 ${
            subMenuOpen ? "rotate-180" : ""
          }`}
        />
      </li>

      {subMenuOpen && (
        <ul className="pl-6 mt-1 flex flex-col text-sm font-normal text-gray-600">
          {data.menus?.map((menu, index) => {
            const route = `/${data.name}/${menu}`;
            const isActive = pathname === route;
            const isLastItem = index === data.menus.length - 1;

            const activeIndex = data.menus.findIndex(
              (m) => pathname === `/${data.name}/${m}`
            );

            const showFullBlueLine = index < activeIndex;
            const showTopHalfBlue = index === activeIndex;

            return (
              <li key={menu} className="relative pl-4">
                {/* Gray vertical line base */}
                <div
                  className={`absolute left-[-1rem] top-0 ${
                    isLastItem ? "h-1/2" : "h-full"
                  } w-[1px] bg-gray-300`}
                />

                {/* Full height animated blue line for above items */}
                {showFullBlueLine && (
                  <div
                    className={`absolute left-[-1rem] top-0 w-[1.5px] bg-blue-600 z-10 ${
                      lineFlowIndex === index
                        ? "h-0 animate-grow-down"
                        : "h-full transition-all duration-500"
                    }`}
                  />
                )}

                {/* Half height animated blue line for active item */}
                {showTopHalfBlue && (
                  <div
                    className={`absolute left-[-1rem] top-0 w-[1.5px] bg-blue-600 z-10 ${
                      lineFlowIndex === index
                        ? "h-0 animate-grow-down-half"
                        : "h-1/2 transition-all duration-500"
                    }`}
                  />
                )}

                {/* Horizontal connector */}
                <div
                  className={`absolute left-[-1rem] top-1/2 h-[1.5px] -translate-y-1/2 ${
                    isActive
                      ? "bg-blue-600 w-0 animate-l-flow-horizontal"
                      : "bg-gray-300 w-4"
                  }`}
                />

                <NavLink
                  to={route}
                  onClick={() => setLineFlowIndex(index)}
                  className={`block py-1.5 px-2 rounded-md transition capitalize ${
                    isActive
                      ? "text-blue-600"
                      : "bg-transparent hover:bg-blue-50"
                  }`}
                >
                  {menu}
                </NavLink>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default SubMenu;
