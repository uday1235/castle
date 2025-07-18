'use server'

import { revalidatePath } from 'next/cache'

import { connectToDatabase } from '../dbConnect'
import User from '../../models/User'

import { handleError } from '../util'



export async function createUser(user) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user)
    return JSON.parse(JSON.stringify(newUser))
  } catch (error) {
    handleError(error)
  }
}





