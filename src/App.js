import * as React from "react";
import { Dashboard } from './Dashboard';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import { Admin, Resource, ListGuesser, ShowGuesser, EditGuesser, } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { UserList, UserShow, UserEdit, UserCreate } from './users';
import { PostList, PostEdit, PostCreate, PostShow } from './posts';
import { CommentsList, CommentsEdit, CommentsCreate, CommentsShow } from './comments';
import MyLayout from './MyLayout';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
const App = () => (
  <Admin layout={MyLayout} dashboard={Dashboard} dataProvider={dataProvider}>
    <Resource name="posts" list={PostList} show={PostShow} edit={PostEdit} create={PostCreate} icon={PostIcon} />
    <Resource name="users" list={UserList} show={UserShow} edit={UserEdit} create={UserCreate} icon={UserIcon} />
    <Resource name="comments" list={CommentsList} show={CommentsShow} create={CommentsCreate} edit={CommentsEdit} icon={UserIcon} />

  </Admin>
);
export default App;
