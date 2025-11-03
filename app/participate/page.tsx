import ParticipateComponent from "@/components/Participate/Participate";
import React from "react";

const page = () => {
  return (
    <div>
      <ParticipateComponent
        title="PARTICIPATE"
        text="I plan to pursue this passion differently. I seek commissioning from people to be part of this social experiment and inhabit this space. I will be happy to travel to them, anywhere in the world, have two sessions with them, and give them a painting and three sketches. Contact for details."
        imageSrc="potrait.avif"
        buttonText="Contact Me"
        buttonLink="/contact"
      />
    </div>
  );
};

export default page;
