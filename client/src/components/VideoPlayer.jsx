import React, { useContext, useState } from 'react';
import { Grid, Typography, Paper, makeStyles } from '@material-ui/core';

import { SocketContext } from '../Context';

const useStyles = makeStyles((theme) => ({
  video: {
    width: '550px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
  },
}));

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
  const classes = useStyles();

  const [videoswitch, setvideo] = useState(true);
  const [audioswitch, setaudio] = useState(true);

  const handleVideo = () => {
    if (videoswitch) {
        setvideo(false);
        stream.getTracks().forEach(function (track) {
            if (track.readyState === "live" && 
                track.kind === "video") {
                track.enabled = false;
            }
        });
    } else {
        setvideo(true);
        stream.getTracks().forEach(function (track) {
            if (track.readyState === "live" && 
                track.kind === "video") {
                track.enabled = true;
            }
        });
    }
  };
  const handleAudio = () => {
    if (audioswitch) {
        setaudio(false);
        stream.getTracks().forEach(function (track) {
            if (track.readyState === "live" && 
                track.kind === "audio") {
                track.enabled = false;
            }
        });
    } else {
        setaudio(true);
        stream.getTracks().forEach(function (track) {
            if (track.readyState === "live" && 
                track.kind === "audio") {
                track.enabled = true;
            }
        });
    }
  };

  return (
    <Grid container className={classes.gridContainer}>
      {stream && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
            <video playsInline muted ref={myVideo} autoPlay className={classes.video} />
            <button onClick={handleVideo}>
                {videoswitch ? "Turn off video" : 
                    "Turn on video"}
            </button>
            <button onClick={handleAudio}>
                {audioswitch ? "Turn off audio" : 
                    "Turn on audio"}
            </button>
          </Grid>
        </Paper>
      )}
      {callAccepted && !callEnded && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
            <video playsInline ref={userVideo} autoPlay className={classes.video} />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;
