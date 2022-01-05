const CryptoJs = require('crypto-js')

const secretQueryKey = 'passphrase'
const walletAddressKey = 'walletAddress'

// encrypted with passphrase "bobs your uncle"
const mnemonics = {
  "smpl1ue4j0h64t8c58uxxrnr4krz0wnls6ed2gf24le": "U2FsdGVkX19VYjtvTLpS0103895Gtt0Z7G5bY8QMvSy9vKlRMgN0ZrdHFIe1KYvwUtrmYdbTwrDj4u4W0523S1i9c9IQD/N0xOvQAc8kW2c+RfNn3wo8RrOsOnvhWTbpHhr877dN7vGbfknXEabvRGlQkqdrZ1RKudHY3LBQG2g="
}

module.exports = [
  {
    id: "get-mnemonics", // id of the route
    url: "/api/mnemonics", // url in express format
    method: "GET", // HTTP method
    variants: [
      {
        id: "success", // id of the variant
        response: (req, res) => {
          const walletAddress = req.query[walletAddressKey]
          const secret = req.query[secretQueryKey]
          console.log(`${secretQueryKey} is`, secret);
          console.log(`${walletAddressKey} is`, walletAddress);
          const decryptedText = CryptoJs.AES.decrypt(mnemonics[walletAddress], 'bobs your uncle')
          res.status(200);
          res.send(decryptedText.toString(CryptoJs.enc.Utf8));
        }
      },
      {
        id: "error", // id of the variant
        response: {
          status: 400, // status to send
          body: {
            // body to send
            message: "Error",
          },
        },
      },
    ],
  },
  //     {
  //       id: "real", // id of the variant
  //       response: (req, res) => {
  //         const userId = req.params.id;
  //         const user = USERS.find((userData) => userData.id === Number(userId));
  //         if (user) {
  //           res.status(200);
  //           res.send(user);
  //         } else {
  //           res.status(404);
  //           res.send({
  //             message: "User not found",
  //           });
  //         }
  //       },
  //     },
  //   ],
  // },
];
