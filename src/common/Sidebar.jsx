import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

/**
 * Shared Sidebar Component
 * Receives menu items as props and renders them dynamically
 * @param {Array} menu - Array of menu items with optional submenu
 */
const Sidebar = ({ menu = [] }) => {
  const location = useLocation();
  const [openSubmenus, setOpenSubmenus] = useState({});

  // Auto-open submenu if current route matches
  useEffect(() => {
    const activeSubmenus = {};
    menu.forEach((item) => {
      if (item.submenu && item.submenu.length > 0) {
        const isActive = item.submenu.some(
          (subItem) =>
            location.pathname === subItem.path || location.pathname.startsWith(subItem.path + "/")
        );
        if (isActive) {
          activeSubmenus[item.name] = true;
        }
      }
    });
    setOpenSubmenus(activeSubmenus);
  }, [location.pathname, menu]);

  const toggleSubmenu = (itemName) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const isSubmenuActive = (submenu) => {
    return submenu?.some((item) => isActive(item.path));
  };

  return (
    <aside className="fixed left-0  top-21 bottom-13 w-64 bg-white shadow-md z-40 overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-blue-600">Menu</h2>
      </div>
      <nav className="mt-4">
        {menu.map((item) => {
          const hasSubmenu = item.submenu && item.submenu.length > 0;
          const submenuOpen = openSubmenus[item.name] !== undefined
            ? openSubmenus[item.name]
            : isSubmenuActive(item.submenu);

          if (hasSubmenu) {
            return (
              <div key={item.name}>
                <button
                  onClick={() => toggleSubmenu(item.name)}
                  className={`w-full flex items-center justify-between px-4 py-3 hover:bg-blue-50 transition-colors ${
                    isSubmenuActive(item.submenu) ? "bg-blue-100 text-blue-600 font-semibold" : "text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                  {submenuOpen ? <FiChevronDown /> : <FiChevronRight />}
                </button>
                {submenuOpen && (
                  <div className="bg-gray-50">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        className={`flex items-center gap-3 px-8 py-2 hover:bg-blue-50 transition-colors ${
                          isActive(subItem.path) ? "bg-blue-100 text-blue-600 font-semibold" : "text-gray-600"
                        }`}
                      >
                        {subItem.icon}
                        <span>{subItem.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors ${
                isActive(item.path) ? "bg-blue-100 text-blue-600 font-semibold" : "text-gray-700"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;

