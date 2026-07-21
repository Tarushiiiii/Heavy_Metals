import { useNavigate } from "react-router-dom";

export function useViewReport(options = {}) {
  const navigate = useNavigate();

  const viewReport = (data) => {
    // Safely extract prediction/analysis object regardless of argument format
    const targetData =
      data?.prediction !== undefined
        ? data.prediction
        : data !== undefined
          ? data
          : options?.prediction;

    if (targetData) {
      navigate("/user/analysis", { state: { analysis: targetData } });
    } else {
      navigate("/user/analysis");
    }
  };

  return viewReport;
}
