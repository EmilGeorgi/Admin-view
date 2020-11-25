import * as React from "react";
import { useMediaQuery, makeStyles } from '@material-ui/core';
import { MenuItemLink, getResources, RichTextField, SimpleShowLayout, Show, DateInput, List, Datagrid, SimpleList, TextField, ReferenceField, ShowButton, EditButton, Filter, ReferenceInput, SelectInput, TextInput, Edit, SimpleForm, Create } from 'react-admin';
import { useSelector } from 'react-redux';
import DefaultIcon from '@material-ui/icons/ViewList';

const PostFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput>
        <SimpleForm label="Date" allowEmpty>
            <DateInput source="from date" />
            <DateInput source="to date" />
        </SimpleForm>
    </Filter>
);

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


export const PostList = (props) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const open = useSelector(state => state.admin.ui.sidebarOpen);
    const resources = useSelector(getResources);

    return (
        <div>
            <Menu />
            <List filters={<PostFilter />} {...props}>
                {isSmall ? (
                    <SimpleList
                        primaryText={record => record.title}
                        secondaryText={record => `${record.views} views`}
                        tertiaryText={record => new Date(record.published_at).toLocaleDateString()}
                    />
                ) : (
                    <Datagrid rowClick="show">
                        <TextField source="id" />
                        <ReferenceField label="User" source="userId" reference="users" link="show">
                            <TextField source="name" />
                        </ReferenceField>
                        <TextField source="title" />
                        <TextField source="body" />
                        <ShowButton />
                        <EditButton />
                    </Datagrid>
                )}
            </List>
        </div>
    );
}
    
const PostTitle = ({ record }) => {
        return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

export const PostEdit = props => (
    <Edit title={<PostTitle />} {...props}>
        <SimpleForm>
           <TextInput disabled source="id" />
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <TextInput multiline source="body" />
        </SimpleForm>
    </Edit>
);

export const PostCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <TextInput multiline source="body" />
        </SimpleForm>
    </Create>
);

export const PostShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="title" />
            <ReferenceField label="User" source="userId" reference="users" link="show">
                <TextField source="name" />
            </ReferenceField>
            <RichTextField source="body" />
            </SimpleShowLayout>
    </Show>
);