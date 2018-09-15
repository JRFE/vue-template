/**
 * @authors       Peter 王斐
 * @email         wangfeia@zbj.com
 * @date          2017-04-01 09:40
 * @description
 */

export default {
    avatar: function(uid,size){
        if( !uid ) return 'http://t4.zbjimg.com/r/p/task/48.gif';//如果没有传入用户ID，则返回国默认图片地址

        var maxIUserid = "000000000" + uid,
            iUserid = maxIUserid.substr( maxIUserid.length - 9, 9),
            sImgUrl;

        size = size || 'small';

        sImgUrl = 'http://avatar.zbjimg.com/'
            + iUserid.substr(0,3)
            + '/'+ iUserid.substr(3,2)
            + '/' + iUserid.substr(5,2)
            + '/200x200_avatar_'
            + iUserid.substr(7,2) + '.jpg!' + size;

        return sImgUrl;
    }
}
