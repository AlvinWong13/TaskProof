import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#00000099",
    color: "#ffdf6c",
    marginLeft: 300,
    marginRight: 300,
  },
}));

function Profile() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();

  const teamSelect = useSelector(store => store.teamSelect);
  const teamMembers = useSelector(store => store.teamMembers);

  console.log('what are the team members?', teamMembers);

  console.log('what is the value?', value);

  useEffect(() => {
    dispatch({
      type: 'GET_TEAM_SELECT',
    });
  }, []);

  const handleChange = (event, newValue) => {
    dispatch({
      type: 'GET_TEAM_MEMBERS',
      payload: newValue
    })
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {   
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="secondary"
          variant="fullWidth"
          >
          {teamSelect.map(team => {
            return(
              <Tab 
              key={team.id} 
              value={team.id} 
              label={team.name}
              />
            )
          })}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel dir={theme.direction} >
          {teamMembers.map(member => {
            return(
              <div
                key={member.id} 
                value={member.id}>
                  {member.firstname} {member.lastname}
              </div>
            )
          })}
          </TabPanel>

        {/* <TabPanel  dir={theme.direction}>
          Item One
        </TabPanel>
        <TabPanel  dir={theme.direction}>
          Item Two
        </TabPanel>
        <TabPanel  dir={theme.direction}>
          Item Three
        </TabPanel> */}
      </SwipeableViews>
    </div>
  );
}

export default Profile;