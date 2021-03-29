const express = require('express');
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/myTeams', (req, res) => {
  if(!req.isAuthenticated()) {
    res.sendStatus(403)
    return;
  }

  const teamQuery = `SELECT "team".name, "team".id
    FROM "team"
    JOIN "connection" ON "connection".team_id = "team".id
    FULL OUTER JOIN "user" ON "user".id = "connection".user_id
    WHERE "user".id = $1`
  ;

  const teamId = req.user.id;

  pool
    .query(teamQuery, [teamId])
    .then((result) => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log('Error getting teams', error);
      res.sendStatus(500)
    })
})

router.get('/allTeams', (req, res) => {
  const teamQuery = `SELECT * FROM "team";`;

  pool
    .query(teamQuery)
    .then((result) => {
      console.log('what are all my teams', result);
      res.send(result.rows);
    })
    .catch(error => {
      console.log('Error getting all teams', error);
      res.sendStatus(500)
    })
})

router.post('/', (req, res) => {
  const teamName = req.body;
  console.log('req.body', req.body);

  const teamQuery = `INSERT INTO "team" ("name")
    VALUES ($1)`;

  pool
    .query(teamQuery, [teamName])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('Team registration failed ', err);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  const addTeamMember = [req.user.id, req.body.id];

  const teamQuery = `INSERT INTO "connection" ("user_id", "team_id")
      VALUES ($1, $2)`;
  pool
    .query(teamQuery, addTeamMember)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('Add team member failed', err);
      res.sendStatus(500);
    })
});

router.get('/members/:id', (req, res) => {
  const teamId = req.params.id;

  const teamQuery = `SELECT "user".firstname, "user".lastname
      FROM "user"
      JOIN "connection" ON "user".id = "connection".user_id
      JOIN "team" ON "team".id = "connection".team_id
      WHERE "team".id = $1;
  `;
  pool
    .query(teamQuery, [teamId])
    .then((result) =>{
      res.send(result.rows);
    })
    .catch(error => {
      console.log('Error getting team members', error);
      res.sendStatus(500)
    })
})

module.exports = router;