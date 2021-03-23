const express = require('express');
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const router = express.Router();

/**
 * GET route
 */
router.get('/', (req, res) => {
  if(!req.isAuthenticated()) {
    res.sendStatus(403)
    return;
  }

  const taskQuery = `SELECT * FROM "tasks" WHERE user_id = $1`;
  let taskParams = [req.user.id]


  pool
    .query(taskQuery, taskParams)
    .then((result) => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log('Error getting tasks', error);
      res.sendStatus(500)
    })
});

/**
 * POST route 
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  // console.log(req.body.task);
  // console.log(req.user.id);
  console.log(req.body.date)
  // console.log(req.body.team.id);

  const taskQuery = `INSERT INTO "tasks" ("task", "date", "user_id")
    VALUES ($1, $2, $3);`;
  pool
    .query(taskQuery, [req.body.task, req.body.date, req.user.id,])
    .then(() => res.sendStatus(200))
    .catch(error => {
      console.log('Adding task failed', error)
      res.sendStatus(500);
    });
});

/**
 * PUT route 
 */
router.put('/:id', rejectUnauthenticated, (req, res) => {
  let taskQuery;
  let editParams; 
  // console.log('REQ.BODY.TASK', req.body.value.text);
  // console.log('req.body.id', req.body.editId);

  if (req.connection.authlevel === 'ADMIN') {
    taskQuery = `UPDATE "tasks" SET "task" = $1 WHERE "id" = $2;`;
    editParams = [req.body.value.text, req.body.editId];
  }
  else{
    taskQuery = `UPDATE "tasks" SET "task" = $1 WHERE "id" = $2 AND user_id = $3;`;
    editParams = [req.body.value.text, req.body.editId, req.user.id]
  }
  pool
    .query(taskQuery, editParams)
    .then(result => {
      console.log('Task updated');
      res.sendStatus(200);
    })
    .catch(error => {
      console.log('Updating task failed', error);
      res.sendStatus(500);
    })
});

/**
 * DELETE route 
 */
router.delete(`/:id`, rejectUnauthenticated, (req, res) => {
  let taskQuery;
  let taskParams;
  if (req.connection.authlevel === 'ADMIN') {
    taskQuery = `DELETE FROM "tasks" WHERE id = $1 RETURNING *;`;
    taskParams = [req.params.id]
  }
  else{
    taskQuery = `DELETE FROM "tasks" WHERE id = $1 AND user_id = $2 RETURNING *;`;
    taskParams = [req.params.id, req.user.id];
  }
  
  pool
    .query(taskQuery, taskParams)
    .then(result => {
      console.log('Task updated');
      res.sendStatus(200);
    })
    .catch(error => {
      console.log('Unable to delete', error);
    })
});

router.put('/completed/:id', rejectUnauthenticated, (req, res) => {
  let taskQuery; 
  let completedParams;
  if (req.connection.authlevel === 'ADMIN') {
    taskQuery = `UPDATE "tasks" SET "completed" = NOT "completed" WHERE id = $1`;
    completedParams = [req.params.id]
  }
  else{
    taskQuery = `UPDATE "tasks" SET "completed" = NOT "completed" WHERE id = $1 AND user_id = $2`;
    completedParams = [req.params.id, req.user.id];
  }
  pool
    .query (taskQuery, completedParams)
    .then(response => {
      console.log(response);
      res.sendStatus(200);
    })
    .catch(error => {
      console.log('Unable to update completed status', error);
    })
});

module.exports = router;
