const dynamodb = require('aws-sdk/clients/dynamodb');
let docClient;
if (process.env.AWS_SAM_LOCAL) {
  docClient = new dynamodb.DocumentClient({endpoint: 'http://dynamo:8000'});
} else {
  docClient = new dynamodb.DocumentClient();
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(`Method not allowd: ${event.httpMethod}`);
  }
  console.info('received:', event);

  const { initialDate, finalDate } = event.queryStringParameters;
  const params = {
    TableName : process.env.HISTORIC_TABLE_NAME,
    KeyConditionExpression: 'iso_code = :iso_code and #date BETWEEN :initialDate and :finalDate',
    ExpressionAttributeNames: {
      '#date': 'date'
    },
    ExpressionAttributeValues: {
      ':initialDate': initialDate,
      ':finalDate': finalDate
    },
    ProjectionExpression: 'iso_code,#date,new_vaccinations,total_vaccinations'
  };

  const codes = ['BRA', 'OWID'];

  const promises = [];

  codes.forEach(iso_code => {
    params.ExpressionAttributeValues[':iso_code'] = iso_code;
    promises.push(docClient.query(params).promise());
  });

  const result = await Promise.all(promises);
  const items = result.flatMap(data => {
    return data.Items;
  });

  const response = {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    statusCode: 200,
    body: JSON.stringify(items)
  };

  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
  return response;
}
