
function StatCard({ title, value, subtitle, icon, color }) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <span>{title}</span>
        <span className="stat-icon" style={{ color }}>
          {icon}
        </span>
      </div>

      <h2>{value}</h2>
      <p>{subtitle}</p>
    </div>
  );
}

export default StatCard;
