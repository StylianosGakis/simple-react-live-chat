import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import React, {useContext, useState} from "react";
import {CTX} from "../store/Store";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "50px",
        padding: theme.spacing(3, 2),
        textAlign: "center",
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

    // CTX Store
    const {allChats, sendChatAction, user} = useContext(CTX);
    const topics = Object.keys(allChats);

    // Local state
    const [activeTopic, setActiveTopic] = useState(topics[0]);
    const [textValue, setTextValue] = useState("");

    return (
        <div>
            <Paper className={classes.root}>
                <Typography variant={"h4"} component={"h4"}>
                    Chat app.
                </Typography>
                <Typography variant={"h5"} component={"h5"}>
                    {activeTopic}
                </Typography>
                <div className={classes.flex}>
                    <div className={classes.topicsWindow}>
                        <List>
                            {
                                topics.map(topic => (
                                    <ListItem button key={topic} onClick={(e) => setActiveTopic(e.target.innerText)}>
                                        <ListItemText primary={topic}/>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </div>
                    <div className={classes.chatWindow}>
                        {
                            allChats[activeTopic].map((chat, index) => (
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
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            sendChatAction({from: user, msg: textValue, topic: activeTopic});
                            setTextValue("");
                        }}
                    >
                        Send
                    </Button>
                </div>
            </Paper>
        </div>
    )
}

export default Dashboard;