import "../styles/StatsCard.css";

function StatsCard({ icon, title, value, color = "#6366f1" }) {
  return (
    <article 
      className="stats-card" 
      style={{ "--card-accent": color }}
    >
      <div className="stats-icon" aria-hidden="true">
        {icon}
      </div>

      <div className="stats-content">
        <h4>{title}</h4>
        <h2>{value}</h2>
        <p>Updated just now</p>
      </div>
    </article>
  );
}

export default StatsCard;