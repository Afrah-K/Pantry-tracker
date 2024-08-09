// src/app/pantry-tracker/[id]/page.tsx

import React from "react";
import PantryTracker from "../../components/PantryTracker"; // Adjust the path if necessary

const UserPantryTracker = ({ params }: { params: { id: string } }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">{params.id}</h1>
      <PantryTracker id={params.id} /> {/* Pass the id prop */}
    </div>
  );
};

export default UserPantryTracker;
