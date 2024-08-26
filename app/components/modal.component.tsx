import { ModalProps } from '../interfaces/modal.interfaces';

export default function Modal(props: ModalProps) {
    const { content, closeModalHandler } = props;
    const handleCloseBtn = () => {
        if (closeModalHandler) {
            closeModalHandler();
        }
    };
    return (
        <div className="w-screen h-screen fixed flex justify-center items-center  top-0 left-0 z-10 bg-slate-900/40">
            <div className="relative w-80 h-40 p-4 bg-white rounded shadow">
                <button
                    onClick={() => {
                        handleCloseBtn();
                    }}
                    className="absolute right-2 top-2 rounded-full bg-slate-500 text-white px-3 py-1"
                >
                    x
                </button>
                <h3 className="font-bold text-2xl mb-2 pb-1 border-b border-slate-100">{content.name}</h3>
                <div className="flex flex-col">
                    <div>
                        <strong>Gender:</strong> {content.gender}
                    </div>
                    <div>
                        <strong>Phone:</strong> {content.phone}
                    </div>
                    <div>
                        <strong>Email:</strong> {content.email}
                    </div>
                </div>
            </div>
        </div>
    );
}
