const userSecrets = {
  "709c179f-1dcf-4c8f-8cfc-e1e30bbae226": {
    walletAddress: "smpl1244",
    secret: "12345"
  }
}

module.exports = [
  {
    id: "get-secrets", // id of the route
    url: "/api/secrets", // url in express format
    method: "GET", // HTTP method
    variants: [
      {
        id: "real", // id of the variant
        response: (req, res) => {
          const headers = req.headers;
          console.log('headers', headers)
          if (headers.authorization) {
            console.log('auth', headers.authorization)
            const [, token] = headers.authorization.split(' ')
            console.log('token', token)
            if (!token) {
              console.log('no token?', token)
              res.status(500);
            } else {
              const [jwtHeader, base64String] = token.split('.');
              console.log('jwtHeader and payload', jwtHeader, base64String)
              const decodedPayload = JSON.parse(Buffer.from(base64String, 'base64').toString('utf8'));
              const decodedHeader = JSON.parse(Buffer.from(jwtHeader, 'base64').toString('utf8'));
              console.log('Header and payload decoded', decodedHeader, decodedPayload)
              res.status(200);
              res.send(userSecrets[decodedPayload['sub']]);
            }
          } else {
            console.log('um, something else')
            res.status(404);
            res.send({
              message: "User not found",
            });
          }
        }
        ,
      },
    ],
  }
]
