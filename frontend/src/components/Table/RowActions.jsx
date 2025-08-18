import { useRef } from "react";
import { MoreVertical } from "lucide-react";
import { useDropdownMenu } from "../../hooks/use-dropdown-menu";

const RowActions = ({
  row,
  actions: customActions,
  menuWidth = 160,
  buttonClassName,
}) => {
  const buttonRef = useRef(null);
  const { showMenu, position, toggleMenu, setShowMenu } = useDropdownMenu(
    buttonRef,
    menuWidth
  );

  const defaultActions = [
    {
      label: "Copy ID",
      onClick: () => navigator.clipboard.writeText(row.id),
      show: true,
    },
    { label: "Edit", onClick: () => console.log("Edit", row), show: true },
    {
      label: row.enabled === 1 ? "Disable" : "Enable",
      onClick: () => console.log("Toggle Enable", row),
      show: true,
    },
  ];

  const actions = customActions || defaultActions;

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className={
          buttonClassName || "p-1 hover:bg-gray-200 rounded cursor-pointer"
        }
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
