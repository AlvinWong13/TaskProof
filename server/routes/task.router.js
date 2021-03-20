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

  const taskQuery = `SELECT * FROM "tasks" WHERE user_id = $1;`;
  let userId = req.user.id

  pool
    .query(taskQuery, [userId])
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
  console.log(req.body.task);
  console.log(req.user.id);

  const taskQuery = `INSERT INTO "tasks" ("task", "user_id")
    VALUES ($1, $2) ;`;
  pool
    .query(taskQuery, [req.body.task, req.user.id])
    .then(() => res.sendStatus(200))
    .catch(error => {
      console.log('Adding task failed', error)
      res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
  const task = req.body.value.text;
  const taskId = req.body.editId;
  console.log('REQ.BODY.TASK', req.body.value.text);
  console.log('req.body.id', req.body.editId)

  const taskQuery = `UPDATE "tasks" SET "task" = $1 WHERE "id" = $2;`;
  pool
    .query(taskQuery, [task, taskId])
    .then(result => {
      console.log('Task updated');
      res.sendStatus(200);
    })
    .catch(error => {
      console.log('Updating task failed', error);
      res.sendStatus(500);
    })
});

router.delete(`/:id`, (req, res) => {
  const taskId = [req.params.id];

  const taskQuery = `DELETE FROM "tasks" WHERE id = $1;`;
  pool
    .query(taskQuery, taskId)
    .then(response => {
      console.log(response);
      res.sendStatus(200);
    })
    .catch(error => {
      console.log('Unable to delete', error);
    })
});

router.put('/completed/:id', (req, res) => {
  const completedId = [req.params.id];

  const taskQuery = `UPDATE "tasks" SET "completed" = NOT "completed" WHERE id = $1`;
  pool
    .query (taskQuery, completedId)
    .then(response => {
      console.log(response);
      res.sendStatus(200);
    })
    .catch(error => {
      console.log('Unable to update completed status', error);
    })
});

module.exports = router;
