const Loading = () => {
  return (
    <div className="flex justify-center flex-row gap-2 mt-10">
      <div className="w-4 h-4 rounded-full bg-accent animate-bounce" />
      <div className="w-4 h-4 rounded-full bg-accent animate-bounce [animation-delay:-.3s]" />
      <div className="w-4 h-4 rounded-full bg-accent animate-bounce [animation-delay:-.5s]" />
    </div>
  );
};

export default Loading;
