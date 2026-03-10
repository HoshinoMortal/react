import http from 'http'
import _map from './interfaceMap.js'
import _filter from './interfaceFilter.js'
import Mock from 'mockjs'

const PORT = 1111

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': req.headers.origin,
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': true,
    'Cache-Control': 'no-cache,no-store',
  })
  if (req.method === 'OPTIONS') {
    res.end(null)
  }
  if (req.method === 'POST') {
    let postData = ''
    req.addListener('data', dataBuffer => postData += dataBuffer)
    req.addListener('end', () => {
      console.log('url=>', req.url)
      postData = JSON.parse(postData)
      const originData = _map[req.url]
        ? Mock.mock(_map[req.url])
        : ''
      const data = typeof (_filter[req.url]) === 'function'
        ? _filter[req.url](originData, postData)
        : originData
      setTimeout(() => {
        res.end(JSON.stringify(data))
      }, parseInt(((Math.random() - 0.5) + 1) * 500, 10))
    })
  }
})

server.listen(PORT, () => {
  console.log(`Mock server listening on port ${PORT}`)
})

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is already in use. Please stop the existing mock server first.`)
    process.exit(1)
  } else {
    console.error('Server error:', err)
    process.exit(1)
  }
})
