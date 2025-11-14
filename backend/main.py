from fastapi import FastAPI
import joblib
import numpy as np
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load models from "models" folder
MODEL_DIR = "models"
MODELS = {}

for file in os.listdir(MODEL_DIR):
    if file.endswith(".pkl"):
        name = file.replace(".pkl", "")
        MODELS[name] = joblib.load(f"{MODEL_DIR}/{file}")

# --------------------------------------------
# DEBUG ENDPOINT (to check model type & keys)
# --------------------------------------------
@app.get("/debug_model/{model_name}")
def debug_model(model_name: str):
    obj = MODELS[model_name]

    if isinstance(obj, dict):
        inner = obj.get("script")

        return {
            "outer_type": "dict",
            "outer_keys": list(obj.keys()),
            "script_type": str(type(inner)),
            "script_attrs": dir(inner)[:20]  # show first 20 attributes
        }

    return {"type": str(type(obj))}

# --------------------------------------------


@app.post("/predict/{model_name}")
def predict(model_name: str, payload: dict):
    if model_name not in MODELS:
        return {"error": "Model not found"}

    model = MODELS[model_name]
    features = np.array(payload["features"]).reshape(1, -1)

    pred = model.predict(features)[0]

    return {
        "model_used": model_name,
        "prediction": float(pred)
    }
