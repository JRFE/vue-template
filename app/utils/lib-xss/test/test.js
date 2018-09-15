'use strict'
var expect = require('chai').expect;
var xssMiddleware = require('../index')();

function getReq(){
    var req = {
        query:{
            q1:true
        },
        body:{
            b1:'<>\'\"\\',
            abchtml:'<script src="">hahah</script>yes'
        }
    }
    return req;
}


var reqResult = {
    query:{
        q1:true
    },
    body:{
        b1:'&#60;&#62;&#39;&#34;&#92;',
        abchtml:'<div></div>'
    }
}

var res = {};
var next = function(content){
    console.log(content);
}
var req_1 = getReq();
//req=>req.xss
xssMiddleware(req_1,res,next);
describe('Params Validate',function(){
    it('should return true',function(){
        var tmp = {
            query:req_1.query,
            body:req_1.body
        }
        expect(tmp).to.deep.equal(reqResult);
    })

    it('req.xss.unescape',function(){
        expect(req_1.xss.unescape(reqResult.query.q1)).to.equal(getReq().query.q1);
    })
    it('req.xss.escape',function(){
        expect(req_1.xss.escape(getReq().query.q1)).to.equal(reqResult.query.q1);
    })
})