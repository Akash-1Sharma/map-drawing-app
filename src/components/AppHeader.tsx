const AppHeader = () => (
  <div
    style={{
      position: 'absolute',
      top: 16,
      left: 0,
      right: 0,
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center',
      pointerEvents: 'none',
    }}
  >
    <div
      style={{
        background: '#d3caca',
        padding: '10px 16px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        fontWeight: 600,
        pointerEvents: 'auto',  // Re-enable clicks on the header itself
      }}
    >
      Map Drawing Tool
    </div>
  </div>
);

export default AppHeader;
