import * as usersService from "../../services/users";

const routes = [
  {
    method: "GET",
    url: "/users",
    handler: usersService.getUsers
  },
  {
    method: "GET",
    url: "/users/:userId",
    handler: usersService.getSingleUser
  },
  {
    method: "POST",
    url: "/users",
    handler: usersService.addUser
  }
];

export default routes;
