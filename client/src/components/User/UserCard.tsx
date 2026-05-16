export interface UserCardProps {
  uid: string;
  username: string;
  full_name: string;
  email: string;
}

const UserCard = ({ username, full_name, email }: UserCardProps) => {
  return (
    <div>
      <h1>{username}</h1>
      {/* {<p>{uid}</p>} */}
      <p>{full_name}</p>
      <p>{email}</p>
    </div>
  );
};

export default UserCard;
