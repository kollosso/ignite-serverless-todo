import { v4 as uuidV4 } from 'uuid'
import { APIGatewayEvent } from 'aws-lambda'
import { document } from "src/utils/dynamodbClient"

interface ICreateTodo {
  id: string
  user_id: string
  title: string
  done: boolean
  deadline: Date
}

export const handler = async (event: APIGatewayEvent) => {
  const { id, user_id, title, done, deadline } = JSON.parse(event.body) as ICreateTodo

  await document.put({
    TableName: 'ignite_todo',
    Item: {
      id: uuidV4(),
      user_id,
      title,
      done: false,
      deadline: new Date
    }
  }).promise()

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'Create todo',
      id,
      user_id, title, done, deadline
    }),
    headers: {
      'Content-type': 'application/json'
    }
  }
}
