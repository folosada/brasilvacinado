const dynamodb = require('aws-sdk/clients/dynamodb');
let docClient;
if (process.env.AWS_SAM_LOCAL) {
  docClient = new dynamodb.DocumentClient({endpoint: 'http://dynamo:8000'});
} else {
  docClient = new dynamodb.DocumentClient();
}

exports.handler = async (event) => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`Method not allowed: ${event.httpMethod}`);
    }
    console.info('received:', JSON.stringify(process.env));

    var params = {
        TableName : process.env.VACCINATION_TABLE_NAME
    };
    const data = await docClient.scan(params).promise();
    const items = data.Items;
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
