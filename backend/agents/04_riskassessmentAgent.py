import os

os.makedirs("outputs",exist_ok=True)

import warnings
warnings.filterwarnings("ignore")

import pandas as pd
import numpy as np

from backend.utils.constants import WHO_LIMITS

df=pd.read_csv("agent3_output.csv")
df.head()

print(df.columns)

safe_limit=df["Predicted_HMPI"].quantile(0.25)

critical_limit=df["Predicted_HMPI"].quantile(0.75)

print("SAFE Threshold =",safe_limit)

print("CRITICAL Threshold =",critical_limit)

def classify_risk(hmpi):

    if hmpi<=safe_limit:

        return "SAFE"

    elif hmpi<=critical_limit:

        return "MODERATE"

    else:

        return "CRITICAL"

df["Risk_Level"]=df["Predicted_HMPI"].apply(

    classify_risk

)

df[["Predicted_HMPI","Risk_Level"]].head()

metal_columns=[]

for column in WHO_LIMITS.keys():

    if column in df.columns:

        metal_columns.append(column)


print(metal_columns)

for column in metal_columns:

    df[column]=pd.to_numeric(

        df[column],

        errors="coerce"

    )

def major_pollutants(row):


    ratios={}


    for metal in metal_columns:


        value=row[metal]


        if pd.notnull(value):


            limit=WHO_LIMITS[metal]


            ratios[metal]=value/limit



    if len(ratios)==0:

        return "NOT AVAILABLE"



    sorted_metals=sorted(

        ratios.items(),

        key=lambda x:x[1],

        reverse=True

    )


    top_three=[]


    for metal,value in sorted_metals[:3]:


        pollutant=metal.replace(

            "Predicted_",""

        )


        pollutant=pollutant.replace(

            "_mgL",""

        )


        top_three.append(pollutant)



    return " | ".join(top_three)

df["Major_Pollutants"]=df.apply(

    major_pollutants,

    axis=1

)

df["Major_Pollutants"].head()

def confidence_estimation(score):


    if score>=0.90:

        return "HIGH"


    elif score>=0.70:

        return "MEDIUM"


    else:

        return "LOW"

df["Confidence_Level"]=df["Confidence"].apply(

    confidence_estimation

)

def explain_risk(row):


    explanation=(

        f"The region is classified as "

        f"{row['Risk_Level']} "

        f"because the predicted HMPI is "

        f"{round(row['Predicted_HMPI'],2)}, "

        f"the major contributing pollutants are "

        f"{row['Major_Pollutants']}, "

        f"the identified pollution source is "

        f"{row['Pollution_Source']} "

        f"and the prediction confidence score is "

        f"{round(row['Confidence'],2)}."

    )


    return explanation

df["Risk_Explanation"]=df.apply(

    explain_risk,

    axis=1

)

final_df=df[

[

"Region_ID",

"Forecast_Year",

"Predicted_HMPI",

"Risk_Level",

"Risk_Explanation",

"Major_Pollutants",

"Pollution_Source",

"Confidence",

"Confidence_Level"

]

]

final_df.head(10)

final_df.to_csv(

    "outputs/agent4_final_output.csv",

    index=False

)
