import { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";

const RowActions = ({ row }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);

  const handleOpenMenu = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const menuWidth = 160; // same as w-40 (40 * 4px = 160px)
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.right + window.scrollX - menuWidth, // shift left instead of right
      });
    }
    setShowMenu((prev) => !prev);
  };

  const handleDisable = (enabled) => {
    console.log(enabled === 1);
  };

  const actions = [
    {
      label: "Copy ID",
      onClick: () => navigator.clipboard.writeText(row.id),
      show: true,
    },
    { label: "Edit", onClick: () => console.log("Edit", row), show: true },
    {
      label: row.enabled === 1 ? "Disable" : "Enable",
      onClick: () => handleDisable(row.enabled),
      show: row.status !== "Inactive",
    },
    {
      label: "Admin Panel",
      onClick: () => console.log("Admin Panel for", row.name),
      show: row.type === "admin",
    },
  ];

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleOpenMenu}
        className="p-1 hover:bg-gray-200 rounded cursor-pointer"
      >
        <MoreVertical size={18} />
      </button>

      {showMenu && (
        <div
          className="fixed z-50 w-40 bg-white border border-gray-200 rounded shadow-lg"
          style={{ top: position.top, left: position.left }}
        >
          {actions
            .filter((a) => a.show)
            .map((action) => (
              <button
                key={action.label}
                onClick={() => {
                  setShowMenu(false);
                  action.onClick();
                }}
                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
              >
                {action.label}
              </button>
            ))}
        </div>
      )}
    </>
  );
};

export default RowActions;
