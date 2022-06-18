const redius = require('redis')

const redis_client = createClient({
    port: 6379,
    host: '127.0.0.1'
})

redis_client.on('connect', function() {
    console.log('redis client connected');
})

module.exports = client