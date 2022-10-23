// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../lib/mongodb'
import { ObjectId } from "mongodb";

type Data = {
  message: string
	response: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

	const { db } = await connectToDatabase();
  
	switch( req.method ) {
		case 'GET':
			// get ALL records
			const todos = await db
				.collection('todos')
				.find({})
				.sort({ metacritic: -1 })
				// .limit(20)
				.toArray();

			res.status(200).json({ message: "GET ALL Completed", response: todos })
			break

		case 'POST':
			if ( req.body ) {
				const todos = await db
					.collection('todos')
					.insertOne(req.body)

					res.status(201).json({
						response: await db.collection("todos").findOne({ id: todos.insertedId }),
						message: "Todo added successfully"
					})
			} else {
				res.status(400).json({ message: "Bad information detected", response: todos })
			}
			break

		case 'PUT':
			if ( req.body ) {
				console.log("req.body", req.body)
				const { id, heading, description, done } = req.body
				const todos = await db
					.collection('todos')
					.updateOne(
						{ _id: ObjectId(id) },
						{
							$set: {
								heading: heading,
								description,
								done
							},
						}
					);

					// Send a response
					res.status(200).json({
						response: await db.collection("todos").findOne({ _id: ObjectId(id) }),
						message: "Todo updated successfully",
					});
			} else {
				res.status(400).json({ message: "Bad information detected", response: todos })
			}
			break

		case 'DELETE':
			if ( req.body ) {
				const todos = await db
					.collection('todos')
					.deleteOne({ _id: new ObjectId(req.body) })

					res.status(200).json({ message: "DELETE Completed", response: todos })
			} else {
				res.status(400).json({ message: "Bad or Missing information", response: todos })
			}
			break
		
		default:
			res.setHeader('Allow', ['GET', 'POST', 'DELETE'])
			res.status(405).end(`Method ${req.method} Not Allowed`)
	}
	
}
