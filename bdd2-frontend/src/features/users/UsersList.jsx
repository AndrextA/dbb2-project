import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";
import useTitle from "../../hooks/useTitle";
import PulseLoader from "react-spinners/PulseLoader";

const UsersList = () => {
  useTitle("Notes: Users List");

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("usersList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading)
    content = (
      <div className="d-flex justify-content-center">
        <PulseLoader color={"#FFF"} />
      </div>
    );

  if (isError) {
    content = (
      <div className="alert alert-danger" role="alert">
        {error?.data?.message}
      </div>
    );
  }

  if (isSuccess) {
    const tableContent =
      users.ids.length > 0 ? (
        users.ids.map((userId) => <User key={userId} userId={userId} />)
      ) : (
        <tr>
          <td colSpan="3" className="text-center">
            No users found.
          </td>
        </tr>
      );

    content = (
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Roles</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </div>
    );
  }

  return <div>{content}</div>;
};

export default UsersList;
