/**
 * @desc 处理ip，userid访问限制
 * @author heyanqiu@zbj.com
 * @date 2017-7-20
 */

var Pool = {};

var Pool = {
    /**
     * 向池子里面添加IP or userId
     * @method
     * @param  {[type]} IP or userId [description]
     * @param  {[type]} accessTime   [description]
     * @return {[type]}              [description]
     */
    setLimitIdAccessTime: function(limitId, accessTime) {
        Pool[limitId] = accessTime;
    },
    /**
     * 删除IP or userId
     * @method
     * @param  {[type]} IP or userId [description]
     * @return {[type]}              [description]
     */
    delLimitId: function(limitId) {
        if(!Pool[limitId]) {
            return;
        }

        Pool[limitId] = '';
        delete Pool[limitId];
    },
    /**
     * 获取IP or userId上次访问时间
     * @method
     * @param  {[type]} IP or userId [description]
     * @return {[type]}              [description]
     */
    getLimitIdPreAccessTime: function(limitId) {
        return Pool[limitId];
    },
    /**
     * 限制每个IP or userId的访问时间
     * @method
     * @param  {[type]} IP or userId [description]
     * @param  {[type]} limitTime    [description]
     * @return {[type]}              [description]
     */
    canAccess: function(limitId, limitTime) {
        var current = new Date().getTime();

        if(Pool.hasOwnProperty(limitId)) {
            if(current - Pool.getLimitIdPreAccessTime(limitId) > limitTime * 1000) {
                Pool.setLimitIdAccessTime(limitId, current);
                return true;
            } else {
                return false;
            }
        } else {
            Pool.setLimitIdAccessTime(limitId, current);
            return true;
        }
    }
};

module.exports = {
    clearLimitId: Pool.delLimitId,
    canAccess: Pool.canAccess
};
