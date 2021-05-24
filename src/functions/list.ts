import { APIGatewayEvent } from 'aws-lambda'
import { document } from 'src/utils/dynamodbClient'

export const handler = async (event: APIGatewayEvent) => {
  const { id } = event.pathParameters

  const response = await document.query({
    TableName: 'ignite_todo',
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: {
      ':id': id
    }
  }).promise()

  return {
    statusCode: 201,
    body: JSON.stringify(response.Items),
    headers: {
      'Content-type': 'application/json'
    }
  }
}