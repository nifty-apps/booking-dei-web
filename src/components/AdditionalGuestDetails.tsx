import { GuestInput } from "../graphql/__generated__/graphql";

interface AdditionalGuestDetailsProps {
  guestInfo: GuestInput[];
}

const AdditionalGuestDetails = ({ guestInfo }: AdditionalGuestDetailsProps) => {
  return (
    <>
      <div className="mt-8">
        <h1 className="font-semibold text-xl text-gray-500 mb-4 capitalize">
          Additional Guest
        </h1>
      </div>
      {guestInfo?.map((guest: GuestInput) => (
        <div className="mb-4 grid grid-cols-5 gap-4" key={guest.phone}>
          <div>
            <h3 className="mb-1">Full Name</h3>
            <p className="text-gray-600">{guest?.name || "No name found"}</p>
          </div>
          <div>
            <h3 className="mb-1">Phone</h3>
            <p className="text-gray-600">{guest?.phone || "No phone found"}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default AdditionalGuestDetails;
