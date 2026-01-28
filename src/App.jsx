import UserCard from "./UserCard";

function App() {
  return (
    <>
      <UserCard
        name="Dev"
        age={21}
        location="India"
        isPremium={true}
      />

      <UserCard
        name="Amit"
        age={25}
        location="Mumbai"
        isPremium={false}
      />

      <UserCard
        name="Sara"
        age={23}
        location="Delhi"
        isPremium={true}
      />
    </>
  );
}

export default App;
