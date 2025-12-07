import { useEffect } from "react";
import ReactDOM from "react-dom";
import { X } from "lucide-react";

interface ModalProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showActions?: boolean;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmClassName?: string;
  cancelClassName?: string;
}

const Modal = ({
  title,
  isOpen,
  onClose,
  children,
  showActions = false,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmClassName = "",
  cancelClassName = "",
}: ModalProps) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-light p-6 text-left shadow-xl transition-all duration-300 ease-out opacity-100 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          {title && (
            <h3 className="text-xl font-semibold leading-6 text-gray-900">
              {title}
            </h3>
          )}
          <button
            onClick={onClose}
            className="ml-auto rounded-full p-1.5 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <div className="text-gray-700">{children}</div>
        {showActions && (
          <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 hover:bg-gray-100 text-gray-700 cursor-pointer ${cancelClassName}`}
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm?.();
                onClose();
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 bg-red-500 hover:bg-red-600 text-white cursor-pointer ${confirmClassName}`}
            >
              {confirmText}
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
