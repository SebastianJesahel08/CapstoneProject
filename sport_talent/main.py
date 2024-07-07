from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import pandas as pd
import numpy as np
from sklearn.impute import SimpleImputer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import GaussianNB
from sklearn.cluster import KMeans
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

app= Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/', methods=["POST"])
@cross_origin()
def root():
    dataset = pd.read_excel('training/dataset.xlsx', header=0)
    dataset['Eval. Date'] = pd.to_datetime(dataset['Eval. Date'], format='%d/%m/%Y')
    dataset_sorted = dataset.sort_values(by=['Name and surname', 'Eval. Date'], ascending=[True, False])
    new_dataset = dataset_sorted.drop_duplicates(subset='Name and surname', keep='first')
    numeric_columns = new_dataset.select_dtypes(include=[np.number]).columns
    new_dataset.loc[:, numeric_columns] = new_dataset.loc[:, numeric_columns].fillna(new_dataset.loc[:, numeric_columns].mean())

    features = ['Age', 'Gender', 'Weight', 'Height', 'ARM MUSCLE', 'ARM ADIP', 'THIGH MUSCLE', 'THIGH ADIP', 'LEG MUSCLE', 'LEG ADIP', '% ARM FAT']
    target = 'SUITABLE SPORTS'

    X = new_dataset[features]
    y = new_dataset[target]

    scaler = StandardScaler()
    X = scaler.fit_transform(X)

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    imputer = SimpleImputer(strategy='mean')
    X_train = imputer.fit_transform(X_train)
    X_test = imputer.transform(X_test)

    metrics = {
        'Model': [],
        'Accuracy': [],
        'Precision': [],
        'Recall': [],
        'F1-Score': []
    }

    def add_metrics(model_name, y_test, y_pred):
        metrics['Model'].append(model_name)
        metrics['Accuracy'].append(accuracy_score(y_test, y_pred))

        report = classification_report(y_test, y_pred, output_dict=True, zero_division=0)
        metrics['Precision'].append(report['weighted avg']['precision'])
        metrics['Recall'].append(report['weighted avg']['recall'])
        metrics['F1-Score'].append(report['weighted avg']['f1-score'])

    rf = RandomForestClassifier()
    rf.fit(X_train, y_train)
    y_pred_rf = rf.predict(X_test)
    add_metrics('Random Forest', y_test, y_pred_rf)

    metrics_df = pd.DataFrame(metrics)

    # Mostrar la tabla de métricas
    # print(metrics_df)
    full_name=request.get_json()['full_name']
    age = request.get_json()['age']
    gender = request.get_json()['gender']
    weight = request.get_json()['weight']
    height = request.get_json()['height']
    arm_muscle = request.get_json()['arm_muscle']
    arm_adip = request.get_json()['arm_adip']
    thigh_muscle = request.get_json()['thigh_muscle']
    thigh_adip = request.get_json()['thigh_adip']
    leg_muscle = request.get_json()['leg_muscle']
    leg_adip = request.get_json()['leg_adip']
    arm_fat = request.get_json()['arm_fat']

    new_data = pd.DataFrame({
        'Age': [age],
        'Gender': [gender],
        'Weight': [weight],
        'Height': [height],
        'ARM MUSCLE': [arm_muscle],
        'ARM ADIP': [arm_adip],
        'THIGH MUSCLE': [thigh_muscle],
        'THIGH ADIP': [thigh_adip],
        'LEG MUSCLE': [leg_muscle],
        'LEG ADIP': [leg_adip],
        '% ARM FAT': [arm_fat]
    })

    new_data = new_data[features]

    new_data_scaled = scaler.transform(new_data)

    new_data_imputed = imputer.transform(new_data_scaled)

    prediction = rf.predict(new_data_imputed)

    return jsonify({'sport': prediction[0],'name':full_name})


if __name__ == '__main__':
    app.run(debug=True)