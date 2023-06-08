import { AES, enc } from 'crypto-js'

const secretKey = process.env.JWT_SECRET

export function encodeJWT(payload) {

  const token = AES.encrypt(payload, secretKey)
  return token.toString()

}

export default function () {
    return <></>
}