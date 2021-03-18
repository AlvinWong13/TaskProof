const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/tasks', (req, res) => {
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
 * POST route template
 */
router.post('/tasks', (req, res) => {
  const taskInput = req.body.task;

  const taskQuery = `INSERT INTO "tasks" (task)
    VALUE ($1) RETURNING id;`;
  pool
    .query(taskQuery, [taskInput])
    .then(() => res.sendStatus(200))
    .catch(error => {
      console.log('Adding task failed', error)
      res.sendStatus(500);
    });
});

router.put('/tasks/:id', (req, res) => {
  const task = req.body.task;
  const taskId = req.body.id;

  const taskQuery = `UPDATE "tasks" SET "task" = ($1) WHERE "id" = $2;`;
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
})

router.delete(`/task/:id`, (req, res) => {
  const taskId = [req.params.id];

  const taskQuery = `DELETE FROM "tasks" WHERE id = ($1);`;
  pool
    .query(taskQuery, taskId)
    .then(response => {
      console.log(response);
      res.sendStatus(200);
    })
    .catch(error => {
      console.log('Unable to delete', error);
    })
})

module.exports = router;
