import * as React from 'react';
import { AppBar } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    bgImage: {
        backgroundImage: 'url(https://static.wixstatic.com/media/daa771_7af8fed8fcb44bbaa0fc7b2c60bba024~mv2_d_6011_3439_s_4_2.png/v1/fill/w_200,h_115,al_c,q_85,usm_0.66_1.00_0.01/Charity_Guard%20LOGO%202018.webp)',
        width: '100%',
        height: 65,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
    },
    spacer: {
        flex: 1,
    },
});

const MyAppBar = props => {
    const classes = useStyles();
    return (
        <AppBar {...props}>
            <div className={classes.bgImage}>
                <span className={classes.spacer} />
            </div>
        </AppBar>
    );
};

export default MyAppBar;