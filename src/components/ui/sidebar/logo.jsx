import LogoImg from "../../../assets/images/logo.png";

export const Logo = () => {
    return (
        <div className="flex items-center gap-2">
            <img
                src={LogoImg}
                alt="JalDhatu Logo"
                className="h-15 w-15 object-cover"
            />
            <span className="card-title">
                JalDhatu
            </span>
        </div>
    );
};
