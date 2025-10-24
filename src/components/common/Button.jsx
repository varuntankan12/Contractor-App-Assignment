const Button = ({ text, onClick, type = "button", disabled }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`w-full py-2.5 mt-4 font-medium text-white rounded-lg transition ${disabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-800 hover:bg-gray-900"
                }`}
        >
            {text}
        </button>
    );
};

export default Button;
