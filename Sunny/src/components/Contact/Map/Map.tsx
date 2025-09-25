import React from "react";

const Map: React.FC = () => {
  return (
    <div id="map-area">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.4982284554153!2d105.73221267584185!3d21.052753986952826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345458035466a7%3A0x2905ea8565418665!2zMjI0IMSQLiBD4bqndSBEaeG7hW4sIE1pbmggS2hhaSwgQuG6r2MgVOG7qyBMacOqbSwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1753866819520!5m2!1svi!2s"
        width="100%"
        height="450"
        style={{ border: 0 }}
        loading="lazy"
        title="This is a unique title"
      ></iframe>
    </div>
  );
};

export default Map;
