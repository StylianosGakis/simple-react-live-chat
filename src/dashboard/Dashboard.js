import React, {useContext, useState} from "react";

import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "50px",
        padding: theme.spacing(3, 2),
    },
    flex: {
        display: "flex",
        alignItems: "center",
    },
    topicsWindow: {
        width: "30%",
        height: "300px",
        borderRight: "1px solid grey",
    },
    chatWindow: {
        width: "70%",
        height: "300px",
        padding: "20px",
    },
    chatBox: {
        width: "85%",
    },
    button: {
        width: "15%",
    },
}));

function Dashboard() {
    const classes = useStyles();
    const [textValue, setTextValue] = useState("");

    return (
        <div>
            <Paper className={classes.root}>
                <Typography variant={"h4"} component={"h4"}>
                    Chat app.
                </Typography>
                <Typography variant={"h5"} component={"h5"}>
                    Topic placeholder
                </Typography>
                <div className={classes.flex}>
                    <div className={classes.topicsWindow}>
                        <List>
                            {
                                ["topic"].map(topic => (
                                    <ListItem button key={topic}>
                                        <ListItemText primary={topic}/>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </div>
                    <div className={classes.chatWindow}>
                        {
                            [{from: "user", msg: "hello"}].map((chat, index) => (
                                <div className={classes.flex} key={index}>
                                    <Chip className={classes.chip} label={chat.from}/>
                                    <Typography variant={"body1"}>
                                        {chat.msg}
                                    </Typography>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={classes.flex}>
                    <TextField
                        label="Send a chat"
                        className={classes.chatBox}
                        value={textValue}
                        onChange={(e) => setTextValue(e.target.value)}
                    />
                    <Button variant="contained" color="primary">
                        Send
                    </Button>
                </div>
            </Paper>
        </div>
    )
}

export default Dashboard;