const ConnectedUsers = ({ users }) =>
  <div className="user-list">
    <h4>Connected Users</h4>
    {users.map((u, idx) => <h6 key={idx}>{u}</h6>)}
    {console.log(users)}
  </div>

  export default ConnectedUsers;