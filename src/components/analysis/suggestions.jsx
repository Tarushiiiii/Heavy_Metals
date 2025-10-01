import { useState } from "react";
import { CircleCheckBig, CircleStar, MonitorCheck, Target } from "lucide-react";
import { Button } from "../ui/button.jsx";

export const Suggestion = () => {
    const [expandedGroups, setExpandedGroups] = useState({
        yellow: false,
        blue: false,
        green: false
    });

    const expandExplain = (group) => {
        setExpandedGroups(prev => ({
            ...prev,
            [group]: !prev[group]
        }));
    };

    return (
        <div id="suggestions-section" className="results-section active">
            <h2 className="card-title">
                <CircleStar style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} size={24} strokeWidth={1.8} />
                Expert suggestions
            </h2>
            <p className="card-subtitle">
                Based on the analysis results, here are our professional suggestions
            </p>

            {/* Suggestion Group: Yellow */}
            <div className="suggestion-group yellow">
                <p className="group-title">
                    <Target style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} size={20} strokeWidth={1.8} />
                    Immediate Actions Required
                </p>
                <ul>
                    <li>Implement additional monitoring for Arsenic and Chromium levels</li>
                    <li>Consider alternative water sources for consumption</li>
                    <li>Install appropriate water treatment systems</li>
                </ul>
                <div>
                    <Button type="support" colorVariant="secondary" onClickHandler={() => expandExplain('yellow')}>
                        {expandedGroups.yellow ? 'Read Less' : 'Read More'}
                    </Button>
                    {expandedGroups.yellow && (
                        <p className="explanation-text">
                            Immediate action explanations go here. You can add technical context or next steps.
                        </p>
                    )}
                </div>
            </div>

            {/* Suggestion Group: Blue */}
            <div className="suggestion-group blue">
                <p className="group-title">
                    <MonitorCheck style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} size={20} strokeWidth={1.8} />
                    Long-term Monitoring
                </p>
                <ul>
                    <li>Schedule quarterly re-testing of this location</li>
                    <li>Monitor nearby wells for similar contamination patterns</li>
                    <li>Investigate potential contamination sources in the area</li>
                </ul>
                <div>
                    <Button type="support" colorVariant="secondary" onClickHandler={() => expandExplain('blue')}>
                        {expandedGroups.blue ? 'Read Less' : 'Read More'}
                    </Button>
                    {expandedGroups.blue && (
                        <p className="explanation-text">
                            Long-term monitoring explanation. Outline goals and resources.
                        </p>
                    )}
                </div>
            </div>

            {/* Suggestion Group: Green */}
            <div className="suggestion-group green">
                <h3 className="group-title">
                    <CircleCheckBig style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} size={20} strokeWidth={1.8} />
                    Positive Indicators
                </h3>
                <ul>
                    <li>Lead, Cadmium, and Mercury levels are within safe ranges</li>
                    <li>Overall HMPI indicates manageable contamination level</li>
                    <li>No immediate health emergency detected</li>
                </ul>
                <div>
                    <Button type="support" colorVariant="secondary" onClickHandler={() => expandExplain('green')}>
                        {expandedGroups.green ? 'Read Less' : 'Read More'}
                    </Button>
                    {expandedGroups.green && (
                        <p className="explanation-text">
                            Positive outcome explanation can go here for context or praise.
                        </p>
                    )}
                </div>
            </div>
        </div >
    );
};
