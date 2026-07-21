import axios from "axios";

/**
 * Pipeline Service
 * Interacts with the Heavy Metals 5-Agent Analysis Pipeline endpoints.
 */

const getBaseUrl = () => {
    return window.location.hostname === "localhost"
        ? "http://127.0.0.1:8000"
        : (import.meta.env.VITE_API_URL || "http://127.0.0.1:8000");
};

/**
 * Run 5-agent pipeline via file upload (.csv, .xlsx, .xls)
 * @param {File} file 
 * @returns {Promise<object>} Pipeline execution result
 */
export const runPipelineWithFile = async (file) => {
    if (!file) {
        throw new Error("A file is required.");
    }

    const baseUrl = getBaseUrl();
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await axios.post(`${baseUrl}/pipeline/run`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Pipeline file upload error:", error);
        throw error;
    }
};

/**
 * Run 5-agent pipeline via raw JSON data
 * @param {object|Array} data Payload containing sample metrics or rows
 * @returns {Promise<object>} Pipeline execution result
 */
export const runPipelineRaw = async (data) => {
    if (!data) {
        throw new Error("Data payload is required.");
    }

    const baseUrl = getBaseUrl();

    try {
        const response = await axios.post(`${baseUrl}/pipeline/run_raw`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Pipeline raw execution error:", error);
        throw error;
    }
};
