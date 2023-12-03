import fastify from 'fastify'
import dotenv from 'dotenv'

dotenv.config()

const server = fastify()

server.get('/ping', async (request, reply) => {
  return 'pong\n'
})

if (process.env.PORT === undefined) {
  throw new Error('PORT must be defined')
}

server.listen({ port: parseInt(process.env.PORT) }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
});

