// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../lib/mongodb'

type Data = {
  message: string
	todos?: any[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

	const { db } = await connectToDatabase();
	const { id } = req.query
  
	switch( req.method ) {
		case 'GET':

			const todos = await db
				.collection('todos')
				.find({ "_id": ObjectId(id)})
				.toArray();

			res.status(200).json({ message: "GET Filtered Completed", todos })
			break
	}
	
}
