'use strict'
const express = require('express')
const router = express.Router()
const db = require('../models/mongodb')

router.get('/list', async function (req, res, next) {
    const limit = (req.query.limit) ? parseInt(req.query.limit) : 100
    const skip = (req.query.page) ? limit * (req.query.page - 1) : 0
    let blockSigners = await db.BlockSigner.find({}).sort({ _id: 'desc' }).limit(limit).skip(skip)
    return res.json(blockSigners)
})

router.get('/getByCandidate/:candidate', async function (req, res, next) {
    const limit = (req.query.limit) ? parseInt(req.query.limit) : 100
    const skip = (req.query.page) ? limit * (req.query.page - 1) : 0
    let blockSigners = await db.BlockSigner.find({
        'signers.signer': req.params.candidate
    }).sort({ _id: 'desc' }).limit(limit).skip(skip)
    return res.json(blockSigners)
})

module.exports = router
