const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const { sendErrorResponse } = require('../utils')

const createApiKey = async (req, res) => {
  const { pass } = req.body

  if (!pass) {
    return sendErrorResponse(res, 400, 'Password is required')
  }
  if (pass !== 'fabianobispo') {
    return sendErrorResponse(res, 401, 'Invalid password')
  }

  try {
    const key = crypto.randomUUID()
    const { name } = req.body

    const apiKey = await prisma.apiKey.create({
      data: {
        name,
        key
      }
    })
    res.json({ success: true, message: apiKey })
  } catch (error) {
    sendErrorResponse(res, 500, error.message)
  }
}

const listApiKeys = async (req, res) => {
  const { pass } = req.body

  if (!pass) {
    return sendErrorResponse(res, 400, 'Password is required')
  }
  if (pass !== 'fabianobispo') {
    return sendErrorResponse(res, 401, 'Invalid password')
  }
  try {
    const apiKeys = await prisma.apiKey.findMany()

    res.json({ success: true, message: apiKeys })
  } catch (error) {
    sendErrorResponse(res, 500, error.message)
  }
}

module.exports = {
  createApiKey,
  listApiKeys
}
