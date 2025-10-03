// export const Methodology = () => {
//   return (
//     <div id="card" className="results-section active">
//       <div className="results-card">
//         <h2 className="card-title">Calculation Methodology</h2>
//         <p className="card-subtitle">
//           Technical details of the HMPI calculation process
//         </p>
//         <div className="card">
//           <h3 className="card-title">HMPI Formula</h3>
//           <div className="formula-box">
//             <p className="formula">HMPI = Σ(Mi/Si) × Wi</p>
//           </div>
//           <p className="formula-details">
//             Where <b>Mi</b> = Measured concentration, <b>Si</b> = Standard
//             limit, <b>Wi</b> = Weight factor
//           </p>
//         </div>
//         <div className="card">
//           <h3 className="card-title">Standards Reference</h3>
//           <ul className="standard-list">
//             <li>WHO Guidelines for Drinking Water Quality (2017)</li>
//             <li>EPA National Primary Drinking Water Standards</li>
//             <li>International standards for groundwater assessment</li>
//           </ul>
//         </div>
//         <div className="card">
//           <h3 className="card-title">Classification Ranges</h3>
//           <div className="classification-grid">
//             <div className="classification-box safe">
//               <p className="range-value">Low Risk (0-50)</p>
//               <p className="range-description">Safe for consumption</p>
//             </div>
//             <div className="classification-box moderate">
//               <p className="range-value">Medium Risk (50-100)</p>
//               <p className="range-description">Monitor closely</p>
//             </div>
//             <div className="classification-box elevated">
//               <p className="range-value">High Risk (100+)</p>
//               <p className="range-description">Immediate action required</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import { CIML } from "./methodology/CIML";
import { Classification } from "./methodology/classification";
import { EnrichmentFactor } from "./methodology/ef";
import { Indices } from "./methodology/indices";

export const Methodology = () => {
  return (
    <div>
      <div className="main-header-wrapper">
        <div className="main-header">Calculation Methodology</div>
        <div className="main-text">
          Technical framework for heavy metal indices and classification
        </div>
      </div>
      <div>
        {/* 1. Computation of Heavy Metal Indices */}
        <Indices />

        {/* 2. Composite Index + Machine Learning */}
        <CIML />

        {/* 3. Classification + Geotagging */}
        <Classification />

        {/* 4. Enrichment Factor & Root-Cause Analysis */}
        <EnrichmentFactor />
      </div>
    </div>
  );
};
