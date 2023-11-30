import { Table } from 'sst/node/table'
import handler from '@notes/core/handler'
import dynamoDb from '@notes/core/dynamodb'

export const main = handler(async (event) => {
  const params = {
    TableName: Table.Notes.tableName,
    Key: {
      userId: "12345", 
      noteId: event?.pathParameters?.id
    },
  }
  console.log("Params: ", params)

  const result = await dynamoDb.get(params)
  if (!result.Item) {
    throw new Error("Item not found")
  }

  return JSON.stringify(result.Item)
})