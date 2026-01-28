function UserCard({ name, age, location, isPremium }) {
    return (
      <div>
        <h1>{name}</h1>
        <p>Age: {age}</p>
        <p>Location: {location}</p>
  
        {isPremium ? (
          <p>VIP Member</p>
        ) : (
          <p>Standard Member</p>
        )}
      </div>
    );
  }
  
  export default UserCard;
  