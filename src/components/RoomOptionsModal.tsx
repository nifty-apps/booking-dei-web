import { Checkbox, Modal } from "antd";
import { useEffect, useState } from "react";
import {
  CreateRoomBookingInput,
  RoomBookingInput,
} from "../graphql/__generated__/graphql";

interface RoomOptionsModalProps {
  options: {
    showModal: boolean;
    roomBooking?: RoomBookingInput;
  };
  onOk: (options: {
    showModal: boolean;
    roomBooking?: RoomBookingInput;
  }) => void;
}

const RoomOptionsModal = ({ options, onOk }: RoomOptionsModalProps) => {
  const [roomBooking, setRoomBooking] = useState<RoomBookingInput | undefined>(
    options.roomBooking
  );

  useEffect(() => {
    setRoomBooking(options.roomBooking);
  }, [options.roomBooking]);

  return (
    <Modal
      destroyOnClose
      open={options.showModal}
      onOk={() => onOk({ showModal: false, roomBooking: roomBooking })}
      onCancel={() => onOk({ showModal: false })}
      cancelText="Cancel"
      okText="Apply"
      width={600}
      okButtonProps={{
        style: { background: "#005099" },
      }}
    >
      <div>
        <h3 className="font-semibold text-xl mb-2">Extras & Discount</h3>
        <div className="flex items-center gap-2 mb-3">
          <Checkbox
            checked={roomBooking?.extraBed}
            onChange={(e) => {
              setRoomBooking({
                ...roomBooking,
                extraBed: e.target.checked,
              } as CreateRoomBookingInput);
            }}
          >
            Bed
          </Checkbox>
          <br />
          <Checkbox
            checked={roomBooking?.extraBreakfast}
            onChange={(e) => {
              setRoomBooking({
                ...roomBooking,
                extraBreakfast: e.target.checked,
              } as CreateRoomBookingInput);
            }}
          >
            Breakfast
          </Checkbox>
        </div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="font-semibold">Room Rent : </div>
            <div className="font-semibold my-2">Discount : </div>
            <div className="font-semibold">
              Final Room Rent (Including Extras & Discount) :
            </div>
          </div>
          <div>
            <div>{roomBooking?.rent}</div>
            <input
              type="text"
              placeholder="Enter Discount"
              className="border border-gray-400 rounded-md p-2 my-2"
              value={roomBooking?.discount || 0}
              onChange={(e) => {
                setRoomBooking({
                  ...roomBooking,
                  discount: Number(e.target.value),
                } as CreateRoomBookingInput);
              }}
            />
            <div>{(roomBooking?.rent || 0) - (roomBooking?.discount || 0)}</div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RoomOptionsModal;
