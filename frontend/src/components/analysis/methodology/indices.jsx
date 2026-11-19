
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

export const Indices = () => {
  return (
    <div className="card">
      <h3 className="card-title">
        Computation of Heavy Metal Indices
      </h3>

      <ul className="standard-list">

        <li>
          <b>Heavy Metal Pollution Index (HPI)</b>

          <BlockMath math="HPI = \frac{\sum_{i=1}^{n} W_i Q_i}{\sum_{i=1}^{n} W_i}" />

          <BlockMath math="Q_i = \frac{|M_i - I_i|}{S_i - I_i} \times 100" />

          <p>
            Reflects overall water quality using toxicity-based
            weightage assigned to individual heavy metals.
          </p>
        </li>

        <li>
          <b>Heavy Metal Evaluation Index (HEI)</b>

          <BlockMath math="HEI = \sum_{i=1}^{n} \frac{H_{c,i}}{H_{MAC,i}}" />

          <p>
            Represents the cumulative effect of all heavy metals
            relative to their maximum admissible concentrations.
          </p>
        </li>

        <li>
          <b>Degree of Contamination (C_d)</b>

          <BlockMath math="C_d = \sum_{i=1}^{n} \left( \frac{C_{A,i}}{C_{N,i}} - 1 \right)" />

          <p>
            Measures the overall contamination contributed by
            individual heavy metals.
          </p>
        </li>

        <li>
          <b>Metal Index (MI)</b>

          <BlockMath math="MI = \sum_{i=1}^{n} \frac{C_i}{MAC_i}" />

          <p>
            Provides a cumulative measure of metal concentrations
            relative to their maximum allowable concentrations.
          </p>
        </li>

      </ul>
    </div>
  );
};
