import MapImg from "../assets/images/image.png";
import { StatusLegend } from "../components/dashboard/legend";
import { DelhiHeatMap } from "../components/graphs/geoTag";

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
                {/* <img
                    src={MapImg}
                    alt="Map Visualization"
                    className="w-80% h-auto mx-auto mt-10"
                /> */}
                <DelhiHeatMap />
            </div>
            <StatusLegend />
        </div>
    );
}