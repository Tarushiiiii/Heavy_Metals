import { CircleCheckBig, Earth, HandHeart, LaptopMinimalCheck, PencilRuler } from "lucide-react";
import "../components/ui/css/about_us.css";

export const AboutUs = () => {
    return (
        <div>
            <main className="about-page">
                <div className="container">

                    <h1 className="page-title">About JalDhatu</h1>
                    <p className="subtitle about-subtitle">
                        A comprehensive scientific tool for assessing heavy metal pollution in groundwater, designed to protect public health and support environmental monitoring worldwide.
                    </p>

                    <div className="about-card mission-card">

                        <h2 className="section-title">
                            <HandHeart className="icon title" />
                            Our Mission
                        </h2>
                        <p>
                            To provide accessible, reliable, and scientifically accurate tools for assessing heavy metal contamination in groundwater, enabling better decision-making for public health protection and environmental conservation.
                        </p>
                    </div>

                    <h2 className="section-title why-choose-title">Why Choose Our Platform?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fas fa-bolt"></i>
                            </div>
                            <h3 className="feature-title">Automated Processing</h3>
                            <p>Advanced algorithms ensure rapid, accurate calculations with minimal manual intervention.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fas fa-shield-alt"></i>
                            </div>
                            <h3 className="feature-title">Regulatory Compliance</h3>
                            <p>Built-in compliance with WHO, EPA, and international water quality standards.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fas fa-globe"></i>
                            </div>
                            <h3 className="feature-title">Global Accessibility</h3>
                            <p>Cloud-based platform accessible to researchers and institutions worldwide.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fas fa-bullseye"></i>
                            </div>
                            <h3 className="feature-title">Precision Analytics</h3>
                            <p>State-of-the-art methodologies provide reliable, scientifically-backed results.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fas fa-bullseye"></i>
                            </div>
                            <h3 className="feature-title">Blockchain Approach</h3>
                            <p>We securely store geo-tagged HMPI results immutably, by storing only the final HMPI value, not the user’s raw data, to ensure integrity.</p>
                        </div>
                    </div>

                    <div className="about-card methodology-card">
                        <h2 className="section-title">
                            <PencilRuler className="icon title" />
                            Scientific Methodology
                        </h2>
                        <p className="subtitle methodology-subtitle">
                            Our HMPI calculation follows rigorous scientific protocols and international standards
                        </p>
                        <div className="steps-grid">
                            <div className="step-item">
                                <div className="step-number">01</div>
                                <h4 className="step-title">Data Collection</h4>
                                <p>Groundwater samples are analyzed for heavy metal concentrations using standardized laboratory procedures.</p>
                            </div>
                            <div className="step-item">
                                <div className="step-number">02</div>
                                <h4 className="step-title">Index Calculation</h4>
                                <p>HMPI values are computed using the weighted sum formula: HMPI = ∑(Mi/Si) × Wi</p>
                            </div>
                            <div className="step-item">
                                <div className="step-number">03</div>
                                <h4 className="step-title">Risk Assessment</h4>
                                <p>Results are classified into risk categories based on established scientific thresholds.</p>
                            </div>
                            <div className="step-item">
                                <div className="step-number">04</div>
                                <h4 className="step-title">Report Generation</h4>
                                <p>Comprehensive reports with recommendations are automatically generated for stakeholders.</p>
                            </div>
                        </div>
                    </div>

                    <div className="about-card compliance-card">
                        <div className="card-header-icon">
                            <h2 className="section-title">
                                <CircleCheckBig className="icon title" />
                                Regulatory Standards & Compliance
                            </h2>
                        </div>
                        <p className="subtitle compliance-subtitle">
                            Our calculations are based on internationally recognized water quality standards
                        </p>
                        <div className="standards-list">
                            <a
                                href="https://www.who.int/publications/i/item/9789241549950"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="standard-item"
                            >
                                <CircleCheckBig className="check-icon" />
                                <p>WHO Guidelines for Drinking Water Quality (2017)</p>
                            </a>

                            <a
                                href="https://www.epa.gov/ground-water-and-drinking-water/national-primary-drinking-water-regulations"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="standard-item"
                            >
                                <CircleCheckBig className="check-icon" />
                                <p>EPA National Primary Drinking Water Standards</p>
                            </a>

                            {/* <a
                                href="https://eur-lex.europa.eu/eli/dir/2020/2184/oj"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="standard-item"
                            >
                                <CircleCheckBig className="check-icon" />
                                <p>EU Drinking Water Directive 2020/2184</p>
                            </a> */}

                            <a
                                href="https://cpcb.nic.in/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="standard-item"
                            >
                                <CircleCheckBig className="check-icon" />
                                <p>Central Pollution Control Board</p>
                            </a>

                            <a
                                href="https://www.bis.gov.in/productdetails/is/10500"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="standard-item"
                            >
                                <CircleCheckBig className="check-icon" />
                                <p>Indian Standard IS 10500:2012</p>
                            </a>

                            {/* <a
                                href="https://www.nhmrc.gov.au/about-us/publications/australian-drinking-water-guidelines"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="standard-item"
                            >
                                <CircleCheckBig className="check-icon" />
                                <p>Australian Drinking Water Guidelines</p>
                            </a> */}

                            <a
                                href="https://cgwb.gov.in/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="standard-item"
                            >
                                <CircleCheckBig className="check-icon" />
                                <p>Central Ground Water Board</p>
                            </a>
                        </div>
                    </div>

                    {/* <div className="about-card impact-card">
                        <h2 className="section-title">
                            <Earth className="icon title" />
                            Global Impact
                        </h2>
                        <p className="subtitle impact-subtitle">
                            Supporting researchers, institutions, and policymakers worldwide
                        </p>
                        <div className="impact-stats">
                            <div className="stat-item">
                                <p style={{ fontSize: '2rem', fontWeight: 700, color: '#212336' }}>500+</p>
                                <p className="stat-label">Research Institutions</p>
                            </div>
                            <div className="stat-item">
                                <p style={{ fontSize: '2rem', fontWeight: 700, color: '#212336' }}>50k+</p>
                                <p className="stat-label">Samples Analyzed</p>
                            </div>
                            <div className="stat-item">
                                <p style={{ fontSize: '2rem', fontWeight: 700, color: '#212336' }}>25</p>
                                <p className="stat-label">Countries</p>
                            </div>
                            <div className="stat-item">
                                <p style={{ fontSize: '2rem', fontWeight: 700, color: '#212336' }}>99.9%</p>
                                <p className="stat-label">Accuracy Rate</p>
                            </div>
                        </div>
                    </div> */}

                    <div className="about-card specs-card">
                        <h2 className="section-title">
                            <LaptopMinimalCheck className="icon title" />
                            Technical Specifications
                        </h2>
                        <h3 className="specs-subtitle">Heavy Metals Assessed</h3>
                        <div className="metals-list">
                            <span className="metal-badge">Lead (Pb)</span>
                            <span className="metal-badge">Cadmium (Cd)</span>
                            <span className="metal-badge">Mercury (Hg)</span>
                            <span className="metal-badge">Arsenic (As)</span>
                            <span className="metal-badge">Chromium (Cr)</span>
                            <span className="metal-badge">Copper (Cu)</span>
                            <span className="metal-badge">Zinc (Zn)</span>
                            <span className="metal-badge">Nickel (Ni)</span>
                        </div>
                        <h3 className="specs-subtitle">Detection Limits</h3>
                        <p>Our platform can accurately assess concentrations as low as 0.1 µg/L for most heavy metals, ensuring precise detection even at trace levels.</p>
                        <h3 className="specs-subtitle">Data Security</h3>
                        <p>
                            {/* All data is encrypted in transit and at rest. We comply with GDPR, HIPAA, and other relevant data protection regulations to ensure your research data remains secure. */}
                            All data is encrypted in transit and at rest to ensure your research data remains secure.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};
