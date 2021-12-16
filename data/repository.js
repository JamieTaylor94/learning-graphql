const { DynamoDB } = require('aws-sdk');

const docClient = new DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000',
  accessKeyId: 'DEFAULT_ACCESS_KEY',
  secretAccessKey: 'DEFAULT_SECRET'
});

const params = {
  TableName: 'premierleague'
};

exports.getTeams = async () => {
  let teams = [];
  console.log('Scanning table');

  try {
    const response = await docClient.scan(params).promise();
    teams = response.Items.map((item) => item);
  } catch {
    console.error(
      'Unable to scan the table. Error JSON:',
      JSON.stringify(err, null, 2)
    );
  }

  return teams;
};
