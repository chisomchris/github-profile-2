export const Avatar = ({ uri }: { uri: string | undefined }) => {
  return (
    <div className="w-36 aspect-square rounded-3xl bg-black border border-12 border-ash-1 overflow-hidden">
      <img src={uri} alt="" />
    </div>
  );
};
