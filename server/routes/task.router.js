const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route
 */
router.get('/', (req, res) => {
  const taskQuery = `SELECT * FROM "tasks";`;
  pool
    .query(taskQuery)
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
router.post('/', (req, res) => {
  const taskInput = req.body.task;
  console.log(req.body.task)

  const taskQuery = `INSERT INTO "tasks" (task)
    VALUES ($1) RETURNING id;`;
  pool
    .query(taskQuery, [taskInput])
    .then(() => res.sendStatus(200))
    .catch(error => {
      console.log('Adding task failed', error)
      res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
  const task = req.body.task;
  const taskId = req.body.id;
  console.log('REQ.BODY', req.body);

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

router.put('/:id', (req, res) => {
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
