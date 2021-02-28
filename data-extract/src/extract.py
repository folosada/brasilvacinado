import pandas as pd
import requests
import io
import datetime
import math
import json
import boto3
import os
import copy

csv_url = 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.csv'

vaccination_table_name = os.getenv('VACCINATION_TABLE_NAME')
historic_table_name = os.getenv('HISTORIC_TABLE_NAME')
sam_local = os.getenv('AWS_SAM_LOCAL')
client = None
if (sam_local):
    client = boto3.client('dynamodb', endpoint_url='http://dynamo:8000')
else:
    client = boto3.client('dynamodb')

def get_csv_file():
    with requests.Session() as session:
        download = session.get(csv_url)
        return download.content.decode('utf-8')

def handler(event, context):
    data_frame = pd.read_csv(io.StringIO(get_csv_file()))

    data_frame = data_frame.loc[(data_frame['location'] == 'Brazil') | (data_frame['location'] == 'World')]
    dataset = data_frame.to_dict('records')
    vaccination_data = []
    countries_data = []
    country_data = {}
    current_datetime = datetime.datetime.utcnow()
    for index in range(0, len(dataset)):
        dataset[index]['time_to_live'] = int((current_datetime + datetime.timedelta(days=30)).timestamp())
        dataset[index]['date'] = current_datetime.isoformat()
        vaccination_data.append({
            'iso_code': {'S': dataset[index]['iso_code']},
            'total_vaccinations': {'N': str(dataset[index]['total_vaccinations'])},
            'date': {'S': current_datetime.isoformat()}})
        for column in dataset[index]:
            value = {}
            if (isinstance(dataset[index][column], str)):
                value = {'S': dataset[index][column]}
            else:
                if (math.isnan(dataset[index][column])):
                    value = {'N': '0'}
                else:
                    value = {'N': str(dataset[index][column])}
            country_data[column] = value
        countries_data.append(copy.deepcopy(country_data))
        country_data = {}

    for country in countries_data:
        client.put_item(
            TableName=historic_table_name,
            Item=country
        )

    for country in vaccination_data:
        client.put_item(
            TableName=vaccination_table_name,
            Item=country
        )

    return "success"