export const Button = ({ children, onClickHandler, type, colorVariant = "primary", disabled = false }) => {
    const baseStyle = {
        "main": "px-4 py-2 rounded-lg font-medium my-2",
        "support": "px-2 py-1 rounded-lg font-medium text-[12px] my-2"
    }
    const variants = {
        "primary": "bg-blue-600 text-white hover:bg-blue-700",
        "secondary-blue": "bg-blue-500 text-white hover:bg-blue-600",
        "secondary": "bg-gray-300 text-black hover:bg-gray-400",
        "danger": "bg-red-600 text-white hover:bg-red-700",
        "success": "bg-green-600 text-white hover:bg-green-700"
    }
    return (
        <button
            onClick={onClickHandler}
            className={`${variants[colorVariant]} ${baseStyle[type]}`}
        >
            {children}
        </button>
    );
}