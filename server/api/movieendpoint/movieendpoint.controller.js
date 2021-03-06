/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/movieendpoints              ->  index
 * POST    /api/movieendpoints              ->  create
 * GET     /api/movieendpoints/:id          ->  show
 * PUT     /api/movieendpoints/:id          ->  update
 * DELETE  /api/movieendpoints/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Movieendpoint from './movieendpoint.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

//CUSTOM  -------------------
//Gets the poster from database based on the Title
export function search(req, res) {
  return Movieendpoint.find({Title: req.params.name}).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Movieendpoints
export function index(req, res) {
  return Movieendpoint.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Movieendpoint from the DB
export function show(req, res) {
  return Movieendpoint.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Movieendpoint in the DB
export function create(req, res) {
  return Movieendpoint.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Movieendpoint in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Movieendpoint.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Movieendpoint from the DB
export function destroy(req, res) {
  return Movieendpoint.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
