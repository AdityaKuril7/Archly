'use server'

import { cookies } from 'next/headers'

export async function deleteToken() {
  const cookieStore = await cookies()
  console.log("Performing delete action")
  cookieStore.delete('token')
}