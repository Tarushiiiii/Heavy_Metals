export const Logo = () => {
    return (
        <div className="flex items-center gap-2">
            <img
                src="src\assets\images\logo.png"
                alt="JalDhatu Logo"
                className="h-15 w-15 object-cover"
            />
            <span className="text-lg font-semibold text-gray-700">
                JalDhatu
            </span>
        </div>
    );
}