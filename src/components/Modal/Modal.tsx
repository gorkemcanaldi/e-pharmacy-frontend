import type { ReactNode } from "react";
import style from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className={style.modal_overlay}>
      <div className={style.modal_container}>
        <div className={style.modal_header}>
          <h2>{title}</h2>
          <button className={style.modal_but} onClick={onClose}>
            X
          </button>
        </div>
        <div className={style.modal_body}>{children}</div>
      </div>
    </div>
  );
}
