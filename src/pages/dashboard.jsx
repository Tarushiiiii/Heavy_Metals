import '../App.css';
import { KeyMetrics } from '../components/dashboard/key_metrics';
import { StatusLegend } from '../components/dashboard/legend';
import { MapAndCharts } from '../components/dashboard/map';
import { RecentReports } from '../components/dashboard/recent_reports';
import { SearchFilter } from '../components/dashboard/searchfilter';

export const Dashboard = () => {
    return (
        <div>
            {/* Main header and description */}
            <div className='main-header-wrapper'>
                <div className='main-header'>
                    Environmental Monitoring
                </div>
                <div className='main-text'>
                    Visualize and analyze heavy metal pollution indices across different regions and time periods.
                </div>

            </div>
            <div className='inside-stuff'>
                { /*Search bar and filters to be added here*/}
                <SearchFilter />
                {/* Key Metrics to be added here */}
                <KeyMetrics />
                {/* Map and Charts to be added here */}
                <MapAndCharts />
                {/* Status Legend to be added here */}
                <StatusLegend />
            </div>
            {/* Recent Reports to be added here */}
            <div>
                <RecentReports />
            </div>
        </div>
    );
}