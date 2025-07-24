import { initializeApp } from "firebase/app"
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage"

import { v4 as uuid } from "uuid"

const firebaseConfig = {
  apiKey: "AIzaSyBUCqKFQ_9MCHOvpXk8JWjYjfEj05hirpc",
  authDomain: "agendar-dev-d7450.firebaseapp.com",
  projectId: "agendar-dev-d7450",
  storageBucket: "agendar-dev-d7450.firebasestorage.app",
  messagingSenderId: "787006319304",
  appId: "1:787006319304:web:7f042e7046171be17013fd",
  measurementId: "G-RWMP4PLCFP",
}

const app = initializeApp(firebaseConfig)

export const storage = getStorage(app)

export enum StorageEntity {
  Establishment = "establishments",
  Service = "services",
  Employee = "employees",
  Package = "packages",
}

export async function uploadImageToFirebase(
  base64: string,
  folder: StorageEntity
): Promise<string> {
  const filename = `${folder}/${uuid()}`
  const imageRef = ref(storage, filename)

  await uploadString(imageRef, base64, "data_url")

  const downloadURL = await getDownloadURL(imageRef)
  return downloadURL
}
