import { useQuery } from "@apollo/client";
import { GET_BOOKING } from "../graphql/queries/bookingDetailsQueries";

interface PaymentStatusProps {
  bookingId: string;
}

const PaymentStatus = ({ bookingId }: PaymentStatusProps) => {
  const { data } = useQuery(GET_BOOKING, {
    variables: {
      id: bookingId,
    },
  });

  return (
    <>
      {data?.booking.paymentStatus === "UNPAID" && (
        <div className="absolute top-0 right-0 bg-yellow-500 text-white px-1 rounded-tl-md rounded-br-md">
          Unpaid
        </div>
      )}

      {data?.booking.paymentStatus === "PAID" && (
        <div className="absolute top-0 right-0 bg-green-500 text-white px-1 rounded-tl-md rounded-br-md">
          Paid
        </div>
      )}

      {data?.booking.paymentStatus === "PARTIAL_PAID" && (
        <div className="absolute top-0 right-0 bg-red-500 text-white px-1 rounded-tl-md rounded-br-md">
          Partial Paid
        </div>
      )}
    </>
  );
};

export default PaymentStatus;
