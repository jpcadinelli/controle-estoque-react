import React from "react";

interface AuthPopupProps {
    message: string;
    onClose: () => void;
}

const AuthPopup: React.FC<AuthPopupProps> = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <p className="text-lg">{message}</p>
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                    Fechar
                </button>
            </div>
        </div>
    );
};

export default AuthPopup;