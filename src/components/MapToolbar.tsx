const MapToolbar = () => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 16,
        left: 16,
        zIndex: 1000,
        background: '#ffffff',
        padding: '14px 18px',
        borderRadius: '10px',
        boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
        fontSize: '14px',
        maxWidth: '280px',
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 8 }}>
        Drawing Rules
      </div>

     <ul style={{ paddingLeft: 18, margin: 0, lineHeight: '1.6' }}>
  <li>🟩 <strong>Polygons</strong>, rectangles & circles cannot overlap</li>
  <li>✂️ Partial overlaps are auto-trimmed</li>
  <li>⛔ Full enclosure is blocked</li>
  <li>➖ Lines can cross freely</li>
  <li>✏️ Edit & 🗑️ delete supported</li>
</ul>

    </div>
  );
};

export default MapToolbar;
