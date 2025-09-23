import { connectDB } from './db/db'

export async function createUser(data) {

  const db = await connectDB()
  const user = {
    name: data.displayName,
    email: data.email,
    profile_photo: data.photoURL
  }

  await db.collection('all_users').insertOne(user)
  const createdUser = await db.collection('all_users')
    .find({ email: data.email })

  return createdUser;
}


/**
{
  "uid": "dpowjsqr7XNE1ZGl1RTJWTbQxc43",
  "email": "abdullah72308@gmail.com",
  "emailVerified": true,
  "displayName": "abu abdullah",
  "isAnonymous": false,
  "photoURL": "https://lh3.googleusercontent.com/a/ACg8ocL-xgJzzNP9EHXv5Z6AFCIQ83t-VPetD4Ra9Z6e_cpQ_PNaEjtL=s96-c",
  "providerData": [
    {
      "providerId": "google.com",
      "uid": "107272369362506386678",
      "displayName": "abu abdullah",
      "email": "abdullah72308@gmail.com",
      "phoneNumber": null,
      "photoURL": "https://lh3.googleusercontent.com/a/ACg8ocL-xgJzzNP9EHXv5Z6AFCIQ83t-VPetD4Ra9Z6e_cpQ_PNaEjtL=s96-c"
    }
  ],
  "stsTokenManager": {
    "refreshToken": "AMf-vBxpzYC2iqbI8AWQ2qMNSIUzS878jBz8ZO9Nc67amYG2ypcRex6U1GkIEbw7BN8Rd4Z49DALIsYQAGDivbUUkK9gR3Dv-ZHYihhx_1nH5EFTjoPbUbPIwakQ3dme77zOcVkv8pjeEYmty196fFz_U9ewXvrhSMzKsC7vdUPUzooT-sw8CcTMroFdTsk72MG5Ombl3n7LV0snBRozuxwIQZVJns4DTwCwl_kWC6L18dJsRc2oN3Kif-VCQjXFo7TGUfG68uiM7jIiui8z66UGe55ThgvwLcIj-CbzNbv8VB2PeBVBMhkfQgto3PrXmU6kxVu2A4O1pEMdWuMcnAO4s8o-8CzPU4DcL0Py5GKaglrN24UwyDHbXKkXqg9OFNcYFF2exDtblBWm1qvMPfL4UqxFJ5KjpnhWRbW8OXZCFjNeuJXGxjTb_vDJhyPLDoubrrgseCWN",
    "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjUwMDZlMjc5MTVhMTcwYWIyNmIxZWUzYjgxZDExNjU0MmYxMjRmMjAiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiYWJ1IGFiZHVsbGFoIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0wteGdKenpOUDlFSFh2NVo2QUZDSVE4M3QtVlBldEQ0UmE5WjZlX2NwUV9QTmFFanRMPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2V4cGVuc2UtYXBwLXBpIiwiYXVkIjoiZXhwZW5zZS1hcHAtcGkiLCJhdXRoX3RpbWUiOjE3NTg2NDAxODQsInVzZXJfaWQiOiJkcG93anNxcjdYTkUxWkdsMVJUSldUYlF4YzQzIiwic3ViIjoiZHBvd2pzcXI3WE5FMVpHbDFSVEpXVGJReGM0MyIsImlhdCI6MTc1ODY0MDE4NCwiZXhwIjoxNzU4NjQzNzg0LCJlbWFpbCI6ImFiZHVsbGFoNzIzMDhAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDcyNzIzNjkzNjI1MDYzODY2NzgiXSwiZW1haWwiOlsiYWJkdWxsYWg3MjMwOEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.Z_t0cjAoPkSzkmYYkSXa-XHnPZ8ll0b4fKKPOy--9UNxJnUSuZUOz_L4_Th9PUpuFJxu7FG4XuX-mdiWV2pm2To9W_DZxNQOlnO_xoIwhRDB-rZdVXXzgWf9Z5rjInWkV4eZc0v47dNGGWceYsx49MYv1oeDkzt3ESr_Q1Ni0j4zyG7A4_GiZGaQT_5H5yV-CiCHMravl8krAhmeqpyTUna7pxUMClXY0wpe2muXA7GMoa2jfXdH437a3tLZ4x0_kbdehCu8qy6rjPqqWKCm_83l04mN_92Nz5l_iPUGtQbJhfMSaNDGtz2472dDpUqA3QL2pRw_WL6x5YW0BmVZaA",
    "expirationTime": 1758643785387
  },
  "createdAt": "1758599250010",
  "lastLoginAt": "1758640184255",
  "apiKey": "AIzaSyCTj2gRfaTrvVFRpa6e_tTx9GlKJdYlSHA",
  "appName": "[DEFAULT]"
}
 */