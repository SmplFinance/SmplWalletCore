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
            const [, token] = headers.authorization.split(' ')
            if (!token) {
              res.status(500);
              return
            }
            const [jwtHeader, base64String] = token.split('.');
            const decodedPayload = JSON.parse(Buffer.from(base64String, 'base64').toString('utf8'));
            const decodedHeader = JSON.parse(Buffer.from(jwtHeader, 'base64').toString('utf8'));
            console.log(decodedPayload);
            res.status(200);
            res.send({decodedHeader, decodedPayload});
          } else {
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
