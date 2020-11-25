import * as React from "react";
import { useSelector } from 'react-redux';
import { useMediaQuery, makeStyles } from '@material-ui/core';
import { MenuItemLink, getResources } from 'react-admin';
import DefaultIcon from '@material-ui/icons/ViewList';
import { SimpleShowLayout, Show, DateInput, List, Datagrid, SimpleList, TextField, ReferenceField, ShowButton, EditButton, Filter, ReferenceInput, SelectInput, TextInput, Edit, SimpleForm, Create, EmailField } from 'react-admin';

const useStyles = makeStyles({
    navDisplay: {
        marginTop: 20,
        display: 'flex',
        width: '100%',
        justifyContent: 'start'
    },
});

const Menu = ({ onMenuClick, logout }) => {
    const classes = useStyles();
    const open = useSelector(state => state.admin.ui.sidebarOpen);
    const resources = useSelector(getResources);
    return (
        <div className={classes.navDisplay}>
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
        </div>
    );
};

const CommentsFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="User" source="postId" reference="posts" allowEmpty>
            <SelectInput optionText="title" />
        </ReferenceInput>
        <SimpleForm label="Date" allowEmpty>
            <DateInput source="from date" />
            <DateInput source="to date" />
        </SimpleForm>
    </Filter>
);

export const CommentsList = (props) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <div>
            <Menu />
            <List filters={<CommentsFilter />} {...props}>
                {isSmall ? (
                    <SimpleList
                        primaryText={record => record.name}
                        secondaryText={record => `${record.views} views`}
                        tertiaryText={record => new Date(record.published_at).toLocaleDateString()}
                    />
                ) : (
                    <Datagrid rowClick="show"   >
                        <ReferenceField label="Post" source="postId" reference="posts" link="show">
                            <TextField source="title" />
                        </ReferenceField>
                        <TextField source="name" />
                        <EmailField source="email" />
                        <ShowButton />
                        <EditButton />
                    </Datagrid>
                )}
            </List>
        </div>
    );
}
    
const CommentsTitle = ({ record }) => {
        return <span>Post {record ? `"${record.name}"` : ''}</span>;
};

export const CommentsEdit = props => (
    <Edit title={<CommentsTitle />} {...props}>
        <SimpleForm>
           <TextInput disabled source="id" />
            <ReferenceInput source="postId" reference="posts">
                <SelectInput optionText="title" />
            </ReferenceInput>
            <TextInput source="email" />
            <TextInput multiline source="body" />
        </SimpleForm>
    </Edit>
);

export const CommentsCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput source="postId" reference="posts">
                <SelectInput optionText="title" />
            </ReferenceInput>
            <TextInput source="name" />
            <TextInput source="email" />
            <TextInput multiline source="body" />
        </SimpleForm>
    </Create>
);

export const CommentsShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <ReferenceField label="Post" source="postId" reference="posts" link="show">
            <TextField source="title" />
            </ReferenceField>
            <TextField source="name" />
            <EmailField source="email" />
            <TextField source="body" />
        </SimpleShowLayout>
    </Show>
);