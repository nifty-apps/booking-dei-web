import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { GET_CONTACTS } from "../../graphql/queries/contactQueries";
import { ContactFilterInput } from "../../graphql/__generated__/graphql";

const Employees = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data, loading, error } = useQuery(GET_CONTACTS, {
    variables: {
      filter: {
        hotel: user?.hotels[0] || "",
        type: "EMPLOYEE",
      } as ContactFilterInput,
    },
  });

  console.log(data);

  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>{error?.message}</p>;
  }
  return (
    <div>
      <p>Eployess Comming soon</p>
    </div>
  );
};

export default Employees;
