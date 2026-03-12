import React, { useState } from "react";
import "./Team.css";
import { agents } from "./agents";
import TeamCard from "./TeamCard";
import { useTranslation } from "react-i18next";

const Team = () => {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState(null);


  return (
    <section id="team" className="team-wrapper">
      <h2 className="team-title">{t("team.title")}</h2>
      <p className="team-subtitle">{t("team.subtitle")}</p>

      <div className="team-list">
        {agents.map(agent => (
          <TeamCard
            key={agent.id}
            agent={agent}
            activeId={activeId}
            setActiveId={setActiveId}/>
        ))}
      </div>
    </section>
  );
};

export default Team;
