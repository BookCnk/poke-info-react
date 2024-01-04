import React from "react";
import LikePoke from "./LikePoke";

function FavPoke({ fav }) {
  return (
    <div className="grid sm:grid-cols-1 grid md:grid-cols-3 grid lg:grid-cols-4">
      {fav?.map((data, index) => (
        <div key={index}>
          {data?.name}
          <img src={data?.sprites?.other?.home.front_default} />
            <LikePoke/>
        </div>
      ))}
    </div>
  );
}

export default FavPoke;
