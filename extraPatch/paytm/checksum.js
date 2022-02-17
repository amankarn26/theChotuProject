const express = require('express');
const router = express.Router();

var PaytmChecksum = require("PaytmChecksum");


router.get('/', (req, res) => {
    res.status(200).json("oOkVOSKQm4+JxtlxQ5A707aEBJKludRQcwA8AtJZ3rCC6XTjcObyyEBsA/4+KGZSzcjO+cwNfmEs+LOqfDJeet1YY8WoYdrOHdq8c/KMicw=")
    
});

router.get('/:orderId', (req, res) => {

    var paytmParams = {};
    paytmParams["MID"] = "zEQBXS10900725259012";
    paytmParams["ORDERID"] = req.params.orderId;

    var paytmChecksum = PaytmChecksum.generateSignature(paytmParams, "kE#HC%F4ExJ4XVZo");
    paytmChecksum.then(function(result){
        console.log("generateSignature Returns: " + result);
        res.status(200).json(result)
        // var verifyChecksum =  PaytmChecksum.verifySignature(paytmParams, "kE#HC%F4ExJ4XVZo",result);
        // console.log("verifySignature Returns: " + verifyChecksum);
    }).catch(function(error){
        console.log(error);
    });
    
});

module.exports = router;