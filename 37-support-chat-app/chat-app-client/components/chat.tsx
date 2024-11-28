import moment from "moment";

export const Chat: React.FC<IChatItem & { mine: boolean }> = ({
  createdAt,
  context,
  mine,
}) => {
  if (mine) {
    return (
      <div className="w-full pl-8">
        <div className="w-full bg-cyan-200 rounded-xl rounded-br-none px-3 py-2 font-medium">
          <p>{context}</p>
          <div className="flex justify-end mt-3">
            <span className="text-xs font-semibold">
              {moment(createdAt).format("lll")}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pr-8">
      <div className="w-full bg-green-200 rounded-xl rounded-bl-none px-3 py-2 font-medium">
        <p>{context}</p>
        <div className="flex justify-start mt-3">
          <span className="text-xs font-semibold">
            {moment(createdAt).format("lll")}
          </span>
        </div>
      </div>
    </div>
  );
};
