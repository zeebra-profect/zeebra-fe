import type React from "react";
import { createPortal } from "react-dom";
import { useEffect } from "react";

interface SideModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function ModalShell({ open, onClose, children }: SideModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"; // 스크롤 잠금
    } else {
      document.body.style.overflow = "auto"; // 원상 복구
    }

    // 🔁 컴포넌트가 사라질 때(언마운트 시)도 복구
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex bg-black/40  " onClick={onClose}>
      <div
        className="absolute right-0 top-0 h-full w-[400px] bg-main-bg shadow-md p-4 "
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

export default ModalShell;
