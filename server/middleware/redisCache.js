const redis = require('redis');
const expressRedisCache = require('express-redis-cache');

const redisClient = redis.createClient();

const cache = expressRedisCache({
    client: redisClient,
    expire: 3600 
});

cache.invalidate = (name) => {
    return (req, res, next) => {
        const route_name = name ? name : req.url;
        if (!cache.connected) {
            next();
            return;
        }

        cache.del(route_name, (err) => {
            if (err) {
                console.log('Erro ao invalidar o cache:', err);
            }
            next();
        });
    };
};

module.exports = {
    redisClient,
    cache,
};
