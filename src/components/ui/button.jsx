export const Button = ({
    children,
    onClickHandler,
    type,
    colorVariant = "primary",
    disabled = false
}) => {
    const baseStyle = {
        main: "px-4 py-2 rounded-lg font-medium my-2",
        support: "px-2 py-1 rounded-lg font-medium text-[12px] my-2",
    };

    const variants = {
        primary:
            "bg-[#0e9486] text-[white] hover:bg-[#0c7d72] transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed",
        secondary:
            "bg-[white] border border-[#d1d5db] text-gray-800 hover:bg-[#d1d5db] transition-colors duration-200 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed",
        "secondary-blue":
            "bg-[#ffffff] text-[#676f79] hover:bg-blue-600 transition-colors duration-200 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed",
        danger:
            "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed",
        success:
            "bg-green-600 text-white hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed",
    };

    return (
        <button
            onClick={onClickHandler}
            className={`${variants[colorVariant]} ${baseStyle[type]}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
