

export default function DisplayName({ name, isOwner }: { name: string, isOwner: boolean }) {


    return (
      <div className="">
        <h1 className="text-5xl font-bold mb-4">
            {name}
        </h1>
      </div>
    );
  }
  