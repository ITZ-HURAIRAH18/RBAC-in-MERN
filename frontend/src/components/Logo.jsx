const Logo = ({ size = "md" }) => {
  const sizes = {
    sm: { container: "40px", text: "16px" },
    md: { container: "50px", text: "20px" },
    lg: { container: "60px", text: "24px" },
    xl: { container: "80px", text: "32px" }
  };

  const currentSize = sizes[size];

  return (
    <div
      style={{
        width: currentSize.container,
        height: currentSize.container,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        fontWeight: "700",
        fontSize: currentSize.text,
        color: "white",
        fontFamily: "'Inter', 'Arial', sans-serif",
        letterSpacing: "1px",
        cursor: "pointer",
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      AH
    </div>
  );
};

export default Logo;
