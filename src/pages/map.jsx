import { StatusLegend } from "../components/dashboard/legend";

export const Map = () => {
    return (
        <div>
            <div className='main-header-wrapper'>
                <div className='main-header'>
                    Map Visualization
                </div>
                <div className='main-text'>
                    Geotagged heavy metal risk zones across Delhi.
                </div>
            </div>
            <div>
                <img
                    src="src/assets/images/image.png"
                    alt="Map Visualization"
                    className="w-80% h-auto mx-auto mt-10"
                />
            </div>
            <StatusLegend />
        </div>
    );
}