// in src/Menu.js
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery, makeStyles } from '@material-ui/core';
import { MenuItemLink, getResources } from 'react-admin';
import DefaultIcon from '@material-ui/icons/ViewList';

const useStyles = makeStyles({
    navMargin: {
        marginTop: 60
    },
});

const Menu = ({ onMenuClick, logout }) => {
    const classes = useStyles();
    const isXSmall = useMediaQuery(theme => theme.breakpoints.down('xs'));
    const open = useSelector(state => state.admin.ui.sidebarOpen);
    const resources = useSelector(getResources);
    return (
        <div className={classes.navMargin}>
            {resources.map(resource => (
                <MenuItemLink
                    key={resource.name}
                    to={`/${resource.name}`}
                    primaryText={
                        (resource.options && resource.options.label) ||
                        resource.name
                    }
                    leftIcon={
                        resource.icon ? <resource.icon /> : <DefaultIcon />
                    }
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                />
            ))}
            {isXSmall && logout}
        </div>
    );
};

export default Menu;