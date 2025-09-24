import "../components/ui/css/about_us.css";

export const AboutUs = () => {
    return (
        <div>
            {/* <div className="main-header-wrapper">
                <div className="main-header">Public Information</div>
                <div className="main-text">
                    Enter groundwater sample data to calculate Heavy Metal Pollution Index (HMPI) or upload bulk data via CSV for batch processing.
                </div>
            </div> */}

            <main className="about-page">
                <div className="container">

                    <h1 className="page-title">About JalDhatu</h1>
                    <p className="subtitle about-subtitle">
                        A comprehensive scientific tool for assessing heavy metal pollution in groundwater, designed to protect public health and support environmental monitoring worldwide.
                    </p>

                    <div className="about-card mission-card">
                        <h2 className="section-title">Our Mission</h2>
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
                    </div>

                    <div className="about-card methodology-card">
                        <div className="card-header-icon">
                            <i className="fas fa-flask"></i>
                            <h2 className="section-title">Scientific Methodology</h2>
                        </div>
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
                            <i className="fas fa-gavel"></i>
                            <h2 className="section-title">Regulatory Standards & Compliance</h2>
                        </div>
                        <p className="subtitle compliance-subtitle">
                            Our calculations are based on internationally recognized water quality standards
                        </p>
                        <div className="standards-list">
                            <div className="standard-item">
                                <i className="fas fa-check-circle check-icon"></i>
                                <p>WHO Guidelines for Drinking Water Quality (2017)</p>
                            </div>
                            <div className="standard-item">
                                <i className="fas fa-check-circle check-icon"></i>
                                <p>EPA National Primary Drinking Water Standards</p>
                            </div>
                            <div className="standard-item">
                                <i className="fas fa-check-circle check-icon"></i>
                                <p>EU Drinking Water Directive 2020/2184</p>
                            </div>
                            <div className="standard-item">
                                <i className="fas fa-check-circle check-icon"></i>
                                <p>Indian Standard IS 10500:2012</p>
                            </div>
                            <div className="standard-item">
                                <i className="fas fa-check-circle check-icon"></i>
                                <p>Australian Drinking Water Guidelines</p>
                            </div>
                        </div>
                    </div>

                    <div className="about-card impact-card">
                        <div className="card-header-icon">
                            <i className="fas fa-users"></i>
                            <h2 className="section-title">Global Impact</h2>
                        </div>
                        <p className="subtitle impact-subtitle">
                            Supporting researchers, institutions, and policymakers worldwide
                        </p>
                        <div className="impact-stats">
                            <div className="stat-item">
                                <p className="stat-value">500+</p>
                                <p className="stat-label">Research Institutions</p>
                            </div>
                            <div className="stat-item">
                                <p className="stat-value">50k+</p>
                                <p className="stat-label">Samples Analyzed</p>
                            </div>
                            <div className="stat-item">
                                <p className="stat-value">25</p>
                                <p className="stat-label">Countries</p>
                            </div>
                            <div className="stat-item">
                                <p className="stat-value">99.9%</p>
                                <p className="stat-label">Accuracy Rate</p>
                            </div>
                        </div>
                    </div>

                    <div className="about-card specs-card">
                        <div className="card-header-icon">
                            <i className="fas fa-cog"></i>
                            <h2 className="section-title">Technical Specifications</h2>
                        </div>
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
                            All data is encrypted in transit and at rest. We comply with GDPR, HIPAA, and other relevant data protection regulations to ensure your research data remains secure.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};
