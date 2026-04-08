import style from "./Modal.module.css";
export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div className={style.modal_overlay}>
      <div className={style.modal_container}>
        <div className={style.modal_header}>
          <button onClick={onClose}>X</button>
        </div>
        <div className={style.modal_body}>{children}</div>
      </div>
    </div>
  );
}
