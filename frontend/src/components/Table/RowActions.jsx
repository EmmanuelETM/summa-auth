import { useState } from "react";
import { MoreVertical } from "lucide-react";
import ConfirmModal from "../Modals/ConfirmModal";

const RowActions = ({ row }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    setShowConfirm(false);
    console.log(`Deleted ${row.name}`);
    // Call delete API here
  };

  const actions = [
    {
      label: "Edit",
      onClick: () => console.log("Edit", row),
      show: true,
    },
    {
      label: "Delete",
      onClick: handleDelete,
      show: row.status !== "Inactive",
    },
    {
      label: "Admin Panel",
      onClick: () => console.log("Admin Panel for", row.name),
      show: row.type === "admin",
    },
  ];

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setShowMenu((prev) => !prev)}
        className="p-1 hover:bg-gray-200 rounded"
      >
        <MoreVertical size={18} />
      </button>

      {showMenu && (
        <div
          className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-10"
          onMouseLeave={() => setShowMenu(false)}
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

      {showConfirm && (
        <ConfirmModal
          title={`Delete ${row.name}?`}
          message="Are you sure you want to delete this item? This action cannot be undone."
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
};

export default RowActions;
