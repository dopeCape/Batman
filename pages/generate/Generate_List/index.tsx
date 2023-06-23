import Image from "next/image";
import React from "react";

interface GeneratListProps {
  Card: Array<Array<string>>;
}

function GeneratList({ Card }: GeneratListProps) {
  return (
    <div>
      {Card &&
        Card.map((item: Array<string>, index: number) => (
          <>
            <div className="card cursor-pointer">
              <div className="card-info">
                <Image className={"w-10 h-10"} src={item[0]} alt="Logo" />
              </div>
            </div>
          </>
        ))}
    </div>
  );
}

export default GeneratList;
