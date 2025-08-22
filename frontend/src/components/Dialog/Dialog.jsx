import { X } from "lucide-react";
import { useEffect, useRef } from "react";

export function Dialog({ isOpen, onClose, title, children, footer }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen && dialog && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog?.open) {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className="backdrop:bg-black/40 backdrop:backdrop-blur-sm 
                 rounded-2xl p-0 w-full max-w-lg mx-auto my-auto
                 sm:w-[500px] shadow-xl open:animate-fadeIn"
      onCancel={onClose}
      onClick={(e) => {
        const dialog = dialogRef.current;
        if (e.target === dialog) {
          onClose();
        }
      }}
    >
      <DialogHeader onClose={onClose} title={title} />

      <DialogContent>{children}</DialogContent>

      {footer && <div className="p-4  flex justify-end gap-2">{footer}</div>}
    </dialog>
  );
}

function DialogHeader({ title, onClose }) {
  return (
    <div className="flex items-center justify-between p-4">
      <h2 className="text-xl sm:text-2xl font-semibold">{title}</h2>
      <button
        onClick={onClose}
        className="p-1 rounded-full hover:bg-gray-100 transition"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}

function DialogContent({ children }) {
  return <div className="p-4 overflow-y-auto max-h-[70vh]">{children}</div>;
}
