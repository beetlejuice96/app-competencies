interface ModalProps {
  children: React.ReactNode;
  className?: string;
  id: string;
}

const Modal: React.FC<ModalProps> = ({
  children,
  className,
  id,
}: ModalProps) => {
  //use daisyui modal classNames
  return (
    <dialog className={`modal`} id={id}>
      <div className="modal-box">{children}</div>
      <form method="dialog" className="modal-backdrop">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </form>
    </dialog>
  );
};

export default Modal;
