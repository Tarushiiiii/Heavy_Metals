import React from "react";
import sitesDataImport from "./siteData.jsx";

const Summary = ({ sitesData = sitesDataImport }) => {
  if (!sitesData || sitesData.length === 0) {
    return <p className="no-data">No site data available.</p>;
  }

  const getExceedingMetals = (site) => {
    return Object.keys(site.metals || {})
      .filter((metal) => site.metals[metal] > site.limits[metal])
      .map((metal) => ({
        name: metal,
        value: site.metals[metal],
        limit: site.limits[metal],
        exceed: site.metals[metal] - site.limits[metal],
      }));
  };

  const getSource = (EF) =>
    EF >= 10 ? "anthropogenic" : EF < 2 ? "geogenic" : "mixed";

  const highestSite = sitesData.reduce(
    (max, site) =>
      site.compositeIndex > max.compositeIndex ? site : max,
    sitesData[0]
  );

  return (
    <div style={{ padding: "1rem" }} >
      <h2 className="summary-title">HMPI Analysis Summary</h2>

      {highestSite && (
        <p className="highest-site">
          Among the monitored sites, <strong>{highestSite.name}</strong> exhibits the
          highest cumulative contamination, reflected by composite indices and ML forecasts.
        </p>
      )}

      {sitesData.map((site) => {
        const metalsExceed = getExceedingMetals(site);
        return (
          <div key={site.name} className="site-card">
            <h3 className="site-name">{site.name}</h3>

            {metalsExceed.length > 0 ? (
              <p className="metals-exceed">
                Metals exceeding WHO/CPCB standards:{" "}
                {metalsExceed
                  .map((m) => `${m.name} (+${m.exceed.toFixed(1)} over limit)`)
                  .join(", ")}
                .
              </p>
            ) : (
              <p className="safe-metals">All metals within safe limits.</p>
            )}

            <p className="source-attribution">
              Source attribution based on EF analysis:{" "}
              {Object.keys(site.EF || {})
                .map((metal) => `${metal}: ${getSource(site.EF[metal])}`)
                .join(", ")}
              .
            </p>

            <p className="forecast-trends">
              ML forecast trends indicate{" "}
              {Object.keys(site.forecast || {})
                .map(
                  (metal) =>
                    `${metal} from ${site.forecast[metal][0].toFixed(1)} to ${site.forecast[metal][
                      site.forecast[metal].length - 1
                    ].toFixed(1)}`
                )
                .join("; ")}
              .
            </p>
          </div>
        );
      })}

      <p className="actionable-insights">
        Actionable insights: Target stricter discharge control for high-risk sites,
        continuous monitoring for moderate-risk sites, and routine awareness/remediation
        for low-risk sites.
      </p>

      <p className="confidence-note">
        Confidence: ML predictions supported by observed trends and EF-based source attribution, ensuring
        transparent guidance for policymakers.
      </p>
    </div>
  );
};

export default Summary;
