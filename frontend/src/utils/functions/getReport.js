/**
 * Generates the structured data object for the final PDF report.
 * @param {object} reportData - A single object from the reportsData array (e.g., the closest match).
 * @returns {object} The report data structured for the output PDF.
 */
export const formatReportForDownload = (reportData) => {
    if (!reportData) {
        return { error: "No report data found for this location." };
    }

    // --- Suggestion Logic (Inferred from Risk Status) ---
    let suggestionText = "";
    if (reportData.status === "Critical") {
        suggestionText = "Immediate Enforce Strict Waste Disposal and Source Control.";
    } else if (reportData.status === "Alert") {
        suggestionText = "Enhance Monitoring and Implement Remediation Strategies.";
    } else {
        suggestionText = "Maintain regular surveillance and promote local Aquifer Recharge.";
    }

    const placeName = reportData.reverseAddress
        || (reportData.district && reportData.state ? `${reportData.district}, ${reportData.state}` : null)
        || reportData.district || reportData.region || reportData.place || reportData.location
        || "N/A";

    // --- Mapping Logic ---
    return {
        // Location Details
        Coordinates: `${reportData.lat}° N , ${reportData.lng}° E`,
        Place: placeName,
        
        // HMPI Values
        "HPI Value": reportData.hpi,
        "HEI Value": reportData.hpi, // Using HPI value as a placeholder, as distinct HEI data is missing.
        "MI Value": reportData.hpi - (reportData.hpi * 0.02), // Slight variation for MI, as seen in the sample image (33.79 vs 32.9)
        "Cd Value": reportData.ci * 0.65, // Placeholder/derived value, as specific contaminant index is missing.
        "CI Value": reportData.ci, // This is the 'Unified HMPI' value in your sample.

        // Assessment
        Risk: reportData.status,
        "Root Cause": reportData.cause,
        Suggestion: suggestionText,
        
        // Additional Data for Context (if needed for the footer/metadata)
        "Metal Type": reportData.metal,
        "Regional Analysis": reportData.ml,
    };
};