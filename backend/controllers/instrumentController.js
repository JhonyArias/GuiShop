const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

const Instrument = require('../models/Instrument');
const { errorHandler } = require('../helpers/dberrorHandler');

exports.create = (req,res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      })
    }

    const { brand, category, price, quantity, description } = fields
    let instrument = new Instrument(fields);

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "La imagen debe pesar menos de 1MB"
        })
      }
      instrument.photo.data = fs.readFileSync(files.photo.path)
      instrument.photo.contentType = files.photo.type
    }

    instrument.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(error)
        })
      }
      res.json(result);
    })
  })
}


exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : 'name'
  
    Instrument.find()
      .select("-photo")
      .populate('category')
      .sort([[sortBy, order]])
      .exec((err, instruments) => {
        if (err) {
          return res.status(400).json({
            error: "Instrumentos no encontrados"
          })
        }
        res.json(instruments);
      })
  }

  exports.remove = (req, res) => {
    let instrument = req.instrument
    instrument.remove((err, deletedInstrument) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        })
      }
      res.json({
        message: "El instrumento ha sido eliminado satisfactoriamente."
      })
    })
  }

  exports.instrumentById = (req, res, next, id) => {
    Instrument.findById(id)
      .populate("category")
      .exec((err, instrument) => {
        if (err || !instrument) {
          return res.status(400).json({
            error: "Instrumento no encontrado"
          });
        }
        req.instrument = instrument;
        next();
      })
  }

  exports.photo = (req, res, next ) => {
    if (req.instrument.photo.data) {
      res.set('Content-Type', req.instrument.photo.contentType)
      return res.send(req.instrument.photo.data)
    }
    next();
  }
  